import { Env } from '@diia-inhouse/env'
import { ActionVersion, HttpMethod, SessionType } from '@diia-inhouse/types'

import { RouteHeaderRawName } from '@interfaces/index'
import { AppRoute } from '@interfaces/routes/appRoute'

enum AuthActions {
    GetBanks = 'getBanks',
    AuthUrl = 'authUrl',
    CreateBankIdAuthUrl = 'createBankIdAuthUrl',
    GetAuthMethods = 'getAuthMethods',
    VerifyAuthMethod = 'verifyAuthMethod',
    getFldConfig = 'getFldConfig',

    GetToken = 'getToken',
    GetEResidentToken = 'getEResidentToken',
    GetCabinetToken = 'getCabinetToken',
    CabinetTokenLogout = 'cabinetTokenLogout',
    RefreshEResidentToken = 'refreshEResidentToken',
    RefreshEResidentApplicantToken = 'refreshEResidentApplicantToken',
    TokenEResidentLogout = 'tokenEResidentLogout',
    VerifyDiiaIdAuthByAction = 'verifyDiiaIdAuthByAction',
    TestGetToken = 'testGetToken',
    RefreshToken = 'refreshToken',
    CabinetRefreshToken = 'cabinetRefreshToken',
    TokenLogout = 'tokenLogout',
    ProlongRefreshToken = 'prolongRefreshToken',
    ProlongSession = 'prolongSession',

    AcquirerLogin = 'acquirerLogin',

    ServiceEntranceLogin = 'serviceEntranceLogin',
    ServiceEntranceLogout = 'serviceEntranceLogout',
    RefreshServiceEntranceToken = 'refreshServiceEntranceToken',

    PartnerLogin = 'partnerLogin',
    PartnerAcquirerLogin = 'partnerAcquirerLogin',

    GetTemporaryToken = 'getTemporaryToken',
    InvalidateTemporaryToken = 'invalidateTemporaryToken',
    InvalidateTemporaryTokenFromHeaders = 'invalidateTemporaryTokenFromHeaders',
    GetNfcToken = 'getNfcToken',

    GetAttestationNonce = 'getAttestationNonce',
    ValidateAttestation = 'validateAttestation',

    ValidateChannelUuid = 'validateChannelUuid',

    GetUserSessions = 'getUserSessions',
    GetUserSessionById = 'getUserSessionById',
    GetUserSessionsDeleteConfirmation = 'getUserSessionsDeleteConfirmation',
    DeleteUserSessions = 'deleteUserSessions',

    GetPortalUserToken = 'getPortalUserToken',

    RequestServiceUserTwoFactorQrCode = 'requestServiceUserTwoFactorQrCode',
    GetServiceUserToken = 'getServiceUserToken',
    RefreshServiceUserToken = 'refreshServiceUserToken',
}

