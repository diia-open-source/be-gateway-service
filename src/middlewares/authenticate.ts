import pTimeout from 'p-timeout'

import { AuthService as AuthCryptoService } from '@diia-inhouse/crypto'
import { EventBus, InternalEvent } from '@diia-inhouse/diia-queue'
import { AccessDeniedError, BadRequestError, UnauthorizedError } from '@diia-inhouse/errors'
import { CacheService, StoreService } from '@diia-inhouse/redis'
import {
    AcquirerTokenData,
    ActionSession,
    ActionVersion,
    CabinetUserTokenData,
    DurationMs,
    EResidentApplicantTokenData,
    EResidentSession,
    EResidentTokenData,
    Logger,
    PartnerScopes,
    PartnerTokenData,
    PortalUserTokenData,
    RefreshToken,
    ServiceEntranceTokenData,
    ServiceUserTokenData,
    SessionType,
    TemporaryTokenData,
    TokenData,
    UserSession,
    UserTokenData,
    VerifiedBaseTokenData,
} from '@diia-inhouse/types'

import PartnerService from '@services/partner'
import UserService from '@services/user'

import Utils from '@utils/index'

import { ActionCustomHeader, ProcessCode, Request, Response, RouteHeaderName, RouteHeaderRawName } from '@interfaces/index'
import { Middleware, MiddlewareNext } from '@interfaces/middlewares'
import { ProfileFeatureExpression } from '@interfaces/profileFeature'
import { AppRoute, GatewayUserActivityEventPayload, RouteAuthParams } from '@interfaces/routes/appRoute'
import { AppConfig } from '@interfaces/types/config'

export default class AuthenticateMiddleware {
    private readonly cacheTokenKeyPrefix: string = 'token_'

    private readonly cacheAttestationKeyPrefix: string = 'attestation_'

    private readonly publishUserActivityTimeout = DurationMs.Second

    constructor(
        private readonly partnerService: PartnerService,

        private readonly config: AppConfig,
        private readonly auth: AuthCryptoService,
        private readonly userService: UserService,
        private readonly cache: CacheService,
        private readonly store: StoreService,
        private readonly eventBus: EventBus,
        private readonly logger: Logger,
    ) {}

    isAuthenticated(route: AppRoute): Middleware {
        const { auth, profileFeaturesExpression } = route

        return async (req: Request, _res: Response, next: MiddlewareNext): Promise<void> => {
            const {
                $params: { headers },
            } = req

            const actionVersion = headers[ActionCustomHeader.ACTION_VERSION]
            const routeAuthParams = this.getRouteAuthParams(actionVersion, auth)

            if (!routeAuthParams) {
                return next(new UnauthorizedError('Unexpected action token'))
            }

            const { sessionType: routeSessionType, sessionTypes: routeSessionTypes = [] } = routeAuthParams
            const sessionTypes = routeSessionType ? [routeSessionType] : routeSessionTypes

            let err: Error | null = null

            try {
                if (!sessionTypes.length) {
                    throw new BadRequestError('Unknown session type')
                }

                if (routeSessionType && routeSessionTypes.length) {
                    throw new BadRequestError('Wrong session types configuration')
                }

                const appPartnerId = headers[RouteHeaderName.APP_PARTNER_ID]
                const authToken = appPartnerId ? null : this.parseBearerToken(req)

                if (!sessionTypes.includes(SessionType.None) && !appPartnerId && !authToken) {
                    return next(new UnauthorizedError('Empty token'))
                }

                const mobileUid = headers[RouteHeaderName.MOBILE_UID]

                req.$params.session = await this.createSession(
                    routeAuthParams,
                    sessionTypes,
                    authToken,
                    mobileUid,
                    appPartnerId,
                    profileFeaturesExpression,
                )
            } catch (e) {
                if (Utils.isError(e)) {
                    err = e
                    this.logger.error(e.message, { err: e, route })
                }
            }

            next(err ?? undefined)
        }
    }

