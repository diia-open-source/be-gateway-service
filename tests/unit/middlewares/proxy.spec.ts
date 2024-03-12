import axios, { AxiosError, AxiosRequestHeaders } from 'axios'

import DiiaLogger from '@diia-inhouse/diia-logger'
import { MetricsService } from '@diia-inhouse/diia-metrics'
import { EnvService } from '@diia-inhouse/env'
import { mockClass, mockInstance } from '@diia-inhouse/test'
import { HttpStatusCode } from '@diia-inhouse/types'

import { Request, RouteHeaderRawName } from '../../../src/interfaces'

import ProxyMiddleware from '@src/middlewares/proxy'

import ProcessDataService from '@services/processData'

import TrackingService from '@utils/tracking'

import { AppConfig } from '@interfaces/types/config'

jest.mock('axios', () => {
    const { AxiosError: actualAxiosError } = jest.requireActual('axios')
    const mocked = <Record<string, unknown>>jest.createMockFromModule('axios')

    return { ...mocked, AxiosError: actualAxiosError }
})

const mockedAxios = <jest.Mocked<typeof axios>>axios

const DiiaLoggerMock = mockClass(DiiaLogger)
const EnvServiceMock = mockClass(EnvService)
const ProcessDataServiceMock = mockClass(ProcessDataService)

const metrics = mockInstance(MetricsService, {
    totalRequestMetric: {
        increment: jest.fn(),
    },
    totalTimerMetric: {
        observeSeconds: jest.fn(),
    },
})
const tracking = new TrackingService(metrics)
const serviceName = 'Gateway'

const spanMock = {
    updateName: jest.fn(),
    setAttribute: jest.fn(),
    setAttributes: jest.fn(),
    isRecording: jest.fn(),
    end: jest.fn(),
    recordException: jest.fn(),
    setStatus: jest.fn(),
}

const config: AppConfig = <AppConfig>(<unknown>{
    appPort: 3000,
    bodyLimit: '100M',
    swagger: { isEnabled: true, path: '/documentation' },
})

