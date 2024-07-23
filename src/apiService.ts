import { AsyncLocalStorage } from 'node:async_hooks'
import { randomUUID } from 'node:crypto'
import * as url from 'node:url'

import { find, isEmpty, pick } from 'lodash'
import type { Context } from 'moleculer'

import {
    AppApiService,
    INVALID_TRACEID,
    SEMATTRS_MESSAGING_DESTINATION,
    SEMATTRS_MESSAGING_SYSTEM,
    SpanKind,
    context,
    isValidTraceId,
    propagation,
    trace,
} from '@diia-inhouse/diia-app'

import { RequestMechanism } from '@diia-inhouse/diia-metrics'
import { AlsData, FileType, HttpMethod, HttpStatusCode, Logger } from '@diia-inhouse/types'
import { NetworkUtils } from '@diia-inhouse/utils'

import ApiDocsRoute from './apiDocs/route'
import RoutesBuilder from './routes'

import ErrorTemplateService from '@services/errorTemplate'
import ProcessDataService from '@services/processData'

import Utils from '@utils/index'
import TrackingUtils from '@utils/tracking'

import { Request, RequestContextLocals, Response, ResponseError, ResponsePayload, RouteHeaderRawName } from '@interfaces/index'
import { AppConfig } from '@interfaces/types/config'

