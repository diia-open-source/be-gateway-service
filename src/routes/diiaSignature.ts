import { ActionVersion, HttpMethod, SessionType } from '@diia-inhouse/types'

import { MimeType, RouteHeaderRawName } from '@interfaces/index'
import { AppRoute } from '@interfaces/routes/appRoute'

enum DiiaSignatureActions {
    SignedDataCallback = 'signedDataCallback',
    GetSignedDataReadiness = 'getSignedDataReadiness',
}

const routes: AppRoute[] = [
    {
        method: HttpMethod.POST,
        path: '/cabinet/api/:apiVersion/ds/signed-items/callback',
        action: DiiaSignatureActions.SignedDataCallback,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        headers: [{ name: RouteHeaderRawName.DOCUMENT_REQUEST_TRACE_ID, versions: [ActionVersion.V1] }],
        upload: {
            allowedMimeTypes: [MimeType.MultipartFormData],
            field: 'encodeData',
            required: false,
        },
        metadata: {
            tags: ['Diia Signature'],
            summary: 'Diia Signature signed items callback',
        },
    },
    {
        method: HttpMethod.GET,
        path: '/cabinet/api/:apiVersion/ds/signed-items/readiness',
        action: DiiaSignatureActions.GetSignedDataReadiness,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Auth Methods'],
            summary: 'Get Diia Signature Readiness State',
        },
    },
]

export default routes
