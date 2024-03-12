import { AppAction } from '@diia-inhouse/diia-app'

import { ActionVersion, SessionType } from '@diia-inhouse/types'
import { ValidationSchema } from '@diia-inhouse/validators'

import { getFaqCategoryRule } from '@src/validationRules/faqCategory'

import FaqService from '@services/faq'

import { ActionResult, CustomActionArguments } from '@interfaces/actions/v1/faq/createFaq'

export default class CreateFaqAction implements AppAction {
    constructor(private readonly faqService: FaqService) {}

    readonly sessionType: SessionType = SessionType.Partner

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'createFaq'

    readonly validationRules: ValidationSchema = {
        session: { type: 'string', enum: Object.values(SessionType) },
        categories: {
            type: 'array',
            items: getFaqCategoryRule(),
        },
    }

    async handler(args: CustomActionArguments): Promise<ActionResult> {
        const { params: faq } = args

        return await this.faqService.createFaq(faq)
    }
}
