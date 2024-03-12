import { AppAction } from '@diia-inhouse/diia-app'

import { ActionVersion, SessionType } from '@diia-inhouse/types'
import { ValidationSchema } from '@diia-inhouse/validators'

import ErrorTemplateService from '@services/errorTemplate'

import { ActionResult, CustomActionArguments } from '@interfaces/actions/v1/errorTemplates/getErrorTemplateByErrorCode'

export default class GetErrorTemplateByErrorCodeAction implements AppAction {
    constructor(private readonly errorTemplateService: ErrorTemplateService) {}

    readonly sessionType: SessionType = SessionType.Partner

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'getErrorTemplateByErrorCode'

    readonly validationRules: ValidationSchema<CustomActionArguments['params']> = {
        errorCode: { type: 'number', convert: true },
    }

    async handler(args: CustomActionArguments): Promise<ActionResult> {
        const {
            params: { errorCode },
        } = args

        return await this.errorTemplateService.fetchErrorTemplateByCode(errorCode)
    }
}
