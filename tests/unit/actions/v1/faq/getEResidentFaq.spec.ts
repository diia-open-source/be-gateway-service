import { DatabaseService } from '@diia-inhouse/db'
import { StoreService } from '@diia-inhouse/redis'
import { mockClass } from '@diia-inhouse/test'
import { SessionType } from '@diia-inhouse/types'

import GetEResidentFaqAction from '@actions/v1/faq/getEResidentFaq'

import FaqService from '@services/faq'

import { FaqProvider } from '@interfaces/providers'
import { FaqResponse } from '@interfaces/services/faq'
import { AppConfig } from '@interfaces/types/config'

const FaqServiceMock = mockClass(FaqService)

describe(`Action ${GetEResidentFaqAction.constructor.name}`, () => {
    const faqService = new FaqServiceMock(<AppConfig>{}, <StoreService>{}, <FaqProvider>{}, <DatabaseService>{})
    const getEResidentFaqAction = new GetEResidentFaqAction(faqService)

    describe('Method `handler`', () => {
        it('should successfully return faq for EResident', async () => {
            const expectedResult: FaqResponse = {
                categories: [],
                expirationDate: new Date().toISOString(),
            }

            jest.spyOn(faqService, 'getFaq').mockResolvedValueOnce(expectedResult)

            expect(await getEResidentFaqAction.handler()).toEqual(expectedResult)
            expect(faqService.getFaq).toHaveBeenLastCalledWith(SessionType.EResident, {})
        })
    })
})