    parseBearerToken(req: Request): string | null {
        const auth = req.headers ? req.headers[RouteHeaderRawName.TOKEN] || null : null
        if (!auth) {
            return null
        }

        const parts: string[] = auth.split(' ')
        // Malformed header
        if (parts.length < 2) {
            return null
        }

        const [schema, token]: string[] = parts
        if (schema.toLowerCase() !== this.config.auth.authSchema) {
            return null
        }

        return token
    }

    getRouteAuthParams(actionVersion: ActionVersion, auth: RouteAuthParams[]): RouteAuthParams | undefined {
        const authRouteVersion = auth.find((routeVersion: RouteAuthParams) => actionVersion === routeVersion.version)

        if (!authRouteVersion) {
            return
        }

        return authRouteVersion
    }

    validateScopes(scopes: PartnerScopes, targetScopes: PartnerScopes): void | never {
        Object.entries(scopes).forEach(([scopeType, scope]) => {
            if (!scope?.length) {
                return
            }

            scope.forEach((requiredScope: string) => this.validateScope(targetScopes?.[<keyof PartnerScopes>scopeType], requiredScope))
        })
    }

    private async createSession(
        authParams: RouteAuthParams,
        sessionTypes: SessionType[],
        token: string | null,
        mobileUid: string | undefined,
        appPartnerId: string | undefined,
        profileFeatureExpression: ProfileFeatureExpression | undefined,
    ): Promise<ActionSession | undefined> {
        const { scopes, skipJwtVerification, permissions } = authParams
        const tokenData = await this.getTokenData(token, sessionTypes, mobileUid, skipJwtVerification, appPartnerId)
        const sessionType = this.getSessionType(tokenData)

        switch (sessionType) {
            case SessionType.Acquirer: {
                return { sessionType, acquirer: <AcquirerTokenData>tokenData }
            }
            case SessionType.Temporary: {
                return { sessionType, temporary: <TemporaryTokenData>tokenData }
            }
            case SessionType.Partner: {
                const partnerTokenData = <PartnerTokenData>tokenData
                if (scopes) {
                    const { scopes: partnerScopes } = partnerTokenData

                    this.validateScopes(scopes, partnerScopes)
                }

                return { sessionType, partner: partnerTokenData }
            }
            case SessionType.User: {
                return await this.createUserSession(mobileUid, tokenData, authParams, profileFeatureExpression)
            }
            case SessionType.ServiceEntrance: {
                const serviceEntranceTokenData = <VerifiedBaseTokenData<ServiceEntranceTokenData>>tokenData
                const { refreshToken } = serviceEntranceTokenData

                await this.checkRefreshToken(refreshToken, sessionType)

                return { sessionType, entrance: serviceEntranceTokenData }
            }
            case SessionType.PortalUser: {
                const portalUserTokenData = <VerifiedBaseTokenData<PortalUserTokenData>>tokenData
                const { refreshToken } = portalUserTokenData

                await this.checkRefreshToken(refreshToken, sessionType)

                if (permissions?.petition) {
                    this.validatePermissions(portalUserTokenData.permissions?.petition, permissions.petition)
                }

                if (permissions?.poll) {
                    this.validatePermissions(portalUserTokenData.permissions?.poll, permissions.poll)
                }

                return { sessionType, user: portalUserTokenData }
            }
            case SessionType.ServiceUser: {
                const serviceUserTokenData = <VerifiedBaseTokenData<ServiceUserTokenData>>tokenData
                const { refreshToken } = serviceUserTokenData

                await this.checkRefreshToken(refreshToken, sessionType)

                return { sessionType, serviceUser: serviceUserTokenData }
            }
            case SessionType.EResident: {
                return await this.createEResidentUsersSession(
                    mobileUid,
                    <VerifiedBaseTokenData<EResidentTokenData>>tokenData,
                    SessionType.EResident,
                    authParams,
                )
            }
            case SessionType.EResidentApplicant: {
                return await this.createEResidentUsersSession(
                    mobileUid,
                    <VerifiedBaseTokenData<EResidentApplicantTokenData>>tokenData,
                    SessionType.EResidentApplicant,
                    authParams,
                )
            }
            case SessionType.CabinetUser: {
                return await this.createCabinetUserSession(mobileUid, tokenData, authParams)
            }
            case SessionType.None: {
                return
            }
            default: {
                const unknownSessionType: never = sessionType

                throw new TypeError(`Unknown session type: [${unknownSessionType}]`)
            }
        }
    }

