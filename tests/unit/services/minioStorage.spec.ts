const clientMocked = {
    Client: jest.fn().mockReturnValue({
        putObject: jest.fn(),
        bucketExists: jest.fn(),
        makeBucket: jest.fn(),
    }),
}

jest.mock('minio', () => clientMocked)

import MinioStorageService from '@src/services/minioStorage'

import { logger } from '@mocks/index'

import { File } from '@interfaces/index'
import { AppConfig } from '@interfaces/types/config'

describe('MinioStorageService', () => {
    const config: AppConfig = <AppConfig>(<unknown>{
        minio: {
            isEnabled: true,
            host: 'localhost',
            port: 9000,
            accessKey: '',
            secretKey: '',
        },
    })

    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('method: `uploadFile`', () => {
        it('should not upload file if minio is disabled in config', async () => {
            const buffer = Buffer.from('test content')
            const filename = 'test.txt'
            const disabledConfig = <AppConfig>(<unknown>{
                minio: { ...config.minio, isEnabled: false },
            })
            const minioStorageService = new MinioStorageService(disabledConfig, logger)
            const bucketExistsMock = jest.fn()
            const putObjectMock = jest.fn()

            clientMocked.Client.mockReturnValueOnce({
                bucketExists: bucketExistsMock,
                putObject: putObjectMock,
            })

            await minioStorageService.uploadFile(buffer, filename)

            expect(bucketExistsMock).not.toHaveBeenCalled()
            expect(putObjectMock).not.toHaveBeenCalled()
        })

        it('should upload a file', async () => {
            const buffer = Buffer.from('test content')
            const filename = 'test.txt'
            const bucketExistsMock = jest.fn().mockReturnValueOnce(true)
            const putObjectMock = jest.fn().mockResolvedValue({ etag: '123456' })

            clientMocked.Client.mockReturnValueOnce({
                bucketExists: bucketExistsMock,
                putObject: putObjectMock,
            })

            const minioStorageService = new MinioStorageService(config, logger)

            await minioStorageService.uploadFile(buffer, filename)

            expect(bucketExistsMock).toHaveBeenCalledTimes(1)
            expect(putObjectMock).toHaveBeenCalledWith('demo', filename, buffer, expect.any(Object))
            expect(logger.info).toHaveBeenCalledWith('File [test.txt] uploaded successfully', { etag: '123456' })
        })

        it('should create bucket', async () => {
            const buffer = Buffer.from('test content')
            const filename = 'test.txt'
            const bucketExistsMock = jest.fn().mockReturnValueOnce(false)
            const putObjectMock = jest.fn().mockResolvedValue({ etag: '123456' })
            const makeBucketMock = jest.fn()

            clientMocked.Client.mockReturnValueOnce({
                bucketExists: bucketExistsMock,
                putObject: putObjectMock,
                makeBucket: makeBucketMock,
            })

            const minioStorageService = new MinioStorageService(config, logger)

            await minioStorageService.uploadFile(buffer, filename)

            expect(bucketExistsMock).toHaveBeenCalledTimes(1)
            expect(makeBucketMock).toHaveBeenCalledTimes(1)
            expect(putObjectMock).toHaveBeenCalledWith('demo', filename, buffer, expect.any(Object))
            expect(logger.info).toHaveBeenCalledWith('File [test.txt] uploaded successfully', { etag: '123456' })
        })

        it('should throw error if cannot create bucket', async () => {
            const buffer = Buffer.from('test content')
            const filename = 'test.txt'
            const mockedError = new Error('Mocked error')
            const bucketExistsMock = jest.fn().mockReturnValueOnce(false)
            const putObjectMock = jest.fn()
            const makeBucketMock = jest.fn().mockRejectedValueOnce(mockedError)

            clientMocked.Client.mockReturnValueOnce({
                bucketExists: bucketExistsMock,
                putObject: putObjectMock,
                makeBucket: makeBucketMock,
            })

            const minioStorageService = new MinioStorageService(config, logger)

            await expect(minioStorageService.uploadFile(buffer, filename)).rejects.toThrow(mockedError)

            expect(logger.error).toHaveBeenCalledWith(`Failed to create bucket [demo]`, { err: mockedError })
        })

        it('should catch error and log it', async () => {
            const buffer = Buffer.from('test content')
            const filename = 'test.txt'
            const bucketExistsMock = jest.fn().mockReturnValueOnce(true)
            const expectedError = new Error()
            const putObjectMock = jest.fn().mockRejectedValueOnce(expectedError)

            clientMocked.Client.mockReturnValueOnce({
                bucketExists: bucketExistsMock,
                putObject: putObjectMock,
            })

            const minioStorageService = new MinioStorageService(config, logger)

            await expect(() => minioStorageService.uploadFile(buffer, filename)).rejects.toStrictEqual(expectedError)

            expect(logger.error).toHaveBeenCalledWith(`Failed to upload file [${filename}]`, { err: expectedError })
        })
    })

    describe('method: `uploadFiles`', () => {
        it('should upload multiple files', async () => {
            const files: File[] = [
                <File>{ buffer: Buffer.from('test content 1'), originalname: 'test1.txt' },
                <File>{ buffer: Buffer.from('test content 2'), originalname: 'test2.txt' },
            ]
            const minioStorageService = new MinioStorageService(config, logger)

            jest.spyOn(minioStorageService, 'uploadFile').mockResolvedValue()

            await minioStorageService.uploadFiles(files)

            expect(minioStorageService.uploadFile).toHaveBeenCalledTimes(2)
            expect(minioStorageService.uploadFile).toHaveBeenNthCalledWith(1, files[0].buffer, files[0].originalname)
            expect(minioStorageService.uploadFile).toHaveBeenNthCalledWith(2, files[1].buffer, files[1].originalname)
        })

        it('should call nothing', async () => {
            const disabledConfig = Object.assign(config)

            disabledConfig.minio.isEnabled = false
            const minioStorageService = new MinioStorageService(disabledConfig, logger)

            const spied = jest.spyOn(minioStorageService, 'uploadFile').mockResolvedValue()

            await minioStorageService.uploadFiles([])

            expect(spied).not.toHaveBeenCalled()
        })
    })
})
