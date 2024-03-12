import { Env } from '@diia-inhouse/env'
import {
    ActionVersion,
    DocumentType,
    HttpMethod,
    PartnerErrorTemplateScope,
    PartnerFaqScope,
    PartnerScopeType,
    PartnerStoreScope,
    ProfileFeature,
    SessionType,
} from '@diia-inhouse/types'

import { MimeType, RouteHeaderRawName } from '@interfaces/index'
import { ProfileFeatureExpression } from '@interfaces/profileFeature'
import { AppRoute } from '@interfaces/routes/appRoute'

const maxCountOfFiles = 5

enum GatewayActions {
    // Settings
    GetAppVersion = 'getAppVersion',
    GetAppSettings = 'getAppSettings',
    GetFaq = 'getFaq',
    // EResident Settings
    GetEResidentAppVersion = 'getEResidentAppVersion',
    GetEResidentFaq = 'getEResidentFaq',

    CreateFaq = 'createFaq',
    UpdateFaq = 'updateFaq',

    // Test endpoints
    TestAcquirerProviderResponse = 'testAcquirerProviderResponse',
    TestAcquirerProviderShareAppApp = 'testAcquirerProviderShareAppApp',
    TestAcquirerProviderEncodedData = 'testAcquirerProviderEncodedData',

    GetUserIdentifier = 'getUserIdentifier',
    UnauthorizedSimulate = 'unauthorizedSimulate',
    // Technical endpoints
    BankIdCallback = 'bankIdCallback',
    BankIdAuthCodeResult = 'bankIdAuthCodeResult',

    // Error templates
    GetErrorTemplatesList = 'getErrorTemplatesList',
    GetErrorTemplateByErrorCode = 'getErrorTemplateByErrorCode',
    CreateErrorTemplate = 'createErrorTemplate',
    UpdateErrorTemplate = 'updateErrorTemplate',

    // Store management
    BumpStoreTags = 'bumpStoreTags',
}

const routes: AppRoute[] = [
    // Settings
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/settings/version',
        action: GatewayActions.GetAppVersion,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/settings',
        action: GatewayActions.GetAppSettings,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/faq',
        action: GatewayActions.GetFaq,
        profileFeaturesExpression: ProfileFeatureExpression.mayHave([ProfileFeature.office]),
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    // EResident Settings
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/settings/version',
        action: GatewayActions.GetEResidentAppVersion,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/faq',
        action: GatewayActions.GetEResidentFaq,
        auth: [{ sessionTypes: [SessionType.EResident, SessionType.EResidentApplicant], version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/faq',
        action: GatewayActions.CreateFaq,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.faq]: [PartnerFaqScope.Create],
                },
            },
        ],
    },
    {
        method: HttpMethod.PUT,
        path: '/api/:apiVersion/faq',
        action: GatewayActions.UpdateFaq,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.faq]: [PartnerFaqScope.Update],
                },
            },
        ],
    },

    // Test endpoints
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/acquirer-provider/test',
        action: GatewayActions.TestAcquirerProviderResponse,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        upload: {
            allowedMimeTypes: [MimeType.OctetStream],
            field: 'encryptedFile',
            required: true,
        },
        forbiddenEnvs: [Env.Prod],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/acquirer-provider/share-app-app',
        action: GatewayActions.TestAcquirerProviderShareAppApp,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        upload: {
            allowedMimeTypes: [MimeType.OctetStream],
            fields: [
                { name: DocumentType.InternalPassport, maxCount: maxCountOfFiles },
                { name: DocumentType.ForeignPassport, maxCount: maxCountOfFiles },
            ],
            required: true,
            multiple: true,
        },
        forbiddenEnvs: [Env.Prod],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/acquirer-provider/share-encoded-data',
        action: GatewayActions.TestAcquirerProviderEncodedData,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        forbiddenEnvs: [Env.Prod],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/user/identifier',
        action: GatewayActions.GetUserIdentifier,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        forbiddenEnvs: [Env.Prod],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/unauthorized/simulate',
        action: GatewayActions.UnauthorizedSimulate,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        forbiddenEnvs: [Env.Prod],
    },

    // Technical endpoints
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/auth/bank-id/code/callback',
        action: GatewayActions.BankIdCallback,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        redirect: '@auth-code-result',
        metadata: {
            tags: ['Bank ID'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/auth/bank-id/auth-code-result',
        action: GatewayActions.BankIdAuthCodeResult,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Bank ID'],
        },
    },

    // Error templates
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/error-templates/:errorCode',
        action: GatewayActions.GetErrorTemplateByErrorCode,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.errorTemplate]: [PartnerErrorTemplateScope.Read],
                },
            },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/error-templates',
        action: GatewayActions.GetErrorTemplatesList,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.errorTemplate]: [PartnerErrorTemplateScope.Read],
                },
            },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/error-template',
        action: GatewayActions.CreateErrorTemplate,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.errorTemplate]: [PartnerErrorTemplateScope.Create],
                },
            },
        ],
    },
    {
        method: HttpMethod.PUT,
        path: '/api/:apiVersion/error-template',
        action: GatewayActions.UpdateErrorTemplate,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.errorTemplate]: [PartnerErrorTemplateScope.Update],
                },
            },
        ],
    },

    // Store management
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/store/bump-tags',
        action: GatewayActions.BumpStoreTags,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.store]: [PartnerStoreScope.BumpTags],
                },
            },
        ],
    },
]

export default routes