    private async createUserSession(
        mobileUid: string | undefined,
        tokenData: TokenData | null,
        authParams: RouteAuthParams,
        profileFeatureExpression?: ProfileFeatureExpression,
    ): Promise<ActionSession> {
        const sessionType = SessionType.User
        const { skipJwtVerification } = authParams
        const isAttestationPassed = await this.isAttestationPassed(mobileUid)
        if (!isAttestationPassed) {
            throw new UnauthorizedError('Attestation is not passed', ProcessCode.AttestationNotPassed)
        }

        const userTokenData = <VerifiedBaseTokenData<UserTokenData>>tokenData
        const { refreshToken, identifier: userIdentifier } = userTokenData

        if (!skipJwtVerification) {
            await this.checkRefreshToken(refreshToken, sessionType)
        }

        this.verifyIfItnAccessIsBlocked(userTokenData.itn, authParams)

        await this.publishUserActivity(userIdentifier, mobileUid)

        return {
            sessionType,
            user: userTokenData,
            features: await this.handleProfileFeatureExpression(userIdentifier, profileFeatureExpression),
        }
    }

    private async createCabinetUserSession(
        mobileUid: string | undefined,
        tokenData: TokenData | null,
        authParams: RouteAuthParams,
    ): Promise<ActionSession> {
        const sessionType = SessionType.CabinetUser
        const { skipJwtVerification } = authParams
        const cabinetUserTokenData = <VerifiedBaseTokenData<CabinetUserTokenData>>tokenData
        const { refreshToken, identifier: userIdentifier } = cabinetUserTokenData

        if (!skipJwtVerification) {
            await this.checkRefreshToken(refreshToken, sessionType)
        }

        this.verifyIfItnAccessIsBlocked(cabinetUserTokenData.itn, authParams)

        await this.publishUserActivity(userIdentifier, mobileUid)

        return { sessionType, user: cabinetUserTokenData }
    }

    private async createEResidentUsersSession(
        mobileUid: string | undefined,
        tokenData: VerifiedBaseTokenData<EResidentTokenData | EResidentApplicantTokenData>,
        sessionType: SessionType,
        authParams: RouteAuthParams,
    ): Promise<ActionSession>
    private async createEResidentUsersSession(
        mobileUid: string | undefined,
        tokenData: VerifiedBaseTokenData<EResidentTokenData>,
        sessionType: SessionType.EResident,
        authParams: RouteAuthParams,
    ): Promise<EResidentSession> {
        const { skipJwtVerification } = authParams
        const { refreshToken } = tokenData

        if (!skipJwtVerification) {
            await this.checkRefreshToken(refreshToken, sessionType)
        }

        await this.publishUserActivity(tokenData.identifier, mobileUid)

        return { sessionType, user: tokenData }
    }

    private verifyIfItnAccessIsBlocked(itn: string, authParams: RouteAuthParams): void {
        const { blockAccess } = authParams
        const routeAccessBlockItns = this.config.routeAccess.blockItns
        if (routeAccessBlockItns.length && (typeof blockAccess === 'undefined' || blockAccess === true)) {
            if (routeAccessBlockItns.includes(itn)) {
                throw new AccessDeniedError()
            }
        }
    }

    private getSessionType(tokenData: TokenData | null): SessionType {
        if (tokenData) {
            return tokenData.sessionType
        }

        return SessionType.None
    }

