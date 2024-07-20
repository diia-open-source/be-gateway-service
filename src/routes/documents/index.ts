import { ActionVersion, HttpMethod, ProfileFeature, SessionType } from '@diia-inhouse/types'

import { RouteHeaderRawName } from '@interfaces/index'
import { ProfileFeatureExpression } from '@interfaces/profileFeature'
import { AppRoute } from '@interfaces/routes/appRoute'

enum DocumentsActions {
    GetDocuments = 'getDocuments',

    ShareDocument = 'shareDocument',

    VerifyDocument = 'verifyDocument',
    GetVerifyDocument = 'getVerifyDocument',

    DownloadDocument = 'downloadDocument',

    GetManualDocumentsList = 'getManualDocumentsList',

    GetDocument = 'getDocument',
    AddDocument = 'addDocument',
    DeleteDocument = 'deleteDocument',
}

const routes: AppRoute[] = [
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents',
        action: DocumentsActions.GetDocuments,
        auth: [
            { sessionType: SessionType.User, version: ActionVersion.V1 },
            { sessionType: SessionType.User, version: ActionVersion.V2 },
            { sessionType: SessionType.User, version: ActionVersion.V3 },
            { sessionType: SessionType.User, version: ActionVersion.V4 },
        ],
        headers: [
            {
                name: RouteHeaderRawName.MOBILE_UID,
                versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3, ActionVersion.V4],
            },
            {
                name: RouteHeaderRawName.APP_VERSION,
                versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3, ActionVersion.V4],
            },
            {
                name: RouteHeaderRawName.PLATFORM_TYPE,
                versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3, ActionVersion.V4],
            },
            {
                name: RouteHeaderRawName.PLATFORM_VERSION,
                versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3, ActionVersion.V4],
            },
            {
                name: RouteHeaderRawName.TOKEN,
                versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3, ActionVersion.V4],
            },
        ],
        metadata: {
            tags: ['Get Documents'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents',
        action: DocumentsActions.GetDocuments,
        auth: [
            { sessionType: SessionType.User, version: ActionVersion.V5 },
            { sessionType: SessionType.User, version: ActionVersion.V6 },
        ],
        profileFeaturesExpression: ProfileFeatureExpression.mayHave([ProfileFeature.office]),
        headers: [
            {
                name: RouteHeaderRawName.MOBILE_UID,
                versions: [ActionVersion.V5, ActionVersion.V6],
            },
            {
                name: RouteHeaderRawName.APP_VERSION,
                versions: [ActionVersion.V5, ActionVersion.V6],
            },
            {
                name: RouteHeaderRawName.PLATFORM_TYPE,
                versions: [ActionVersion.V5, ActionVersion.V6],
            },
            {
                name: RouteHeaderRawName.PLATFORM_VERSION,
                versions: [ActionVersion.V5, ActionVersion.V6],
            },
            {
                name: RouteHeaderRawName.TOKEN,
                versions: [ActionVersion.V5, ActionVersion.V6],
            },
        ],
        metadata: {
            tags: ['Get Documents'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/documents',
        action: DocumentsActions.GetDocuments,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V7 }],
        profileFeaturesExpression: ProfileFeatureExpression.mayHave([ProfileFeature.office]),
        headers: [
            {
                name: RouteHeaderRawName.MOBILE_UID,
                versions: [ActionVersion.V7],
            },
            {
                name: RouteHeaderRawName.APP_VERSION,
                versions: [ActionVersion.V7],
            },
            {
                name: RouteHeaderRawName.PLATFORM_TYPE,
                versions: [ActionVersion.V7],
            },
            {
                name: RouteHeaderRawName.PLATFORM_VERSION,
                versions: [ActionVersion.V7],
            },
            {
                name: RouteHeaderRawName.TOKEN,
                versions: [ActionVersion.V7],
            },
        ],
        metadata: {
            tags: ['Get Documents'],
        },
    },

    // Share document
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/:documentType/:documentId/share',
        action: DocumentsActions.ShareDocument,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V2 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Share Document'],
        },
    },

    // Verify document
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/documents/verify',
        action: DocumentsActions.VerifyDocument,
        auth: [
            { sessionType: SessionType.User, version: ActionVersion.V1, blockAccess: false },
            { sessionType: SessionType.User, version: ActionVersion.V2, blockAccess: false },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Verify Document'],
            summary: 'Verify Document',
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/:documentType/verify',
        action: DocumentsActions.GetVerifyDocument,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V2, blockAccess: false }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Verify Document'],
        },
    },

    // Download
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/:documentType/:documentId/download',
        action: DocumentsActions.DownloadDocument,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Download Document'],
        },
    },

    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/manual',
        action: DocumentsActions.GetManualDocumentsList,
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
        path: '/api/:apiVersion/documents/:documentType/:documentId',
        action: DocumentsActions.GetDocument,
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
            tags: ['CRUD'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/documents/:documentType',
        action: DocumentsActions.AddDocument,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['CRUD'],
        },
    },
    {
        method: HttpMethod.DELETE,
        path: '/api/:apiVersion/documents/:documentType/:documentId',
        action: DocumentsActions.DeleteDocument,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['CRUD'],
        },
    },
    {
        method: HttpMethod.DELETE,
        path: '/api/:apiVersion/user/documents/:documentType/:documentId',
        action: DocumentsActions.DeleteDocument,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            deprecated: true,
        },
    },
]

export default routes
