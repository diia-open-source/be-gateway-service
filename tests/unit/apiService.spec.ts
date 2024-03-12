const actionTypesJsonParse = jest.fn()
const utilsMock = {
    calculateResponseTime: jest.fn(),
    isErrorCode: jest.fn(),
    handleValidationError: jest.fn(),
}
const traceMock = {
    getActiveSpan: jest.fn(),
    getTracer: jest.fn(),
    setSpan: jest.fn(),
}
const tracerMock = {
    startSpan: jest.fn(),
}
const activeSpanMock = {
    spanContext: jest.fn(),
}
const contextMock = {
    active: jest.fn(),
}
const propagationMock = {
    inject: jest.fn(),
}
const isValidTraceId = jest.fn()
const randomUUID = jest.fn()

jest.mock('crypto', () => {
    const original = jest.requireActual('crypto')

    return {
        ...original,
        randomUUID,
    }
})
jest.mock('@opentelemetry/api', () => {
    const original = jest.requireActual('@opentelemetry/api')

    return {
        ...original,
        context: contextMock,
        isValidTraceId,
        propagation: propagationMock,
        trace: traceMock,
    }
})
jest.mock('@diia-inhouse/diia-app', () => ({ actionTypesJsonParse }))
jest.mock('@utils/index', () => utilsMock)

import { AsyncLocalStorage } from 'async_hooks'

import { SpanStatusCode } from '@opentelemetry/api'

import DiiaLogger from '@diia-inhouse/diia-logger'
import { MetricsService } from '@diia-inhouse/diia-metrics'
import { ErrorCode } from '@diia-inhouse/errors'
import { StoreService } from '@diia-inhouse/redis'
import { mockClass, mockInstance } from '@diia-inhouse/test'
import { AlsData, FileType, HttpMethod, HttpStatusCode } from '@diia-inhouse/types'

import OpenApiGenerator from '@src/apiDocs/openApiGenerator'
import ApiDocsRoute from '@src/apiDocs/route'
import apiService from '@src/apiService'
import RoutesBuilder from '@src/routes'

import ErrorTemplateService from '@services/errorTemplate'
import ProcessDataService from '@services/processData'

import ErrorTemplateDataMapper from '@dataMappers/errorTemplateDataMapper'

import TrackingService from '@utils/tracking'

import { generateUuid } from '@tests/mocks/randomData'

import { ProcessCode, ResponseError } from '@interfaces/index'
import { ErrorTemplateResult } from '@interfaces/services/errorTemplate'
import { ProcessData } from '@interfaces/services/processData'
import { AppConfig } from '@interfaces/types/config'

const ErrorTemplateServiceMock = mockClass(ErrorTemplateService)
const ProcessDataServiceMock = mockClass(ProcessDataService)
const ApiDocsRouteMock = mockClass(ApiDocsRoute)
const DiiaLoggerMock = mockClass(DiiaLogger)
const AsyncLocalStorageMock = mockClass(AsyncLocalStorage)
const config: AppConfig = <AppConfig>(<unknown>{
    appPort: 3000,
    bodyLimit: '100M',
    swagger: { isEnabled: true, path: '/documentation' },
})

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

interface ApiServiceRoute {
    onBeforeCall: CallableFunction
    onAfterCall: CallableFunction
    onError: CallableFunction
}

