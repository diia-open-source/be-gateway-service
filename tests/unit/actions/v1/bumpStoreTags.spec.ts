import DiiaLogger from '@diia-inhouse/diia-logger'
import { StoreService, StoreTag } from '@diia-inhouse/redis'
import TestKit, { mockClass } from '@diia-inhouse/test'

import BumpStoreTagsAction from '@actions/v1/bumpStoreTags'

import StoreManagementService from '@services/storeManagement'

const StoreManagementServiceMock = mockClass(StoreManagementService)

describe(`Action ${BumpStoreTagsAction.constructor.name}`, () => {
    const storeManagement = new StoreManagementServiceMock(<StoreService>{}, <DiiaLogger>{})
    const bumpStoreTagsAction = new BumpStoreTagsAction(storeManagement)
    const testKit = new TestKit()

    describe('Method `handler`', () => {
        it('should return success true', async () => {
            const headers = testKit.session.getHeaders()
            const session = testKit.session.getPartnerSession()
            const tags = [<StoreTag>{}]
            const args = {
                params: {
                    tags,
                },
                headers,
                session,
            }

            jest.spyOn(storeManagement, 'bumpTags').mockResolvedValueOnce()

            expect(await bumpStoreTagsAction.handler(args)).toEqual({ success: true })
            expect(storeManagement.bumpTags).toHaveBeenCalledWith(tags)
        })
    })
})
