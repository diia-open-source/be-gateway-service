import { AsyncLocalStorage } from 'node:async_hooks'
import { randomUUID } from 'node:crypto'

import { BadRequestError } from '@diia-inhouse/errors'
import { ActionVersion, AlsData } from '@diia-inhouse/types'

import AuthenticateMiddleware from '@src/middlewares/authenticate'
import HeaderMiddleware from '@src/middlewares/header'
import HeaderValidation from '@src/validation/header'

import { ActionCustomHeader, Request, Response, RouteHeaderName, RouteHeaderRawName } from '@interfaces/index'

describe('HeaderMiddleware', () => {
    const headerValidationMock = {
        checkMobileUidHeader: jest.fn(),
        checkAppVersionHeader: jest.fn(),
        checkPlatformTypeHeader: jest.fn(),
        checkPlatformVersionHeader: jest.fn(),
    }

    const authenticateMiddlewareMock = {
        parseBearerToken: jest.fn(),
    }

    const asyncLocalStorageMock = {
        getStore: jest.fn(),
    }

    const headerMiddleware = new HeaderMiddleware(
        <HeaderValidation>(<unknown>headerValidationMock),
        <AuthenticateMiddleware>(<unknown>authenticateMiddlewareMock),
        <AsyncLocalStorage<AlsData>>(<unknown>asyncLocalStorageMock),
    )

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('method: `addMobileUidHeader`', () => {
        it('should set Mobile-Uid header when mobile UID is valid', () => {
            const validMobileUid = 'valid-mobile-uid'

            const reqMock = <Request>{
                headers: {
                    [RouteHeaderRawName.MOBILE_UID]: validMobileUid,
                },
                $params: {
                    headers: {
                        [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                    },
                },
            }

            headerValidationMock.checkMobileUidHeader.mockReturnValue(true)

            const nextMock = jest.fn()

            const middleware = headerMiddleware.addMobileUidHeader({
                name: RouteHeaderRawName.MOBILE_UID,
                versions: [ActionVersion.V1],
            })

            middleware(reqMock, <Response>{}, nextMock)
            expect(headerValidationMock.checkMobileUidHeader).toHaveBeenCalledWith(validMobileUid)
            expect(reqMock.$params.headers[RouteHeaderName.MOBILE_UID]).toEqual(validMobileUid)
            expect(nextMock).toHaveBeenCalled()
        })

        it('should update header value in async local storage', () => {
            const mobileUid = randomUUID()
            const req = <Request>{
                headers: { [RouteHeaderRawName.MOBILE_UID]: mobileUid },
                $params: { headers: { [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1 } },
            }
            const store = { headers: {} }

            headerValidationMock.checkMobileUidHeader.mockReturnValue(true)
            asyncLocalStorageMock.getStore.mockReturnValueOnce(store)

            const nextMock = jest.fn()

            const middleware = headerMiddleware.addMobileUidHeader({
                name: RouteHeaderRawName.MOBILE_UID,
                versions: [ActionVersion.V1],
            })

            middleware(req, <Response>{}, nextMock)
            expect(store.headers).toEqual({ [RouteHeaderName.MOBILE_UID]: mobileUid })
            expect(nextMock).toHaveBeenCalled()
        })

        it('should throw BadRequestError when mobile UID is invalid', () => {
            const reqMock = <Request>(<unknown>{
                headers: {
                    'Mobile-Uid': 'invalid-mobile-uid',
                },
                $params: {
                    headers: {
                        [RouteHeaderRawName.MOBILE_UID]: 'invalid-mobile-uid',
                    },
                },
            })

            headerValidationMock.checkMobileUidHeader.mockReturnValue(false)

            const middleware = headerMiddleware.addMobileUidHeader({
                name: RouteHeaderRawName.MOBILE_UID,
                versions: [ActionVersion.V1],
            })

            expect(() => middleware(reqMock, <Response>{}, () => {})).toThrow(BadRequestError)
        })

        it('should throw error if header is not provided', () => {
            const headerRawName = RouteHeaderRawName.MOBILE_UID
            const req = <Request>{
                headers: {},
                $params: { headers: { [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1 } },
            }

            headerValidationMock.checkMobileUidHeader.mockReturnValue(true)

            const nextMock = jest.fn()

            const middleware = headerMiddleware.addMobileUidHeader({
                name: headerRawName,
                versions: [ActionVersion.V1],
            })

            expect(() => middleware(req, <Response>{}, nextMock)).toThrow(new BadRequestError(`Header [${headerRawName}] is absent`))
            expect(nextMock).not.toHaveBeenCalled()
        })
    })

    describe('method: `setAcceptLanguageHeader`', () => {
        it('should set App-Locale header if header value exists', () => {
            const reqMock = <Request>{
                headers: {
                    [RouteHeaderRawName.APP_LOCALE]: 'en-US',
                },
                $params: {
                    headers: {},
                },
            }

            const nextMock = jest.fn()

            const middleware = headerMiddleware.setAcceptLanguageHeader

            middleware(reqMock, <Response>{}, nextMock)

            expect(reqMock.$params.headers[RouteHeaderName.APP_LOCALE]).toBe('en-US')
            expect(nextMock).toHaveBeenCalled()
        })

        it('should not set App-Locale header if header value does not exist', () => {
            const reqMock = <Request>{
                headers: {},
                $params: {
                    headers: {},
                },
            }

            const nextMock = jest.fn()

            const middleware = headerMiddleware.setAcceptLanguageHeader

            middleware(reqMock, <Response>{}, nextMock)

            expect(reqMock.$params.headers[RouteHeaderName.APP_LOCALE]).toBeUndefined()
            expect(nextMock).toHaveBeenCalled()
        })
    })

    describe('method: `addTokenHeader`', () => {
        it('should add Token header with parsed bearer token', () => {
            const reqMock = <Request>{
                $params: {
                    headers: {},
                },
            }

            const localAuthenticateMiddlewareMock = {
                parseBearerToken: jest.fn(() => 'parsed-token'),
            }

            const localHeaderMiddleware = new HeaderMiddleware(
                <HeaderValidation>(<unknown>headerValidationMock),
                <AuthenticateMiddleware>(<unknown>localAuthenticateMiddlewareMock),
                <AsyncLocalStorage<AlsData>>(<unknown>asyncLocalStorageMock),
            )

            const nextMock = jest.fn()
            const middleware = localHeaderMiddleware.addTokenHeader()

            middleware(reqMock, <Response>{}, nextMock)

            expect(reqMock.$params.headers[RouteHeaderName.TOKEN]).toBe('parsed-token')
            expect(localAuthenticateMiddlewareMock.parseBearerToken).toHaveBeenCalledWith(reqMock)
            expect(nextMock).toHaveBeenCalled()
        })
    })

    describe('method: `addAppVersionHeader`', () => {
        it('should set App-Version header when version is valid', () => {
            const reqMock = <Request>{
                headers: {
                    [RouteHeaderRawName.APP_VERSION]: '1.0.0',
                },
                $params: {
                    headers: {
                        [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                    },
                },
            }

            headerValidationMock.checkAppVersionHeader.mockReturnValue(true)

            const nextMock = jest.fn()

            const middleware = headerMiddleware.addAppVersionHeader({
                name: RouteHeaderRawName.APP_VERSION,
                versions: [ActionVersion.V1],
            })

            middleware(reqMock, <Response>{}, nextMock)

            expect(headerValidationMock.checkAppVersionHeader).toHaveBeenCalledWith('1.0.0')
            expect(reqMock.$params.headers[RouteHeaderName.APP_VERSION]).toBe('1.0.0')
            expect(nextMock).toHaveBeenCalled()
        })

        it('should throw BadRequestError when version is invalid and required', () => {
            const reqMock = <Request>{
                headers: {},
                $params: {
                    headers: {
                        [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                    },
                },
            }

            headerValidationMock.checkAppVersionHeader.mockReturnValue(false)

            const nextMock = jest.fn()

            const middleware = headerMiddleware.addAppVersionHeader({
                name: RouteHeaderRawName.APP_VERSION,
                versions: [ActionVersion.V1],
            })

            expect(() => middleware(reqMock, <Response>{}, nextMock)).toThrow(BadRequestError)
            expect(headerValidationMock.checkAppVersionHeader).toHaveBeenCalledWith(undefined)
            expect(reqMock.$params.headers[RouteHeaderName.APP_VERSION]).toBeUndefined()
            expect(nextMock).not.toHaveBeenCalled()
        })

        it('should not throw error when version is invalid but not required', () => {
            const reqMock = <Request>{
                headers: {},
                $params: {
                    headers: {},
                },
            }

            const localHeaderValidationMock = {
                checkAppVersionHeader: jest.fn(() => false),
            }

            const nextMock = jest.fn()

            const localHeaderMiddleware = new HeaderMiddleware(
                <HeaderValidation>(<unknown>localHeaderValidationMock),
                <AuthenticateMiddleware>(<unknown>authenticateMiddlewareMock),
                <AsyncLocalStorage<AlsData>>(<unknown>asyncLocalStorageMock),
            )

            const middleware = localHeaderMiddleware.addAppVersionHeader({
                name: RouteHeaderRawName.APP_VERSION,
                versions: [ActionVersion.V1],
            })

            expect(() => middleware(reqMock, <Response>{}, nextMock)).not.toThrow(BadRequestError)
            expect(localHeaderValidationMock.checkAppVersionHeader).toHaveBeenCalledWith(undefined)
            expect(reqMock.$params.headers[RouteHeaderName.APP_VERSION]).toBeUndefined()
            expect(nextMock).toHaveBeenCalled()
        })
    })

    describe('method: `addPlatformTypeHeader`', () => {
        it('should set Platform-Type header when platform type is valid', () => {
            const reqMock = <Request>{
                headers: {
                    [RouteHeaderRawName.PLATFORM_TYPE]: 'iOS',
                },
                $params: {
                    headers: {
                        [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                    },
                },
            }

            headerValidationMock.checkPlatformTypeHeader.mockReturnValue(true)

            const nextMock = jest.fn()

            const middleware = headerMiddleware.addPlatformTypeHeader({
                name: RouteHeaderRawName.PLATFORM_TYPE,
                versions: [ActionVersion.V1],
            })

            middleware(reqMock, <Response>{}, nextMock)

            expect(headerValidationMock.checkPlatformTypeHeader).toHaveBeenCalledWith('iOS')
            expect(reqMock.$params.headers[RouteHeaderName.PLATFORM_TYPE]).toBe('iOS')
            expect(nextMock).toHaveBeenCalled()
        })

        it('should throw BadRequestError when platform type is invalid and required', () => {
            const reqMock = <Request>{
                headers: {},
                $params: {
                    headers: {
                        [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                    },
                },
            }

            headerValidationMock.checkPlatformTypeHeader.mockReturnValue(false)

            const nextMock = jest.fn()

            const middleware = headerMiddleware.addPlatformTypeHeader({
                name: RouteHeaderRawName.PLATFORM_TYPE,
                versions: [ActionVersion.V1],
            })

            expect(() => middleware(reqMock, <Response>{}, nextMock)).toThrow(BadRequestError)
            expect(headerValidationMock.checkPlatformTypeHeader).toHaveBeenCalledWith(undefined)
            expect(reqMock.$params.headers[RouteHeaderName.PLATFORM_TYPE]).toBeUndefined()
            expect(nextMock).not.toHaveBeenCalled()
        })

        it('should not throw error when platform type is invalid but not required', () => {
            const reqMock = <Request>{
                headers: {},
                $params: {
                    headers: {},
                },
            }

            headerValidationMock.checkPlatformTypeHeader.mockReturnValue(false)

            const nextMock = jest.fn()

            const middleware = headerMiddleware.addPlatformTypeHeader({
                name: RouteHeaderRawName.PLATFORM_TYPE,
                versions: [ActionVersion.V1],
            })

            expect(() => middleware(reqMock, <Response>{}, nextMock)).not.toThrow(BadRequestError)
            expect(headerValidationMock.checkPlatformTypeHeader).toHaveBeenCalledWith(undefined)
            expect(reqMock.$params.headers[RouteHeaderName.PLATFORM_TYPE]).toBeUndefined()
            expect(nextMock).toHaveBeenCalled()
        })
    })

    describe('method: `addPlatformVersionHeader`', () => {
        it('should set Platform-Version header when platform version is valid', () => {
            const reqMock = <Request>{
                headers: {
                    [RouteHeaderRawName.PLATFORM_VERSION]: '1.0.0',
                },
                $params: {
                    headers: {
                        [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                    },
                },
            }

            headerValidationMock.checkPlatformVersionHeader.mockReturnValue(true)

            const nextMock = jest.fn()

            const middleware = headerMiddleware.addPlatformVersionHeader({
                name: RouteHeaderRawName.PLATFORM_VERSION,
                versions: [ActionVersion.V1],
            })

            middleware(reqMock, <Response>{}, nextMock)

            expect(headerValidationMock.checkPlatformVersionHeader).toHaveBeenCalledWith('1.0.0')
            expect(reqMock.$params.headers[RouteHeaderName.PLATFORM_VERSION]).toBe('1.0.0')
            expect(nextMock).toHaveBeenCalled()
        })

        it('should throw BadRequestError when platform version is invalid and required', () => {
            const reqMock = <Request>{
                headers: {},
                $params: {
                    headers: {
                        [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                    },
                },
            }

            headerValidationMock.checkPlatformVersionHeader.mockReturnValue(false)

            const nextMock = jest.fn()

            const middleware = headerMiddleware.addPlatformVersionHeader({
                name: RouteHeaderRawName.PLATFORM_VERSION,
                versions: [ActionVersion.V1],
            })

            expect(() => middleware(reqMock, <Response>{}, nextMock)).toThrow(BadRequestError)
            expect(headerValidationMock.checkPlatformVersionHeader).toHaveBeenCalledWith(undefined)
            expect(reqMock.$params.headers[RouteHeaderName.PLATFORM_VERSION]).toBeUndefined()
            expect(nextMock).not.toHaveBeenCalled()
        })

        it('should not throw error when platform version is invalid but not required', () => {
            const reqMock = <Request>{
                headers: {},
                $params: {
                    headers: {},
                },
            }

            headerValidationMock.checkPlatformVersionHeader.mockReturnValue(false)

            const nextMock = jest.fn()

            const middleware = headerMiddleware.addPlatformVersionHeader({
                name: RouteHeaderRawName.PLATFORM_VERSION,
                versions: [ActionVersion.V1],
            })

            expect(() => middleware(reqMock, <Response>{}, nextMock)).not.toThrow(BadRequestError)
            expect(headerValidationMock.checkPlatformVersionHeader).toHaveBeenCalledWith(undefined)
            expect(reqMock.$params.headers[RouteHeaderName.PLATFORM_VERSION]).toBeUndefined()
            expect(nextMock).toHaveBeenCalled()
        })
    })

    describe('method: `addTicketHeader`', () => {
        it('should set Ticket header when header value exists', () => {
            const reqMock = <Request>{
                headers: {
                    [RouteHeaderRawName.TICKET]: 'valid-ticket',
                },
                $params: {
                    headers: {
                        [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                    },
                },
            }

            const nextMock = jest.fn()

            const middleware = headerMiddleware.addTicketHeader({
                name: RouteHeaderRawName.TICKET,
                versions: [ActionVersion.V1],
            })

            middleware(reqMock, <Response>{}, nextMock)

            expect(reqMock.$params.headers[RouteHeaderName.TICKET]).toBe('valid-ticket')
            expect(nextMock).toHaveBeenCalled()
        })

        it('should throw BadRequestError when header value does not exist and required', () => {
            const reqMock = <Request>{
                headers: {},
                $params: {
                    headers: {
                        [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                    },
                },
            }

            const nextMock = jest.fn()

            const middleware = headerMiddleware.addTicketHeader({
                name: RouteHeaderRawName.TICKET,
                versions: [ActionVersion.V1],
            })

            expect(() => middleware(reqMock, <Response>{}, nextMock)).toThrow(BadRequestError)
            expect(reqMock.$params.headers[RouteHeaderName.TICKET]).toBeUndefined()
            expect(nextMock).not.toHaveBeenCalled()
        })

        it('should not throw error when header value does not exist but not required', () => {
            const reqMock = <Request>{
                headers: {},
                $params: {
                    headers: {},
                },
            }

            const nextMock = jest.fn()

            const middleware = headerMiddleware.addTicketHeader({
                name: RouteHeaderRawName.TICKET,
                versions: [ActionVersion.V1],
            })

            expect(() => middleware(reqMock, <Response>{}, nextMock)).not.toThrow(BadRequestError)
            expect(reqMock.$params.headers[RouteHeaderName.TICKET]).toBeUndefined()
            expect(nextMock).toHaveBeenCalled()
        })
    })

    describe('method: `addChannelUuidHeader`', () => {
        it('should set Channel-UUID header when header value exists', () => {
            const reqMock = <Request>{
                headers: {
                    [RouteHeaderRawName.CHANNEL_UUID]: 'valid-channel-uuid',
                },
                $params: {
                    headers: {
                        [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                    },
                },
            }

            const nextMock = jest.fn()

            const middleware = headerMiddleware.addChannelUuidHeader({
                name: RouteHeaderRawName.CHANNEL_UUID,
                versions: [ActionVersion.V1],
            })

            middleware(reqMock, <Response>{}, nextMock)

            expect(reqMock.$params.headers[RouteHeaderName.CHANNEL_UUID]).toBe('valid-channel-uuid')
            expect(nextMock).toHaveBeenCalled()
        })

        it('should throw BadRequestError when header value does not exist and required', () => {
            const reqMock = <Request>{
                headers: {},
                $params: {
                    headers: {
                        [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                    },
                },
            }

            const nextMock = jest.fn()

            const middleware = headerMiddleware.addChannelUuidHeader({
                name: RouteHeaderRawName.CHANNEL_UUID,
                versions: [ActionVersion.V1],
            })

            expect(() => middleware(reqMock, <Response>{}, nextMock)).toThrow(BadRequestError)
            expect(reqMock.$params.headers[RouteHeaderName.CHANNEL_UUID]).toBeUndefined()
            expect(nextMock).not.toHaveBeenCalled()
        })

        it('should not throw error when header value does not exist but not required', () => {
            const reqMock = <Request>{
                headers: {},
                $params: {
                    headers: {},
                },
            }

            const nextMock = jest.fn()

            const middleware = headerMiddleware.addChannelUuidHeader({
                name: RouteHeaderRawName.CHANNEL_UUID,
                versions: [ActionVersion.V1],
            })

            expect(() => middleware(reqMock, <Response>{}, nextMock)).not.toThrow(BadRequestError)
            expect(reqMock.$params.headers[RouteHeaderName.CHANNEL_UUID]).toBeUndefined()
            expect(nextMock).toHaveBeenCalled()
        })
    })

    describe('method: `addDiiaPartnerIdHeader`', () => {
        it('should set App-Partner-Id header when header value exists and version is required', () => {
            const reqMock = <Request>{
                headers: {
                    [RouteHeaderRawName.APP_PARTNER_ID]: 'partner-id',
                },
                $params: {
                    headers: {
                        [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                    },
                },
            }

            const nextMock = jest.fn()

            const middleware = headerMiddleware.addDiiaPartnerIdHeader({
                name: RouteHeaderRawName.APP_PARTNER_ID,
                versions: [ActionVersion.V1],
            })

            middleware(reqMock, <Response>{}, nextMock)

            expect(reqMock.$params.headers[RouteHeaderName.APP_PARTNER_ID]).toBe('partner-id')
            expect(nextMock).toHaveBeenCalled()
        })

        it('should not set App-Partner-Id header when header value exists but version is not required', () => {
            const reqMock = <Request>{
                headers: {
                    [RouteHeaderRawName.APP_PARTNER_ID]: 'partner-id',
                },
                $params: {
                    headers: {},
                },
            }

            const nextMock = jest.fn()

            const middleware = headerMiddleware.addDiiaPartnerIdHeader({
                name: RouteHeaderRawName.APP_PARTNER_ID,
                versions: [ActionVersion.V2],
            })

            middleware(reqMock, <Response>{}, nextMock)

            expect(reqMock.$params.headers[RouteHeaderName.APP_PARTNER_ID]).toBeUndefined()
            expect(nextMock).toHaveBeenCalled()
        })

        it('should not set App-Partner-Id header when header value does not exist and version is required', () => {
            const reqMock = <Request>{
                headers: {},
                $params: {
                    headers: {
                        [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                    },
                },
            }

            const nextMock = jest.fn()

            const middleware = headerMiddleware.addDiiaPartnerIdHeader({
                name: RouteHeaderRawName.APP_PARTNER_ID,
                versions: [ActionVersion.V1],
            })

            middleware(reqMock, <Response>{}, nextMock)

            expect(reqMock.$params.headers[RouteHeaderName.APP_PARTNER_ID]).toBeUndefined()
            expect(nextMock).toHaveBeenCalled()
        })
    })

    describe('method: `addDocumentRequestTraceIdHeader`', () => {
        it('should set Document-Request-Trace-Id header when header value exists and version is required', () => {
            const reqMock = <Request>{
                headers: {
                    [RouteHeaderRawName.DOCUMENT_REQUEST_TRACE_ID]: 'trace-id',
                },
                $params: {
                    headers: {
                        [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                    },
                },
            }

            const nextMock = jest.fn()

            const middleware = headerMiddleware.addDocumentRequestTraceIdHeader({
                name: RouteHeaderRawName.DOCUMENT_REQUEST_TRACE_ID,
                versions: [ActionVersion.V1],
            })

            middleware(reqMock, <Response>{}, nextMock)

            expect(reqMock.$params.headers[RouteHeaderName.DOCUMENT_REQUEST_TRACE_ID]).toBe('trace-id')
            expect(nextMock).toHaveBeenCalled()
        })

        it('should not set Document-Request-Trace-Id header when header value exists but version is not required', () => {
            const reqMock = <Request>{
                headers: {
                    [RouteHeaderRawName.DOCUMENT_REQUEST_TRACE_ID]: 'trace-id',
                },
                $params: {
                    headers: {},
                },
            }

            const nextMock = jest.fn()

            const middleware = headerMiddleware.addDocumentRequestTraceIdHeader({
                name: RouteHeaderRawName.DOCUMENT_REQUEST_TRACE_ID,
                versions: [ActionVersion.V2],
            })

            middleware(reqMock, <Response>{}, nextMock)

            expect(reqMock.$params.headers[RouteHeaderName.DOCUMENT_REQUEST_TRACE_ID]).toBeUndefined()
            expect(nextMock).toHaveBeenCalled()
        })

        it('should not set Document-Request-Trace-Id header when header value does not exist and version is required', () => {
            const reqMock = <Request>{
                headers: {},
                $params: {
                    headers: {
                        [ActionCustomHeader.ACTION_VERSION]: ActionVersion.V1,
                    },
                },
            }

            const nextMock = jest.fn()

            const middleware = headerMiddleware.addDocumentRequestTraceIdHeader({
                name: RouteHeaderRawName.DOCUMENT_REQUEST_TRACE_ID,
                versions: [ActionVersion.V1],
            })

            middleware(reqMock, <Response>{}, nextMock)

            expect(reqMock.$params.headers[RouteHeaderName.DOCUMENT_REQUEST_TRACE_ID]).toBeUndefined()
            expect(nextMock).toHaveBeenCalled()
        })
    })

    describe('method: `getHeaderByName`', () => {
        const mobileUid = randomUUID()

        it.each([
            [
                'should return header value if it exists in request',
                { $params: { headers: { [RouteHeaderName.MOBILE_UID]: mobileUid } } },
                mobileUid,
            ],
            ['should return undefined if it does not in request', { $params: { headers: {} } }, undefined],
        ])('%s', (_msg, req, expected) => {
            const name = RouteHeaderName.MOBILE_UID

            const result = headerMiddleware.getHeaderByName(<Request>req, name)

            expect(result).toBe(expected)
        })
    })
})
