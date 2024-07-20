/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */

import { AsyncLocalStorage } from 'node:async_hooks'
import { randomUUID } from 'node:crypto'
import path from 'node:path'

import { globSync } from 'glob'
import { upperFirst } from 'lodash'

import { Env } from '@diia-inhouse/env'
import { ActHeaders, ActionVersion, AlsData, Logger } from '@diia-inhouse/types'

import AuthenticateMiddleware from '@src/middlewares/authenticate'
import ExternalMiddleware from '@src/middlewares/external'
import FileMiddleware from '@src/middlewares/fileUpload'
import HeaderMiddleware from '@src/middlewares/header'
import MultipartMiddleware from '@src/middlewares/multipart'
import ProxyMiddleware from '@src/middlewares/proxy'
import RedirectMiddleware from '@src/middlewares/redirect'

import { Request, RequestParams, Response, RouteHeaderRawName } from '@interfaces/index'
import { Middleware, MiddlewareNext } from '@interfaces/middlewares'
import { ExternalEvent } from '@interfaces/queue'
import { BuildRoutesResult } from '@interfaces/routes'
import { AppRoute, RouteAuthParams } from '@interfaces/routes/appRoute'

export default class RoutesBuilder {
    readonly routeByExternalEventMap: Map<ExternalEvent, AppRoute> = new Map()

    readonly servicesRoutes: Record<string, AppRoute[]>

    constructor(
        private readonly authenticateMiddleware: AuthenticateMiddleware,
        private readonly headerMiddleware: HeaderMiddleware,
        private readonly fileUploadMiddleware: FileMiddleware,
        private readonly multipartMiddleware: MultipartMiddleware,
        private readonly redirectMiddleware: RedirectMiddleware,
        private readonly externalMiddleware: ExternalMiddleware,
        private readonly proxyMiddleware: ProxyMiddleware,
        private readonly logger: Logger,
        private readonly asyncLocalStorage: AsyncLocalStorage<AlsData>,
    ) {
        this.servicesRoutes = this.loadServicesRoutes('dist/routes/**/*.js')
    }

    buildRoutes(): BuildRoutesResult {
        const result: BuildRoutesResult = { aliases: {}, preserveRawBodyIn: [] }

        for (const service of Object.keys(this.servicesRoutes)) {
            for (const route of this.servicesRoutes[service]) {
                if (route.forbiddenEnvs?.includes(<Env>process.env.NODE_ENV)) {
                    continue
                }

                if (route.externalEvent) {
                    this.routeByExternalEventMap.set(route.externalEvent, route)
                }

                const versions: RouteAuthParams[] = route.auth
                for (const authRouteVersion of versions) {
                    const middlewares: unknown[] = []

                    middlewares.push(this.setServiceNameMiddleware(service), this.initParams.bind(this))
                    this.addHeadersMiddlewares(route, middlewares)
                    middlewares.push(this.authenticateMiddleware.isAuthenticated(route), this.multipartMiddleware.parse)

                    if (route.upload) {
                        if (route.upload?.multiple) {
                            middlewares.push(this.fileUploadMiddleware.uploadFiles(route))
                        } else {
                            middlewares.push(this.fileUploadMiddleware.uploadFile(route))
                        }
                    }

                    middlewares.push(this.mergeParamsMiddleware(route))

                    if (route.redirect) {
                        middlewares.push(this.redirectMiddleware.addRedirect(route.redirect))
                    }

                    const routeVersion: string = authRouteVersion.version
                    const versionedPath: string = route.path.replace(':apiVersion', routeVersion)

                    if (route.proxyTo) {
                        middlewares.push(this.proxyMiddleware.addRedirect(route.proxyTo))
                    } else {
                        if (route.externalAlias) {
                            middlewares.push(this.externalMiddleware.addRedirect(route.externalAlias))
                        } else {
                            middlewares.push(`${service}.${route.action}.${routeVersion}`)
                        }
                    }

                    const alias = `${route.method} ${versionedPath}`
                    if (route.preserveRawBody) {
                        result.preserveRawBodyIn.push(alias)
                    }

                    result.aliases[alias] = middlewares
                }
            }
        }

        return result
    }

