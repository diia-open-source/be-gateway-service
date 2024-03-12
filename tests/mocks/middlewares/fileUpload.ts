import { MimeType } from '@interfaces/index'
import { AppRoute, FileSize } from '@interfaces/routes/appRoute'

export const validAppRoutes = {
    single: <AppRoute>{
        upload: {
            allowedMimeTypes: [MimeType.PDF],
            required: true,
            field: 'file',
            maxFileSize: FileSize.KB_500,
            attempts: { max: 2, periodSec: 10 },
        },
    },
    multiple: <AppRoute>{
        upload: {
            allowedMimeTypes: [MimeType.PDF],
            required: true,
            fields: [{ name: 'file1', maxCount: 1 }, { name: 'file2' }],
            maxFileSize: FileSize.KB_500,
            attempts: { max: 2, periodSec: 10 },
        },
    },
}
