import { PartnerActionArguments } from '@diia-inhouse/types'

import { Faq } from '@interfaces/services/faq'

export interface CustomActionArguments extends PartnerActionArguments {
    params: Faq
}

export type ActionResult = Faq
