import { AppAction } from '@diia-inhouse/diia-app'

import { ActionVersion, SessionType } from '@diia-inhouse/types'
import { ValidationSchema } from '@diia-inhouse/validators'

import { getFaqCategoryRule } from '@src/validationRules/faqCategory'

import FaqService from '@services/faq'

import { ActionResult, CustomActionArguments } from '@interfaces/actions/v1/faq/updateFaq'

export default class UpdateFaqAction implements AppAction {
    constructor(private readonly faqService: FaqService) {}

    readonly sessionType: SessionType = SessionType.Partner

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'updateFaq'

    readonly validationRules: ValidationSchema = {
        session: { type: 'string', enum: Object.values(SessionType) },
        categories: {
            type: 'array',
            items: getFaqCategoryRule(false),
        },
    }

    async handler(args: CustomActionArguments): Promise<ActionResult> {
        const { params: service } = args

        return await this.faqService.replaceFaq(service)
    }
}
