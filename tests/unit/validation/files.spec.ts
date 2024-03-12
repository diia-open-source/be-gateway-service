import { BadRequestError } from '@diia-inhouse/errors'

import { FilesValidator } from '@src/validation/files'

import { File, MimeType } from '@interfaces/index'
import { AppRoute } from '@interfaces/routes/appRoute'

describe(`${FilesValidator.name}`, () => {
    describe(`method: ${FilesValidator.validateIfFileIsEmpty.name}`, () => {
        it.each([
            [
                'should successfully pass validation in case file is required and is not empty',
                <AppRoute>{
                    upload: {
                        required: true,
                    },
                },
                {
                    buffer: Buffer.from('file-content'),
                    mimetype: MimeType.PDF,
                    originalname: 'document.pdf',
                    size: 1024,
                },
                undefined,
            ],
            ['should successfully pass validation in case file is not required and is empty', <AppRoute>{}, undefined, undefined],
            [
                'should return validation error in case provided file is empty',
                <AppRoute>{
                    upload: {
                        required: true,
                    },
                },
                undefined,
                new BadRequestError('The file is empty or exceeds file size'),
            ],
        ])('%s', (_msg: string, route: AppRoute, file?: File, expectedError?: BadRequestError) => {
            expect(FilesValidator.validateIfFileIsEmpty(route, file)()).toEqual(expectedError)
        })
    })

    describe(`method: ${FilesValidator.validateIfFileExceedsSize.name}`, () => {
        it.each([
            [
                'should successfully pass validation in case file is required and size does not exceed max allowed',
                <AppRoute>(<unknown>{
                    upload: {
                        required: true,
                        maxFileSize: 1024,
                    },
                }),
                {
                    buffer: Buffer.from('file-content'),
                    mimetype: MimeType.PDF,
                    originalname: 'document.pdf',
                    size: 1024,
                },
                undefined,
            ],
            ['should successfully pass validation in case file was not provided', <AppRoute>{}, undefined, undefined],
            [
                'should return validation error in case provided file size exceed max allowed',
                <AppRoute>(<unknown>{
                    upload: {
                        required: true,
                        maxFileSize: 512,
                    },
                }),
                {
                    buffer: Buffer.from('file-content'),
                    mimetype: MimeType.PDF,
                    originalname: 'document.pdf',
                    size: 1024,
                },
                new BadRequestError('File size exceeded', { size: 1024 }),
            ],
        ])('%s', (_msg: string, route: AppRoute, file?: File, expectedError?: BadRequestError) => {
            expect(FilesValidator.validateIfFileExceedsSize(route, file)()).toEqual(expectedError)
        })
    })

    describe(`method: ${FilesValidator.validateIfFileMimeTypeIsAllowed.name}`, () => {
        it.each([
            [
                'should successfully pass validation in case file mime type is allowed',
                <AppRoute>(<unknown>{
                    upload: {
                        required: true,
                        allowedMimeTypes: [MimeType.PDF],
                    },
                }),
                {
                    buffer: Buffer.from('file-content'),
                    mimetype: MimeType.PDF,
                    originalname: 'document.pdf',
                    size: 1024,
                },
                undefined,
            ],
            ['should successfully pass validation in case file was not provided', <AppRoute>{}, undefined, undefined],
            [
                'should return validation error in case provided file mime type is not allowed',
                <AppRoute>(<unknown>{
                    upload: {
                        required: true,
                        allowedMimeTypes: [MimeType.JPEG],
                    },
                }),
                {
                    buffer: Buffer.from('file-content'),
                    mimetype: MimeType.PDF,
                    originalname: 'document.pdf',
                    size: 1024,
                },
                new BadRequestError(`This mimetype [${MimeType.PDF}] is not allowed for this endpoint`),
            ],
        ])('%s', (_msg: string, route: AppRoute, file?: File, expectedError?: BadRequestError) => {
            expect(FilesValidator.validateIfFileMimeTypeIsAllowed(route, file)()).toEqual(expectedError)
        })
    })

    describe(`method: ${FilesValidator.validateIfFilesAreEmpty.name}`, () => {
        it.each([
            [
                'should successfully pass validation in case list of files is not empty',
                <AppRoute>{
                    upload: {
                        required: true,
                    },
                },
                [
                    {
                        buffer: Buffer.from('file-content'),
                        mimetype: MimeType.PDF,
                        originalname: 'document.pdf',
                        size: 1024,
                    },
                ],
                undefined,
            ],
            [
                'should return validation error in case empty list of files was provided',
                <AppRoute>{
                    upload: {
                        required: true,
                    },
                },
                [],
                new BadRequestError('The file is empty or exceeds file size'),
            ],
        ])('%s', (_msg: string, route: AppRoute, files: File[], expectedError?: BadRequestError) => {
            expect(FilesValidator.validateIfFilesAreEmpty(files, route)()).toEqual(expectedError)
        })
    })

    describe(`method: ${FilesValidator.validateIfOneOfFilesExceedSize.name}`, () => {
        it.each([
            [
                'should successfully pass validation in case none of files sizes from the list do not exceed max allowed',
                <AppRoute>(<unknown>{
                    upload: {
                        required: true,
                        maxFileSize: 1024,
                    },
                }),
                [
                    {
                        buffer: Buffer.from('file-content'),
                        mimetype: MimeType.PDF,
                        originalname: 'document.pdf',
                        size: 1024,
                    },
                ],
                undefined,
            ],
            [
                'should return validation error in case provided files list contains at least one file with size which exceeds max allowed',
                <AppRoute>(<unknown>{
                    upload: {
                        required: true,
                        maxFileSize: 512,
                    },
                }),
                [
                    {
                        buffer: Buffer.from('file-content'),
                        mimetype: MimeType.PDF,
                        originalname: 'document.pdf',
                        size: 1024,
                    },
                ],
                new BadRequestError('File size exceeded', { size: 1024 }),
            ],
        ])('%s', (_msg: string, route: AppRoute, files: File[], expectedError?: BadRequestError) => {
            expect(FilesValidator.validateIfOneOfFilesExceedSize(files, route)()).toEqual(expectedError)
        })
    })

    describe(`method: ${FilesValidator.validateIfFilesMimeTypeIsAllowed.name}`, () => {
        it.each([
            [
                'should successfully pass validation in case each of file from the list has allowed mime type',
                <AppRoute>(<unknown>{
                    upload: {
                        required: true,
                        allowedMimeTypes: [MimeType.PDF],
                    },
                }),
                [
                    {
                        buffer: Buffer.from('file-content'),
                        mimetype: MimeType.PDF,
                        originalname: 'document.pdf',
                        size: 1024,
                    },
                ],
                undefined,
            ],
            [
                'should return validation error in case at least one of files from the list has not allowed mime type',
                <AppRoute>(<unknown>{
                    upload: {
                        required: true,
                        allowedMimeTypes: [MimeType.JPEG],
                    },
                }),
                [
                    {
                        buffer: Buffer.from('file-content'),
                        mimetype: MimeType.PDF,
                        originalname: 'document.pdf',
                        size: 1024,
                    },
                ],
                new BadRequestError(`This mimetype [${MimeType.PDF}] is not allowed for this endpoint`),
            ],
        ])('%s', (_msg: string, route: AppRoute, files: File[], expectedError?: BadRequestError) => {
            expect(FilesValidator.validateIfFilesMimeTypeIsAllowed(files, route)()).toEqual(expectedError)
        })
    })
})
