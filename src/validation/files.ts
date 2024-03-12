import { BadRequestError } from '@diia-inhouse/errors'

import { File } from '@interfaces/index'
import { AppRoute } from '@interfaces/routes/appRoute'
import { ValidationPredicate } from '@interfaces/validation/sandbox'

export class FilesValidator {
    static validateIfFileIsEmpty(route: AppRoute, file?: File): ValidationPredicate {
        return (): Error | undefined => {
            const files = file ? [file] : []

            return FilesValidator.areFilesEmpty(files, route)
        }
    }

    static validateIfFileExceedsSize(route: AppRoute, file?: File): ValidationPredicate {
        return (): Error | undefined => {
            const files = file ? [file] : []

            return FilesValidator.areFilesSizeExceeded(files, route)
        }
    }

    static validateIfFileMimeTypeIsAllowed(route: AppRoute, file?: File): ValidationPredicate {
        return (): Error | undefined => {
            const files = file ? [file] : []

            return FilesValidator.areFilesMimeTypeAllowed(files, route)
        }
    }

    static validateIfFilesAreEmpty(files: File[], route: AppRoute): ValidationPredicate {
        return (): Error | undefined => FilesValidator.areFilesEmpty(files, route)
    }

    static validateIfOneOfFilesExceedSize(files: File[], route: AppRoute): ValidationPredicate {
        return (): Error | undefined => FilesValidator.areFilesSizeExceeded(files, route)
    }

    static validateIfFilesMimeTypeIsAllowed(files: File[], route: AppRoute): ValidationPredicate {
        return (): Error | undefined => FilesValidator.areFilesMimeTypeAllowed(files, route)
    }

    private static areFilesEmpty(files: File[], route: AppRoute): Error | undefined {
        const { required } = route.upload || {}

        if (!files.length && required) {
            return new BadRequestError('The file is empty or exceeds file size')
        }
    }

    private static areFilesSizeExceeded(files: File[], route: AppRoute): Error | undefined {
        const { required, maxFileSize } = route.upload || {}

        for (const file of files) {
            if (required && maxFileSize && file && maxFileSize < file.size) {
                return new BadRequestError('File size exceeded', { size: file.size })
            }
        }
    }

    private static areFilesMimeTypeAllowed(files: File[], route: AppRoute): Error | undefined {
        const { allowedMimeTypes = [] } = route.upload || {}

        for (const file of files) {
            if (file && !allowedMimeTypes.includes(file.mimetype)) {
                return new BadRequestError(`This mimetype [${file.mimetype}] is not allowed for this endpoint`)
            }
        }
    }
}
