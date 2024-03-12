import { Response } from '@src/interfaces'

export function jsonResponseTransformer(res: Response, externalResponse: unknown): string {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')

    return JSON.stringify(externalResponse)
}
