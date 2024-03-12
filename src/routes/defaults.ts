import { ActionVersion, SessionType } from '@diia-inhouse/types'

import { RouteHeaderRawName } from '@interfaces/index'
import { CustomHeader, RouteAuthParams } from '@interfaces/routes/appRoute'

export const DEFAULT_USER_HEADERS: CustomHeader[] = [
    { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
    { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
    { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
    { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
]

export const DEFAULT_USER_AUTH: RouteAuthParams[] = [
    {
        sessionType: SessionType.User,
        version: ActionVersion.V1,
    },
]
