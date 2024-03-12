import { AppAction } from '@diia-inhouse/diia-app'

import { ActionVersion, Logger, SessionType } from '@diia-inhouse/types'
import { ValidationSchema } from '@diia-inhouse/validators'

import MinioStorageService from '@services/minioStorage'

import { ActionResult, CustomActionArguments } from '@interfaces/actions/v1/testAcquirerProviderResponse'

export default class TestAcquirerProviderResponseAction implements AppAction {
    constructor(
        private readonly minioStorageService: MinioStorageService,

        private readonly logger: Logger,
    ) {}

    readonly sessionType: SessionType = SessionType.None

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'testAcquirerProviderResponse'

    readonly validationRules: ValidationSchema = {
        encryptedFile: { type: 'buffer' },
        encryptedFileName: { type: 'string' },
        encodeData: { type: 'string' },
    }

    async handler(args: CustomActionArguments): Promise<ActionResult> {
        this.logger.debug('Receive encrypted data from DIIA app')
        const { encryptedFile, encryptedFileName } = args.params || {}

        // const success: boolean = !!Math.round(Math.random());
        const success = true
        let error = ''
        if (!success) {
            error = 'some error'
        }

        await this.minioStorageService.uploadFile(encryptedFile, encryptedFileName)

        return { success, error }
    }
}
