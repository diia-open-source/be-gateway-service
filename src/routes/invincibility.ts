import { ActionVersion, HttpMethod, SessionType } from '@diia-inhouse/types'

import { RouteHeaderRawName } from '@interfaces/index'
import { AppRoute } from '@interfaces/routes/appRoute'
import { PartnerMaintenanceScope, PartnerScopeType } from '@interfaces/routes/partner'

enum InvincibilityServiceActions {
    GetMapRegions = 'getMapRegions',
    GetInvincibilityPoints = 'getInvincibilityPoints',
    GetInvincibilityPointsWithPagination = 'getInvincibilityPointsWithPagination',
    GetInvincibilityPointDetails = 'getInvincibilityPointDetails',
    UploadInvincibilityPoints = 'uploadInvincibilityPoints',
    GetUserInitiativeRatingForm = 'getUserInitiativeRatingForm',
    ReportClosed = 'reportClosed',
}

const routes: AppRoute[] = [
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/invincibility/map/regions',
        action: InvincibilityServiceActions.GetMapRegions,
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
            tags: ['Invincibility Points'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/invincibility/map/regions/:id/points',
        action: InvincibilityServiceActions.GetInvincibilityPoints,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Invincibility Points'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/invincibility/map/regions/points',
        action: InvincibilityServiceActions.GetInvincibilityPointsWithPagination,
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
            tags: ['Invincibility Points'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/invincibility/map/points/:id',
        action: InvincibilityServiceActions.GetInvincibilityPointDetails,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Invincibility Points'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/invincibility/map/report-closed',
        action: InvincibilityServiceActions.ReportClosed,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Invincibility Points'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/invincibility/map/regions/upload',
        action: InvincibilityServiceActions.UploadInvincibilityPoints,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.maintenance]: [PartnerMaintenanceScope.Admin],
                },
            },
        ],
        metadata: {
            tags: ['Invincibility Points'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/invincibility/map/tiles/:z/:x/:y',
        proxyTo: {
            serviceId: 'map-server',
        },
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        metadata: {
            tags: ['MapServer'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/analytics/service-rating/public-service/invincibility-points/rating-form',
        action: InvincibilityServiceActions.GetUserInitiativeRatingForm,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
        ],
    },
]

export default routes
