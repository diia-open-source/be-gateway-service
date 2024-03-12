const multerMock = {
    single: jest.fn(),
    fields: jest.fn(),
}

const multer = function (): unknown {
    return multerMock
}

multer.memoryStorage = jest.fn()

jest.mock('multer', () => multer)

import DiiaLogger from '@diia-inhouse/diia-logger'
import { EnvService } from '@diia-inhouse/env'
import { AccessDeniedError, BadRequestError, UnauthorizedError } from '@diia-inhouse/errors'
import { CacheService, RedisConfig } from '@diia-inhouse/redis'
import TestKit, { mockClass } from '@diia-inhouse/test'
import { SessionType } from '@diia-inhouse/types'

import { MimeType, ProcessCode, Request, Response } from '../../../src/interfaces'
import { AppRoute, FileSize } from '../../../src/interfaces/routes/appRoute'
import FileUploadMiddleware from '../../../src/middlewares/fileUpload'
import { validAppRoutes } from '../../mocks/middlewares/fileUpload'

const CacheServiceMock = mockClass(CacheService)
const DiiaLoggerMock = mockClass(DiiaLogger)
const EnvServiceMock = mockClass(EnvService)

describe('FileUploadMiddleware', () => {
    const logger = new DiiaLoggerMock()
    const envService = new EnvServiceMock(logger)
    const cache = new CacheServiceMock(<RedisConfig>{}, envService, logger)
    const fileUploadMiddleware = new FileUploadMiddleware(cache, logger)
    const testKit = new TestKit()

    describe('method: `uploadFile`', () => {
        it('successfully upload single file', async () => {
            const req = <Request>{
                $params: { session: testKit.session.getUserSession() },
                file: {
                    size: FileSize.KB_500,
                    mimetype: MimeType.PDF,
                    buffer: Buffer.from('file-content'),
                    originalname: 'document.pdf',
                },
            }
            const res = <Response>{}
            const next = jest.fn()
            const upload = jest.fn((_req, _res, handler) => {
                handler()
            })

            jest.spyOn(multerMock, 'single').mockReturnValue(upload)

            await fileUploadMiddleware.uploadFile(validAppRoutes.single)(req, res, next)

            expect(req.$params.body).toEqual({
                file: req.file?.buffer,
            })
            expect(next).toHaveBeenCalledWith()
        })

        it('successfully upload single file by partner', async () => {
            const req = <Request>{
                $params: {
                    session: testKit.session.getPartnerSession(),
                },
                file: {
                    size: FileSize.KB_500,
                    mimetype: MimeType.PDF,
                    buffer: Buffer.from('file-content'),
                    originalname: 'document.pdf',
                },
            }
            const res = <Response>{}
            const next = jest.fn()
            const upload = jest.fn((_req, _res, handler) => {
                handler()
            })

            jest.spyOn(multerMock, 'single').mockReturnValue(upload)

            await fileUploadMiddleware.uploadFile(validAppRoutes.single)(req, res, next)

            expect(req.$params.body).toEqual({
                file: req.file?.buffer,
            })
            expect(next).toHaveBeenCalledWith()
        })

        it('should skip upload single file in case field was not specified in route', async () => {
            const req = <Request>{
                $params: { session: testKit.session.getUserSession() },
                file: {
                    size: FileSize.KB_500,
                    mimetype: MimeType.PDF,
                    buffer: Buffer.from('file-content'),
                    originalname: 'document.pdf',
                },
            }
            const res = <Response>{}
            const next = jest.fn()
            const upload = jest.fn((_req, _res, handler) => {
                handler()
            })

            jest.spyOn(multerMock, 'single').mockReturnValue(upload)

            await fileUploadMiddleware.uploadFile({ ...validAppRoutes.single, upload: { required: true, allowedMimeTypes: [] } })(
                req,
                res,
                next,
            )

            expect(next).toHaveBeenCalledWith()
        })

        it.each([
            [
                'request without session',
                <Request>{ $params: {} },
                <AppRoute>{ ...validAppRoutes.single },
                new UnauthorizedError('Session is required for file uploading'),
                '0',
            ],
            [
                'attempts are exceeded',
                <Request>{
                    $params: { session: testKit.session.getUserSession() },
                    file: {
                        size: FileSize.KB_500,
                        mimetype: MimeType.PDF,
                        buffer: Buffer.from('file-content'),
                        originalname: 'document.pdf',
                    },
                },
                <AppRoute>{ ...validAppRoutes.single },
                new AccessDeniedError('Upload limit is exceeded', {}, ProcessCode.UploadLimitExceeded),
                '3',
            ],
            [
                'file is missing in request but is required',
                <Request>{
                    $params: { session: testKit.session.getUserSession() },
                },
                <AppRoute>{ upload: { ...validAppRoutes.single.upload, attempts: undefined } },
                new BadRequestError('The file is empty or exceeds file size'),
                '0',
            ],
            [
                'file size is exceeded',
                <Request>{
                    $params: { session: testKit.session.getUserSession() },
                    file: {
                        size: FileSize.KB_500 + 100,
                        mimetype: MimeType.PDF,
                        buffer: Buffer.from('file-content'),
                        originalname: 'document.pdf',
                    },
                },
                <AppRoute>{ ...validAppRoutes.single },
                new BadRequestError('File size exceeded', { size: FileSize.KB_500 + 100 }),
                '0',
            ],
            [
                'mimetype is not allowed',
                <Request>{
                    $params: { session: testKit.session.getUserSession() },
                    file: {
                        size: FileSize.KB_500,
                        mimetype: MimeType.PDF,
                        buffer: Buffer.from('file-content'),
                        originalname: 'document.pdf',
                    },
                },
                <AppRoute>(<unknown>{ upload: { ...validAppRoutes.single.upload, allowedMimeTypes: undefined } }),
                new BadRequestError(`This mimetype [${MimeType.PDF}] is not allowed for this endpoint`),
                '0',
            ],
        ])('should fail to upload file in case %s', async (_msg, req, appRoute, expectedError, attemptsNumber) => {
            const res = <Response>{}
            const next = jest.fn()
            const upload = jest.fn((_req, _res, handler) => {
                handler()
            })

            jest.spyOn(multerMock, 'single').mockReturnValue(upload)
            jest.spyOn(cache, 'get').mockResolvedValue(attemptsNumber)

            await fileUploadMiddleware.uploadFile(appRoute)(req, res, next)

            expect(next).toHaveBeenCalledWith(expectedError)
        })

        it('should fail to upload file in case unexpected error', async () => {
            const req = <Request>{
                $params: { session: testKit.session.getUserSession() },
                file: {
                    size: FileSize.KB_500,
                    mimetype: MimeType.PDF,
                    buffer: Buffer.from('file-content'),
                    originalname: 'document.pdf',
                },
            }
            const res = <Response>{}
            const next = jest.fn()
            const upload = jest.fn((_req, _res, handler) => {
                handler()
            })
            const allowedMimeTypes: string[] = []
            const appRoute = <AppRoute>(<unknown>{ upload: { ...validAppRoutes.single.upload, allowedMimeTypes } })
            const expectedError = new Error('Unexpected error')

            jest.spyOn(multerMock, 'single').mockReturnValue(upload)
            jest.spyOn(cache, 'get').mockResolvedValue('0')
            jest.spyOn(allowedMimeTypes, 'includes').mockImplementationOnce(() => {
                throw expectedError
            })

            await fileUploadMiddleware.uploadFile(appRoute)(req, res, next)

            expect(next).toHaveBeenCalledWith(expectedError)

            jest.spyOn(allowedMimeTypes, 'includes').mockImplementationOnce(() => {
                throw <Error>{}
            })

            await fileUploadMiddleware.uploadFile(appRoute)(req, res, next)

            expect(next).toHaveBeenCalledWith({})
        })

        it('should fail to upload file in case attempts are not supported for the provided session', async () => {
            const req = <Request>{
                $params: { session: { sessionType: SessionType.User } },
            }
            const res = <Response>{}
            const next = jest.fn()
            const upload = jest.fn((_req, _res, handler) => {
                handler()
            })
            const appRoute = <AppRoute>{ ...validAppRoutes.single }

            jest.spyOn(multerMock, 'single').mockReturnValue(upload)

            await expect(async () => {
                await fileUploadMiddleware.uploadFile(appRoute)(req, res, next)
            }).rejects.toBeInstanceOf(Error)
        })
    })

    describe('method: `uploadFiles`', () => {
        it('should successfully upload multiple files', async () => {
            const req = <Request>(<unknown>{
                $params: { session: testKit.session.getUserSession(), body: {} },
                files: {
                    file: [
                        {
                            size: FileSize.KB_500,
                            mimetype: MimeType.PDF,
                            buffer: Buffer.from('file-content'),
                            originalname: 'document.pdf',
                        },
                    ],
                },
            })
            const res = <Response>{}
            const next = jest.fn()
            const upload = jest.fn((_req, _res, handler) => {
                handler()
            })

            jest.spyOn(multerMock, 'fields').mockReturnValue(upload)

            await fileUploadMiddleware.uploadFiles(validAppRoutes.multiple)(req, res, next)

            expect(req.$params.body).toEqual(req.files)
            expect(next).toHaveBeenCalledWith()
        })

        it('should skip upload multiple files in case fields list was not specified', async () => {
            const req = <Request>(<unknown>{
                $params: { session: testKit.session.getUserSession(), body: {} },
                files: {
                    file: [
                        {
                            size: FileSize.KB_500,
                            mimetype: MimeType.PDF,
                            buffer: Buffer.from('file-content'),
                            originalname: 'document.pdf',
                        },
                    ],
                },
            })
            const res = <Response>{}
            const next = jest.fn()
            const upload = jest.fn((_req, _res, handler) => {
                handler()
            })

            jest.spyOn(multerMock, 'fields').mockReturnValue(upload)

            await fileUploadMiddleware.uploadFiles({ ...validAppRoutes.multiple, upload: { allowedMimeTypes: [], required: true } })(
                req,
                res,
                next,
            )

            expect(next).toHaveBeenCalledWith()
        })

        it.each([
            ['no files property', <Request>(<unknown>{
                    $params: { session: testKit.session.getUserSession() },
                }), <AppRoute>{ ...validAppRoutes.multiple }, new BadRequestError('The file is empty or exceeds file size')],
            ['empty files property', <Request>(<unknown>{
                    $params: { session: testKit.session.getUserSession(), files: {} },
                }), <AppRoute>{ ...validAppRoutes.multiple }, new BadRequestError('The file is empty or exceeds file size')],
            ['one of file size is exceeded', <Request>(<unknown>{
                    $params: {
                        session: testKit.session.getUserSession(),
                    },
                    files: {
                        file: [
                            {
                                size: FileSize.KB_500 + 100,
                                mimetype: MimeType.PDF,
                                buffer: Buffer.from('file-content'),
                                originalname: 'document.pdf',
                            },
                        ],
                    },
                }), <AppRoute>{ ...validAppRoutes.multiple }, new BadRequestError('File size exceeded', { size: FileSize.KB_500 + 100 })],
            ['mimetype is not allowed', <Request>(<unknown>{
                    $params: {
                        session: testKit.session.getUserSession(),
                    },
                    files: {
                        file: [
                            {
                                size: FileSize.KB_500,
                                mimetype: MimeType.JPEG,
                                buffer: Buffer.from('file-content'),
                                originalname: 'image.jpeg',
                            },
                        ],
                    },
                }), <AppRoute>{ ...validAppRoutes.multiple }, new BadRequestError(`This mimetype [${MimeType.JPEG}] is not allowed for this endpoint`)],
            ['unexpected error', <Request>(<unknown>{
                    $params: {
                        session: testKit.session.getUserSession(),
                    },
                    files: {
                        file: [
                            {
                                size: FileSize.KB_500,
                                mimetype: MimeType.PDF,
                                buffer: Buffer.from('file-content'),
                                originalname: 'document.pdf',
                            },
                        ],
                    },
                }), <AppRoute>{ ...validAppRoutes.multiple }, new TypeError('Cannot convert undefined or null to object')],
        ])('should fail to upload multiple files in case %s', async (_msg, req, appRoute, expectedError) => {
            const res = <Response>{}
            const next = jest.fn()
            const upload = jest.fn((_req, _res, handler) => {
                handler()
            })

            jest.spyOn(multerMock, 'fields').mockReturnValue(upload)

            await fileUploadMiddleware.uploadFiles(appRoute)(req, res, next)

            expect(next).toHaveBeenCalledWith(expectedError)
        })
    })
})
