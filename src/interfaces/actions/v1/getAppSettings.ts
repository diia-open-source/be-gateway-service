import { AppUserActionHeaders, ServiceActionArguments } from '@diia-inhouse/types'

import { AppSettings } from '@interfaces/services/settings'

export type CustomActionArguments = ServiceActionArguments<AppUserActionHeaders>

export type ActionResult = AppSettings
