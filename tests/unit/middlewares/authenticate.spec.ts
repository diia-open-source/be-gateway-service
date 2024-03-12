import { mock } from 'jest-mock-extended'

import { AuthService } from '@diia-inhouse/crypto'
import { EventBus, InternalEvent } from '@diia-inhouse/diia-queue'
import { AccessDeniedError, BadRequestError, UnauthorizedError } from '@diia-inhouse/errors'
import { CacheService, StoreService } from '@diia-inhouse/redis'
import {
    AcquirerTokenData,
    ActionVersion,
    CabinetUserTokenData,
    DurationMs,
    EResidentApplicantTokenData,
    EResidentTokenData,
    HttpMethod,
    Logger,
    PartnerPaymentScope,
    PartnerScopeType,
    PortalUserPetitionPermissions,
    PortalUserPollPermissions,
    PortalUserTokenData,
    ServiceEntranceTokenData,
    ServiceUserTokenData,
    SessionType,
    TemporaryTokenData,
    TokenData,
    UserTokenData,
    VerifiedBaseTokenData,
} from '@diia-inhouse/types'

import AuthenticateMiddleware from '@src/middlewares/authenticate'

import PartnerService from '@services/partner'
import UserService from '@services/user'

import { generateUuid } from '@mocks/randomData'

import { ActionCustomHeader, ProcessCode, Request, Response, RouteHeaderName, RouteHeaderRawName } from '@interfaces/index'
import { ProfileFeatureExpression } from '@interfaces/profileFeature'
import { AppRoute, RouteAuthParams } from '@interfaces/routes/appRoute'
import { AppConfig } from '@interfaces/types/config'

