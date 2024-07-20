import { ActionVersion, HttpMethod, SessionType } from '@diia-inhouse/types'

import { RouteHeaderRawName } from '@interfaces/index'
import { AppRoute } from '@interfaces/routes/appRoute'

enum DocumentsActions {
    ShareInternalPassport = 'shareInternalPassport',
    VerifyInternalPassport = 'verifyInternalPassport',
}

const routes: AppRoute[] = [
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/internal-passport/:documentId/share',
        action: DocumentsActions.ShareInternalPassport,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Share Document'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/internal-passport/verify',
        action: DocumentsActions.VerifyInternalPassport,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1, blockAccess: false }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Verify Document'],
        },
    },
]

export default routes
