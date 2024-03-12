import TestKit from '@diia-inhouse/test'

import GetUserIdentifierAction from '@actions/v1/getUserIdentifier'

describe(`Action ${GetUserIdentifierAction.constructor.name}`, () => {
    const testKit = new TestKit()
    const getUserIdentifierAction = new GetUserIdentifierAction()

    describe('Method `handler`', () => {
        it('should successfully return user identifier', async () => {
            const headers = testKit.session.getHeaders()

            const args = {
                headers,
                session: testKit.session.getUserSession(),
            }

            expect(await getUserIdentifierAction.handler(args)).toEqual({ identifier: args.session.user.identifier })
        })
    })
})
