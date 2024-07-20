import { ActionVersion, HttpMethod, SessionType } from '@diia-inhouse/types'

import { RouteHeaderRawName } from '@interfaces/index'
import { AppRoute } from '@interfaces/routes/appRoute'
import { PartnerMaintenanceScope, PartnerScopeType } from '@interfaces/routes/partner'

enum AddressActions {
    GetRegions = 'getRegions',
    GetDistricts = 'getDistricts',
    GetLocations = 'getLocations',
    GetCommunities = 'getCommunities',
    GetNationalities = 'getNationalities',
    GetStreetsByAtuId = 'getStreetsByAtuId',
    SubmitPublicServiceAddress = 'submitPublicServiceAddress',

    GetNovaPoshtaCities = 'getNovaPoshtaCities',
    GetNovaPoshtaPostOffices = 'getNovaPoshtaPostOffices',

    GetPortalRegions = 'getPortalRegions',
    GetPortalCommunities = 'getPortalCommunities',

    SyncAtuDictionary = 'syncAtuDictionary',
}

const routes: AppRoute[] = [
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/address/regions',
        action: AddressActions.GetRegions,
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
            tags: ['Address'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/cabinet/api/:apiVersion/address/regions',
        action: AddressActions.GetRegions,
        auth: [{ sessionType: SessionType.CabinetUser, version: ActionVersion.V2 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Address'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/address/districts',
        action: AddressActions.GetDistricts,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Address'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/cabinet/api/:apiVersion/address/districts',
        action: AddressActions.GetDistricts,
        auth: [{ sessionType: SessionType.CabinetUser, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Address'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/address/locations',
        action: AddressActions.GetLocations,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Address'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/cabinet/api/:apiVersion/address/locations',
        action: AddressActions.GetLocations,
        auth: [{ sessionType: SessionType.CabinetUser, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Address'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/address/communities',
        action: AddressActions.GetCommunities,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Address'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/address/:publicService/:addressType',
        action: AddressActions.SubmitPublicServiceAddress,
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
            tags: ['Address'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/address/nationalities',
        action: AddressActions.GetNationalities,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Address'],
        },
    },

    {
        method: HttpMethod.GET,
        path: '/cabinet/api/:apiVersion/address/streets',
        action: AddressActions.GetStreetsByAtuId,
        auth: [{ sessionType: SessionType.CabinetUser, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Address'],
        },
    },

    // Portal
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/address/portal/regions',
        action: AddressActions.GetPortalRegions,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Address (Portal)'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/address/portal/communities',
        action: AddressActions.GetPortalCommunities,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Address (Portal)'],
        },
    },

    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/address/novaposhta/cities',
        action: AddressActions.GetNovaPoshtaCities,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Nova Poshta'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/address/novaposhta/post-offices',
        action: AddressActions.GetNovaPoshtaPostOffices,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Nova Poshta'],
        },
    },

    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/address/atu/sync',
        action: AddressActions.SyncAtuDictionary,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.maintenance]: [PartnerMaintenanceScope.Admin],
                },
            },
        ],
    },
]

export default routes
