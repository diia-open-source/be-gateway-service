import { AppAction } from '@diia-inhouse/diia-app'

import { ActionVersion, Logger, SessionType } from '@diia-inhouse/types'
import { ValidationSchema } from '@diia-inhouse/validators'

import { CustomActionArguments } from '@interfaces/actions/v1/bankIdAuthCodeResult'

export default class BankIdAuthCodeResultAction implements AppAction {
    constructor(private readonly logger: Logger) {}

    readonly sessionType: SessionType = SessionType.None

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'bankIdAuthCodeResult'

    readonly validationRules: ValidationSchema = {
        code: { type: 'string' },
        state: { type: 'string', optional: true },
        error: { type: 'string', optional: true },
        error_description: { type: 'string', optional: true },
    }

    async handler(args: CustomActionArguments): Promise<Record<string, unknown>> {
        this.logger.debug('Received auth code result data', args.params)

        return {}
    }
}