describe('ApiService', () => {
    const routesBuilder = <RoutesBuilder>(<unknown>{
        buildRoutes: () => {
            return { aliases: {}, preserveRawBodyIn: [] }
        },
    })
    const errorTemplateService = new ErrorTemplateServiceMock(<ErrorTemplateDataMapper>{}, <StoreService>{})
    const processDataService = new ProcessDataServiceMock(config)
    const logger = new DiiaLoggerMock()
    const apiDocsRoute = new ApiDocsRouteMock(config, <OpenApiGenerator>{}, logger)
    const asyncLocalStorage = new AsyncLocalStorageMock()

    describe('method: `onBeforeCall`', () => {
        it('should successfully setup tracer', async () => {
            let isRecording = true
            const spanMock = {
                updateName: jest.fn(),
                setAttribute: jest.fn(),
                setAttributes: jest.fn(),
                isRecording: jest.fn(() => isRecording),
                end: jest.fn(() => {
                    isRecording = false
                }),
                recordException: jest.fn(),
                setStatus: jest.fn(),
            }
            const traceId = '2df86fcd-85b2-4689-9c15-6b001fa32f8c'
            const spanContext = { traceId }
            const { routes, ip, methods, port } = apiService(
                routesBuilder,
                errorTemplateService,
                processDataService,
                apiDocsRoute,
                config,
                logger,
                <AsyncLocalStorage<AlsData>>asyncLocalStorage,
                serviceName,
                tracking,
            )
            const route = <ApiServiceRoute>routes[1]
            const ctx = { meta: {}, locals: { traceId: '' } }
            const req = {
                method: HttpMethod.GET,
                $alias: { fullPath: '/get', method: HttpMethod.GET, action: 'User.getProfile' },
            }

            const fakeTs = Date.now()

            jest.useFakeTimers({ now: fakeTs })
            activeSpanMock.spanContext.mockReturnValue(spanContext)
            traceMock.getActiveSpan.mockReturnValue(activeSpanMock)
            isValidTraceId.mockReturnValue(true)
            traceMock.getTracer.mockReturnValue(tracerMock)
            tracerMock.startSpan.mockReturnValue(spanMock)
            traceMock.setSpan.mockReturnValue('setSpan')
            contextMock.active.mockReturnValue(true)
            jest.spyOn(asyncLocalStorage, 'run').mockImplementationOnce(async (_ctx, cb) => {
                await cb()
            })

            await route.onBeforeCall(ctx, {}, req)

            expect(ip).toBe('0.0.0.0')
            expect(methods).toEqual({})
            expect(port).toEqual(config.appPort)
            expect(ctx.locals).toEqual({
                span: spanMock,
                traceId,
                requestStart: process.hrtime.bigint(),
            })
            expect(logger.info).toHaveBeenCalledWith('Start call to endpoint', {
                method: HttpMethod.GET,
                path: '/get',
                action: 'User.getProfile',
            })
        })
    })

    describe('method: `onAfterCall`', () => {
        it('should successfully handle redirect response', async () => {
            let isRecording = true
            const spanMock = {
                updateName: jest.fn(),
                setAttribute: jest.fn(),
                setAttributes: jest.fn(),
                isRecording: jest.fn(() => isRecording),
                end: jest.fn(() => {
                    isRecording = false
                }),
                recordException: jest.fn(),
                setStatus: jest.fn(),
            }
            const { routes, ip, methods, port } = apiService(
                routesBuilder,
                errorTemplateService,
                processDataService,
                apiDocsRoute,
                config,
                logger,
                <AsyncLocalStorage<AlsData>>asyncLocalStorage,
                serviceName,
                tracking,
            )
            const route = <ApiServiceRoute>routes[1]
            const reqDuration = 250
            const ctx = { meta: {}, locals: { span: spanMock } }
            const req = {
                $params: { redirect: '/redirect/to', headers: { traceId: generateUuid() } },
                query: {},
                $alias: { fullPath: '/get' },
                method: HttpMethod.GET,
            }
            const res = {
                setHeader: jest.fn(),
                end: jest.fn(),
            }

            jest.spyOn(utilsMock, 'calculateResponseTime').mockReturnValue(reqDuration)
            jest.spyOn(asyncLocalStorage, 'run').mockImplementationOnce(async (_ctx, cb) => {
                await cb()
            })

            await route.onAfterCall(ctx, {}, req, res, {})

            expect(ip).toBe('0.0.0.0')
            expect(methods).toEqual({})
            expect(port).toEqual(config.appPort)
            expect(ctx.locals.span.end).toHaveBeenCalledWith()
            expect(res.setHeader).toHaveBeenCalledWith('Cache-Control', 'no-cache')
            expect(ctx).toEqual({ ...ctx, meta: { ...ctx.meta, $statusCode: 301, $location: req.$params.redirect } })
            expect(logger.info).toHaveBeenCalledWith('End call to endpoint', {
                duration: reqDuration,
                method: req.method,
                path: req.$alias.fullPath,
                statusCode: HttpStatusCode.OK,
            })
            expect(actionTypesJsonParse).toHaveBeenCalledWith({})
        })

        it.each([
            ['image/png', { $fileType: FileType.PNG, disposition: 'attachment', filename: 'file.png', content: 'some-content' }],
            ['image/jpeg', { $fileType: FileType.JPEG, disposition: 'attachment', filename: 'file.jpeg', content: 'some-content' }],
            ['application/json', { $fileType: FileType.JSON, disposition: 'attachment', filename: 'file.json', content: '{}' }],
            ['application/pdf', { $fileType: FileType.PDF, disposition: 'attachment', filename: 'file.pdf', content: 'some-content' }],
        ])('should successfully handle file response in case content type is %s', async (contentType, data) => {
            let isRecording = true
            const spanMock = {
                updateName: jest.fn(),
                setAttribute: jest.fn(),
                setAttributes: jest.fn(),
                isRecording: jest.fn(() => isRecording),
                end: jest.fn(() => {
                    isRecording = false
                }),
                recordException: jest.fn(),
                setStatus: jest.fn(),
            }
            const { routes, ip, methods, port } = apiService(
                routesBuilder,
                errorTemplateService,
                processDataService,
                apiDocsRoute,
                config,
                logger,
                <AsyncLocalStorage<AlsData>>asyncLocalStorage,
                serviceName,
                tracking,
            )
            const route = <ApiServiceRoute>routes[1]
            const reqDuration = 250
            const ctx = { meta: {}, locals: { span: spanMock } }
            const req = {
                $params: { headers: { traceId: generateUuid() } },
                query: {},
                $alias: { fullPath: '/get' },
                method: HttpMethod.GET,
            }
            const res = {
                setHeader: jest.fn(),
                end: jest.fn(),
            }

            jest.spyOn(utilsMock, 'calculateResponseTime').mockReturnValue(reqDuration)
            jest.spyOn(asyncLocalStorage, 'run').mockImplementationOnce(async (_ctx, cb) => {
                await cb()
            })

            route.onAfterCall(ctx, {}, req, res, data)

            expect(ip).toBe('0.0.0.0')
            expect(methods).toEqual({})
            expect(port).toEqual(config.appPort)
            expect(ctx.locals.span.end).toHaveBeenCalledWith()
            expect(res.setHeader).toHaveBeenCalledWith('Content-disposition', `${data.disposition}; filename=${data.filename}`)
            expect(res.setHeader).toHaveBeenCalledWith('Content-Type', contentType)
            expect(res.end).toHaveBeenCalledWith(Buffer.from(data.content, 'base64'))
            expect(logger.info).toHaveBeenCalledWith('End call to endpoint', {
                duration: reqDuration,
                method: req.method,
                path: req.$alias.fullPath,
                statusCode: HttpStatusCode.OK,
            })
        })

        it('should successfully skip to handle file response in case of unsupported type', async () => {
            let isRecording = true
            const spanMock = {
                updateName: jest.fn(),
                setAttribute: jest.fn(),
                setAttributes: jest.fn(),
                isRecording: jest.fn(() => isRecording),
                end: jest.fn(() => {
                    isRecording = false
                }),
                recordException: jest.fn(),
                setStatus: jest.fn(),
            }
            const { routes, ip, methods, port } = apiService(
                routesBuilder,
                errorTemplateService,
                processDataService,
                apiDocsRoute,
                config,
                logger,
                <AsyncLocalStorage<AlsData>>asyncLocalStorage,
                serviceName,
                tracking,
            )
            const route = <ApiServiceRoute>routes[1]
            const reqDuration = 250
            const ctx = { meta: {}, locals: { span: spanMock } }
            const req = {
                $params: { headers: { traceId: generateUuid() } },
                query: {},
                $alias: { fullPath: '/get' },
                method: HttpMethod.GET,
            }
            const res = {
                setHeader: jest.fn(),
                end: jest.fn(),
            }

            const data = { $fileType: <FileType>'docx', disposition: 'attachment', filename: 'file.docx', content: 'some-content' }

            jest.spyOn(utilsMock, 'calculateResponseTime').mockReturnValue(reqDuration)
            jest.spyOn(asyncLocalStorage, 'run').mockImplementationOnce(async (_ctx, cb) => {
                await cb()
            })

            await route.onAfterCall(ctx, {}, req, res, data)

            expect(ip).toBe('0.0.0.0')
            expect(methods).toEqual({})
            expect(port).toEqual(config.appPort)
            expect(ctx.locals.span.end).toHaveBeenCalledWith()
            expect(logger.info).toHaveBeenCalledWith('End call to endpoint', {
                duration: reqDuration,
                method: req.method,
                path: req.$alias.fullPath,
                statusCode: HttpStatusCode.OK,
            })
            expect(actionTypesJsonParse).toHaveBeenCalledWith(data)
        })

        it('should change status code to 204 in case data is empty and method is on of [PUT,DELETE]', async () => {
            let isRecording = true
            const spanMock = {
                updateName: jest.fn(),
                setAttribute: jest.fn(),
                setAttributes: jest.fn(),
                isRecording: jest.fn(() => isRecording),
                end: jest.fn(() => {
                    isRecording = false
                }),
                recordException: jest.fn(),
                setStatus: jest.fn(),
            }
            const { routes, ip, methods, port } = apiService(
                routesBuilder,
                errorTemplateService,
                processDataService,
                apiDocsRoute,
                config,
                logger,
                <AsyncLocalStorage<AlsData>>asyncLocalStorage,
                serviceName,
                tracking,
            )
            const route = <ApiServiceRoute>routes[1]
            const reqDuration = 250
            const ctx = { meta: {}, locals: { span: spanMock } }
            const req = {
                $params: { headers: { traceId: generateUuid() } },
                query: {},
                $alias: { fullPath: '/get' },
                method: HttpMethod.DELETE,
            }
            const res = {
                setHeader: jest.fn(),
                end: jest.fn(),
            }

            const data = null

            jest.spyOn(utilsMock, 'calculateResponseTime').mockReturnValue(reqDuration)
            jest.spyOn(asyncLocalStorage, 'run').mockImplementationOnce(async (_ctx, cb) => {
                await cb()
            })

            await route.onAfterCall(ctx, {}, req, res, data)

            expect(ip).toBe('0.0.0.0')
            expect(methods).toEqual({})
            expect(port).toEqual(config.appPort)
            expect(ctx.locals.span.end).toHaveBeenCalledWith()
            expect(ctx).toEqual({ ...ctx, meta: { ...ctx.meta, $statusCode: 204 } })
            expect(logger.info).toHaveBeenCalledWith('End call to endpoint', {
                duration: reqDuration,
                method: req.method,
                path: req.$alias.fullPath,
                statusCode: HttpStatusCode.OK,
            })
            expect(actionTypesJsonParse).toHaveBeenCalledWith(data)
        })

        it.each([
            [
                'process data exists for provided process code',
                <ProcessData>{ processCode: ProcessCode.AttestationNotPassed, template: {} },
                { processCode: ProcessCode.AttestationNotPassed, template: {} },
            ],
            ['process not found for provided process code', undefined, {}],
        ])('should successfully handle response with process code in case %s', async (_msg, processData, expectedData) => {
            let isRecording = true
            const spanMock = {
                updateName: jest.fn(),
                setAttribute: jest.fn(),
                setAttributes: jest.fn(),
                isRecording: jest.fn(() => isRecording),
                end: jest.fn(() => {
                    isRecording = false
                }),
                recordException: jest.fn(),
                setStatus: jest.fn(),
            }
            const { routes, ip, methods, port } = apiService(
                routesBuilder,
                errorTemplateService,
                processDataService,
                apiDocsRoute,
                config,
                logger,
                <AsyncLocalStorage<AlsData>>asyncLocalStorage,
                serviceName,
                tracking,
            )
            const route = <ApiServiceRoute>routes[1]
            const reqDuration = 250
            const ctx = { meta: {}, locals: { span: spanMock } }
            const req = {
                $params: { headers: { traceId: generateUuid() } },
                query: {},
                $alias: { fullPath: '/get' },
                method: HttpMethod.DELETE,
            }
            const res = {
                setHeader: jest.fn(),
                end: jest.fn(),
            }

            const data = { processCode: ProcessCode.AttestationNotPassed }

            jest.spyOn(utilsMock, 'calculateResponseTime').mockReturnValue(reqDuration)
            jest.spyOn(processDataService, 'getProcessData').mockReturnValue(processData)
            jest.spyOn(asyncLocalStorage, 'run').mockImplementationOnce(async (_ctx, cb) => {
                await cb()
            })

            await route.onAfterCall(ctx, {}, req, res, data)

            expect(ip).toBe('0.0.0.0')
            expect(methods).toEqual({})
            expect(port).toEqual(config.appPort)
            expect(ctx.locals.span.end).toHaveBeenCalledWith()
            expect(logger.info).toHaveBeenCalledWith('End call to endpoint', {
                duration: reqDuration,
                method: req.method,
                path: req.$alias.fullPath,
                statusCode: HttpStatusCode.OK,
            })
            expect(actionTypesJsonParse).toHaveBeenCalledWith(expectedData)
        })

        it.each([
            [
                'template was found for input error code',
                { errorCode: ErrorCode.ValidationError },
                {
                    error: <ResponseError>{
                        name: 'Error',
                        message: '',
                        code: HttpStatusCode.BAD_REQUEST,
                        errorCode: ErrorCode.ValidationError,
                        description: 'description',
                    },
                },
                (): void => {
                    jest.spyOn(errorTemplateService, 'fetchErrorTemplateByCode').mockResolvedValueOnce({
                        id: 'template-id',
                        errorCode: ErrorCode.ValidationError,
                        template: {
                            description: 'description',
                        },
                    })
                },
                (): void => {},
            ],
            [
                'template was not found for input error code',
                { errorCode: ErrorCode.ValidationError },
                {
                    error: <ResponseError>{
                        name: 'Error',
                        message: '',
                        code: HttpStatusCode.BAD_REQUEST,
                        errorCode: ErrorCode.ValidationError,
                    },
                },
                (): void => {
                    jest.spyOn(errorTemplateService, 'fetchErrorTemplateByCode').mockResolvedValueOnce(<ErrorTemplateResult>(<unknown>null))
                },
                (): void => {},
            ],
            [
                'fetching template throws error',
                { errorCode: ErrorCode.ValidationError },
                { errorCode: ErrorCode.ValidationError },
                (): void => {
                    jest.spyOn(errorTemplateService, 'fetchErrorTemplateByCode').mockRejectedValueOnce(new Error())
                },
                (): void => {
                    expect(logger.error).toHaveBeenCalledWith(`Failed to fetch error template by code ${ErrorCode.ValidationError}`)
                },
            ],
        ])(
            'should successfully handle response with error code in case %s',
            async (_msg, inputData, expectedData, initCaseStubs, checkCaseExpectations) => {
                let isRecording = true
                const spanMock = {
                    updateName: jest.fn(),
                    setAttribute: jest.fn(),
                    setAttributes: jest.fn(),
                    isRecording: jest.fn(() => isRecording),
                    end: jest.fn(() => {
                        isRecording = false
                    }),
                    recordException: jest.fn(),
                    setStatus: jest.fn(),
                }
                const { routes, ip, methods, port } = apiService(
                    routesBuilder,
                    errorTemplateService,
                    processDataService,
                    apiDocsRoute,
                    config,
                    logger,
                    <AsyncLocalStorage<AlsData>>asyncLocalStorage,
                    serviceName,
                    tracking,
                )
                const route = <ApiServiceRoute>routes[1]
                const reqDuration = 250
                const ctx = { meta: {}, locals: { span: spanMock } }
                const req = {
                    $params: { headers: { traceId: generateUuid() } },
                    query: {},
                    $alias: { fullPath: '/get' },
                    method: HttpMethod.DELETE,
                }
                const res = {
                    setHeader: jest.fn(),
                    end: jest.fn(),
                }

                jest.spyOn(utilsMock, 'calculateResponseTime').mockReturnValue(reqDuration)
                jest.spyOn(asyncLocalStorage, 'run').mockImplementationOnce(async (_ctx, cb) => {
                    await cb()
                })
                initCaseStubs()

                await route.onAfterCall(ctx, {}, req, res, inputData)

                expect(ip).toBe('0.0.0.0')
                expect(methods).toEqual({})
                expect(port).toEqual(config.appPort)
                expect(ctx.locals.span.end).toHaveBeenCalledWith()
                expect(logger.info).toHaveBeenCalledWith('End call to endpoint', {
                    duration: reqDuration,
                    method: req.method,
                    path: req.$alias.fullPath,
                    statusCode: HttpStatusCode.OK,
                })
                checkCaseExpectations()
                expect(actionTypesJsonParse).toHaveBeenCalledWith(expectedData)
            },
        )
    })

    describe('method: `onError`', () => {
        it.each(<[ResponseError, ResponseError, HttpStatusCode][]>[
            [
                { name: 'ServiceNotFoundError', data: { action: 'get' } },
                {
                    name: 'ServiceNotFoundError',
                    message: 'Service temporarily unavailable',
                    code: HttpStatusCode.SERVICE_UNAVAILABLE,
                    data: { action: 'get' },
                },
                HttpStatusCode.SERVICE_UNAVAILABLE,
            ],
            [
                { name: 'ServiceNotFoundError', data: { action: 'create' } },
                {
                    name: 'ServiceNotFoundError',
                    message: 'Not Found',
                    data: { action: 'create' },
                },
                HttpStatusCode.INTERNAL_SERVER_ERROR,
            ],
            [
                { name: 'ServiceNotAvailableError' },
                {
                    name: 'ServiceNotAvailableError',
                    code: HttpStatusCode.SERVICE_UNAVAILABLE,
                },
                HttpStatusCode.SERVICE_UNAVAILABLE,
            ],
            [
                { name: 'MongoError' },
                {
                    name: 'DatabaseError',
                    message: 'Database error',
                    code: HttpStatusCode.UNPROCESSABLE_ENTITY,
                },
                HttpStatusCode.UNPROCESSABLE_ENTITY,
            ],
            [
                { name: 'MoleculerError' },
                {
                    name: 'ApplicationError',
                },
                HttpStatusCode.INTERNAL_SERVER_ERROR,
            ],
            [
                { name: 'RequestRejectedError', data: {}, type: 'type' },
                {
                    name: 'ServiceNotAvailableError',
                    message: 'Service not available',
                    code: HttpStatusCode.SERVICE_UNAVAILABLE,
                },
                HttpStatusCode.SERVICE_UNAVAILABLE,
            ],
        ])(
            'should handle in case error is %s and does not include data with process code',
            async (inputError, expectedError, expectedStatusCode) => {
                let isRecording = true
                const spanMock = {
                    updateName: jest.fn(),
                    setAttribute: jest.fn(),
                    setAttributes: jest.fn(),
                    isRecording: jest.fn(() => isRecording),
                    end: jest.fn(() => {
                        isRecording = false
                    }),
                    recordException: jest.fn(),
                    setStatus: jest.fn(),
                }
                const { routes, ip, methods, port } = apiService(
                    routesBuilder,
                    errorTemplateService,
                    processDataService,
                    apiDocsRoute,
                    config,
                    logger,
                    <AsyncLocalStorage<AlsData>>asyncLocalStorage,
                    serviceName,
                    tracking,
                )
                const route = <ApiServiceRoute>routes[1]
                const reqDuration = 250
                const req = {
                    $params: { headers: { traceId: generateUuid() } },
                    query: {},
                    $alias: { fullPath: '/get' },
                    method: HttpMethod.DELETE,
                    url: '/',
                    $route: {
                        aliases: [{ action: 'get' }],
                    },
                    $ctx: { meta: {}, locals: { span: spanMock } },
                }
                const res = {
                    setHeader: jest.fn(),
                    writeHead: jest.fn(),
                    end: jest.fn(),
                }

                jest.spyOn(utilsMock, 'calculateResponseTime').mockReturnValue(reqDuration)
                jest.spyOn(asyncLocalStorage, 'run').mockImplementationOnce(async (_ctx, cb) => {
                    await cb()
                })

                await route.onError(req, res, inputError)

                expect(ip).toBe('0.0.0.0')
                expect(methods).toEqual({})
                expect(port).toEqual(config.appPort)
                expect(utilsMock.handleValidationError).toHaveBeenCalledWith(inputError)
                expect(req.$ctx.locals.span.recordException).toHaveBeenCalledWith({
                    name: expectedError.name,
                    message: expectedError.message,
                    code: expectedStatusCode,
                })
                expect(req.$ctx.locals.span.setStatus).toHaveBeenCalledWith({ code: SpanStatusCode.ERROR, message: expectedError.message })
                expect(req.$ctx.locals.span.end).toHaveBeenCalledWith()
                expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json; charset=utf-8')
                expect(res.writeHead).toHaveBeenCalledWith(expectedStatusCode)
                expect(res.end).toHaveBeenCalledWith(JSON.stringify(expectedError, null, 2))
                expect(logger.error).toHaveBeenCalledWith('Error while call to endpoint', {
                    duration: reqDuration,
                    method: req.method,
                    path: req.$alias.fullPath,
                    originalUrl: req.url,
                    statusCode: expectedStatusCode,
                    errObj: expectedError,
                })
            },
        )

        it.each(<[string, ResponseError, ResponseError, () => void][]>[
            [
                'and process code is error code with template',
                {
                    data: { processCode: ErrorCode.ValidationError },
                    message: 'Unable to pass attestation',
                },
                {
                    message: 'Unable to pass attestation',
                    code: HttpStatusCode.BAD_REQUEST,
                    data: {},
                    errorCode: ErrorCode.ValidationError,
                    description: 'description',
                },
                (): void => {
                    jest.spyOn(utilsMock, 'isErrorCode').mockReturnValue(true)
                    jest.spyOn(errorTemplateService, 'fetchErrorTemplateByCode').mockResolvedValueOnce({
                        id: 'template-id',
                        errorCode: ErrorCode.ValidationError,
                        template: {
                            description: 'description',
                        },
                    })
                },
            ],
            [
                'but template not found for this code',
                {
                    data: { processCode: ErrorCode.ValidationError },
                    message: 'Unable to pass attestation',
                },
                {
                    message: 'Unable to pass attestation',
                    code: HttpStatusCode.BAD_REQUEST,
                    data: {
                        processCode: ErrorCode.ValidationError,
                        description: 'Process code template is not provided. Ask tech support for details',
                    },
                },
                (): void => {
                    jest.spyOn(utilsMock, 'isErrorCode').mockReturnValue(false)
                    jest.spyOn(errorTemplateService, 'fetchErrorTemplateByCode').mockResolvedValueOnce(<ErrorTemplateResult>(<unknown>null))
                },
            ],
            [
                'and error code but template not found for this code',
                {
                    data: { processCode: ErrorCode.ValidationError, code: HttpStatusCode.INTERNAL_SERVER_ERROR },
                    message: 'Unable to pass attestation',
                },
                {
                    message: 'Unable to pass attestation',
                    code: HttpStatusCode.INTERNAL_SERVER_ERROR,
                    data: {
                        processCode: ErrorCode.ValidationError,
                        code: HttpStatusCode.INTERNAL_SERVER_ERROR,
                        description: 'Process code template is not provided. Ask tech support for details',
                    },
                },
                (): void => {
                    jest.spyOn(utilsMock, 'isErrorCode').mockReturnValue(false)
                    jest.spyOn(errorTemplateService, 'fetchErrorTemplateByCode').mockResolvedValueOnce(<ErrorTemplateResult>(<unknown>null))
                },
            ],
        ])('should handle in case error includes data with process code %s', async (_msg, inputError, expectedError, initCaseStubs) => {
            let isRecording = true
            const spanMock = {
                updateName: jest.fn(),
                setAttribute: jest.fn(),
                setAttributes: jest.fn(),
                isRecording: jest.fn(() => isRecording),
                end: jest.fn(() => {
                    isRecording = false
                }),
                recordException: jest.fn(),
                setStatus: jest.fn(),
            }
            const { routes, ip, methods, port } = apiService(
                routesBuilder,
                errorTemplateService,
                processDataService,
                apiDocsRoute,
                config,
                logger,
                <AsyncLocalStorage<AlsData>>asyncLocalStorage,
                serviceName,
                tracking,
            )
            const route = <ApiServiceRoute>routes[1]
            const reqDuration = 250
            const req = {
                $params: { headers: { traceId: generateUuid() } },
                query: {},
                $alias: { fullPath: '/get' },
                method: HttpMethod.DELETE,
                url: '/',
                $route: {
                    aliases: [{ action: 'get' }],
                },
                $ctx: { meta: {}, locals: { span: spanMock } },
            }
            const res = {
                setHeader: jest.fn(),
                writeHead: jest.fn(),
                end: jest.fn(),
            }

            jest.spyOn(utilsMock, 'calculateResponseTime').mockReturnValue(reqDuration)
            jest.spyOn(asyncLocalStorage, 'run').mockImplementationOnce(async (_ctx, cb) => {
                await cb()
            })
            initCaseStubs()

            await route.onError(req, res, inputError)

            expect(ip).toBe('0.0.0.0')
            expect(methods).toEqual({})
            expect(port).toEqual(config.appPort)
            expect(utilsMock.handleValidationError).toHaveBeenCalledWith(inputError)
            expect(req.$ctx.locals.span.recordException).toHaveBeenCalledWith({
                name: undefined,
                message: inputError.message,
                code: expectedError.code,
            })
            expect(req.$ctx.locals.span.setStatus).toHaveBeenCalledWith({ code: SpanStatusCode.ERROR, message: inputError.message })
            expect(req.$ctx.locals.span.end).toHaveBeenCalledWith()
            expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json; charset=utf-8')
            expect(res.writeHead).toHaveBeenCalledWith(expectedError.code)
            expect(res.end).toHaveBeenCalledWith(JSON.stringify(expectedError, null, 2))
            expect(logger.error).toHaveBeenCalledWith('Error while call to endpoint', {
                duration: reqDuration,
                method: req.method,
                path: req.$alias.fullPath,
                originalUrl: req.url,
                statusCode: expectedError.code,
                errObj: expectedError,
            })
        })

        it('should handle in case error includes data with process code and process code is not error code but with process data', async () => {
            let isRecording = true
            const spanMock = {
                updateName: jest.fn(),
                setAttribute: jest.fn(),
                setAttributes: jest.fn(),
                isRecording: jest.fn(() => isRecording),
                end: jest.fn(() => {
                    isRecording = false
                }),
                recordException: jest.fn(),
                setStatus: jest.fn(),
            }
            const { routes, ip, methods, port } = apiService(
                routesBuilder,
                errorTemplateService,
                processDataService,
                apiDocsRoute,
                config,
                logger,
                <AsyncLocalStorage<AlsData>>asyncLocalStorage,
                serviceName,
                tracking,
            )
            const route = <ApiServiceRoute>routes[1]
            const reqDuration = 250
            const req = {
                $params: { headers: { traceId: generateUuid() } },
                query: {},
                $alias: { fullPath: '/get' },
                method: HttpMethod.DELETE,
                url: '/',
                $route: {
                    aliases: [{ action: 'get' }],
                },
                $ctx: { meta: {}, locals: { span: spanMock } },
            }
            const res = {
                setHeader: jest.fn(),
                writeHead: jest.fn(),
                end: jest.fn(),
            }
            const inputError = {
                data: { processCode: ProcessCode.AttestationNotPassed },
            }
            const processDataResult = <ProcessData>{
                processCode: ProcessCode.AttestationNotPassed,
                template: {},
            }
            const expectedStatusCode = HttpStatusCode.OK

            jest.spyOn(utilsMock, 'isErrorCode').mockReturnValue(false)
            jest.spyOn(processDataService, 'getProcessData').mockReturnValue(processDataResult)
            jest.spyOn(utilsMock, 'calculateResponseTime').mockReturnValue(reqDuration)
            jest.spyOn(asyncLocalStorage, 'run').mockImplementationOnce(async (_ctx, cb) => {
                await cb()
            })

            await route.onError(req, res, inputError)

            expect(ip).toBe('0.0.0.0')
            expect(methods).toEqual({})
            expect(port).toEqual(config.appPort)
            expect(utilsMock.handleValidationError).not.toHaveBeenCalledWith(inputError)
            expect(req.$ctx.locals.span.recordException).not.toHaveBeenCalled()
            expect(req.$ctx.locals.span.setStatus).not.toHaveBeenCalled()
            expect(req.$ctx.locals.span.end).toHaveBeenCalledWith()
            expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json; charset=utf-8')
            expect(res.writeHead).toHaveBeenCalledWith(expectedStatusCode)
            expect(res.end).toHaveBeenCalledWith(JSON.stringify(processDataResult))
        })
    })
})
