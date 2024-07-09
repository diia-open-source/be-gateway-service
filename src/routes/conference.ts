import { ActionVersion, HttpMethod, SessionType } from '@diia-inhouse/types'

import { RouteHeaderRawName } from '@src/interfaces'
import { DEFAULT_USER_AUTH, DEFAULT_USER_HEADERS } from '@src/routes/defaults'

import { AppRoute } from '@interfaces/routes/appRoute'

const routes: AppRoute[] = [
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/conference',
        proxyTo: {
            serviceId: 'conference-service',
        },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: {
            tags: ['Conference'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/conference/:conferenceId',
        proxyTo: {
            serviceId: 'conference-service',
        },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: {
            tags: ['Conference'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/conferences',
        proxyTo: {
            serviceId: 'conference-service',
        },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: {
            tags: ['Conference'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/conference/join',
        proxyTo: {
            serviceId: 'conference-service',
        },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: {
            tags: ['Conference'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/conference/join',
        proxyTo: {
            serviceId: 'conference-service',
        },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: {
            tags: ['Conference'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/conference/webex/webhook',
        proxyTo: {
            serviceId: 'conference-service',
            proxyHeaders: [RouteHeaderRawName.WEBEX_WEBHOOK_SIGNATURE],
        },
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        headers: [{ name: RouteHeaderRawName.WEBEX_WEBHOOK_SIGNATURE, versions: [ActionVersion.V1] }],
        metadata: {
            tags: ['Conference'],
        },
        preserveRawBody: true,
    },
]

export default routes
