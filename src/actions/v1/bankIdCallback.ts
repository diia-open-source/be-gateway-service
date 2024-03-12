import { AppAction } from '@diia-inhouse/diia-app'

import { ActionVersion, SessionType } from '@diia-inhouse/types'
import { ValidationSchema } from '@diia-inhouse/validators'

import { CustomActionArguments } from '@interfaces/actions/v1/bankIdCallback'

export default class BankIdCallbackAction implements AppAction {
    readonly sessionType: SessionType = SessionType.None

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'bankIdCallback'

    readonly validationRules: ValidationSchema = {
        code: { type: 'string' },
        state: { type: 'string', optional: true },
        error: { type: 'string', optional: true },
        error_description: { type: 'string', optional: true },
    }

    async handler(args: CustomActionArguments): Promise<CustomActionArguments['params']> {
        return args.params
    }
}
