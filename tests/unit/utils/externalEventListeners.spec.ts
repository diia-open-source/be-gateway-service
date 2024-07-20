const utilsMock = {
    handleValidationError: jest.fn(),
    isErrorCode: jest.fn(),
}

jest.mock('@src/utils', () => utilsMock)

import { SetRequired } from 'type-fest'

import { MoleculerService } from '@diia-inhouse/diia-app'

import { AuthService } from '@diia-inhouse/crypto'
import { mongo } from '@diia-inhouse/db'
import { EventBus, EventMessageHandler, ExternalEventBus, MessagePayload } from '@diia-inhouse/diia-queue'
import { RabbitMQProvider } from '@diia-inhouse/diia-queue/dist/types/providers/rabbitmq'
import { EnvService } from '@diia-inhouse/env'
import { NotFoundError, ServiceUnavailableError } from '@diia-inhouse/errors'
import { CacheService, StoreService } from '@diia-inhouse/redis'
import TestKit, { mockClass } from '@diia-inhouse/test'
import { ActionVersion, HttpMethod, Logger, SessionType } from '@diia-inhouse/types'

import AuthenticateMiddleware from '@src/middlewares/authenticate'
import RoutesBuilder from '@src/routes'
import ExternalEventListenersUtils from '@src/utils/externalEventListeners'

import ErrorTemplateService from '@services/errorTemplate'
import PartnerService from '@services/partner'
import UserService from '@services/user'

import ErrorTemplateDataMapper from '@dataMappers/errorTemplateDataMapper'

import { generateUuid } from '@mocks/randomData'

import { MessageError } from '@interfaces/externalEventListeners'
import { ResponseError } from '@interfaces/index'
import { ExternalEvent } from '@interfaces/queue'
import { AppRoute } from '@interfaces/routes/appRoute'
import { PartnerAcquirersScope, PartnerScopeType } from '@interfaces/routes/documentAcquirers'
import { GetPartnerByTokenResult } from '@interfaces/services/partner'
import { AppConfig } from '@interfaces/types/config'

const AuthenticateMiddlewareMock = mockClass(AuthenticateMiddleware)
const PartnerServiceMock = mockClass(PartnerService)
const ErrorTemplateServiceMock = mockClass(ErrorTemplateService)
const ExternalEventBusMock = mockClass(ExternalEventBus)

