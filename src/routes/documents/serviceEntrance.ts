import { ActionVersion, HttpMethod, SessionType } from '@diia-inhouse/types'

import { RouteHeaderRawName } from '@interfaces/index'
import { AppRoute } from '@interfaces/routes/appRoute'

enum DocumentsActions {
    VerifyServiceEntranceDocument = 'verifyServiceEntranceDocument',
    VerifyServiceEntranceDocumentByData = 'verifyServiceEntranceDocumentByData',
}

const routes: AppRoute[] = [
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/:documentType/service-entrance/verify',
        action: DocumentsActions.VerifyServiceEntranceDocument,
        auth: [
            { sessionType: SessionType.ServiceEntrance, version: ActionVersion.V1 },
            { sessionType: SessionType.ServiceEntrance, version: ActionVersion.V2 },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Service Entrance'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/documents/service-entrance/verify',
        action: DocumentsActions.VerifyServiceEntranceDocumentByData,
        auth: [
            { sessionType: SessionType.ServiceEntrance, version: ActionVersion.V1 },
            { sessionType: SessionType.ServiceEntrance, version: ActionVersion.V2 },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Service Entrance'],
        },
    },
]

export default routes
