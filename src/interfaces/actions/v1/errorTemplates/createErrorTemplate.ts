import { PartnerActionArguments } from '@diia-inhouse/types'

import { ErrorTemplate } from '@interfaces/models/errorTemplate'

export interface CustomActionArguments extends PartnerActionArguments {
    params: ErrorTemplate
}

export type ActionResult = ErrorTemplate
