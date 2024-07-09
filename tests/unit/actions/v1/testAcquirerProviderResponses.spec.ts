import DiiaLogger from '@diia-inhouse/diia-logger'
import TestKit, { mockClass } from '@diia-inhouse/test'

import TestAcquirerProviderShareAppAppAction from '@actions/v1/testAcquirerProviderResponses'

import MinioStorageService from '@services/minioStorage'

import { CustomActionArguments } from '@interfaces/actions/v1/testAcquirerProviderResponse'
import { MimeType } from '@interfaces/index'
import { DocumentType } from '@interfaces/services/documents'
import { AppConfig } from '@interfaces/types/config'

const DiiaLoggerMock = mockClass(DiiaLogger)
const MinioStorageServiceMock = mockClass(MinioStorageService)

describe(`Action ${TestAcquirerProviderShareAppAppAction.constructor.name}`, () => {
    const testKit = new TestKit()
    const logger = new DiiaLoggerMock()
    const minioStorageService = new MinioStorageServiceMock(<AppConfig>{}, logger)
    const testAcquirerProviderShareAppAppAction = new TestAcquirerProviderShareAppAppAction(minioStorageService, logger)

    describe('Method `handler`', () => {
        it('should return success true', async () => {
            const headers = testKit.session.getHeaders()
            const params = {
                [DocumentType.InternalPassport]: [
                    { buffer: Buffer.from('file-content'), mimetype: MimeType.PDF, originalname: 'internalPassport.pdf' },
                ],
                [DocumentType.ForeignPassport]: [
                    { buffer: Buffer.from('file-content'), mimetype: MimeType.PDF, originalname: 'foreignPassport.pdf' },
                ],
            }
            const args = <CustomActionArguments>(<unknown>{
                params,
                headers,
            })

            jest.spyOn(minioStorageService, 'uploadFiles').mockResolvedValueOnce()

            expect(await testAcquirerProviderShareAppAppAction.handler(args)).toEqual({ success: true })
            expect(minioStorageService.uploadFiles).toHaveBeenCalledWith([
                ...params[DocumentType.InternalPassport],
                ...params[DocumentType.ForeignPassport],
            ])
            expect(logger.debug).toHaveBeenLastCalledWith('Receive encrypted data from DIIA app in sharing app-app flow')
        })

        it('should handle empty params', async () => {
            const headers = testKit.session.getHeaders()
            const params = {}
            const args = <CustomActionArguments>(<unknown>{ params, headers })

            jest.spyOn(minioStorageService, 'uploadFiles').mockResolvedValueOnce()

            expect(await testAcquirerProviderShareAppAppAction.handler(args)).toEqual({ success: true })
            expect(minioStorageService.uploadFiles).toHaveBeenCalledWith([])
        })
    })
})
