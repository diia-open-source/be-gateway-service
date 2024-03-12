import DiiaLogger from '@diia-inhouse/diia-logger'
import TestKit, { mockClass } from '@diia-inhouse/test'

import TestAcquirerProviderResponseAction from '@actions/v1/testAcquirerProviderResponse'

import MinioStorageService from '@services/minioStorage'

import { CustomActionArguments } from '@interfaces/actions/v1/testAcquirerProviderResponse'
import { AppConfig } from '@interfaces/types/config'

const DiiaLoggerMock = mockClass(DiiaLogger)
const MinioStorageServiceMock = mockClass(MinioStorageService)

describe(`Action ${TestAcquirerProviderResponseAction.constructor.name}`, () => {
    const testKit = new TestKit()
    const logger = new DiiaLoggerMock()
    const minioStorageService = new MinioStorageServiceMock(<AppConfig>{}, logger)
    const testAcquirerProviderResponseAction = new TestAcquirerProviderResponseAction(minioStorageService, logger)

    describe('Method `handler`', () => {
        it('should return success true and empty error', async () => {
            const headers = testKit.session.getHeaders()
            const params = {
                encodeData: 'encoded-data',
                encryptedFile: Buffer.from('encrypted-file'),
                encryptedFileName: 'document.pdf',
            }
            const args: CustomActionArguments = {
                params,
                headers,
                ...params,
            }

            jest.spyOn(minioStorageService, 'uploadFile').mockResolvedValueOnce()

            expect(await testAcquirerProviderResponseAction.handler(args)).toEqual({ success: true, error: '' })
            expect(minioStorageService.uploadFile).toHaveBeenCalledWith(params.encryptedFile, params.encryptedFileName)
            expect(logger.debug).toHaveBeenLastCalledWith('Receive encrypted data from DIIA app')
        })
    })
})