describe('ProxyMiddleware', () => {
    const logger = new DiiaLoggerMock()
    const envService = new EnvServiceMock(logger)
    const processDataService = new ProcessDataServiceMock(config)
    const middleware = new ProxyMiddleware(envService, logger, processDataService, serviceName, tracking)

    describe('method: `addRedirect`', () => {
        it('should proxy the request successfully', async () => {
            const path = 'path/to/resource'
            const mockReq = <Request>(<unknown>{
                headers: { [RouteHeaderRawName.CONTENT_TYPE]: 'application/json' },
                parsedUrl: path,
                $alias: {
                    fullPath: path,
                },
                $ctx: {
                    locals: {
                        span: spanMock,
                        requestStart: 0n,
                    },
                },
                $params: {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    session: { userId: '12345' },
                },
                method: 'POST',
                query: {},
                body: { key: 'value' },
            })
            const mockRes = {
                setHeader: jest.fn(),
                writeHead: jest.fn(),
                end: jest.fn(),
            }
            const next = jest.fn()
            const mockAxiosResponse = {
                status: HttpStatusCode.OK,
                headers: { 'Content-Type': 'application/json' },
                data: { result: 'Success' },
            }

            mockedAxios.request.mockResolvedValue(mockAxiosResponse)

            await middleware.addRedirect({ serviceId: 'service1' })(mockReq, mockRes, next)

            expect(mockedAxios.request).toHaveBeenCalledTimes(1)
            expect(mockedAxios.request).toHaveBeenCalledWith(expect.any(Object))

            const axiosConfig = mockedAxios.request.mock.calls[0][0]

            expect(axiosConfig).toMatchObject({
                method: 'POST',
                data: { key: 'value' },
                params: {},
                headers: {
                    'Content-Type': 'application/json',
                    'service-id': 'service1',
                    session: Buffer.from(JSON.stringify({ userId: '12345' })).toString('base64'),
                },
            })

            expect(mockRes.setHeader).toHaveBeenCalledTimes(1)
            expect(mockRes.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json')
            expect(mockRes.writeHead).toHaveBeenCalledTimes(1)
            expect(mockRes.writeHead).toHaveBeenCalledWith(HttpStatusCode.OK)
            expect(mockRes.end).toHaveBeenCalledTimes(1)
            expect(mockRes.end).toHaveBeenCalledWith({ result: 'Success' })
        })

        it('should add Content-Type header to proxy request when present in req', async () => {
            const path = '/api/resource'
            const mockReq = <Request>(<unknown>{
                headers: {
                    [RouteHeaderRawName.CONTENT_TYPE]: 'application/json',
                },
                parsedUrl: path,
                method: 'POST',
                query: {},
                body: {},
                $params: {
                    headers: {},
                },
                $ctx: {
                    locals: {
                        span: spanMock,
                        requestStart: 0n,
                    },
                },
                $alias: {
                    fullPath: path,
                },
            })
            const mockRes = {
                setHeader: jest.fn(),
                writeHead: jest.fn(),
                end: jest.fn(),
            }
            const next = jest.fn()

            await middleware.addRedirect({ serviceId: 'service1' })(mockReq, mockRes, next)

            expect(axios.request).toHaveBeenCalledWith(
                expect.objectContaining({
                    headers: expect.objectContaining({
                        [RouteHeaderRawName.CONTENT_TYPE]: 'application/json',
                    }),
                }),
            )
        })

        it('should add raw-body header to proxy request when rawBody present in req', async () => {
            const rawBody = Buffer.alloc(1024, 1)
            const path = '/api/resource'
            const mockReq = <Request>(<unknown>{
                headers: { [RouteHeaderRawName.CONTENT_TYPE]: 'application/json' },
                parsedUrl: path,
                method: 'POST',
                query: {},
                body: {},
                rawBody,
                $params: {
                    headers: {},
                },
                $ctx: {
                    locals: {
                        span: spanMock,
                        requestStart: 0n,
                    },
                },
                $alias: {
                    fullPath: path,
                },
            })
            const mockRes = {
                setHeader: jest.fn(),
                writeHead: jest.fn(),
                end: jest.fn(),
            }
            const next = jest.fn()

            await middleware.addRedirect({ serviceId: 'service1' })(mockReq, mockRes, next)

            expect(axios.request).toHaveBeenCalledWith(
                expect.objectContaining({
                    headers: expect.objectContaining({
                        [RouteHeaderRawName.CONTENT_TYPE]: 'application/json',
                        'raw-body': rawBody.toString('base64'),
                    }),
                }),
            )
        })

        it('should add specified proxy headers to proxy request when present in req', async () => {
            const path = '/api/resource'
            const mockReq = <Request>(<unknown>{
                headers: {
                    [RouteHeaderRawName.TOKEN]: 'Bearer token123',
                },
                parsedUrl: path,
                method: 'POST',
                query: {},
                body: {},
                $params: {
                    headers: {},
                },
                $ctx: {
                    locals: {
                        span: spanMock,
                        requestStart: 0n,
                    },
                },
                $alias: {
                    fullPath: path,
                },
            })
            const mockRes = {
                setHeader: jest.fn(),
                writeHead: jest.fn(),
                end: jest.fn(),
            }
            const mockProxyHeaders = [RouteHeaderRawName.TOKEN]
            const mockProxyTo = {
                serviceId: 'service123',
                path: '/proxy-path',
                proxyHeaders: mockProxyHeaders,
            }
            const next = jest.fn()

            await middleware.addRedirect(mockProxyTo)(mockReq, mockRes, next)

            expect(axios.request).toHaveBeenCalledWith(
                expect.objectContaining({
                    headers: expect.objectContaining({
                        [RouteHeaderRawName.TOKEN]: 'Bearer token123',
                    }),
                }),
            )
        })

        it('should handle proxy error', async () => {
            const path = '/path/to/resource1'
            const mockReq = <Request>(<unknown>{
                headers: { 'Content-Type': 'application/json' },
                parsedUrl: path,
                $params: {
                    headers: {},
                },
                method: 'GET',
                query: {},
                body: {},
                $ctx: {
                    locals: {
                        span: spanMock,
                        requestStart: 0n,
                    },
                },
                $alias: {
                    fullPath: path,
                },
            })
            const mockRes = {
                setHeader: jest.fn(),
                writeHead: jest.fn(),
                end: jest.fn(),
            }
            const mockAxiosError = { message: 'Not Found' }
            const next = jest.fn()

            const logErrorSpy = jest.spyOn(logger, 'error').mockClear()

            mockedAxios.request.mockRejectedValueOnce(mockAxiosError)

            await middleware.addRedirect({ serviceId: 'service1' })(mockReq, mockRes, next)

            expect(logErrorSpy).toHaveBeenCalledTimes(1)

            expect(mockRes.writeHead).toHaveBeenCalledTimes(1)
            expect(mockRes.writeHead).toHaveBeenCalledWith(500)
            expect(mockRes.end).toHaveBeenCalledTimes(1)
        })

        it('should log a warning when axiosResponse is undefined', async () => {
            const path = '/api/resource'
            const req = <Request>(<unknown>{
                headers: { [RouteHeaderRawName.CONTENT_TYPE]: 'application/json' },
                parsedUrl: path,
                method: 'POST',
                query: {},
                body: {},
                $params: {
                    headers: {},
                },
                $ctx: {
                    locals: {
                        span: spanMock,
                        requestStart: 0n,
                    },
                },
                $alias: {
                    fullPath: path,
                },
            })
            const res = {
                setHeader: jest.fn(),
                writeHead: jest.fn(),
                end: jest.fn(),
            }
            const next = jest.fn()

            mockedAxios.request.mockResolvedValueOnce(undefined)

            await middleware.addRedirect({ serviceId: 'example-service' })(req, res, next)

            expect(logger.warn).toHaveBeenCalledWith('axiosResponse is undefined!')
        })

        it('should handle axios error', async () => {
            const path = '/path/to/resource'
            const mockReq = <Request>(<unknown>{
                headers: { [RouteHeaderRawName.CONTENT_TYPE]: 'application/json' },
                parsedUrl: path,
                $params: {
                    headers: {},
                },
                method: 'GET',
                query: {},
                body: {},
                $ctx: {
                    locals: {
                        span: spanMock,
                        requestStart: 0n,
                    },
                },
                $alias: {
                    fullPath: path,
                },
            })
            const mockRes = {
                setHeader: jest.fn(),
                writeHead: jest.fn(),
                end: jest.fn(),
            }
            const mockAxiosError: AxiosError = {
                name: 'AxiosError',
                message: 'error message',
                code: '404',
                request: mockReq,
                isAxiosError: true,
                toJSON: jest.fn(),
                response: {
                    data: Buffer.from('{}'),
                    status: 404,
                    statusText: 'Not Found Data',
                    headers: { [RouteHeaderRawName.CONTENT_TYPE]: 'application/json' },
                    config: {
                        url: 'https://example.com',
                        method: 'GET',
                        headers: <AxiosRequestHeaders>{
                            'Content-Type': 'application/json',
                        },
                    },
                },
            }
            const next = jest.fn()

            const logErrorSpy = jest.spyOn(logger, 'error').mockClear()

            mockedAxios.request.mockRejectedValueOnce(
                new AxiosError(
                    mockAxiosError.message,
                    mockAxiosError.code,
                    mockAxiosError.config,
                    mockAxiosError.request,
                    mockAxiosError.response,
                ),
            )

            await middleware.addRedirect({ serviceId: 'service1' })(mockReq, mockRes, next)

            expect(logErrorSpy).toHaveBeenCalledTimes(1)

            expect(mockRes.writeHead).toHaveBeenCalledTimes(1)
            expect(mockRes.writeHead).toHaveBeenCalledWith(404)
            expect(mockRes.end).toHaveBeenCalledTimes(1)
        })

        it('should handle consume response error', async () => {
            const path = 'path/to/resource'
            const mockReq = <Request>(<unknown>{
                headers: { [RouteHeaderRawName.CONTENT_TYPE]: 'application/json' },
                parsedUrl: path,
                $params: {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    session: { userId: '12345' },
                },
                method: 'POST',
                query: {},
                body: { key: 'value' },
                $ctx: {
                    locals: {
                        span: spanMock,
                        requestStart: 0n,
                    },
                },
                $alias: {
                    fullPath: path,
                },
            })
            const mockRes = {
                setHeader: jest.fn(),
                writeHead: jest.fn(),
                end: jest.fn(),
            }
            const next = jest.fn()
            const mockAxiosResponse = {
                status: HttpStatusCode.OK,
                headers: { 'content-type': 'application/json' },
                data: '{result:"Success"}',
            }

            mockedAxios.request.mockResolvedValueOnce(mockAxiosResponse)

            await middleware.addRedirect({ serviceId: 'service1' })(mockReq, mockRes, next)

            expect(mockRes.writeHead).toHaveBeenCalledWith(HttpStatusCode.INTERNAL_SERVER_ERROR)
            expect(mockRes.end).toHaveBeenCalled()
        })

        it.each([
            [
                'content-type: application/json header',
                {
                    status: HttpStatusCode.CREATED,
                    headers: { 'content-type': 'application/json' },
                    data: '{"result":"Success"}',
                },
                '{"result":"Success"}',
                (): void => {},
                HttpStatusCode.CREATED,
            ],
            [
                'content-type: application/json header and invalid processCode and $processDataParams in data',
                {
                    status: HttpStatusCode.CREATED,
                    headers: { 'content-type': 'application/json' },
                    data: '{"result":"Success","processCode":"0987654321","$processDataParams":{"param1":125}}',
                },
                '{"result":"Success"}',
                (): void => {
                    jest.spyOn(processDataService, 'getProcessData').mockReturnValueOnce(undefined)
                },
                HttpStatusCode.OK,
            ],
            [
                'content-type: application/json header and valid processCode and $processDataParams in data',
                {
                    status: HttpStatusCode.CREATED,
                    headers: { 'content-type': 'application/json' },
                    data: '{"result":"Success","processCode":"987654321"}',
                },
                '{"result":"Success","processCode":987654321,"template":{"type":"middleCenterAlignAlert","isClosable":false,"data":{"icon":"☝","title":"title","description":"description"}}}',
                (): void => {
                    jest.spyOn(processDataService, 'getProcessData').mockReturnValueOnce({
                        processCode: 987654321,
                        template: {
                            type: 'middleCenterAlignAlert',
                            isClosable: false,
                            data: { icon: '☝', title: 'title', description: 'description' },
                        },
                    })
                },
                HttpStatusCode.OK,
            ],
        ])('should handle axios response with %s', async (_msg, mockAxiosResponse, mockAxiosResponseData, setupSpies, httpStatus) => {
            const path = 'path/to/resource'
            const mockReq = <Request>(<unknown>{
                headers: { [RouteHeaderRawName.CONTENT_TYPE]: 'application/json' },
                parsedUrl: path,
                $params: {
                    headers: { 'Content-Type': 'application/json' },
                    session: { userId: '12345' },
                },
                method: 'POST',
                query: {},
                body: { key: 'value' },
                $ctx: {
                    locals: {
                        span: spanMock,
                        requestStart: 0n,
                    },
                },
                $alias: {
                    fullPath: path,
                },
            })
            const mockRes = {
                setHeader: jest.fn(),
                writeHead: jest.fn(),
                end: jest.fn(),
            }
            const next = jest.fn()

            setupSpies()
            mockedAxios.request.mockResolvedValueOnce(mockAxiosResponse)

            await middleware.addRedirect({ serviceId: 'service1' })(mockReq, mockRes, next)

            expect(mockRes.setHeader).toHaveBeenNthCalledWith(1, 'content-type', 'application/json')
            expect(mockRes.setHeader).toHaveBeenNthCalledWith(2, 'content-length', Buffer.from(mockAxiosResponseData).length.toString())
            expect(mockRes.writeHead).toHaveBeenCalledWith(httpStatus)
            expect(mockRes.end).toHaveBeenCalledWith(Buffer.from(mockAxiosResponseData))
        })
    })
})
