import multer from 'multer'

import { AccessDeniedError, BadRequestError, UnauthorizedError } from '@diia-inhouse/errors'
import { CacheService } from '@diia-inhouse/redis'
import { ActionSession, Logger } from '@diia-inhouse/types'

import { FilesValidator } from '@src/validation/files'
import { ValidationSandBox } from '@src/validation/sandbox'

import Utils from '@utils/index'

import { ProcessCode, Request, Response } from '@interfaces/index'
import { FileUploadHandler, FilesUploadHandler } from '@interfaces/middlewares'
import { AppRoute, UploadAttempts } from '@interfaces/routes/appRoute'

const storage: multer.StorageEngine = multer.memoryStorage()

// multer package has no proper exported interface
const upload: multer.Multer = multer({
    storage,
})

export default class FileUploadMiddleware {
    constructor(
        private readonly cache: CacheService,
        private readonly logger: Logger,
    ) {}

    uploadFile(route: AppRoute): FileUploadHandler {
        return async (req: Request, res: Response, next: (err?: Error | unknown) => void): Promise<void> => {
            const { field, attempts } = route.upload || {}
            if (!field) {
                return next()
            }

            if (!req.$params?.session) {
                return next(new UnauthorizedError('Session is required for file uploading'))
            }

            const areAttemptsExceeded = await this.areAttemptsExceeded(req.$params.session, attempts)
            if (areAttemptsExceeded) {
                return next(new AccessDeniedError('Upload limit is exceeded', {}, ProcessCode.UploadLimitExceeded))
            }

            const handler: () => void = (): void => {
                try {
                    const isFileEmpty = ValidationSandBox.build(FilesValidator.validateIfFileIsEmpty(route, req.file))
                    const isFileSizeExceeded = ValidationSandBox.build(FilesValidator.validateIfFileExceedsSize(route, req.file))
                    const isFileMimeTypeAllowed = ValidationSandBox.build(FilesValidator.validateIfFileMimeTypeIsAllowed(route, req.file))
                    const fileValidator = isFileEmpty.next(isFileSizeExceeded.next(isFileMimeTypeAllowed))

                    const err = fileValidator.validate()

                    if (err) {
                        this.logger.error(err.message, { err })

                        return next(err)
                    }

                    req.$params.body = Object.assign({ [field]: req.file?.buffer }, { ...req.body })

                    next()
                } catch (err_) {
                    if (Utils.isError(err_)) {
                        const err = new BadRequestError(err_.message)

                        this.logger.error(err_.message, { err })

                        return next(err)
                    }

                    return next(err_)
                }
            }

            const uploadSingleFile = upload.single(field)

            uploadSingleFile(<never>req, <never>res, handler)
        }
    }

    uploadFiles(route: AppRoute): FilesUploadHandler {
        return (req: Request, res: Response, next: (err?: Error | unknown) => void): void => {
            const { fields } = route.upload || {}
            if (!fields) {
                return next()
            }

            const handler: () => void = (): void => {
                try {
                    const files = Object.values(req.files || {}).flat()

                    const areFilesEmpty = ValidationSandBox.build(FilesValidator.validateIfFilesAreEmpty(files, route))
                    const isOneOfFilesSizeExceeded = ValidationSandBox.build(FilesValidator.validateIfOneOfFilesExceedSize(files, route))
                    const areFilesMimeTypeAllowed = ValidationSandBox.build(FilesValidator.validateIfFilesMimeTypeIsAllowed(files, route))

                    const filesValidator = areFilesEmpty.next(isOneOfFilesSizeExceeded.next(areFilesMimeTypeAllowed))

                    const err = filesValidator.validate()
                    if (err) {
                        this.logger.error(err.message, { err })

                        return next(err)
                    }

                    req.$params.body = Object.assign(req.$params.body, { ...req.body }, req.files || {})

                    next()
                } catch (err) {
                    if (Utils.isError(err)) {
                        this.logger.error(err.message, { err })
                    }

                    return next(err)
                }
            }

            const uploadMultipleFiles = upload.fields(fields)

            uploadMultipleFiles(<never>req, <never>res, handler)
        }
    }

    private async areAttemptsExceeded(session: ActionSession, attempts: UploadAttempts | undefined): Promise<boolean> {
        if (!attempts) {
            return false
        }

        const id = this.getAttemptIdentiifer(session)
        const key = `upload_attempts_${id}`
        const value = await this.cache.get(key)
        const count = value ? Number.parseInt(value, 10) + 1 : 1

        const { periodSec, max } = attempts
        if (count > max) {
            return true
        }

        await this.cache.set(key, count, periodSec)

        return false
    }

    private getAttemptIdentiifer(session: ActionSession): string {
        if ('user' in session) {
            const {
                user: { identifier: userIdentifier },
            } = session

            return userIdentifier
        }

        if ('partner' in session) {
            const {
                partner: { _id: id },
            } = session

            return id.toString()
        }

        throw new Error('Attempts are not supported for the provided session')
    }
}
