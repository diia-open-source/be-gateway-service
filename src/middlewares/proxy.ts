import { context, propagation, trace } from '@opentelemetry/api'
import { SemanticAttributes } from '@opentelemetry/semantic-conventions'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios'
import { identity } from 'lodash'

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
            const { parsedUrl, $params, $alias, method, query, body } = req
            const { serviceId, path: proxyPath, proxyHeaders } = proxyTo
            const { span, requestStart } = req.$ctx.locals
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
                proxyHeaders.forEach((header) => {
                    headers[header] = req.headers[header]
                })
            }

            if (req.rawBody) {
                headers['raw-body'] = req.rawBody.toString('base64')
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
            span?.setAttribute(SemanticAttributes.MESSAGING_DESTINATION, serviceId)

            let axiosResponse: AxiosResponse

            try {
                axiosResponse = await axios.request(config)
            } catch (e) {
                this.logger.error(`Error proxying to ${url}`, { err: e })
                if (e instanceof AxiosError && e.response) {
                    axiosResponse = e.response

                    this.trackingUtils.trackError(
                        {
                            name: 'ProxyError',
                            message: 'Error while proxying request',
                            code: e.status || 500,
                        },
                        defaultMetricLabels,
                        requestStart,
                        span,
                    )
                } else {
                    await utils.handleError(e, (err) => {
                        this.trackingUtils.trackError(
                            {
                                name: err.getName(),
                                message: err.getMessage(),
                                code: err.getCode(),
                            },
                            defaultMetricLabels,
                            requestStart,
                            span,
                        )

                        res.writeHead(500)
                        res.end(err.message)
                    })

                    return
                }
            }

            if (axiosResponse) {
                try {
                    this.consumeResponse(res, axiosResponse, req.parsedUrl, req.$params.session)
                } catch (e) {
                    await utils.handleError(e, (err) => {
                        this.trackingUtils.trackError(
                            {
                                name: err.getName(),
                                message: err.getMessage(),
                                code: err.getCode(),
                            },
                            defaultMetricLabels,
                            requestStart,
                            span,
                        )

                        res.writeHead(500)
                        res.end(err.message)
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

        for (const header in axiosResponse.headers) {
            res.setHeader(header, axiosResponse.headers[header])
        }

        let status = axiosResponse.status
        if (axiosResponse.headers['content-type'] === 'application/json') {
            const dataJson = JSON.parse(data.toString())
            const respProcessCode = dataJson?.processCode ?? Number(axiosResponse.headers.processcode)
            if (respProcessCode) {
                const { $processDataParams = undefined } = dataJson
                const processData = this.processDataService.getProcessData(respProcessCode, $processDataParams, session, parsedUrl)

                if (processData) {
                    Object.assign(dataJson, processData)
                } else {
                    delete axiosResponse.headers.processcode
                    delete dataJson.processCode
                    delete dataJson.$processDataParams
                }

                status = HttpStatusCode.OK
            }

            const buf = Buffer.from(JSON.stringify(dataJson))

            res.setHeader('content-length', buf.length.toString())
            res.writeHead(status)
            res.end(buf)
        } else {
            res.writeHead(axiosResponse.status)
            res.end(data)
        }
    }
}