describe('ExternalEventListenersUtils', () => {
    const testKit = new TestKit()
    const routesBuilder = {
        routeByExternalEventMap: new Map(),
    }
    const authenticateMiddlewareMock = new AuthenticateMiddlewareMock(
        <PartnerService>{},
        <AppConfig>{},
        <AuthService>{},
        <UserService>{},
        <CacheService>{},
        <StoreService>{},
        <EventBus>{},
        <Logger>{},
    )
    const partnerServiceMock = new PartnerServiceMock(() => <MoleculerService>{})
    const errorTemplateServiceMock = new ErrorTemplateServiceMock(<ErrorTemplateDataMapper>{}, <StoreService>{})
    const externalEventBusMock = new ExternalEventBusMock(<RabbitMQProvider>{}, [], <EventMessageHandler>{}, <EnvService>{}, <Logger>{})
    const externalEventListenersUtils = new ExternalEventListenersUtils(
        <RoutesBuilder>routesBuilder,
        authenticateMiddlewareMock,
        partnerServiceMock,
        errorTemplateServiceMock,
        externalEventBusMock,
    )

    describe(`method: ${externalEventListenersUtils.validatePartnerRoute.name}`, () => {
        it('should successfully validate partner route', async () => {
            const partnerToken = 'partner-token'
            const {
                partner: { _id: id, scopes },
            } = testKit.session.getPartnerSession()
            const route: AppRoute = {
                action: 'pathAction',
                method: HttpMethod.GET,
                path: '/path/to/action',
                auth: [
                    {
                        version: ActionVersion.V1,
                        sessionType: SessionType.Partner,
                        scopes: { [PartnerScopeType.acquirers]: [PartnerAcquirersScope.Create] },
                    },
                ],
            }
            const partnerByTokenResult: GetPartnerByTokenResult = {
                _id: id.toString(),
                scopes,
            }

            routesBuilder.routeByExternalEventMap.set(ExternalEvent.AcquirerDocumentResponse, route)

            jest.spyOn(partnerServiceMock, 'getPartnerByToken').mockResolvedValueOnce(partnerByTokenResult)
            jest.spyOn(authenticateMiddlewareMock, 'getRouteAuthParams').mockReturnValueOnce(route.auth[0])

            expect(await externalEventListenersUtils.validatePartnerRoute(ExternalEvent.AcquirerDocumentResponse, partnerToken)).toEqual([
                <SetRequired<AppRoute, 'action'>>route,
                {
                    partner: { _id: new mongo.ObjectId(id), scopes, sessionType: SessionType.Partner, refreshToken: null },
                    sessionType: SessionType.Partner,
                },
            ])
            expect(partnerServiceMock.getPartnerByToken).toHaveBeenCalledWith(partnerToken)
            expect(authenticateMiddlewareMock.getRouteAuthParams).toHaveBeenCalledWith(ActionVersion.V1, route.auth)
            expect(authenticateMiddlewareMock.validateScopes).toHaveBeenCalledWith(route.auth[0].scopes, scopes)
        })

        it('should fail in case handler is not found for provided event type', async () => {
            await expect(async () => {
                await externalEventListenersUtils.validatePartnerRoute(ExternalEvent.AcquirerDocumentRequest, 'partner-token')
            }).rejects.toEqual(new NotFoundError('Unexpected event without handler received'))
        })
    })

    describe(`method: ${externalEventListenersUtils.handleError.name}`, () => {
        const eventUuid = generateUuid()

        it.each([
            [
                'with existing template',
                ExternalEvent.AcquirerDocumentResponse,
                {
                    code: 400,
                    message: 'Invalid parameter',
                    name: 'ValidationError',
                    data: {
                        processCode: 1000,
                    },
                },
                {
                    uuid: eventUuid,
                    error: <MessageError>{
                        http_code: 400,
                        message: 'Invalid parameter',
                        data: {
                            processCode: 1000,
                        },
                        errorCode: 1000,
                        description: 'description',
                    },
                },
                (): void => {
                    utilsMock.isErrorCode.mockReturnValueOnce(true)
                    jest.spyOn(errorTemplateServiceMock, 'fetchErrorTemplateByCode').mockResolvedValueOnce({
                        errorCode: 1000,
                        id: 'id',
                        template: {
                            description: 'description',
                        },
                    })
                },
                (): void => {
                    expect(utilsMock.isErrorCode).toHaveBeenCalledWith(1000)
                    expect(errorTemplateServiceMock.fetchErrorTemplateByCode).toHaveBeenCalledWith(1000)
                },
            ],
            [
                'when template is not found',
                ExternalEvent.AcquirerDocumentResponse,
                {
                    code: 400,
                    message: 'Invalid parameter',
                    name: 'ValidationError',
                    data: {
                        processCode: 1000,
                    },
                },
                {
                    uuid: eventUuid,
                    error: <MessageError>{
                        http_code: 400,
                        message: 'Invalid parameter',
                        data: {
                            processCode: 1000,
                        },
                        errorCode: 1000,
                    },
                },
                (): void => {
                    utilsMock.isErrorCode.mockReturnValueOnce(true)
                },
                (): void => {
                    expect(utilsMock.isErrorCode).toHaveBeenCalledWith(1000)
                    expect(errorTemplateServiceMock.fetchErrorTemplateByCode).toHaveBeenCalledWith(1000)
                },
            ],
            [
                'when process code is not specified',
                ExternalEvent.AcquirerDocumentResponse,
                {
                    code: 400,
                    message: 'Invalid parameter',
                    name: 'ValidationError',
                },
                {
                    uuid: eventUuid,
                    error: <MessageError>{
                        http_code: 400,
                        message: 'Invalid parameter',
                    },
                },
                (): void => {},
                (): void => {},
            ],
        ])(
            'should successfully handle and publish to external event bus %s',
            async (
                _msg: string,
                event: ExternalEvent,
                inputError: ResponseError,
                messagePayload: MessagePayload,
                defineSpies: CallableFunction,
                checkExpectations: CallableFunction,
            ) => {
                defineSpies()
                jest.spyOn(externalEventBusMock, 'publish').mockResolvedValueOnce(true)

                await expect(async () => {
                    await externalEventListenersUtils.handleError(inputError, event, eventUuid)
                }).rejects.toEqual(new ServiceUnavailableError(inputError.message))
                expect(utilsMock.handleValidationError).toHaveBeenCalledWith(inputError)
                expect(externalEventBusMock.publish).toHaveBeenCalledWith(event, messagePayload)
                checkExpectations()
            },
        )
    })
})
