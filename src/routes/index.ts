/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */

import { AsyncLocalStorage } from 'async_hooks'
import { randomUUID } from 'crypto'
import { resolve as resolvePath } from 'path'

import { listModules } from 'awilix'
import { upperFirst } from 'lodash'

import { ExternalEvent } from '@diia-inhouse/diia-queue'
import { Env } from '@diia-inhouse/env'
import { ActHeaders, ActionVersion, AlsData, Logger } from '@diia-inhouse/types'

import AuthenticateMiddleware from '@src/middlewares/authenticate'
import ExternalMiddleware from '@src/middlewares/external'
import FileMiddleware from '@src/middlewares/fileUpload'
import HeaderMiddleware from '@src/middlewares/header'
import MultipartMiddleware from '@src/middlewares/multipart'
import ProxyMiddleware from '@src/middlewares/proxy'
import RedirectMiddleware from '@src/middlewares/redirect'

import { CustomObject, Request, RequestParams, Response, RouteHeaderRawName } from '@interfaces/index'
import { Middleware, MiddlewareNext } from '@interfaces/middlewares'
import { BuildRoutesResult } from '@interfaces/routes'
import { AppRoute, CustomHeader, RouteAuthParams } from '@interfaces/routes/appRoute'

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
        this.servicesRoutes = this.loadServicesRoutes()
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

                    middlewares.push(this.setServiceNameMiddleware(service))
                    middlewares.push(this.initParams.bind(this))

                    this.addHeadersMiddlewares(route, middlewares)

                    middlewares.push(this.authenticateMiddleware.isAuthenticated(route))

                    middlewares.push(this.multipartMiddleware.parse)

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

    private loadServicesRoutes(): Record<string, AppRoute[]> {
        const routes = listModules('dist/routes/*.js')

        const loadedRoutes = routes.reduce((acc, module) => {
            const { name, path: modulePath } = module

            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const serviceRoutes = require(resolvePath(modulePath)).default

            return {
                ...acc,
                ...(serviceRoutes && Array.isArray(serviceRoutes) && serviceRoutes.length && { [upperFirst(name)]: serviceRoutes }),
            }
        }, {})

        return loadedRoutes
    }

    private addHeadersMiddlewares(route: AppRoute, middlewares: unknown[]): void {
        middlewares.push(this.headerMiddleware.setAcceptLanguageHeader)

        if (!route.headers || !route.headers.length) {
            return
        }

        route.headers.forEach((header: CustomHeader) => {
            switch (header.name) {
                case RouteHeaderRawName.MOBILE_UID:
                    middlewares.push(this.headerMiddleware.addMobileUidHeader(header))
                    break
                case RouteHeaderRawName.TOKEN:
                    middlewares.push(this.headerMiddleware.addTokenHeader())
                    break
                case RouteHeaderRawName.APP_VERSION:
                    middlewares.push(this.headerMiddleware.addAppVersionHeader(header))
                    break
                case RouteHeaderRawName.PLATFORM_TYPE:
                    middlewares.push(this.headerMiddleware.addPlatformTypeHeader(header))
                    break
                case RouteHeaderRawName.PLATFORM_VERSION:
                    middlewares.push(this.headerMiddleware.addPlatformVersionHeader(header))
                    break
                case RouteHeaderRawName.TICKET:
                    middlewares.push(this.headerMiddleware.addTicketHeader(header))
                    break
                case RouteHeaderRawName.CHANNEL_UUID:
                    middlewares.push(this.headerMiddleware.addChannelUuidHeader(header))
                    break
                case RouteHeaderRawName.APP_PARTNER_ID:
                    middlewares.push(this.headerMiddleware.addDiiaPartnerIdHeader(header))
                    break
                case RouteHeaderRawName.DOCUMENT_REQUEST_TRACE_ID:
                    middlewares.push(this.headerMiddleware.addDocumentRequestTraceIdHeader(header))
                    break
                default:
                    this.logger.debug(`Header [${header.name}] middleware not implemented`)
            }
        })
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

            let params: CustomObject

            if (typeof route.mergeParams === 'undefined' || route.mergeParams) {
                // Merge params
                params = Object.assign(req.$params.params || {}, body, query)
            } else {
                params = { body, query, params: req.$params.params }
            }

            req.$params = <RequestParams>{ params, session, headers }

            next()
        }
    }
}