    private getTokenData(
        token: string | null,
        sessionTypes: SessionType[],
        mobileUid: string | undefined,
        skipJwtVerification: boolean | undefined,
        appPartnerId: string | undefined,
    ): Promise<TokenData> | null {
        if (appPartnerId) {
            return this.assemblePartnerTokenData(appPartnerId)
        }

        if (!token && sessionTypes.includes(SessionType.None)) {
            return null
        }

        if (sessionTypes.includes(SessionType.None) && sessionTypes.length === 1) {
            return null
        }

        return this.auth.validate(token, sessionTypes, mobileUid, skipJwtVerification)
    }

    private async assemblePartnerTokenData(partnerIdToken: string): Promise<PartnerTokenData> {
        const { _id: id, scopes } = await this.partnerService.getPartnerByToken(partnerIdToken)
        const tokenData: PartnerTokenData = {
            _id: id,
            scopes,
            sessionType: SessionType.Partner,
            refreshToken: null,
        }

        return tokenData
    }

    private async checkRefreshToken(refreshToken: RefreshToken, sessionType: SessionType): Promise<void> {
        const isTokenExists: boolean = await this.isTokenActive(refreshToken?.value)

        if (!isTokenExists) {
            this.logger.error(`${sessionType} refresh token not exists`, { refreshToken })

            throw new UnauthorizedError()
        }
    }

    private async isTokenActive(token: string | undefined): Promise<boolean> {
        if (!token) {
            return false
        }

        const tokenIsRevoked = await this.cache.get('exp_' + this.prepareTokenKey(token))

        return !tokenIsRevoked
    }

    private prepareTokenKey(key: string): string {
        return `${this.cacheTokenKeyPrefix}${key}`
    }

    private async isAttestationPassed(mobileUid: string | undefined): Promise<boolean> {
        if (!mobileUid) {
            return false
        }

        return (await this.cache.get(this.prepareAttestationKey(mobileUid))) !== 'false'
    }

    private prepareAttestationKey(key: string): string {
        return `${this.cacheAttestationKeyPrefix}${key}`
    }

    private validateScope(scope: string[] | undefined, requiredScope: string): void | never {
        if (!Array.isArray(scope) || !scope.includes(requiredScope)) {
            throw new AccessDeniedError(`"${requiredScope}" scope required`)
        }
    }

    private validatePermissions(permissions: string | undefined, requiredPermissions: string[]): void | never {
        if (!permissions || !requiredPermissions.includes(permissions)) {
            throw new AccessDeniedError(`Required permissions: [${requiredPermissions}]`)
        }
    }

    private async publishUserActivity(userIdentifier: string, mobileUid: string | undefined): Promise<void> {
        if (!this.config.userActivity.isEnabled) {
            return
        }

        if (!mobileUid) {
            return
        }

        try {
            await pTimeout(
                (async (): Promise<void> => {
                    const key = `user-activity.${mobileUid}`
                    if (await this.store.get(key)) {
                        return
                    }

                    const eventPayload: GatewayUserActivityEventPayload = { userIdentifier, mobileUid }

                    await Promise.all([
                        this.eventBus.publish(InternalEvent.GatewayUserActivity, eventPayload),
                        this.store.set(key, '1', { ttl: this.config.userActivity.ttl }),
                    ])
                })(),
                this.publishUserActivityTimeout,
            )
        } catch (err) {
            this.logger.error('Failed to handle user activity', { err })
        }
    }

    private async handleProfileFeatureExpression(
        userIdentifier: string,
        profileFeatureExpression: ProfileFeatureExpression | undefined,
    ): Promise<UserSession['features']> {
        if (!profileFeatureExpression) {
            return {}
        }

        try {
            const profileFeatures = await this.userService.getUserProfileFeatures(userIdentifier, profileFeatureExpression.features)
            if (!profileFeatureExpression.match((feature) => feature in profileFeatures)) {
                throw new AccessDeniedError()
            }

            return profileFeatures
        } catch (err) {
            if (err instanceof AccessDeniedError) {
                throw err
            }

            this.logger.error('Failed to fetch user profile features', { err })

            return
        }
    }
}
