import { ActionSession, SessionType } from '@diia-inhouse/types'

import { Request, ResponseError } from '@interfaces/index'

export default {
    calculateResponseTime(req: Request): number {
        let time = 0
        if (req.$startTime) {
            const diff: [number, number] = process.hrtime(req.$startTime)

            time = Math.round((diff[0] + diff[1] / 1e9) * 1000)
        }

        return time
    },

    handleValidationError(err: ResponseError): void {
        if (err.name !== 'ValidationError' || !Array.isArray(err.data)) {
            return
        }

        for (const error of err.data) {
            if (!error.field || error.field.slice(0, 7) !== 'params.') {
                continue
            }

            const fieldName: string = error.field

            // eslint-disable-next-line no-param-reassign
            error.field = error.field.slice(7)
            if (typeof error.message === 'string') {
                // eslint-disable-next-line no-param-reassign
                error.message = error.message.replace(fieldName, error.field)
            }
        }
    },

    isErrorCode(processCode: number | undefined): boolean {
        return processCode?.toString().length === 4
    },

    isResponseError(err: unknown): err is ResponseError {
        const isObject = typeof err === 'object' && err !== null

        return isObject && 'code' in err && 'message' in err
    },

    isError(err: unknown): err is Error {
        return err instanceof Error
    },

    isErrorWithCode(err: unknown): err is Error & { code: number } {
        return this.isError(err) && 'code' in err
    },

    isEResidentContext(session?: ActionSession, path?: string): boolean {
        return (
            (session && 'user' in session && [SessionType.EResident, SessionType.EResidentApplicant].includes(session.sessionType)) ||
            Boolean(path?.startsWith('/e-resident'))
        )
    },

    isCabinetUserContext(session?: ActionSession, path?: string): boolean {
        return (session && 'user' in session && session.sessionType === SessionType.CabinetUser) || Boolean(path?.startsWith('/cabinet/'))
    },
}
