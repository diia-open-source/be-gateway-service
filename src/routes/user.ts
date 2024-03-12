import { Env } from '@diia-inhouse/env'
import { ActionVersion, HttpMethod, ProfileFeature, SessionType } from '@diia-inhouse/types'

import { DEFAULT_USER_AUTH, DEFAULT_USER_HEADERS } from '@src/routes/defaults'

import { RouteHeaderRawName } from '@interfaces/index'
import { ProfileFeatureExpression } from '@interfaces/profileFeature'
import { AppRoute } from '@interfaces/routes/appRoute'

enum UserActions {
    Subscribe = 'subscribe',
    Unsubscribe = 'unsubscribe',
    GetSubscriptions = 'getSubscriptions',
    AddSubscription = 'addSubscription',
    RemoveSubscription = 'removeSubscription',
    SaveDocumentTypesOrder = 'saveDocumentTypesOrder',
    SaveDocumentsOrderByDocumentType = 'saveDocumentsOrderByDocumentType',
    GetDocumentsTypeOrder = 'getDocumentsTypeOrder',
    StartSendingMessageNotifications = 'startSendingMessageNotifications',
    StartSendingSilentPushes = 'startSendingSilentPushes',
    GetFeatures = 'getFeatures',

    // Diia ID
    CheckDiiaIdIdentifierAvailability = 'checkDiiaIdIdentifierAvailability',
    CreateDiiaIdIdentifier = 'createDiiaIdIdentifier',
    CreateDiiaIdIdentifiers = 'createDiiaIdIdentifiers',
    GetDiiaIdIdentifier = 'getDiiaIdIdentifier',
    GetDiiaIdIdentifiers = 'getDiiaIdIdentifiers',
    GetDiiaIdSigningHistory = 'getDiiaIdSigningHistory',
    DeleteDiiaIdIdentifier = 'deleteDiiaIdIdentifier',

    GetCabinetUserInfo = 'getCabinetUserInfo',
    GetUserInfo = 'getUserInfo',

    CreateOtp = 'createOtp',
    VerifyOtp = 'verifyOtp',

    GetHistoryScreen = 'getHistoryScreen',
    GetHistoryByAction = 'getHistoryByAction',
    GetHistoryItemById = 'getHistoryItemById',

    GetSessionHistoryScreen = 'getSessionHistoryScreen',
    GetSessionHistoryItemById = 'getSessionHistoryItemById',

    GetEResidentFeatures = 'getEResidentFeatures',
    GetEResidentHistoryByAction = 'getEResidentHistoryByAction',

    UpdateUserSettings = 'updateUserSettings',
    GetMyInfo = 'getMyInfo',
    GetFamily = 'getFamily',
    GetActRecords = 'getActRecords',
    GetUserBirthRecord = 'getUserBirthRecord',
    HideActRecord = 'hideActRecord',
    UnhideActRecords = 'unhideActRecords',
}

const serviceId = 'user'

