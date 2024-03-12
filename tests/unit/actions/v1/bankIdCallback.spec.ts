import TestKit from '@diia-inhouse/test'

import BankIdCallbackAction from '@actions/v1/bankIdCallback'

import { generateUuid } from '@mocks/randomData'

describe(`Action ${BankIdCallbackAction.constructor.name}`, () => {
    const testKit = new TestKit()
    const bankIdCallbackAction = new BankIdCallbackAction()

    describe('Method `handler`', () => {
        it('should successfully return params object', async () => {
            const headers = testKit.session.getHeaders()

            const args = {
                params: {
                    state: generateUuid(),
                },
                code: generateUuid(),
                headers,
            }

            expect(await bankIdCallbackAction.handler(args)).toEqual(args.params)
        })
    })
})
