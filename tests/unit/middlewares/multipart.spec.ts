import { formidable } from 'formidable'

import DiiaLogger from '@diia-inhouse/diia-logger'
import { mockClass } from '@diia-inhouse/test'

import { Request, Response, RouteHeaderRawName } from '../../../src/interfaces'

import MultipartMiddleware from '@src/middlewares/multipart'

const DiiaLoggerMock = mockClass(DiiaLogger)

describe('MultipartMiddleware', () => {
    const loggerMock = new DiiaLoggerMock()

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('method: `parse`', () => {
        it('should call next without parsing when content-type is null', () => {
            const reqMock = <Request>(<unknown>{
                headers: {
                    [RouteHeaderRawName.CONTENT_TYPE]: null,
                },
                $params: {
                    body: {},
                },
            })

            const responseMock = {
                setHeader: jest.fn(),
                writeHead: jest.fn(),
                end: jest.fn(),
            }

            const nextMock = jest.fn((err) => {
                expect(err).toBeUndefined()
                expect(reqMock.$params.body).toEqual({})
                expect(loggerMock.error).not.toHaveBeenCalled()
                expect(responseMock.setHeader).not.toHaveBeenCalled()
                expect(responseMock.writeHead).not.toHaveBeenCalled()
                expect(responseMock.end).not.toHaveBeenCalled()
            })

            const Formidable: typeof formidable = jest.fn().mockReturnValueOnce({ parse: jest.fn() })
            const middleware = new MultipartMiddleware(loggerMock, Formidable)

            middleware.parse(reqMock, responseMock, nextMock)
        })

        it('should parse multipart request', () => {
            const mockReq = <Request>{
                method: 'POST',
                url: '/some/url',
                headers: {
                    'content-type': 'multipart/mixed',
                },
                $params: {
                    body: {},
                },
            }
            const next = jest.fn((err) => {
                expect(next).toHaveBeenCalled()
                expect(err).toBeUndefined()
                expect(loggerMock.error).not.toHaveBeenCalled()
            })

            const Formidable: typeof formidable = jest
                .fn()
                .mockReturnValueOnce({ parse: jest.fn((_incomingRequest, callback) => callback(undefined, { field: 'fields' })) })
            const middleware = new MultipartMiddleware(loggerMock, Formidable)

            middleware.parse(mockReq, <Response>{}, next)
        })

        it('should log error if it was occurred during parsing', () => {
            const mockReq = <Request>{
                method: 'POST',
                url: '/some/url',
                headers: {
                    'content-type': 'multipart/mixed',
                },
                $params: {
                    body: {},
                },
            }
            const mockRes: Response = <Response>{}
            const fields = { field: 'fields ' }
            const mockedError = new Error('Mocked error')
            const next = jest.fn((err) => {
                expect(next).toHaveBeenCalled()
                expect(err).toEqual(mockedError)
                expect(loggerMock.error).toHaveBeenCalledWith('Unable to parse multipart', { error: mockedError })
            })

            const Formidable: typeof formidable = jest
                .fn()
                .mockReturnValueOnce({ parse: jest.fn((_incomingRequest, callback) => callback(mockedError, fields)) })
            const middleware = new MultipartMiddleware(loggerMock, Formidable)

            middleware.parse(mockReq, mockRes, next)
        })
    })
})
