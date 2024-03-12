import { HttpMethod } from '@diia-inhouse/types'

import { DEFAULT_USER_AUTH, DEFAULT_USER_HEADERS } from '@src/routes/defaults'

import { AppRoute } from '@interfaces/routes/appRoute'

const serviceId = 'feed'

const routes: AppRoute[] = [
    {
        method: HttpMethod.GET,
        path: '/api/v1/feed',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.GET,
        path: '/api/v1/feed/news/screen',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.GET,
        path: '/api/v1/feed/news',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.GET,
        path: '/api/v1/feed/news/:id',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
]

export default routes
