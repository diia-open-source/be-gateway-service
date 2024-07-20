import { AppAction } from '@diia-inhouse/diia-app'

import { ActionVersion, Logger, SessionType } from '@diia-inhouse/types'
import { ValidationSchema } from '@diia-inhouse/validators'

import MinioStorageService from '@services/minioStorage'

import { ActionResult, CustomActionArguments } from '@interfaces/actions/v1/testAcquirerProviderResponse'
import { File } from '@interfaces/index'
import { DocumentType } from '@interfaces/services/documents'

export default class TestAcquirerProviderShareAppAppAction implements AppAction {
    constructor(
        private readonly minioStorageService: MinioStorageService,
        private readonly logger: Logger,
    ) {}

    readonly sessionType: SessionType = SessionType.None

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'testAcquirerProviderShareAppApp'

    readonly validationRules: ValidationSchema = {
        [DocumentType.InternalPassport]: {
            type: 'array',
            items: {
                type: 'object',
                props: {
                    buffer: { type: 'buffer' },
                    originalname: { type: 'string' },
                },
            },
            optional: true,
        },
        [DocumentType.ForeignPassport]: {
            type: 'array',
            items: {
                type: 'object',
                props: {
                    buffer: { type: 'buffer' },
                    originalname: { type: 'string' },
                },
            },
            optional: true,
        },
        encodeData: { type: 'string' },
    }

    async handler(args: CustomActionArguments): Promise<ActionResult> {
        this.logger.debug('Receive encrypted data from DIIA app in sharing app-app flow')
        const { params = {} } = args
        const internalPassports: File[] = params[DocumentType.InternalPassport] || []
        const foreignPassports: File[] = params[DocumentType.ForeignPassport] || []
        const success = true

        await this.minioStorageService.uploadFiles([...internalPassports, ...foreignPassports])

        return { success }
    }
}
