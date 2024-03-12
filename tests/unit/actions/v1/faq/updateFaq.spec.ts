import { DatabaseService } from '@diia-inhouse/db'
import { StoreService } from '@diia-inhouse/redis'
import TestKit, { mockClass } from '@diia-inhouse/test'
import { SessionType } from '@diia-inhouse/types'

import UpdateFaqAction from '@actions/v1/faq/updateFaq'

import FaqService from '@services/faq'

import { CustomActionArguments } from '@interfaces/actions/v1/faq/updateFaq'
import { FaqProvider } from '@interfaces/providers'
import { AppConfig } from '@interfaces/types/config'

const FaqServiceMock = mockClass(FaqService)

describe(`Action ${UpdateFaqAction.constructor.name}`, () => {
    const testKit = new TestKit()
    const faqService = new FaqServiceMock(<AppConfig>{}, <StoreService>{}, <FaqProvider>{}, <DatabaseService>{})
    const updateFaqAction = new UpdateFaqAction(faqService)

    describe('Method `handler`', () => {
        it('should successfully update and return faq', async () => {
            const headers = testKit.session.getHeaders()
            const args: CustomActionArguments = {
                headers,
                session: testKit.session.getPartnerSession(),
                params: {
                    categories: [],
                    session: SessionType.User,
                },
            }

            jest.spyOn(faqService, 'replaceFaq').mockResolvedValueOnce(args.params)

            expect(await updateFaqAction.handler(args)).toEqual(args.params)
            expect(faqService.replaceFaq).toHaveBeenLastCalledWith(args.params)
        })
    })
})
