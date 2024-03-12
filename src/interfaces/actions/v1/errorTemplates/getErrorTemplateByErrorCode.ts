import { PartnerActionArguments } from '@diia-inhouse/types'

import { ErrorTemplateResult } from '@interfaces/services/errorTemplate'

export interface CustomActionArguments extends PartnerActionArguments {
    params: {
        errorCode: number
    }
}

export type ActionResult = ErrorTemplateResult
