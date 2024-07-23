import { ActionVersion, HttpMethod, SessionType } from '@diia-inhouse/types'

import { DEFAULT_USER_AUTH, DEFAULT_USER_HEADERS } from './defaults'

import { AppRoute } from '@interfaces/routes/appRoute'

const serviceId = 'support'

const routes: AppRoute[] = [
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/support/crm/gen-deeplink',
        proxyTo: { serviceId },
        auth: [{ sessionType: SessionType.PortalUser, version: ActionVersion.V1 }],
        headers: [],
    },

    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/user/sharing/request/:requestId',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/user/sharing/request/:requestId/confirm',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/user/sharing/request/:requestId/refuse',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
]

export default routes
