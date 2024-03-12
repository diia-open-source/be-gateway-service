import { AppAction } from '@diia-inhouse/diia-app'

import { ActionVersion, Logger, SessionType } from '@diia-inhouse/types'

import { ActionResult } from '@interfaces/actions/v1/testAcquirerProviderEncodedData'

export default class TestAcquirerProviderEncodedDataAction implements AppAction {
    constructor(private readonly logger: Logger) {}

    readonly sessionType: SessionType = SessionType.None

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'testAcquirerProviderEncodedData'

    async handler(): Promise<ActionResult> {
        this.logger.debug('Receive encoded data from Diia app in sign hashed files flow')

        const success = true

        return { success }
    }
}
