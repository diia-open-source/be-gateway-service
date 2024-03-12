import { AsyncLocalStorage } from 'async_hooks'

jest.mock('awilix', () => {
    const originAwilix = jest.requireActual('awilix')

    return { ...originAwilix, listModules: (): unknown => originAwilix.listModules('src/routes/*.ts') }
})

import { AuthService } from '@diia-inhouse/crypto'
import Logger from '@diia-inhouse/diia-logger'
import { MetricsService } from '@diia-inhouse/diia-metrics'
import { EventBus, ExternalCommunicator } from '@diia-inhouse/diia-queue'
import { Env, EnvService } from '@diia-inhouse/env'
import { CacheService, StoreService } from '@diia-inhouse/redis'
import { mockClass, mockInstance } from '@diia-inhouse/test'
import { AlsData, HttpMethod } from '@diia-inhouse/types'

import AuthenticateMiddleware from '@src/middlewares/authenticate'
import ExternalMiddleware from '@src/middlewares/external'
import FileMiddleware from '@src/middlewares/fileUpload'
import HeaderMiddleware from '@src/middlewares/header'
import MultipartMiddleware from '@src/middlewares/multipart'
import ProxyMiddleware from '@src/middlewares/proxy'
import RedirectMiddleware from '@src/middlewares/redirect'
import RoutesBuilder from '@src/routes'
import HeaderValidation from '@src/validation/header'

import PartnerService from '@services/partner'
import ProcessDataService from '@services/processData'
import UserService from '@services/user'

import TrackingService from '@utils/tracking'

import { AppConfig } from '@interfaces/types/config'

const AuthenticateMiddlewareMock = mockClass(AuthenticateMiddleware)
const ExternalMiddlewareMock = mockClass(ExternalMiddleware)
const FileMiddlewareMock = mockClass(FileMiddleware)
const HeaderMiddlewareMock = mockClass(HeaderMiddleware)
const MultipartMiddlewareMock = mockClass(MultipartMiddleware)
const ProxyMiddlewareMock = mockClass(ProxyMiddleware)
const RedirectMiddlewareMock = mockClass(RedirectMiddleware)
const LoggerMock = mockClass(Logger)
const AsyncLocalStorageMock = mockClass(AsyncLocalStorage)

const metrics = mockInstance(MetricsService, {
    totalRequestMetric: {
        increment: jest.fn(),
    },
    totalTimerMetric: {
        observeSeconds: jest.fn(),
    },
})
const tracking = new TrackingService(metrics)
const deployedServiceName = 'Gateway'

const envService = new EnvService(new LoggerMock())
const currentEnv = envService.getEnv()

describe('RoutesBuilder', () => {
    const authenticateMiddleware = new AuthenticateMiddlewareMock(
        <PartnerService>{},
        <AppConfig>{},
        <AuthService>{},
        <UserService>{},
        <CacheService>{},
        <StoreService>{},
        <EventBus>{},
        <Logger>{},
    )
    const headerMiddleware = new HeaderMiddlewareMock(<HeaderValidation>{}, <AuthenticateMiddleware>{}, <AsyncLocalStorage<AlsData>>{})
    const fileUploadMiddleware = new FileMiddlewareMock(<CacheService>{}, <Logger>{})
    const multipartMiddleware = new MultipartMiddlewareMock(<Logger>{})
    const redirectMiddleware = new RedirectMiddlewareMock(<Logger>{})
    const externalMiddleware = new ExternalMiddlewareMock(<Logger>{}, <ExternalCommunicator>{})
    const proxyMiddleware = new ProxyMiddlewareMock(<EnvService>{}, <Logger>{}, <ProcessDataService>{}, deployedServiceName, tracking)
    const logger = new LoggerMock()
    const asyncLocalStorage = new AsyncLocalStorageMock()

    afterAll(() => {
        process.env.NODE_ENV = currentEnv
    })

    describe(`method: ${RoutesBuilder.prototype.buildRoutes.name}`, () => {
        it.each(Object.values(Env))('should successfully build routes for %s environment', (env: Env) => {
            const routeHandlersCheckLimit = 100
            const routesBuilder = new RoutesBuilder(
                authenticateMiddleware,
                headerMiddleware,
                fileUploadMiddleware,
                multipartMiddleware,
                redirectMiddleware,
                externalMiddleware,
                proxyMiddleware,
                logger,
                <AsyncLocalStorage<AlsData>>asyncLocalStorage,
            )

            process.env.NODE_ENV = env

            const { aliases } = routesBuilder.buildRoutes()

            expect(aliases).not.toEqual({})

            const routesNames = Object.keys(aliases)

            routesNames.forEach((routeName: string) => {
                const [method, path] = routeName.split(' ')
                const isHttpMethod = new RegExp(`${Object.values(HttpMethod).join('|')}`, 'gi')

                expect(isHttpMethod.test(method)).toBeTruthy()
                expect(path).toBeTruthy()
            })

            routesNames.slice(0, routeHandlersCheckLimit).forEach((routeName: string) => {
                const [method, url] = routeName.split(' ')
                const req = {
                    $ctx: { locals: {} },
                    url,
                    $params: {},
                    body: {},
                    query: {},
                    method,
                }

                const res = { setHeader: jest.fn() }
                const next = jest.fn()

                const routeHandlers = <CallableFunction[]>aliases[routeName].filter((routeHandler) => typeof routeHandler === 'function')

                routeHandlers.forEach((routeHandler: CallableFunction) => {
                    routeHandler(req, res, next)
                })

                expect(asyncLocalStorage.run).toHaveBeenCalledWith(expect.anything(), next)
                expect(next).toHaveBeenCalledWith()
            })
        })
    })
})
