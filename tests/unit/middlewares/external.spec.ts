import DiiaLogger from '@diia-inhouse/diia-logger'
import { ExternalCommunicator } from '@diia-inhouse/diia-queue'
import TestKit, { mockClass } from '@diia-inhouse/test'

import { Request, Response } from '../../../src/interfaces'

import ExternalMiddleware from '@src/middlewares/external'

import { ExternalAlias } from '@interfaces/index'
import { ExternalEvent } from '@interfaces/queue'

const DiiaLoggerMock = mockClass(DiiaLogger)

describe('ExternalMiddleware', () => {
    const loggerMock = new DiiaLoggerMock()
    const testKit = new TestKit()

    afterEach(() => {
        jest.clearAllMocks()
    })

    const externalMock = <ExternalCommunicator>(<unknown>{
        receiveDirect: jest.fn(),
    })

    describe('method: `addRedirect`', () => {
        it('should call external receiveDirect and transform response on successful external call', async () => {
            const eventName = ExternalEvent.AcquirerDocumentRequest
            const transformData = 'Successful transformation'
            const middleware = new ExternalMiddleware(loggerMock, externalMock)
            const session = testKit.session.getUserSession()
            const externalAlias: ExternalAlias = {
                event: eventName,
                responseTransformer: () => transformData,
            }

            const req = <Request>{
                $params: {
                    session,
                },
            }
            const res = <Response>(<unknown>{
                end: jest.fn(),
            })

            const next = jest.fn()

            await middleware.addRedirect(externalAlias)(req, res, next)

            expect(loggerMock.info).toHaveBeenCalledWith(`Performing external call event ${eventName}`)
            expect(externalMock.receiveDirect).toHaveBeenCalledWith(`${eventName}`, { session })
            expect(res.end).toHaveBeenCalledWith(transformData)
        })

        it('should call next with error on external call failure', async () => {
            const eventName = ExternalEvent.AcquirerDocumentRequest
            const middleware = new ExternalMiddleware(loggerMock, externalMock)
            const externalAlias: ExternalAlias = { event: eventName }
            const session = testKit.session.getUserSession()

            const req = <Request>{
                $params: {
                    session,
                },
            }
            const res = <Response>{}
            const next = jest.fn()

            const error = new Error('External call failed')

            const receiveDirectSpy = jest.spyOn(externalMock, 'receiveDirect')

            receiveDirectSpy.mockRejectedValue(error)

            await middleware.addRedirect(externalAlias)(req, res, next)

            expect(loggerMock.info).toHaveBeenCalledWith(`Performing external call event ${eventName}`)
            expect(externalMock.receiveDirect).toHaveBeenCalledWith(`${eventName}`, { session })
            expect(next).toHaveBeenCalledWith(error)
        })
    })
})
