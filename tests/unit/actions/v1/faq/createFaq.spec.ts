import { DatabaseService } from '@diia-inhouse/db'
import { StoreService } from '@diia-inhouse/redis'
import TestKit, { mockClass } from '@diia-inhouse/test'
import { SessionType } from '@diia-inhouse/types'

import CreateFaqAction from '@actions/v1/faq/createFaq'

import FaqService from '@services/faq'

import { CustomActionArguments } from '@interfaces/actions/v1/faq/createFaq'
import { FaqProvider } from '@interfaces/providers'
import { AppConfig } from '@interfaces/types/config'

const FaqServiceMock = mockClass(FaqService)

describe(`Action ${CreateFaqAction.constructor.name}`, () => {
    const testKit = new TestKit()
    const faqService = new FaqServiceMock(<AppConfig>{}, <StoreService>{}, <FaqProvider>{}, <DatabaseService>{})
    const createFaqAction = new CreateFaqAction(faqService)

    describe('Method `handler`', () => {
        it('should successfully create and return faq', async () => {
            const headers = testKit.session.getHeaders()
            const args: CustomActionArguments = {
                headers,
                session: testKit.session.getPartnerSession(),
                params: {
                    categories: [],
                    session: SessionType.User,
                },
            }

            jest.spyOn(faqService, 'createFaq').mockResolvedValueOnce(args.params)

            expect(await createFaqAction.handler(args)).toEqual(args.params)
            expect(faqService.createFaq).toHaveBeenLastCalledWith(args.params)
        })
    })
})
