import { AppAction } from '@diia-inhouse/diia-app'

import { ActionVersion, SessionType } from '@diia-inhouse/types'

import FaqService from '@services/faq'

import { ActionResult } from '@interfaces/actions/v1/getFaq'

export default class GetEResidentFaqAction implements AppAction {
    constructor(private readonly faqService: FaqService) {}

    readonly sessionType: SessionType = SessionType.EResident

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'getEResidentFaq'

    async handler(): Promise<ActionResult> {
        return await this.faqService.getFaq(this.sessionType, {})
    }
}
