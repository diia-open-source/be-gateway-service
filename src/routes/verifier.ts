import { ActionVersion, HttpMethod, SessionType } from '@diia-inhouse/types'

import { AppRoute } from '@interfaces/routes/appRoute'

const serviceId = 'verifier'

const routes: AppRoute[] = [
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/net/certificates',
        proxyTo: { serviceId },
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        headers: [],
    },
]

export default routes
