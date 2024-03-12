import { AppAction } from '@diia-inhouse/diia-app'

import { ActionVersion, SessionType } from '@diia-inhouse/types'
import { ValidationSchema } from '@diia-inhouse/validators'

import ErrorTemplateService from '@services/errorTemplate'

import { ActionResult, CustomActionArguments } from '@interfaces/actions/v1/errorTemplates/updateErrorTemplate'

export default class UpdateErrorTemplateAction implements AppAction {
    constructor(private readonly errorTemplateService: ErrorTemplateService) {}

    readonly sessionType: SessionType = SessionType.Partner

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'updateErrorTemplate'

    readonly validationRules: ValidationSchema<CustomActionArguments['params']> = {
        errorCode: { type: 'number' },
        template: {
            type: 'object',
            props: {
                description: { type: 'string' },
            },
        },
    }

    async handler(args: CustomActionArguments): Promise<ActionResult> {
        const { params: template } = args

        return await this.errorTemplateService.updateErrorTemplate(template)
    }
}
