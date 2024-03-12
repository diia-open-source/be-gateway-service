import { AppAction } from '@diia-inhouse/diia-app'

import { ActionVersion, SessionType } from '@diia-inhouse/types'
import { ValidationSchema } from '@diia-inhouse/validators'

import ErrorTemplateService from '@services/errorTemplate'

import { ActionResult, CustomActionArguments } from '@interfaces/actions/v1/errorTemplates/getErrorTemplatesList'

export default class GetErrorTemplatesListAction implements AppAction {
    constructor(private readonly errorTemplateService: ErrorTemplateService) {}

    readonly sessionType: SessionType = SessionType.Partner

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'getErrorTemplatesList'

    readonly validationRules: ValidationSchema = {
        skip: { type: 'number', optional: true },
        limit: { type: 'number', optional: true },
    }

    async handler(args: CustomActionArguments): Promise<ActionResult> {
        const {
            params: { skip = 0, limit = 100 },
        } = args

        return await this.errorTemplateService.getErrorTemplatesList({ skip, limit })
    }
}