const routes: AppRoute[] = [
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/user/subscription/:subscriptionType/documents/subscribe',
        action: UserActions.Subscribe,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/user/subscription/:subscriptionType/documents/unsubscribe',
        action: UserActions.Unsubscribe,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/user/subscriptions',
        action: UserActions.GetSubscriptions,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/user/subscription/:code',
        action: UserActions.AddSubscription,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.DELETE,
        path: '/api/:apiVersion/user/subscription/:code',
        action: UserActions.RemoveSubscription,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/user/settings/documents/order',
        action: UserActions.SaveDocumentTypesOrder,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/user/settings/documents/order',
        action: UserActions.SaveDocumentTypesOrder,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V2 }],
        profileFeaturesExpression: ProfileFeatureExpression.mayHave([ProfileFeature.office]),
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/user/settings/documents/:documentType/order',
        action: UserActions.SaveDocumentsOrderByDocumentType,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/user/settings/documents/:documentType/order',
        action: UserActions.SaveDocumentsOrderByDocumentType,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V2 }],
        profileFeaturesExpression: ProfileFeatureExpression.mayHave([ProfileFeature.office]),
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/user/settings/documents/order',
        action: UserActions.GetDocumentsTypeOrder,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/user/settings/documents/order',
        action: UserActions.GetDocumentsTypeOrder,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V2 }],
        profileFeaturesExpression: ProfileFeatureExpression.mayHave([ProfileFeature.office]),
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/e-resident/api/:apiVersion/user/settings/documents/order',
        action: UserActions.SaveDocumentTypesOrder,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/e-resident/api/:apiVersion/user/settings/documents/:documentType/order',
        action: UserActions.SaveDocumentsOrderByDocumentType,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/user/settings/documents/order',
        action: UserActions.GetDocumentsTypeOrder,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/user/mass-push-mailing',
        action: UserActions.StartSendingMessageNotifications,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        forbiddenEnvs: [Env.Prod],
        metadata: {
            tags: ['Mass Push Mailing'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/user/silent-mass-push-mailing',
        action: UserActions.StartSendingSilentPushes,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        forbiddenEnvs: [Env.Prod],
        metadata: {
            tags: ['Mass Push Mailing'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/user/features',
        action: UserActions.GetFeatures,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Onboarding'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/user/features',
        action: UserActions.GetEResidentFeatures,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['E-resident Onboarding'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/user/diia-id/identifier/availability',
        action: UserActions.CheckDiiaIdIdentifierAvailability,
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
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/user/diia-id/identifier/availability',
        action: UserActions.CheckDiiaIdIdentifierAvailability,
        auth: [
            { sessionType: SessionType.EResident, version: ActionVersion.V1 },
            { sessionType: SessionType.EResident, version: ActionVersion.V2 },
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
        path: '/e-resident/api/:apiVersion/user/diia-id/identifier',
        action: UserActions.CreateDiiaIdIdentifier,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V2 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/e-resident/api/:apiVersion/user/diia-id/identifiers',
        action: UserActions.CreateDiiaIdIdentifiers,
        auth: [
            { sessionType: SessionType.EResident, version: ActionVersion.V1 },
            { sessionType: SessionType.EResident, version: ActionVersion.V2 },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/user/diia-id/identifier',
        action: UserActions.GetDiiaIdIdentifier,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V2 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/user/diia-id/identifiers',
        action: UserActions.GetDiiaIdIdentifiers,
        auth: [
            { sessionType: SessionType.EResident, version: ActionVersion.V1 },
            { sessionType: SessionType.EResident, version: ActionVersion.V2 },
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
        path: '/api/:apiVersion/user/diia-id/identifier',
        action: UserActions.CreateDiiaIdIdentifier,
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
        path: '/api/:apiVersion/user/diia-id/identifiers',
        action: UserActions.CreateDiiaIdIdentifiers,
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
        method: HttpMethod.GET,
        path: '/api/:apiVersion/user/diia-id/identifier',
        action: UserActions.GetDiiaIdIdentifier,
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
        method: HttpMethod.GET,
        path: '/api/:apiVersion/user/diia-id/identifiers',
        action: UserActions.GetDiiaIdIdentifiers,
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
        method: HttpMethod.DELETE,
        path: '/api/:apiVersion/user/diia-id/identifier',
        action: UserActions.DeleteDiiaIdIdentifier,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.DELETE,
        path: '/e-resident/api/:apiVersion/user/diia-id/identifier',
        action: UserActions.DeleteDiiaIdIdentifier,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/user/diia-id/signing-history',
        action: UserActions.GetDiiaIdSigningHistory,
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
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/user/diia-id/signing-history',
        action: UserActions.GetDiiaIdSigningHistory,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V2 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/user/info',
        action: UserActions.GetUserInfo,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Profile'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/cabinet/api/:apiVersion/user/info',
        action: UserActions.GetCabinetUserInfo,
        auth: [{ sessionType: SessionType.CabinetUser, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Profile'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/user/otp',
        action: UserActions.CreateOtp,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/user/otp/verify',
        action: UserActions.VerifyOtp,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/user/history/screen',
        action: UserActions.GetHistoryScreen,
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
        method: HttpMethod.GET,
        path: '/api/:apiVersion/user/history/:action',
        action: UserActions.GetHistoryByAction,
        auth: [
            { sessionType: SessionType.User, version: ActionVersion.V1 },
            { sessionType: SessionType.User, version: ActionVersion.V2 },
            { sessionType: SessionType.User, version: ActionVersion.V3 },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/user/history/:actionCode/item/:itemId',
        action: UserActions.GetHistoryItemById,
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
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/user/history/:action',
        action: UserActions.GetEResidentHistoryByAction,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/user/history/session/:sessionId/screen',
        action: UserActions.GetSessionHistoryScreen,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/user/history/session/:sessionId/:actionCode/item/:itemId',
        action: UserActions.GetSessionHistoryItemById,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/user/settings',
        action: UserActions.UpdateUserSettings,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        proxyTo: { serviceId },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/my-info',
        action: UserActions.GetMyInfo,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        proxyTo: { serviceId },
        metadata: {
            tags: ['My Info'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/my-info/family',
        action: UserActions.GetFamily,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        proxyTo: { serviceId },
        metadata: {
            tags: ['My Info'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/my-info/act-records/:recordType',
        action: UserActions.GetActRecords,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        proxyTo: { serviceId },
        metadata: {
            tags: ['My Info'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/my-info/user-birth-record',
        action: UserActions.GetUserBirthRecord,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        proxyTo: { serviceId },
        metadata: {
            tags: ['My Info'],
        },
    },
    {
        method: HttpMethod.PUT,
        path: '/api/:apiVersion/my-info/act-records/hide/:recordType/:id',
        action: UserActions.HideActRecord,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        proxyTo: { serviceId },
        metadata: {
            tags: ['My Info'],
        },
    },
    {
        method: HttpMethod.PUT,
        path: '/api/:apiVersion/my-info/act-records/unhide/:recordType',
        action: UserActions.UnhideActRecords,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        proxyTo: { serviceId },
        metadata: {
            tags: ['My Info'],
        },
    },
]

export default routes
