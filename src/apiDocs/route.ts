import * as path from 'path'

import * as ejs from 'ejs'
import { kebabCase, startCase } from 'lodash'

import { GenericObject, Logger } from '@diia-inhouse/types'

import OpenApiGenerator from '@src/apiDocs/openApiGenerator'

import Utils from '@utils/index'

import { Request, Response } from '@interfaces/index'
import { AppConfig } from '@interfaces/types/config'

export default class ApiDocsRoute {
    private swaggerPath: string | undefined

    constructor(
        private readonly config: AppConfig,
        private readonly openApiGenerator: OpenApiGenerator,

        private readonly logger: Logger,
    ) {
        this.swaggerPath = this.config.swagger.path
    }

    getServiceNames(): Record<string, string> {
        const services: Record<string, string> = {}

        Object.keys(this.openApiGenerator.specs).forEach((spec) => {
            services[spec] = startCase(spec)
        })

        return Object.fromEntries<string>(Object.entries<string>(services).sort())
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    getRoute() {
        return {
            path: `/${this.swaggerPath}`,
            aliases: {
                'GET /': async (_req: Request, res: Response): Promise<void> => {
                    try {
                        const defaultService: string = kebabCase('Auth')
                        const html: string = await ejs.renderFile(
                            path.join(__dirname, '..', '..', 'apiDocs', 'rapi-doc.ejs'),
                            {
                                data: {
                                    title: startCase(defaultService),
                                    docPathPrefix: this.swaggerPath,
                                    specPathPrefix: `${this.swaggerPath}/spec`,
                                    service: defaultService,
                                    services: this.getServiceNames(),
                                },
                            },
                            { async: true },
                        )

                        res.end(html)
                    } catch (err) {
                        const errorMsg = 'Failed render API Docs'

                        this.logger.error(errorMsg, { err })
                        res.end(errorMsg)
                    }
                },

                'GET /:service': async (req: Request, res: Response): Promise<void> => {
                    const serviceName = (<GenericObject>req.$params).service
                    try {
                        const html: string = await ejs.renderFile(
                            path.join(__dirname, '..', '..', 'apiDocs', 'rapi-doc.ejs'),
                            {
                                data: {
                                    title: startCase(serviceName),
                                    docPathPrefix: this.swaggerPath,
                                    specPathPrefix: `${this.swaggerPath}/spec`,
                                    service: serviceName,
                                    services: this.getServiceNames(),
                                },
                            },
                            { async: true },
                        )

                        res.end(html)
                    } catch (err) {
                        if (Utils.isError(err)) {
                            const errorMsg = `Failed to generate ${serviceName} API Docs`

                            this.logger.error(errorMsg, { err })
                            res.end(`${errorMsg}: ${err.message}`)
                        }
                    }
                },

                'GET /spec/:service': async (req: Request, res: Response): Promise<void> => {
                    const serviceName = (<GenericObject>req.$params).service
                    try {
                        const serviceSpec = this.openApiGenerator.specs[serviceName]

                        res.end(JSON.stringify(serviceSpec))
                    } catch (err) {
                        if (Utils.isError(err)) {
                            const errorMsg = `Failed to get spec for ${serviceName} API Docs`

                            this.logger.error(errorMsg, { err })

                            return res.end(`${errorMsg}: ${err.message}`)
                        }
                    }
                },
            },
            mergeParams: true,
            bodyParsers: {
                json: true,
                urlencoded: { extended: true },
            },
            authorization: true,
        }
    }
}
