import DiiaLogger from '@diia-inhouse/diia-logger'
import TestKit, { mockClass } from '@diia-inhouse/test'

import BankIdAuthCodeResultAction from '@actions/v1/bankIdAuthCodeResult'

const DiiaLoggerMock = mockClass(DiiaLogger)

describe(`Action ${BankIdAuthCodeResultAction.constructor.name}`, () => {
    const testKit = new TestKit()
    const logger = new DiiaLoggerMock()
    const bankIdAuthCodeResultAction = new BankIdAuthCodeResultAction(logger)

    describe('Method `handler`', () => {
        it('should successfully return {}', async () => {
            const headers = testKit.session.getHeaders()

            expect(
                await bankIdAuthCodeResultAction.handler({
                    params: {},
                    code: 'code',
                    headers,
                }),
            ).toEqual({})
            expect(logger.debug).toHaveBeenCalledWith('Received auth code result data', {})
        })
    })
})
