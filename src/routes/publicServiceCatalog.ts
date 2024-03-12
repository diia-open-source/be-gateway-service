import { ActionVersion, HttpMethod, PartnerPublicServiceScope, PartnerScopeType, ProfileFeature, SessionType } from '@diia-inhouse/types'

import { RouteHeaderRawName } from '@interfaces/index'
import { ProfileFeatureExpression } from '@interfaces/profileFeature'
import { AppRoute } from '@interfaces/routes/appRoute'

enum PublicServiceCatalogActions {
    CreatePublicService = 'createPublicService',
    CreatePublicServiceCategory = 'createPublicServiceCategory',
    GetPublicServiceByCode = 'getPublicServiceByCode',
    GetPublicServiceCategoriesList = 'getPublicServiceCategoriesList',
    GetPublicServiceCategoryByCategory = 'getPublicServiceCategoryByCategory',
    GetPublicServices = 'getPublicServices',
    GetPublicServicesList = 'getPublicServicesList',
    UpdatePublicService = 'updatePublicService',
    UpdatePublicServiceCategory = 'updatePublicServiceCategory',
}

const serviceId = 'public-service-catalog'
const isStandalonePublicServiceCatalogEnabled = process.env.PUBLIC_SERVICES_STANDALONE_PUBLIC_SERVICE_CATALOG_IS_ENABLED === 'true'

const routes: AppRoute[] = [
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service',
        action: PublicServiceCatalogActions.CreatePublicService,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.publicService]: [PartnerPublicServiceScope.Create],
                },
            },
        ],
        metadata: { tags: ['Public Service'] },
        ...(isStandalonePublicServiceCatalogEnabled ? { proxyTo: { serviceId } } : {}),
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service-category',
        action: PublicServiceCatalogActions.CreatePublicServiceCategory,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.publicService]: [PartnerPublicServiceScope.Create],
                },
            },
        ],
        metadata: { tags: ['Public Service Category'] },
        ...(isStandalonePublicServiceCatalogEnabled ? { proxyTo: { serviceId } } : {}),
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-services/:code',
        action: PublicServiceCatalogActions.GetPublicServiceByCode,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.publicService]: [PartnerPublicServiceScope.Read],
                },
            },
        ],
        metadata: { tags: ['Public Service'] },
        ...(isStandalonePublicServiceCatalogEnabled ? { proxyTo: { serviceId } } : {}),
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service-categories',
        action: PublicServiceCatalogActions.GetPublicServiceCategoriesList,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.publicService]: [PartnerPublicServiceScope.Read],
                },
            },
        ],
        metadata: { tags: ['Public Service Category'] },
        ...(isStandalonePublicServiceCatalogEnabled ? { proxyTo: { serviceId } } : {}),
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service-categories/:category',
        action: PublicServiceCatalogActions.GetPublicServiceCategoryByCategory,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.publicService]: [PartnerPublicServiceScope.Read],
                },
            },
        ],
        metadata: { tags: ['Public Service Category'] },
        ...(isStandalonePublicServiceCatalogEnabled ? { proxyTo: { serviceId } } : {}),
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/catalog',
        action: PublicServiceCatalogActions.GetPublicServices,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V3 }],
        profileFeaturesExpression: ProfileFeatureExpression.mayHave([ProfileFeature.office]),
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V3] },
        ],
        metadata: { tags: ['Public service catalog'] },
        ...(isStandalonePublicServiceCatalogEnabled ? { proxyTo: { serviceId } } : {}),
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/public-service/catalog',
        action: PublicServiceCatalogActions.GetPublicServices,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V3 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V3] },
        ],
        metadata: { tags: ['Public service catalog'] },
        ...(isStandalonePublicServiceCatalogEnabled ? { proxyTo: { serviceId } } : {}),
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-services',
        action: PublicServiceCatalogActions.GetPublicServicesList,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.publicService]: [PartnerPublicServiceScope.Read],
                },
            },
        ],
        metadata: { tags: ['Public Service'] },
        ...(isStandalonePublicServiceCatalogEnabled ? { proxyTo: { serviceId } } : {}),
    },
    {
        method: HttpMethod.PUT,
        path: '/api/:apiVersion/public-service',
        action: PublicServiceCatalogActions.UpdatePublicService,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.publicService]: [PartnerPublicServiceScope.Update],
                },
            },
        ],
        metadata: { tags: ['Public Service'] },
        ...(isStandalonePublicServiceCatalogEnabled ? { proxyTo: { serviceId } } : {}),
    },
    {
        method: HttpMethod.PUT,
        path: '/api/:apiVersion/public-service-category',
        action: PublicServiceCatalogActions.UpdatePublicServiceCategory,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.publicService]: [PartnerPublicServiceScope.Update],
                },
            },
        ],
        metadata: { tags: ['Public Service Category'] },
        ...(isStandalonePublicServiceCatalogEnabled ? { proxyTo: { serviceId } } : {}),
    },
]

export default routes