export default (
    routesBuilder: RoutesBuilder,
    errorTemplateService: ErrorTemplateService,
    processDataService: ProcessDataService,
    apiDocsRoute: ApiDocsRoute,

    config: AppConfig,
    logger: Logger,
    asyncLocalStorage: AsyncLocalStorage<AlsData>,
    serviceName: string,

    trackingUtils: TrackingUtils,
): AppApiService => {
    const routes: unknown[] = []

    if (config.swagger.isEnabled) {
        routes.push(apiDocsRoute.getRoute())
    }

    const bodyLimit: string = process.env.HTTP_BODY_LIMIT || '100kb'
    const { aliases, preserveRawBodyIn } = routesBuilder.buildRoutes()

    routes.push({
        path: '/',
        aliases,
        mergeParams: false, // merging params will goes later for each route individually
        bodyParsers: {
            json: {
                limit: bodyLimit,
                verify: (req: Request, _res: unknown, buf: Buffer) => {
                    if (preserveRawBodyIn.includes(`${req.method} ${req.url}`)) {
                        req.rawBody = buf
                    }
                },
            },
            urlencoded: { extended: true, limit: bodyLimit },
        },
        pathToRegexpOptions: {
            sensitive: true,
        },

        // Call before middlewares
        async onBeforeCall(
            ctx: Context<unknown, Record<string, unknown>, RequestContextLocals>,
            _route: unknown,
            req: Request,
        ): Promise<void> {
            const { $alias, headers, method } = req
            const { fullPath: path, action } = $alias || {}

            const activeSpanTraceId = trace.getActiveSpan()?.spanContext().traceId || INVALID_TRACEID
            const traceId = isValidTraceId(activeSpanTraceId) ? activeSpanTraceId : randomUUID()

            asyncLocalStorage.run({ logData: { traceId } }, () => {
                logger.info('Start call to endpoint', { method, path, action })
                ctx.locals.traceId = traceId
                const tracingHeaders = {}
                const destinationServiceName = action?.split('.').shift()
                const route = path || action

                const spanKind = action ? SpanKind.PRODUCER : SpanKind.CLIENT

                const tracer = trace.getTracer(serviceName)
                const span = tracer.startSpan(
                    `handle ${route}`,
                    {
                        kind: spanKind,
                        attributes: {
                            [RouteHeaderRawName.MOBILE_UID]: headers?.[RouteHeaderRawName.MOBILE_UID] || '',
                        },
                    },
                    context.active(),
                )

                propagation.inject(trace.setSpan(context.active(), span), tracingHeaders)

                ctx.locals.span = span
                ctx.locals.requestStart = process.hrtime.bigint()
                ctx.meta.tracing = { ...tracingHeaders }

                if (action) {
                    span.updateName(`send ${action}`)
                    span.setAttributes({
                        [SEMATTRS_MESSAGING_SYSTEM]: RequestMechanism.Moleculer,
                        [SEMATTRS_MESSAGING_DESTINATION]: destinationServiceName,
                    })
                }
            })
        },

        // Call after `broker.call` and before send back the response
        async onAfterCall(
            ctx: Context<unknown, Record<string, unknown>, RequestContextLocals>,
            _route: unknown,
            req: Request,
            res: Response,
            data: ResponsePayload & Record<string, unknown>,
        ): Promise<unknown> {
            const {
                $params: { session, redirect, headers },
                $alias,
                query,
                method,
                parsedUrl,
            } = req
            const { fullPath: path, action } = $alias || {}

            return await asyncLocalStorage.run({ logData: { traceId: headers?.traceId } }, async () => {
                logger.info('End call to endpoint', {
                    duration: Utils.calculateResponseTime(req),
                    method,
                    path,
                    statusCode: HttpStatusCode.OK,
                })

                if (redirect) {
                    res.setHeader('Cache-Control', 'no-cache')
                    ctx.meta.$statusCode = 301
                    ctx.meta.$location = url.format(<url.UrlObject>{
                        pathname: redirect,
                        query,
                    })
                }

                const span = ctx.locals.span
                const requestStart = ctx.locals.requestStart
                const destinationServiceName = ctx.locals.serviceName
                const route = path || action

                const defaultMetricLabels = {
                    mechanism: RequestMechanism.HttpMoleculer,
                    source: serviceName,
                    destination: destinationServiceName,
                    route,
                }

                if (data?.$fileType) {
                    const fileTypesObject = {
                        [FileType.PNG]: 'image/png',
                        [FileType.JPEG]: 'image/jpeg',
                        [FileType.JSON]: 'application/json',
                        [FileType.PDF]: 'application/pdf',
                    }

                    const contentType = fileTypesObject[data.$fileType]

                    if(contentType) {
                        res.setHeader('Content-disposition', `${data.disposition}; filename=${data.filename}`)
                        res.setHeader('Content-Type', contentType)

                        trackingUtils.trackSuccess(defaultMetricLabels, requestStart, span)

                        return res.end(Buffer.from(<string>data.content, 'base64'))
                    }
                }

                if ([HttpMethod.DELETE, HttpMethod.PUT].includes(method) && isEmpty(data)) {
                    ctx.meta.$statusCode = 204
                }

                if (data?.processCode) {
                    const { processCode, opProcessDataParams: processDataParams, $processDataParams: templateParams } = data

                    const processData = processDataService.getProcessData(
                        processCode,
                        processDataParams || { templateParams },
                        session,
                        parsedUrl,
                    )

                    if (processData) {
                        Object.assign(data, processData)
                    } else {
                        delete data.processCode
                        delete data.$processDataParams
                        delete data.opProcessDataParams
                    }
                }

                if (data?.errorCode) {
                    const { errorCode } = data
                    const error: ResponseError = {
                        name: 'Error',
                        message: '',
                        code: HttpStatusCode.BAD_REQUEST,
                        errorCode,
                    }

                    try {
                        const template = await errorTemplateService.fetchErrorTemplateByCode(errorCode, session, parsedUrl)
                        if (template) {
                            error.description = template.template.description
                        }

                        data.error = error
                        delete data.errorCode

                        trackingUtils.trackError(error, defaultMetricLabels, requestStart, span)
                    } catch {
                        const errorMessage = `Failed to fetch error template by code ${errorCode}`
                        const exception: ResponseError = {
                            ...error,
                            message: errorMessage,
                        }

                        trackingUtils.trackError(exception, defaultMetricLabels, requestStart, span)

                        logger.error(errorMessage)
                    }
                }

                trackingUtils.trackSuccess(defaultMetricLabels, requestStart, span)

                return data
            })
        },

        // Method is not awaited on calling side. Should call res.end and handle rejections
        async onError(req: Request, res: Response, err: ResponseError): Promise<void> {
            try {
                const { $params, $route, parsedUrl, $ctx, $alias, method } = req
                const { fullPath: path, action } = $alias || {}

                return await asyncLocalStorage.run({ logData: { traceId: $params?.headers?.traceId } }, async () => {
                    const span = $ctx.locals.span
                    const requestStart = $ctx.locals.requestStart
                    const destinationServiceName = $ctx.locals.serviceName
                    const route = path || action

                    const defaultLabels = {
                        mechanism: RequestMechanism.HttpMoleculer,
                        source: serviceName,
                        destination: destinationServiceName,
                        route,
                    }

                    res.setHeader('Content-Type', 'application/json; charset=utf-8')
                    if (err.data?.processCode) {
                        const { processCode, opProcessDataParams: processDataParams, $processDataParams: templateParams, code } = err.data

                        if (Utils.isErrorCode(processCode)) {
                            err.code = HttpStatusCode.BAD_REQUEST
                            err.errorCode = processCode

                            delete err.data.processCode
                            delete err.data.$processDataParams
                            delete err.data.opProcessDataParams

                            const template = await errorTemplateService.fetchErrorTemplateByCode(processCode, $params?.session, parsedUrl)
                            if (template) {
                                err.description = template.template.description
                            }
                        } else {
                            const processData = processDataService.getProcessData(
                                processCode,
                                processDataParams || { templateParams },
                                $params?.session,
                                parsedUrl,
                            )
                            if (processData) {
                                trackingUtils.trackSuccess(defaultLabels, requestStart, span)

                                res.writeHead(HttpStatusCode.OK)
                                res.end(JSON.stringify(processData))

                                return
                            }

                            err.code = code && NetworkUtils.isHttpCode(code) ? code : HttpStatusCode.BAD_REQUEST
                            err.data.description = 'Process code template is not provided. Ask tech support for details'
                        }
                    }

                    if (err.name === 'ServiceNotFoundError') {
                        const routeAlias = find($route.aliases, { action: err.data?.action })
                        if (routeAlias) {
                            err.message = 'Service temporarily unavailable'
                            err.code = HttpStatusCode.SERVICE_UNAVAILABLE
                        } else {
                            err.message = 'Not Found'
                        }
                    }

                    if (err.name === 'ServiceNotAvailableError') {
                        err.code = HttpStatusCode.SERVICE_UNAVAILABLE
                    }

                    if (['MongoError', 'MongoServerError'].includes(err.name)) {
                        err.code = HttpStatusCode.UNPROCESSABLE_ENTITY
                        err.name = 'DatabaseError'
                        err.message = 'Database error'
                    }

                    if (err.name === 'MoleculerError') {
                        err.name = 'ApplicationError'
                    }

                    if (['RequestRejectedError', 'ServiceUnavailableError'].includes(err.name)) {
                        err.code = HttpStatusCode.SERVICE_UNAVAILABLE
                        err.name = 'ServiceNotAvailableError'
                        err.message = 'Service not available'
                        delete err.type
                        delete err.data
                    }

                    /*
                Remove prefix params from message
                {
                  "name": "ValidationError",
                  "message": "Parameters validation error!",
                  "code": 422,
                  "type": "VALIDATION_ERROR",
                  "data": [
                    {
                      "type": "stringMin",
                      "expected": 10,
                      "actual": 1,
                      "field": "params.newPassword",
                      "message": "The 'params.newPassword' field length must be greater than or equal to 10 characters long!"
                    }
                  ]
                }
                 */
                    Utils.handleValidationError(err)

                    const responseFields: (keyof ResponseError)[] = ['name', 'message', 'code', 'type', 'data', 'errorCode', 'description']
                    const errObj = pick<ResponseError>(err, responseFields)

                    let statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR

                    if (NetworkUtils.isHttpCode(err.code)) {
                        statusCode = err.code
                    }

                    if (NetworkUtils.isGrpcCode(err.code)) {
                        statusCode = NetworkUtils.getHttpStatusCodeByGrpcCode(err.code)
                    }

                    logger.error('Error while call to endpoint', {
                        duration: Utils.calculateResponseTime(req),
                        method,
                        path,
                        originalUrl: req.url,
                        statusCode,
                        errObj,
                    })

                    trackingUtils.trackError({ ...err, code: statusCode }, defaultLabels, requestStart, span)

                    res.writeHead(statusCode)
                    res.end(JSON.stringify(errObj, null, 2))
                })
            } catch (err_) {
                logger.error('Failed to process route onError hook', { err: err_ })

                res.writeHead(HttpStatusCode.INTERNAL_SERVER_ERROR)
                res.end()
            }
        },
    })

    return {
        port: config.appPort,
        ip: '0.0.0.0',
        routes,
        methods: {},
    }
}
