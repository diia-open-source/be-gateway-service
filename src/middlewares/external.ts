import { ExternalCommunicator } from '@diia-inhouse/diia-queue'
import { Logger } from '@diia-inhouse/types'
import { utils } from '@diia-inhouse/utils'

import { jsonResponseTransformer } from '@utils/transformers'

import { ExternalAlias } from '@interfaces/index'
import { Middleware } from '@interfaces/middlewares'

export default class ExternalMiddleware {
    constructor(
        private readonly logger: Logger,
        private readonly external: ExternalCommunicator,
    ) {}

    addRedirect(externalAlias: ExternalAlias): Middleware {
        const { event } = externalAlias

        return async (req, res, next) => {
            this.logger.info(`Performing external call event ${event}`)
            try {
                const externalResponse = await this.external.receiveDirect(event, req.$params)

                const responseTransformer = externalAlias.responseTransformer ?? jsonResponseTransformer

                res.end(responseTransformer(res, externalResponse))
            } catch (e) {
                await utils.handleError(e, (err) => {
                    next(err)
                })
            }
        }
    }
}