describe(`Service ${AuthenticateMiddleware.constructor.name}`, () => {
    const partnerService = mock<PartnerService>()
    const config = <AppConfig>(<unknown>{
        auth: { authSchema: 'bearer' },
        routeAccess: { blockItns: '0000000000' },
        userActivity: { isEnabled: true, ttl: DurationMs.Second * 30 },
    })
    const auth = mock<AuthService>()
    const userService = mock<UserService>()
    const cache = mock<CacheService>()
    const store = mock<StoreService>()
    const eventBus = mock<EventBus>()
    const logger = mock<Logger>()
    const authenticateMiddleware = new AuthenticateMiddleware(partnerService, config, auth, userService, cache, store, eventBus, logger)

    describe(`Method ${authenticateMiddleware.isAuthenticated.name}`, () => {
        const mobileUid = generateUuid()
        const partnerId = generateUuid()
        const profileFeaturesExpression = { match: jest.fn() }

        it.each([
            [
                `should successfully authenticate user with session type ${SessionType.None}`,
                <RouteAuthParams>{ version: ActionVersion.V1, sessionType: SessionType.None },
                { [RouteHeaderRawName.TOKEN]: undefined },
                {
                    [RouteHeaderName.MOBILE_UID]: mobileUid,
                    [RouteHeaderName.APP_PARTNER_ID]: undefined,
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {},
                (): void => {},
                undefined,
            ],
            [
                `should not validate token in case it is present and session type is ${SessionType.None}`,
                <RouteAuthParams>{ version: ActionVersion.V1, sessionType: SessionType.None },
                { [RouteHeaderRawName.TOKEN]: 'Bearer <user-token>' },
                {
                    [RouteHeaderName.MOBILE_UID]: mobileUid,
                    [RouteHeaderName.APP_PARTNER_ID]: undefined,
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {
                    jest.spyOn(auth, 'validate').mockImplementationOnce(() => {
                        throw new Error('Invalid token')
                    })
                },
                (): void => {
                    expect(auth.validate).not.toHaveBeenCalled()
                },
                undefined,
            ],
            [
                `should successfully authenticate user when route configuration allows list of session types ${[
                    SessionType.None,
                    SessionType.User,
                ]}`,
                <RouteAuthParams>{
                    version: ActionVersion.V1,
                    sessionTypes: [SessionType.None, SessionType.User],
                    skipJwtVerification: false,
                    blockAccess: false,
                },
                { [RouteHeaderRawName.TOKEN]: 'Bearer <user-token>' },
                {
                    [RouteHeaderName.MOBILE_UID]: mobileUid,
                    [RouteHeaderName.APP_PARTNER_ID]: undefined,
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {
                    jest.spyOn(auth, 'validate').mockResolvedValueOnce(<VerifiedBaseTokenData<UserTokenData>>{
                        sessionType: SessionType.User,
                        refreshToken: { value: '<refresh token>' },
                        identifier: '<user identifier>',
                    })
                    jest.spyOn(cache, 'get').mockResolvedValueOnce('true')
                    jest.spyOn(eventBus, 'publish').mockResolvedValueOnce(true)
                    jest.spyOn(store, 'set').mockResolvedValueOnce('OK')
                },
                (): void => {
                    expect(auth.validate).toHaveBeenCalledWith('<user-token>', [SessionType.None, SessionType.User], mobileUid, false)
                    expect(cache.get).toHaveBeenCalledWith(`attestation_${mobileUid}`)
                    expect(cache.get).toHaveBeenCalledWith('exp_token_<refresh token>')
                    expect(eventBus.publish).toHaveBeenCalledWith(InternalEvent.GatewayUserActivity, {
                        userIdentifier: '<user identifier>',
                        mobileUid,
                    })
                    expect(store.set).toHaveBeenCalledWith(`user-activity.${mobileUid}`, '1', { ttl: 30_000 })
                },
                undefined,
            ],
            [
                `should successfully authenticate user with session type ${SessionType.User}`,
                <RouteAuthParams>{
                    version: ActionVersion.V1,
                    sessionTypes: [SessionType.User],
                    skipJwtVerification: false,
                    blockAccess: false,
                },
                { [RouteHeaderRawName.TOKEN]: 'Bearer <user-token>' },
                {
                    [RouteHeaderName.MOBILE_UID]: mobileUid,
                    [RouteHeaderName.APP_PARTNER_ID]: undefined,
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                profileFeaturesExpression,
                (): void => {
                    jest.spyOn(auth, 'validate').mockResolvedValueOnce(<VerifiedBaseTokenData<UserTokenData>>{
                        sessionType: SessionType.User,
                        refreshToken: { value: '<refresh token>' },
                        identifier: '<user identifier>',
                    })
                    jest.spyOn(cache, 'get').mockResolvedValueOnce('true')
                    jest.spyOn(eventBus, 'publish').mockResolvedValueOnce(true)
                    jest.spyOn(store, 'set').mockResolvedValueOnce('OK')
                    jest.spyOn(userService, 'getUserProfileFeatures').mockResolvedValueOnce({})
                    profileFeaturesExpression.match.mockReturnValueOnce(true)
                },
                (): void => {
                    expect(auth.validate).toHaveBeenCalledWith('<user-token>', [SessionType.User], mobileUid, false)
                    expect(cache.get).toHaveBeenCalledWith(`attestation_${mobileUid}`)
                    expect(cache.get).toHaveBeenCalledWith('exp_token_<refresh token>')
                    expect(eventBus.publish).toHaveBeenCalledWith(InternalEvent.GatewayUserActivity, {
                        userIdentifier: '<user identifier>',
                        mobileUid,
                    })
                    expect(store.set).toHaveBeenCalledWith(`user-activity.${mobileUid}`, '1', { ttl: 30_000 })
                },
                undefined,
            ],
            [
                `should successfully authenticate user with session type ${SessionType.User} and skip checking user profile features`,
                <RouteAuthParams>{
                    version: ActionVersion.V1,
                    sessionTypes: [SessionType.User],
                    skipJwtVerification: false,
                    blockAccess: false,
                },
                { [RouteHeaderRawName.TOKEN]: 'Bearer <user-token>' },
                {
                    [RouteHeaderName.MOBILE_UID]: mobileUid,
                    [RouteHeaderName.APP_PARTNER_ID]: undefined,
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {
                    jest.spyOn(auth, 'validate').mockResolvedValueOnce(<VerifiedBaseTokenData<UserTokenData>>{
                        sessionType: SessionType.User,
                        refreshToken: { value: '<refresh token>' },
                        identifier: '<user identifier>',
                    })
                    jest.spyOn(cache, 'get').mockResolvedValueOnce('true')
                    jest.spyOn(eventBus, 'publish').mockResolvedValueOnce(true)
                    jest.spyOn(store, 'set').mockResolvedValueOnce('OK')
                },
                (): void => {
                    expect(auth.validate).toHaveBeenCalledWith('<user-token>', [SessionType.User], mobileUid, false)
                    expect(cache.get).toHaveBeenCalledWith(`attestation_${mobileUid}`)
                    expect(cache.get).toHaveBeenCalledWith('exp_token_<refresh token>')
                    expect(eventBus.publish).toHaveBeenCalledWith(InternalEvent.GatewayUserActivity, {
                        userIdentifier: '<user identifier>',
                        mobileUid,
                    })
                    expect(store.set).toHaveBeenCalledWith(`user-activity.${mobileUid}`, '1', { ttl: 30_000 })
                },
                undefined,
            ],
            [
                `should successfully authenticate user with session type ${SessionType.Acquirer}`,
                <RouteAuthParams>{ version: ActionVersion.V1, sessionType: SessionType.Acquirer, skipJwtVerification: false },
                { [RouteHeaderRawName.TOKEN]: 'Bearer <acquirer-token>' },
                {
                    [RouteHeaderName.MOBILE_UID]: mobileUid,
                    [RouteHeaderName.APP_PARTNER_ID]: undefined,
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {
                    jest.spyOn(auth, 'validate').mockResolvedValueOnce(<VerifiedBaseTokenData<AcquirerTokenData>>{
                        sessionType: SessionType.Acquirer,
                        refreshToken: { value: '<refresh token>' },
                    })
                },
                (): void => {
                    expect(auth.validate).toHaveBeenCalledWith('<acquirer-token>', [SessionType.Acquirer], mobileUid, false)
                },
                undefined,
            ],
            [
                `should successfully authenticate user with session type ${SessionType.Temporary}`,
                <RouteAuthParams>{ version: ActionVersion.V1, sessionType: SessionType.Temporary, skipJwtVerification: false },
                { [RouteHeaderRawName.TOKEN]: 'Bearer <temporary-token>' },
                {
                    [RouteHeaderName.MOBILE_UID]: mobileUid,
                    [RouteHeaderName.APP_PARTNER_ID]: undefined,
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {
                    jest.spyOn(auth, 'validate').mockResolvedValueOnce(<VerifiedBaseTokenData<TemporaryTokenData>>{
                        sessionType: SessionType.Temporary,
                        mobileUid,
                        refreshToken: { value: '<refresh token>' },
                    })
                },
                (): void => {
                    expect(auth.validate).toHaveBeenCalledWith('<temporary-token>', [SessionType.Temporary], mobileUid, false)
                },
                undefined,
            ],
            [
                `should successfully authenticate user with session type ${SessionType.Partner}`,
                <RouteAuthParams>{
                    version: ActionVersion.V1,
                    sessionType: SessionType.Partner,
                    skipJwtVerification: false,
                    scopes: {
                        [PartnerScopeType.payment]: <PartnerPaymentScope[]>[],
                    },
                },
                { [RouteHeaderRawName.TOKEN]: undefined },
                {
                    [RouteHeaderName.MOBILE_UID]: mobileUid,
                    [RouteHeaderName.APP_PARTNER_ID]: partnerId,
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {
                    jest.spyOn(partnerService, 'getPartnerByToken').mockResolvedValueOnce({
                        scopes: {
                            [PartnerScopeType.payment]: <PartnerPaymentScope[]>[PartnerPaymentScope.Debt],
                        },
                        _id: mock(),
                    })
                },
                (): void => {
                    expect(partnerService.getPartnerByToken).toHaveBeenCalledWith(partnerId)
                },
                undefined,
            ],
            [
                `should successfully authenticate user with session type ${SessionType.ServiceEntrance}`,
                <RouteAuthParams>{ version: ActionVersion.V1, sessionType: SessionType.ServiceEntrance, skipJwtVerification: false },
                { [RouteHeaderRawName.TOKEN]: 'Bearer <service-entrance-token>' },
                {
                    [RouteHeaderName.MOBILE_UID]: mobileUid,
                    [RouteHeaderName.APP_PARTNER_ID]: undefined,
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {
                    jest.spyOn(auth, 'validate').mockResolvedValueOnce(<VerifiedBaseTokenData<ServiceEntranceTokenData>>{
                        sessionType: SessionType.ServiceEntrance,
                        mobileUid,
                        refreshToken: { value: '<refresh token>' },
                    })
                    jest.spyOn(cache, 'get').mockResolvedValueOnce(null)
                },
                (): void => {
                    expect(auth.validate).toHaveBeenCalledWith('<service-entrance-token>', [SessionType.ServiceEntrance], mobileUid, false)
                    expect(cache.get).toHaveBeenCalledWith('exp_token_<refresh token>')
                },
                undefined,
            ],
            [
                `should successfully authenticate user with session type ${SessionType.PortalUser}`,
                <RouteAuthParams>{
                    version: ActionVersion.V1,
                    sessionType: SessionType.PortalUser,
                    skipJwtVerification: false,
                    permissions: {
                        petition: [PortalUserPetitionPermissions.administrator],
                        poll: [PortalUserPollPermissions.masterAdministrator],
                    },
                },
                { [RouteHeaderRawName.TOKEN]: 'Bearer <portal-user-token>' },
                {
                    [RouteHeaderName.MOBILE_UID]: mobileUid,
                    [RouteHeaderName.APP_PARTNER_ID]: undefined,
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {
                    jest.spyOn(auth, 'validate').mockResolvedValueOnce(<VerifiedBaseTokenData<PortalUserTokenData>>(<unknown>{
                        sessionType: SessionType.PortalUser,
                        refreshToken: { value: '<refresh token>' },
                        mobileUid,
                        permissions: {
                            petition: PortalUserPetitionPermissions.administrator,
                            poll: PortalUserPollPermissions.masterAdministrator,
                        },
                    }))
                    jest.spyOn(cache, 'get').mockResolvedValueOnce(null)
                },
                (): void => {
                    expect(auth.validate).toHaveBeenCalledWith('<portal-user-token>', [SessionType.PortalUser], mobileUid, false)
                    expect(cache.get).toHaveBeenCalledWith('exp_token_<refresh token>')
                },
                undefined,
            ],
            [
                `should successfully authenticate user with session type ${SessionType.ServiceUser}`,
                <RouteAuthParams>{ version: ActionVersion.V1, sessionType: SessionType.ServiceUser, skipJwtVerification: false },
                { [RouteHeaderRawName.TOKEN]: 'Bearer <service-user-token>' },
                {
                    [RouteHeaderName.MOBILE_UID]: mobileUid,
                    [RouteHeaderName.APP_PARTNER_ID]: undefined,
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {
                    jest.spyOn(auth, 'validate').mockResolvedValueOnce(<VerifiedBaseTokenData<ServiceUserTokenData>>{
                        sessionType: SessionType.ServiceUser,
                        refreshToken: { value: '<refresh token>' },
                    })
                    jest.spyOn(cache, 'get').mockResolvedValueOnce(null)
                },
                (): void => {
                    expect(auth.validate).toHaveBeenCalledWith('<service-user-token>', [SessionType.ServiceUser], mobileUid, false)
                    expect(cache.get).toHaveBeenCalledWith('exp_token_<refresh token>')
                },
                undefined,
            ],
            [
                `should successfully authenticate user with session type ${SessionType.EResident}`,
                <RouteAuthParams>{ version: ActionVersion.V1, sessionTypes: [SessionType.EResident], skipJwtVerification: false },
                { [RouteHeaderRawName.TOKEN]: 'Bearer <e-resident-token>' },
                {
                    [RouteHeaderName.MOBILE_UID]: mobileUid,
                    [RouteHeaderName.APP_PARTNER_ID]: undefined,
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {
                    jest.spyOn(auth, 'validate').mockResolvedValueOnce(<VerifiedBaseTokenData<EResidentTokenData>>{
                        sessionType: SessionType.EResident,
                        refreshToken: { value: '<refresh token>' },
                        identifier: '<e-resident identifier>',
                    })
                    jest.spyOn(eventBus, 'publish').mockResolvedValueOnce(true)
                    jest.spyOn(store, 'set').mockResolvedValueOnce('OK')
                },
                (): void => {
                    expect(auth.validate).toHaveBeenCalledWith('<e-resident-token>', [SessionType.EResident], mobileUid, false)
                    expect(cache.get).toHaveBeenCalledWith('exp_token_<refresh token>')
                    expect(eventBus.publish).toHaveBeenCalledWith(InternalEvent.GatewayUserActivity, {
                        userIdentifier: '<e-resident identifier>',
                        mobileUid,
                    })
                    expect(store.set).toHaveBeenCalledWith(`user-activity.${mobileUid}`, '1', { ttl: 30_000 })
                },
                undefined,
            ],
            [
                `should successfully authenticate user with session type ${[SessionType.EResident, SessionType.EResidentApplicant]}`,
                <RouteAuthParams>{
                    version: ActionVersion.V1,
                    sessionTypes: [SessionType.EResident, SessionType.EResidentApplicant],
                    skipJwtVerification: false,
                },
                { [RouteHeaderRawName.TOKEN]: 'Bearer <e-resident-applicant-token>' },
                {
                    [RouteHeaderName.MOBILE_UID]: mobileUid,
                    [RouteHeaderName.APP_PARTNER_ID]: undefined,
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {
                    jest.spyOn(auth, 'validate').mockResolvedValueOnce(<VerifiedBaseTokenData<EResidentApplicantTokenData>>{
                        sessionType: SessionType.EResidentApplicant,
                        refreshToken: { value: '<refresh token>' },
                        identifier: '<e-resident-applicant identifier>',
                    })
                    jest.spyOn(eventBus, 'publish').mockResolvedValueOnce(true)
                    jest.spyOn(store, 'set').mockResolvedValueOnce('OK')
                },
                (): void => {
                    expect(auth.validate).toHaveBeenCalledWith(
                        '<e-resident-applicant-token>',
                        [SessionType.EResident, SessionType.EResidentApplicant],
                        mobileUid,
                        false,
                    )
                    expect(cache.get).toHaveBeenCalledWith('exp_token_<refresh token>')
                    expect(eventBus.publish).toHaveBeenCalledWith(InternalEvent.GatewayUserActivity, {
                        userIdentifier: '<e-resident-applicant identifier>',
                        mobileUid,
                    })
                    expect(store.set).toHaveBeenCalledWith(`user-activity.${mobileUid}`, '1', { ttl: 30_000 })
                },
                undefined,
            ],
            [
                `should successfully authenticate user with session type ${SessionType.CabinetUser}`,
                <RouteAuthParams>{
                    version: ActionVersion.V1,
                    sessionTypes: [SessionType.CabinetUser],
                    skipJwtVerification: false,
                    blockAccess: false,
                },
                { [RouteHeaderRawName.TOKEN]: 'Bearer <cabinet-user-token>' },
                {
                    [RouteHeaderName.MOBILE_UID]: mobileUid,
                    [RouteHeaderName.APP_PARTNER_ID]: undefined,
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {
                    jest.spyOn(auth, 'validate').mockResolvedValueOnce(<VerifiedBaseTokenData<CabinetUserTokenData>>{
                        sessionType: SessionType.CabinetUser,
                        refreshToken: { value: '<refresh token>' },
                        identifier: '<cabinet-user identifier>',
                    })
                    jest.spyOn(cache, 'get').mockResolvedValueOnce(null)
                    jest.spyOn(eventBus, 'publish').mockResolvedValueOnce(true)
                    jest.spyOn(store, 'set').mockResolvedValueOnce('OK')
                },
                (): void => {
                    expect(auth.validate).toHaveBeenCalledWith('<cabinet-user-token>', [SessionType.CabinetUser], mobileUid, false)
                    expect(cache.get).toHaveBeenCalledWith('exp_token_<refresh token>')
                    expect(eventBus.publish).toHaveBeenCalledWith(InternalEvent.GatewayUserActivity, {
                        userIdentifier: '<cabinet-user identifier>',
                        mobileUid,
                    })
                    expect(store.set).toHaveBeenCalledWith(`user-activity.${mobileUid}`, '1', { ttl: 30_000 })
                },
                undefined,
            ],
            [
                'should fail with unauthorized error in case there is no route auth params for provided version of action',
                <RouteAuthParams>{ version: ActionVersion.V1, sessionType: SessionType.User },
                {},
                {
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V2,
                },
                undefined,
                (): void => {},
                (): void => {},
                new UnauthorizedError('Unexpected action token'),
            ],
            [
                'should fail with bad request error in case there is session types in route auth params',
                <RouteAuthParams>{ version: ActionVersion.V1, sessionTypes: [] },
                {},
                {
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {},
                (): void => {},
                new BadRequestError('Unknown session type'),
            ],
            [
                'should fail with bad request error in case both attributes `sessionTypes` and `sessionType` are present in route auth params',
                <RouteAuthParams>{ version: ActionVersion.V1, sessionTypes: [SessionType.User], sessionType: SessionType.User },
                {},
                {
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {},
                (): void => {},
                new BadRequestError('Wrong session types configuration'),
            ],
            [
                'should fail with unauthorized error in case authorization header was not provided',
                <RouteAuthParams>{ version: ActionVersion.V1, sessionTypes: [SessionType.User] },
                {},
                {
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {},
                (): void => {},
                new UnauthorizedError('Empty token'),
            ],
            [
                'should fail with unauthorized error in case raw headers were not provided',
                <RouteAuthParams>{ version: ActionVersion.V1, sessionTypes: [SessionType.User] },
                null,
                {
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {},
                (): void => {},
                new UnauthorizedError('Empty token'),
            ],
            [
                'should fail with unauthorized error in case authorization header was provided but malformed',
                <RouteAuthParams>{ version: ActionVersion.V1, sessionTypes: [SessionType.User] },
                { [RouteHeaderRawName.TOKEN]: '<user-token>' },
                {
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {},
                (): void => {},
                new UnauthorizedError('Empty token'),
            ],
            [
                'should fail with unauthorized error in case authorization header was provided but with wrong auth schema',
                <RouteAuthParams>{ version: ActionVersion.V1, sessionTypes: [SessionType.User] },
                { [RouteHeaderRawName.TOKEN]: 'Base <user-token>' },
                {
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {},
                (): void => {},
                new UnauthorizedError('Empty token'),
            ],
            [
                'should fail with access denied error in case partner is not authorized in specific scope',
                <RouteAuthParams>{
                    version: ActionVersion.V1,
                    sessionType: SessionType.Partner,
                    scopes: {
                        [PartnerScopeType.payment]: <PartnerPaymentScope[]>[PartnerPaymentScope.Penalty],
                    },
                },
                { [RouteHeaderRawName.TOKEN]: undefined },
                {
                    [RouteHeaderName.MOBILE_UID]: mobileUid,
                    [RouteHeaderName.APP_PARTNER_ID]: partnerId,
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {
                    jest.spyOn(partnerService, 'getPartnerByToken').mockResolvedValueOnce({
                        scopes: {
                            [PartnerScopeType.payment]: <PartnerPaymentScope[]>[PartnerPaymentScope.Debt],
                        },
                        _id: mock(),
                    })
                },
                (): void => {
                    expect(partnerService.getPartnerByToken).toHaveBeenCalledWith(partnerId)
                },
                new AccessDeniedError(`"${PartnerPaymentScope.Penalty}" scope required`),
            ],
            [
                'should fail with unauthorized error in case user is not passed attestation',
                <RouteAuthParams>{ version: ActionVersion.V1, sessionTypes: [SessionType.User], skipJwtVerification: false },
                { [RouteHeaderRawName.TOKEN]: 'Bearer <user-token>' },
                {
                    [RouteHeaderName.MOBILE_UID]: mobileUid,
                    [RouteHeaderName.APP_PARTNER_ID]: undefined,
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {
                    jest.spyOn(auth, 'validate').mockResolvedValueOnce(<VerifiedBaseTokenData<UserTokenData>>{
                        sessionType: SessionType.User,
                        refreshToken: { value: '<refresh token>' },
                        identifier: '<user identifier>',
                    })
                    jest.spyOn(cache, 'get').mockResolvedValueOnce('false')
                },
                (): void => {
                    expect(auth.validate).toHaveBeenCalledWith('<user-token>', [SessionType.User], mobileUid, false)
                    expect(cache.get).toHaveBeenCalledWith(`attestation_${mobileUid}`)
                },
                new UnauthorizedError('Attestation is not passed', ProcessCode.AttestationNotPassed),
            ],
            [
                'should fail with unauthorized error in case user is not passed attestation due to empty mobileUid',
                <RouteAuthParams>{ version: ActionVersion.V1, sessionTypes: [SessionType.User], skipJwtVerification: false },
                { [RouteHeaderRawName.TOKEN]: 'Bearer <user-token>' },
                {
                    [RouteHeaderName.MOBILE_UID]: undefined,
                    [RouteHeaderName.APP_PARTNER_ID]: undefined,
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {
                    jest.spyOn(auth, 'validate').mockResolvedValueOnce(<VerifiedBaseTokenData<UserTokenData>>{
                        sessionType: SessionType.User,
                        refreshToken: { value: '<refresh token>' },
                        identifier: '<user identifier>',
                    })
                    jest.spyOn(cache, 'get').mockResolvedValueOnce('true')
                },
                (): void => {
                    expect(auth.validate).toHaveBeenCalledWith('<user-token>', [SessionType.User], undefined, false)
                    expect(cache.get).not.toHaveBeenCalledWith(`attestation_${mobileUid}`)
                },
                new UnauthorizedError('Attestation is not passed', ProcessCode.AttestationNotPassed),
            ],
            [
                'should fail with access denied error in case user itn is blocked',
                <RouteAuthParams>{ version: ActionVersion.V1, sessionTypes: [SessionType.User], skipJwtVerification: false },
                { [RouteHeaderRawName.TOKEN]: 'Bearer <user-token>' },
                {
                    [RouteHeaderName.MOBILE_UID]: mobileUid,
                    [RouteHeaderName.APP_PARTNER_ID]: undefined,
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {
                    jest.spyOn(auth, 'validate').mockResolvedValueOnce(<VerifiedBaseTokenData<UserTokenData>>{
                        sessionType: SessionType.User,
                        refreshToken: { value: '<refresh token>' },
                        identifier: '<user identifier>',
                        itn: '0000000000',
                    })
                    jest.spyOn(cache, 'get').mockResolvedValueOnce('true')
                },
                (): void => {
                    expect(auth.validate).toHaveBeenCalledWith('<user-token>', [SessionType.User], mobileUid, false)
                    expect(cache.get).toHaveBeenCalledWith(`attestation_${mobileUid}`)
                },
                new AccessDeniedError(),
            ],
            [
                'should fail with unauthorized error in case user refresh token is invalid',
                <RouteAuthParams>{ version: ActionVersion.V1, sessionTypes: [SessionType.User], skipJwtVerification: false },
                { [RouteHeaderRawName.TOKEN]: 'Bearer <user-token>' },
                {
                    [RouteHeaderName.MOBILE_UID]: mobileUid,
                    [RouteHeaderName.APP_PARTNER_ID]: undefined,
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {
                    jest.spyOn(auth, 'validate').mockResolvedValueOnce(<VerifiedBaseTokenData<UserTokenData>>{
                        sessionType: SessionType.User,
                        refreshToken: {},
                        identifier: '<user identifier>',
                    })
                    jest.spyOn(cache, 'get').mockResolvedValueOnce('true')
                },
                (): void => {
                    expect(auth.validate).toHaveBeenCalledWith('<user-token>', [SessionType.User], mobileUid, false)
                    expect(cache.get).toHaveBeenCalledWith(`attestation_${mobileUid}`)
                    expect(logger.error).toHaveBeenCalledWith(`${SessionType.User} refresh token not exists`, { refreshToken: {} })
                },
                new UnauthorizedError(),
            ],
            [
                'should fail with unauthorized error in case user refresh token is expired',
                <RouteAuthParams>{ version: ActionVersion.V1, sessionTypes: [SessionType.User], skipJwtVerification: false },
                { [RouteHeaderRawName.TOKEN]: 'Bearer <user-token>' },
                {
                    [RouteHeaderName.MOBILE_UID]: mobileUid,
                    [RouteHeaderName.APP_PARTNER_ID]: undefined,
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {
                    jest.spyOn(auth, 'validate').mockResolvedValueOnce(<VerifiedBaseTokenData<UserTokenData>>{
                        sessionType: SessionType.User,
                        refreshToken: { value: '<refresh token>' },
                        identifier: '<user identifier>',
                    })
                    jest.spyOn(cache, 'get').mockResolvedValueOnce('true')
                    jest.spyOn(cache, 'get').mockResolvedValueOnce('true')
                },
                (): void => {
                    expect(auth.validate).toHaveBeenCalledWith('<user-token>', [SessionType.User], mobileUid, false)
                    expect(cache.get).toHaveBeenCalledWith(`attestation_${mobileUid}`)
                    expect(logger.error).toHaveBeenCalledWith(`${SessionType.User} refresh token not exists`, {
                        refreshToken: { value: '<refresh token>' },
                    })
                },
                new UnauthorizedError(),
            ],
            [
                'should fail with access denied error in case cabinet user itn is blocked',
                <RouteAuthParams>{ version: ActionVersion.V1, sessionTypes: [SessionType.CabinetUser], skipJwtVerification: false },
                { [RouteHeaderRawName.TOKEN]: 'Bearer <cabinet-user-token>' },
                {
                    [RouteHeaderName.MOBILE_UID]: mobileUid,
                    [RouteHeaderName.APP_PARTNER_ID]: undefined,
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {
                    jest.spyOn(auth, 'validate').mockResolvedValueOnce(<VerifiedBaseTokenData<CabinetUserTokenData>>{
                        sessionType: SessionType.CabinetUser,
                        refreshToken: { value: '<refresh token>' },
                        identifier: '<cabinet user identifier>',
                        itn: '0000000000',
                    })
                    jest.spyOn(cache, 'get').mockResolvedValueOnce(null)
                },
                (): void => {
                    expect(auth.validate).toHaveBeenCalledWith('<cabinet-user-token>', [SessionType.CabinetUser], mobileUid, false)
                    expect(cache.get).toHaveBeenCalledWith('exp_token_<refresh token>')
                },
                new AccessDeniedError(),
            ],
            [
                'should not fail with error in case is not able to fetch user profile features',
                <RouteAuthParams>{
                    version: ActionVersion.V1,
                    sessionTypes: [SessionType.User],
                    skipJwtVerification: false,
                },
                { [RouteHeaderRawName.TOKEN]: 'Bearer <user-token>' },
                {
                    [RouteHeaderName.MOBILE_UID]: mobileUid,
                    [RouteHeaderName.APP_PARTNER_ID]: undefined,
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                profileFeaturesExpression,
                (): void => {
                    jest.spyOn(auth, 'validate').mockResolvedValueOnce(<VerifiedBaseTokenData<UserTokenData>>{
                        sessionType: SessionType.User,
                        refreshToken: { value: '<refresh token>' },
                        identifier: '<user identifier>',
                    })
                    jest.spyOn(cache, 'get').mockResolvedValueOnce('true')
                    jest.spyOn(store, 'get').mockResolvedValue('1')
                    jest.spyOn(eventBus, 'publish').mockResolvedValueOnce(true)
                    jest.spyOn(store, 'set').mockResolvedValueOnce('OK')
                    jest.spyOn(userService, 'getUserProfileFeatures').mockRejectedValueOnce(
                        new Error('Unable to get user profile features'),
                    )
                },
                (): void => {
                    expect(auth.validate).toHaveBeenCalledWith('<user-token>', [SessionType.User], mobileUid, false)
                    expect(cache.get).toHaveBeenCalledWith(`attestation_${mobileUid}`)
                    expect(cache.get).toHaveBeenCalledWith('exp_token_<refresh token>')
                    expect(store.get).toHaveBeenCalledWith(`user-activity.${mobileUid}`)
                    expect(logger.error).toHaveBeenCalledWith('Failed to fetch user profile features', {
                        err: new Error('Unable to get user profile features'),
                    })
                },
                undefined,
            ],
            [
                'should fail with access denied error in case user profile features mismatch',
                <RouteAuthParams>{
                    version: ActionVersion.V1,
                    sessionTypes: [SessionType.User],
                    skipJwtVerification: false,
                },
                { [RouteHeaderRawName.TOKEN]: 'Bearer <user-token>' },
                {
                    [RouteHeaderName.MOBILE_UID]: mobileUid,
                    [RouteHeaderName.APP_PARTNER_ID]: undefined,
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                profileFeaturesExpression,
                (): void => {
                    jest.spyOn(auth, 'validate').mockResolvedValueOnce(<VerifiedBaseTokenData<UserTokenData>>{
                        sessionType: SessionType.User,
                        refreshToken: { value: '<refresh token>' },
                        identifier: '<user identifier>',
                    })
                    jest.spyOn(cache, 'get').mockResolvedValueOnce('true')
                    jest.spyOn(store, 'get').mockResolvedValue('1')
                    jest.spyOn(eventBus, 'publish').mockResolvedValueOnce(true)
                    jest.spyOn(store, 'set').mockResolvedValueOnce('OK')
                    jest.spyOn(userService, 'getUserProfileFeatures').mockResolvedValueOnce({})
                    profileFeaturesExpression.match.mockReturnValueOnce(false)
                },
                (): void => {
                    expect(auth.validate).toHaveBeenCalledWith('<user-token>', [SessionType.User], mobileUid, false)
                    expect(cache.get).toHaveBeenCalledWith(`attestation_${mobileUid}`)
                    expect(cache.get).toHaveBeenCalledWith('exp_token_<refresh token>')
                    expect(store.get).toHaveBeenCalledWith(`user-activity.${mobileUid}`)
                },
                new AccessDeniedError(),
            ],
            [
                'should fail with type error in case session type in verified token is unknown',
                <RouteAuthParams>{
                    version: ActionVersion.V1,
                    sessionTypes: [SessionType.User],
                    skipJwtVerification: false,
                },
                { [RouteHeaderRawName.TOKEN]: 'Bearer <user-token>' },
                {
                    [RouteHeaderName.MOBILE_UID]: mobileUid,
                    [RouteHeaderName.APP_PARTNER_ID]: undefined,
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {
                    jest.spyOn(auth, 'validate').mockResolvedValueOnce(<VerifiedBaseTokenData<TokenData>>{
                        sessionType: <SessionType>'unknown',
                        refreshToken: { value: '<refresh token>' },
                        identifier: '<user identifier>',
                    })
                },
                (): void => {
                    expect(auth.validate).toHaveBeenCalledWith('<user-token>', [SessionType.User], mobileUid, false)
                },
                new TypeError(`Unknown session type: [unknown]`),
            ],
            [
                `should fail with access denied error in case portal user does not have permissions`,
                <RouteAuthParams>{
                    version: ActionVersion.V1,
                    sessionType: SessionType.PortalUser,
                    skipJwtVerification: false,
                    permissions: {
                        petition: [PortalUserPetitionPermissions.administrator],
                        poll: [PortalUserPollPermissions.masterAdministrator],
                    },
                },
                { [RouteHeaderRawName.TOKEN]: 'Bearer <portal-user-token>' },
                {
                    [RouteHeaderName.MOBILE_UID]: mobileUid,
                    [RouteHeaderName.APP_PARTNER_ID]: undefined,
                    [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                },
                undefined,
                (): void => {
                    jest.spyOn(auth, 'validate').mockResolvedValueOnce(<VerifiedBaseTokenData<PortalUserTokenData>>(<unknown>{
                        sessionType: SessionType.PortalUser,
                        refreshToken: { value: '<refresh token>' },
                        mobileUid,
                        permissions: {
                            petition: PortalUserPetitionPermissions.administrator,
                        },
                    }))
                    jest.spyOn(cache, 'get').mockResolvedValueOnce(null)
                },
                (): void => {
                    expect(auth.validate).toHaveBeenCalledWith('<portal-user-token>', [SessionType.PortalUser], mobileUid, false)
                    expect(cache.get).toHaveBeenCalledWith('exp_token_<refresh token>')
                },
                new AccessDeniedError(`Required permissions: [${PortalUserPollPermissions.masterAdministrator}]`),
            ],
        ])(
            '%s',
            async (
                _msg,
                authParams,
                rawHeaders,
                parsedHeaders,
                inputProfileFeaturesExpression,
                configureMocks,
                checkExpectations,
                expectedError,
            ) => {
                const route: AppRoute = {
                    method: HttpMethod.GET,
                    auth: [authParams],
                    path: '/path/to/action',
                    action: 'actionName',
                    profileFeaturesExpression: <ProfileFeatureExpression>(<unknown>inputProfileFeaturesExpression),
                }
                const req = <Request>{
                    headers: rawHeaders,
                    $params: {
                        headers: parsedHeaders,
                    },
                    method: HttpMethod.GET,
                }
                const res: Response = {
                    setHeader: jest.fn(),
                    writeHead: jest.fn(),
                    end: jest.fn(),
                }
                const next = jest.fn()

                configureMocks()

                await authenticateMiddleware.isAuthenticated(route)(req, res, next)

                checkExpectations()
                expect(next).toHaveBeenCalledWith(expectedError)
            },
        )
    })
})
