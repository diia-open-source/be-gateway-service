import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios'
import { identity } from 'lodash'

import { SEMATTRS_MESSAGING_DESTINATION, context, propagation, trace } from '@diia-inhouse/diia-app'

import { RequestMechanism } from '@diia-inhouse/diia-metrics'
import { EnvService } from '@diia-inhouse/env'
import { ActionSession, HttpStatusCode, Logger } from '@diia-inhouse/types'
import { utils } from '@diia-inhouse/utils'

import { Proxy, ProxyRequestHeaders, Response, RouteHeaderRawName } from '@src/interfaces'

import ProcessDataService from '@services/processData'

import TrackingUtils from '@utils/tracking'

import { Middleware } from '@interfaces/middlewares'

export default class ProxyMiddleware {
    constructor(
        private readonly envService: EnvService,
        private readonly logger: Logger,
        private readonly processDataService: ProcessDataService,
        private readonly serviceName: string,

        private readonly trackingUtils: TrackingUtils,
    ) {}

    addRedirect(proxyTo: Proxy): Middleware {
        return async (req, res) => {
            const { parsedUrl, $params, $alias, method, query, body, $ctx, rawBody } = req
            const { serviceId, path: proxyPath, proxyHeaders } = proxyTo
            const { span, requestStart } = $ctx.locals
            const { fullPath: route } = $alias || {}

            const url = proxyPath ?? this.envService.getVar('PROXY_PATH', 'string') + parsedUrl

            const headers: ProxyRequestHeaders & RawAxiosRequestHeaders = {
                ...$params.headers,
                'service-id': serviceId,
                session: $params.session ? Buffer.from(JSON.stringify($params.session)).toString('base64') : undefined,
            }

            if (req.headers[RouteHeaderRawName.CONTENT_TYPE]) {
                headers[RouteHeaderRawName.CONTENT_TYPE] = req.headers[RouteHeaderRawName.CONTENT_TYPE]
            }

            if (proxyHeaders) {
                for (const header of proxyHeaders) {
                    headers[header] = req.headers[header]
                }
            }

            if (rawBody) {
                headers['raw-body'] = rawBody.toString('base64')
            }

            if (span) {
                const traceContext = {}

                propagation.inject(trace.setSpan(context.active(), span), traceContext)

                headers.tracing = JSON.stringify(traceContext)
            }

            const config: AxiosRequestConfig = {
                headers,
                transitional: {
                    forcedJSONParsing: false,
                    silentJSONParsing: false,
                    clarifyTimeoutError: true,
                },
                responseType: 'arraybuffer',
                transformResponse: identity,
                method,
                url,
                data: body,
                params: query,
            }

            const defaultMetricLabels = {
                mechanism: RequestMechanism.GrpcTranscoder,
                source: this.serviceName,
                destination: serviceId,
                ...(route && { route }),
            }

            span?.updateName(`proxy ${route}`)
            span?.setAttribute(SEMATTRS_MESSAGING_DESTINATION, serviceId)

            let axiosResponse: AxiosResponse

            try {
                axiosResponse = await axios.request(config)
            } catch (err) {
                if (err instanceof AxiosError && err.response) {
                    axiosResponse = err.response

                    this.logger.error(`Error proxying to ${url}`, {
                        err: err,
                        response: {
                            data: axiosResponse.data?.toString(),
                            status: axiosResponse.status,
                            statusText: axiosResponse.statusText,
                            headers: axiosResponse.headers,
                        },
                    })

                    this.trackingUtils.trackError(
                        {
                            name: 'ProxyError',
                            message: 'Error while proxying request',
                            code: err.status || 500,
                        },
                        defaultMetricLabels,
                        requestStart,
                        span,
                    )
                } else {
                    this.logger.error(`Error proxying to ${url}`, { err: err })

                    await utils.handleError(err, (apiError) => {
                        this.trackingUtils.trackError(
                            {
                                name: apiError.getName(),
                                message: apiError.getMessage(),
                                code: apiError.getCode(),
                            },
                            defaultMetricLabels,
                            requestStart,
                            span,
                        )

                        res.writeHead(500)
                        res.end(apiError.message)
                    })

                    return
                }
            }

            if (axiosResponse) {
                try {
                    this.consumeResponse(res, axiosResponse, parsedUrl, $params.session)
                } catch (err) {
                    await utils.handleError(err, (apiError) => {
                        this.trackingUtils.trackError(
                            {
                                name: apiError.getName(),
                                message: apiError.getMessage(),
                                code: apiError.getCode(),
                            },
                            defaultMetricLabels,
                            requestStart,
                            span,
                        )

                        res.writeHead(500)
                        res.end(apiError.message)
                    })
                }
            } else {
                this.logger.warn('axiosResponse is undefined!')
            }

            this.trackingUtils.trackSuccess(defaultMetricLabels, requestStart, span)
        }
    }

    private consumeResponse(
        res: Response,
        axiosResponse: AxiosResponse<Buffer>,
        parsedUrl: string | undefined,
        session: ActionSession | undefined,
    ): void {
        const data = axiosResponse.data

        this.logger.debug('Proxy response', { parsedUrl, axiosResponse, data: data.toString() })

        for (const header in axiosResponse.headers) {
            res.setHeader(header, axiosResponse.headers[header])
        }

        let statusCode = axiosResponse.status
        if (axiosResponse.headers['content-type'] === 'application/json') {
            let dataJson = JSON.parse(data.toString())

            const processCode = dataJson?.processCode ?? Number(axiosResponse.headers.processcode)
            const processDataParams = dataJson?.opProcessDataParams || { templateParams: dataJson?.$processDataParams }

            if (processCode) {
                const processData = this.processDataService.getProcessData(processCode, processDataParams, session, parsedUrl)

                if (processData) {
                    dataJson = statusCode >= HttpStatusCode.BAD_REQUEST ? { ...processData } : { ...dataJson, ...processData }
                } else {
                    delete axiosResponse.headers.processcode
                    delete dataJson.processCode
                    delete dataJson.$processDataParams
                    delete dataJson.opProcessDataParams
                }

                statusCode = HttpStatusCode.OK
            }

            const buf = Buffer.from(JSON.stringify(dataJson))

            res.setHeader('content-length', buf.length.toString())
            res.writeHead(statusCode)
            res.end(buf)
        } else {
            res.writeHead(axiosResponse.status)
            res.end(data)
        }
    }
}
