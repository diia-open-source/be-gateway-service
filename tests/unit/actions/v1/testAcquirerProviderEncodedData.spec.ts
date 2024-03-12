import DiiaLogger from '@diia-inhouse/diia-logger'
import { mockClass } from '@diia-inhouse/test'

import TestAcquirerProviderEncodedDataAction from '@actions/v1/testAcquirerProviderEncodedData'

const DiiaLoggerMock = mockClass(DiiaLogger)

describe(`Action ${TestAcquirerProviderEncodedDataAction.constructor.name}`, () => {
    const logger = new DiiaLoggerMock()
    const testAcquirerProviderEncodedDataAction = new TestAcquirerProviderEncodedDataAction(logger)

    describe('Method `handler`', () => {
        it('should return success true', async () => {
            expect(await testAcquirerProviderEncodedDataAction.handler()).toEqual({ success: true })
            expect(logger.debug).toHaveBeenLastCalledWith('Receive encoded data from Diia app in sign hashed files flow')
        })
    })
})