const routes: AppRoute[] = [
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/auth/banks',
        action: AuthActions.GetBanks,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Bank ID'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/auth/:target/auth-url',
        action: AuthActions.AuthUrl,
        auth: [
            { sessionType: SessionType.None, version: ActionVersion.V1 },
            { sessionType: SessionType.None, version: ActionVersion.V2 },
            { sessionTypes: [SessionType.None, SessionType.User], skipJwtVerification: true, version: ActionVersion.V3 },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1, ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Auth URL'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/auth/:target/auth-url',
        action: AuthActions.AuthUrl,
        auth: [
            {
                sessionTypes: [SessionType.None, SessionType.EResident, SessionType.EResidentApplicant],
                skipJwtVerification: true,
                version: ActionVersion.V3,
            },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V3] },
        ],
        metadata: {
            tags: ['Auth URL'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/auth/bank-id/:bankId/auth-url',
        action: AuthActions.CreateBankIdAuthUrl,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Auth URL'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/cabinet/api/:apiVersion/auth/:target/auth-url',
        action: AuthActions.AuthUrl,
        auth: [{ sessionTypes: [SessionType.None, SessionType.CabinetUser], skipJwtVerification: true, version: ActionVersion.V3 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V3] },
        ],
        metadata: {
            tags: ['Auth URL'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/auth/:code/methods',
        action: AuthActions.GetAuthMethods,
        auth: [{ sessionTypes: [SessionType.None, SessionType.User], skipJwtVerification: true, version: ActionVersion.V3 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V3] },
        ],
        metadata: {
            tags: ['Auth Methods'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/auth/:code/methods',
        action: AuthActions.GetAuthMethods,
        auth: [
            {
                sessionTypes: [SessionType.None, SessionType.EResident, SessionType.EResidentApplicant],
                skipJwtVerification: true,
                version: ActionVersion.V3,
            },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V3] },
        ],
        metadata: {
            tags: ['Auth Methods'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/cabinet/api/:apiVersion/auth/:code/methods',
        action: AuthActions.GetAuthMethods,
        auth: [{ sessionTypes: [SessionType.None, SessionType.CabinetUser], skipJwtVerification: true, version: ActionVersion.V3 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V3] },
        ],
        metadata: {
            tags: ['Auth Methods'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/auth/:method/:requestId/verify',
        action: AuthActions.VerifyAuthMethod,
        auth: [{ sessionTypes: [SessionType.None, SessionType.User], skipJwtVerification: true, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V3] },
        ],
        metadata: {
            tags: ['Auth Methods'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/e-resident/api/:apiVersion/auth/:method/:requestId/verify',
        action: AuthActions.VerifyAuthMethod,
        auth: [
            {
                sessionTypes: [SessionType.None, SessionType.EResident, SessionType.EResidentApplicant],
                skipJwtVerification: true,
                version: ActionVersion.V1,
            },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Auth Methods'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/cabinet/api/:apiVersion/auth/:method/:requestId/verify',
        action: AuthActions.VerifyAuthMethod,
        auth: [{ sessionTypes: [SessionType.None, SessionType.CabinetUser], skipJwtVerification: true, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Auth Methods'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/auth/photoid/fld',
        action: AuthActions.getFldConfig,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Auth URL'],
        },
    },

    // Token
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/auth/:target/:requestId/token',
        action: AuthActions.GetToken,
        auth: [
            { sessionType: SessionType.None, version: ActionVersion.V1 },
            { sessionType: SessionType.None, version: ActionVersion.V2 },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Token'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/auth/token',
        action: AuthActions.GetToken,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V3 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V3] },
        ],
        metadata: {
            tags: ['Token'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/auth/token',
        action: AuthActions.GetEResidentToken,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V3 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V3] },
        ],
        metadata: {
            tags: ['Token'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/cabinet/api/:apiVersion/auth/token',
        action: AuthActions.GetCabinetToken,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Token'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/auth/diia-id/:target/:requestId/identifier',
        action: AuthActions.VerifyDiiaIdAuthByAction,
        auth: [
            { sessionType: SessionType.User, version: ActionVersion.V1 },
            { sessionType: SessionType.User, version: ActionVersion.V2 },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Token'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/auth/test/:requestId/token',
        action: AuthActions.TestGetToken,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        forbiddenEnvs: [Env.Prod],
        metadata: {
            tags: ['Token'],
            summary: 'Returns token to use across the app for test provider (do not use in production)',
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/auth/token/refresh',
        action: AuthActions.RefreshToken,
        auth: [
            { sessionType: SessionType.None, version: ActionVersion.V1 },
            { sessionType: SessionType.None, version: ActionVersion.V2 },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Token'],
        },
    },
    {
        method: HttpMethod.POST,
        path: 'cabinet/api/:apiVersion/auth/token/refresh',
        action: AuthActions.CabinetRefreshToken,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Token'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/auth/token/logout',
        action: AuthActions.TokenLogout,
        auth: [
            { sessionType: SessionType.None, version: ActionVersion.V1 },
            { sessionType: SessionType.None, version: ActionVersion.V2 },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Token'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/auth/temporary/token',
        action: AuthActions.GetTemporaryToken,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['NFC'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/e-resident/api/:apiVersion/auth/token/refresh',
        action: AuthActions.RefreshEResidentToken,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V2 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Token'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/e-resident/api/:apiVersion/auth/token/logout',
        action: AuthActions.TokenEResidentLogout,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V2 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Token'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/cabinet/api/:apiVersion/auth/token/logout',
        action: AuthActions.CabinetTokenLogout,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Token'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/auth/:target/:requestId/prolong',
        action: AuthActions.ProlongRefreshToken,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Token'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/auth/prolong',
        action: AuthActions.ProlongSession,
        auth: [{ sessionType: SessionType.User, skipJwtVerification: true, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Token'],
        },
    },

    // Acquirer
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/auth/acquirer/:token',
        action: AuthActions.AcquirerLogin,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Acquirer'],
        },
    },

    // Service entrance
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/auth/acquirer/branch/offer/:otp/token',
        action: AuthActions.ServiceEntranceLogin,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Service Entrance'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/auth/acquirer/branch/offer/token/refresh',
        action: AuthActions.RefreshServiceEntranceToken,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Service Entrance'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/auth/acquirer/branch/offer/token/logout',
        action: AuthActions.ServiceEntranceLogout,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Service Entrance'],
        },
    },

    // Partner
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/auth/partner/:token',
        action: AuthActions.PartnerLogin,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Partner'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/auth/partner',
        action: AuthActions.PartnerLogin,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V2 }],
        metadata: {
            tags: ['Partner'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/auth/partner/acquirer/:acquirerId',
        action: AuthActions.PartnerAcquirerLogin,
        auth: [{ sessionType: SessionType.Partner, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Partner'],
        },
    },

    // Openid-connect
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/auth/openid-connect/token',
        proxyTo: {
            serviceId: 'diia-oauth',
            path: 'http://diia-oauth-http:8181/auth/realms/diia/protocol/openid-connect/token',
        },
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Openid-connect'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/auth/openid-connect/userinfo',
        proxyTo: {
            serviceId: 'diia-oauth',
            path: 'http://diia-oauth-http:8181/auth/realms/diia/protocol/openid-connect/userinfo',
            proxyHeaders: [RouteHeaderRawName.TOKEN, RouteHeaderRawName.CERT],
        },
        headers: [{ name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] }],
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Openid-connect'],
        },
    },

    // NFC Flow
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/auth/temporary/token',
        action: AuthActions.GetTemporaryToken,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['NFC'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/auth/temporary/token/invalidate',
        action: AuthActions.InvalidateTemporaryToken,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        metadata: {
            tags: ['NFC'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/auth/temporary/token/invalidate',
        action: AuthActions.InvalidateTemporaryTokenFromHeaders,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        headers: [{ name: RouteHeaderRawName.TICKET, versions: [ActionVersion.V1] }],
        metadata: {
            tags: ['NFC'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/auth/nfc/token',
        action: AuthActions.GetNfcToken,
        auth: [{ sessionType: SessionType.Temporary, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['NFC'],
        },
    },

    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/auth/attestation/nonce',
        action: AuthActions.GetAttestationNonce,
        auth: [
            { sessionType: SessionType.User, version: ActionVersion.V1 },
            { sessionType: SessionType.User, version: ActionVersion.V2 },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/auth/attestation',
        action: AuthActions.ValidateAttestation,
        auth: [
            { sessionType: SessionType.User, version: ActionVersion.V1 },
            { sessionType: SessionType.User, version: ActionVersion.V2 },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/auth/sse/validate',
        action: AuthActions.ValidateChannelUuid,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.CHANNEL_UUID, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['SSE'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/auth/user/sessions',
        action: AuthActions.GetUserSessions,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Sessions'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/auth/user/sessions',
        action: AuthActions.GetUserSessions,
        auth: [{ sessionTypes: [SessionType.EResident, SessionType.EResidentApplicant], version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Sessions'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/auth/user/session/:id',
        action: AuthActions.GetUserSessionById,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Sessions'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/auth/user/session/:id',
        action: AuthActions.GetUserSessionById,
        auth: [{ sessionTypes: [SessionType.EResident, SessionType.EResidentApplicant], version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Sessions'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/auth/user/sessions/delete/confirmation',
        action: AuthActions.GetUserSessionsDeleteConfirmation,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Sessions'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/auth/user/sessions/delete/confirmation',
        action: AuthActions.GetUserSessionsDeleteConfirmation,
        auth: [{ sessionTypes: [SessionType.EResident, SessionType.EResidentApplicant], version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Sessions'],
        },
    },
    {
        method: HttpMethod.DELETE,
        path: '/api/:apiVersion/auth/user/sessions',
        action: AuthActions.DeleteUserSessions,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Sessions'],
        },
    },
    {
        method: HttpMethod.DELETE,
        path: '/e-resident/api/:apiVersion/auth/user/sessions',
        action: AuthActions.DeleteUserSessions,
        auth: [{ sessionTypes: [SessionType.EResident, SessionType.EResidentApplicant], version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Sessions'],
        },
    },

    // Portal
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/auth/portal/token',
        action: AuthActions.GetPortalUserToken,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
    },

    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/auth/service-user/2fa',
        action: AuthActions.RequestServiceUserTwoFactorQrCode,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/auth/service-user/token',
        action: AuthActions.GetServiceUserToken,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/auth/service-user/token/refresh',
        action: AuthActions.RefreshServiceUserToken,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        headers: [{ name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] }],
    },
]

export default routes
