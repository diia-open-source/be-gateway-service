import { ActionVersion, HttpMethod, SessionType } from '@diia-inhouse/types'

import { MimeType, RouteHeaderRawName } from '@interfaces/index'
import { AppRoute, FileSize } from '@interfaces/routes/appRoute'
import { PartnerScopeType, PartnerUploadScope } from '@interfaces/routes/file'

enum FileActions {
    DownloadFileByUuid = 'downloadFileByUuid',
    UploadPartnerFile = 'uploadPartnerFile',
    UploadUserFile = 'uploadUserFile',
    GetPartnerFileUrls = 'getPartnerFileUrls',
}

const routes: AppRoute[] = [
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/file/image/:fileUuid',
        action: FileActions.DownloadFileByUuid,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        metadata: {
            tags: ['App analytics'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/file/temporary/:fileUuid',
        action: FileActions.DownloadFileByUuid,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        metadata: {
            tags: ['App analytics'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/file/partner/image/upload',
        action: FileActions.UploadPartnerFile,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.upload]: [PartnerUploadScope.Image],
                },
            },
        ],
        upload: {
            allowedMimeTypes: [MimeType.JPEG, MimeType.PNG, MimeType.HEIF, MimeType.HEIC],
            field: 'image',
            required: true,
            maxFileSize: FileSize.MB_5,
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/file/:service/partner/image/upload',
        action: FileActions.UploadPartnerFile,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.upload]: [PartnerUploadScope.Image],
                },
            },
        ],
        upload: {
            allowedMimeTypes: [MimeType.JPEG, MimeType.PNG, MimeType.HEIF, MimeType.HEIC],
            field: 'image',
            required: true,
            maxFileSize: FileSize.MB_5,
        },
        metadata: {
            tags: ['Partner'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/file/partner/video/upload',
        action: FileActions.UploadPartnerFile,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.upload]: [PartnerUploadScope.Video],
                },
            },
        ],
        upload: {
            allowedMimeTypes: [MimeType.MP4, MimeType.OctetStream],
            field: 'video',
            required: true,
            maxFileSize: FileSize.MB_20,
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/file/user/image/upload',
        action: FileActions.UploadUserFile,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        upload: {
            allowedMimeTypes: [MimeType.JPEG, MimeType.PNG],
            field: 'image',
            required: true,
            maxFileSize: FileSize.MB_5,
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/file/:service/user/image/upload',
        action: FileActions.UploadUserFile,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        upload: {
            allowedMimeTypes: [MimeType.JPEG, MimeType.PNG],
            field: 'image',
            required: true,
            maxFileSize: FileSize.MB_5,
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/file/user/video/upload',
        action: FileActions.UploadUserFile,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        upload: {
            allowedMimeTypes: [MimeType.MP4, MimeType.OctetStream],
            field: 'video',
            required: true,
            maxFileSize: FileSize.MB_20,
            attempts: {
                periodSec: 3600,
                max: 9,
            },
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/file/partner/urls',
        action: FileActions.GetPartnerFileUrls,
        auth: [{ sessionType: SessionType.Partner, version: ActionVersion.V1 }],
    },
]

export default routes
