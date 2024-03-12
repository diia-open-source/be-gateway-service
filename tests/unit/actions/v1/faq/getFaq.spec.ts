const utilsMock = {
    extractProfileFeatures: jest.fn(),
}

jest.mock('@diia-inhouse/utils', () => utilsMock)

import { DatabaseService } from '@diia-inhouse/db'
import { StoreService } from '@diia-inhouse/redis'
import TestKit, { mockClass } from '@diia-inhouse/test'
import { UserActionArguments } from '@diia-inhouse/types'

import GetFaqAction from '@actions/v1/faq/getFaq'

import FaqService from '@services/faq'

import { FaqProvider } from '@interfaces/providers'
import { FaqResponse } from '@interfaces/services/faq'
import { AppConfig } from '@interfaces/types/config'

const FaqServiceMock = mockClass(FaqService)

describe(`Action ${GetFaqAction.constructor.name}`, () => {
    const testKit = new TestKit()
    const faqService = new FaqServiceMock(<AppConfig>{}, <StoreService>{}, <FaqProvider>{}, <DatabaseService>{})
    const getFaqAction = new GetFaqAction(faqService)

    describe('Method `handler`', () => {
        it('should successfully get faq', async () => {
            const headers = testKit.session.getHeaders()
            const args: UserActionArguments = {
                headers,
                session: testKit.session.getUserSession(),
            }
            const expectedResult: FaqResponse = {
                categories: [],
                expirationDate: new Date().toISOString(),
            }

            jest.spyOn(faqService, 'getFaq').mockResolvedValueOnce(expectedResult)

            expect(await getFaqAction.handler(args)).toEqual(expectedResult)
            expect(faqService.getFaq).toHaveBeenLastCalledWith(args.session.sessionType, {})
        })
    })
})