    private loadServicesRoutes(rootPath: string): Record<string, AppRoute[]> {
        const routes = globSync(rootPath)

        // eslint-disable-next-line unicorn/no-array-reduce
        return routes.reduce(
            (acc, relativeFilePath) => {
                const absoluteFilePath = path.resolve(relativeFilePath)

                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const loadedRoutesFromFile = require(absoluteFilePath).default
                const { dir: serviceDirectory, name: fileNameWithoutExtension } = path.parse(relativeFilePath)
                const serviceName = serviceDirectory.split(path.sep)[2]
                const upperFirstServiceName = upperFirst(serviceName || fileNameWithoutExtension)

                return {
                    ...acc,
                    ...(loadedRoutesFromFile &&
                        Array.isArray(loadedRoutesFromFile) &&
                        loadedRoutesFromFile.length > 0 && {
                            [upperFirstServiceName]: [...(acc[upperFirstServiceName] || []), ...loadedRoutesFromFile],
                        }),
                }
            },
            <Record<string, AppRoute[]>>{},
        )
    }

    private addHeadersMiddlewares(route: AppRoute, middlewares: unknown[]): void {
        middlewares.push(this.headerMiddleware.setAcceptLanguageHeader)

        if (!route.headers || route.headers.length === 0) {
            return
        }

        for (const header of route.headers) {
            switch (header.name) {
                case RouteHeaderRawName.MOBILE_UID: {
                    middlewares.push(this.headerMiddleware.addMobileUidHeader(header))
                    break
                }
                case RouteHeaderRawName.TOKEN: {
                    middlewares.push(this.headerMiddleware.addTokenHeader())
                    break
                }
                case RouteHeaderRawName.APP_VERSION: {
                    middlewares.push(this.headerMiddleware.addAppVersionHeader(header))
                    break
                }
                case RouteHeaderRawName.PLATFORM_TYPE: {
                    middlewares.push(this.headerMiddleware.addPlatformTypeHeader(header))
                    break
                }
                case RouteHeaderRawName.PLATFORM_VERSION: {
                    middlewares.push(this.headerMiddleware.addPlatformVersionHeader(header))
                    break
                }
                case RouteHeaderRawName.TICKET: {
                    middlewares.push(this.headerMiddleware.addTicketHeader(header))
                    break
                }
                case RouteHeaderRawName.CHANNEL_UUID: {
                    middlewares.push(this.headerMiddleware.addChannelUuidHeader(header))
                    break
                }
                case RouteHeaderRawName.APP_PARTNER_ID: {
                    middlewares.push(this.headerMiddleware.addDiiaPartnerIdHeader(header))
                    break
                }
                case RouteHeaderRawName.DOCUMENT_REQUEST_TRACE_ID: {
                    middlewares.push(this.headerMiddleware.addDocumentRequestTraceIdHeader(header))
                    break
                }
                default: {
                    this.logger.debug(`Header [${header.name}] middleware not implemented`)
                }
            }
        }
    }

    private setServiceNameMiddleware(serviceName: string): Middleware {
        return (req: Request, _res: Response, next: MiddlewareNext): void => {
            req.$ctx.locals.serviceName = serviceName
            next()
        }
    }

    private initParams(req: Request, res: Response, next: MiddlewareNext): void {
        const traceId = req.$ctx.locals?.traceId || randomUUID()
        const actionVersion = this.getActionVersion(req.url)

        req.$params.headers = { traceId, actionVersion }
        req.$params.body = req.body
        req.$params.query = req.query
        res.setHeader('Diia-Trace-Id', traceId)
        const headers: ActHeaders = { traceId, actionVersion }
        const alsData: AlsData = { headers, logData: headers }

        this.asyncLocalStorage.run(alsData, next)
    }

    private getActionVersion(url: string): ActionVersion {
        const re = /\/api\/(v\d+)/
        const matchResult: RegExpMatchArray | null = url.match(re)
        const apiVersion = matchResult ? matchResult[1] : ActionVersion.V0

        return <ActionVersion>apiVersion
    }

    private mergeParamsMiddleware(route: AppRoute): Middleware {
        return function mergeParams(req: Request, _res: Response, next: MiddlewareNext): void {
            const { body, query, headers, session } = req.$params

            const params =
                route.mergeParams === undefined || route.mergeParams
                    ? Object.assign(req.$params.params || {}, body, query)
                    : { body, query, params: req.$params.params }

            req.$params = <RequestParams>{ params, session, headers }

            next()
        }
    }
}
