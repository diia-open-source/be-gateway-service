import { Request, ResponseError } from '@interfaces/index'

export default class Utils {
    static calculateResponseTime(req: Request): number {
        let time = 0
        if (req.$startTime) {
            const diff: [number, number] = process.hrtime(req.$startTime)

            time = Math.round((diff[0] + diff[1] / 1e9) * 1000)
        }

        return time
    }

    static handleValidationError(err: ResponseError): void {
        if (err.name !== 'ValidationError' || !Array.isArray(err.data)) {
            return
        }

        err.data.forEach((error: { field?: string; message?: string }) => {
            if (!error.field || error.field.substr(0, 7) !== 'params.') {
                return
            }

            const fieldName: string = error.field

            // eslint-disable-next-line no-param-reassign
            error.field = error.field.substr(7)
            if (typeof error.message === 'string') {
                // eslint-disable-next-line no-param-reassign
                error.message = error.message.replace(fieldName, error.field)
            }
        })
    }

    static isErrorCode(processCode: number | undefined): boolean {
        return processCode?.toString().length === 4
    }

    static isResponseError(err: unknown): err is ResponseError {
        const isObject = typeof err === 'object' && err !== null

        return isObject && 'code' in err && 'message' in err
    }

    static isError(err: unknown): err is Error {
        return err instanceof Error
    }

    static isErrorWithCode(err: unknown): err is Error & { code: number } {
        return this.isError(err) && 'code' in err
    }
}
