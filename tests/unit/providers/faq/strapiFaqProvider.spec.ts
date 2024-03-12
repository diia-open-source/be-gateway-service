import { CmsEntriesMeta, CmsService, StrapiConfig } from '@diia-inhouse/cms'
import { HttpService } from '@diia-inhouse/http'
import { mockClass } from '@diia-inhouse/test'
import { Logger, SessionType } from '@diia-inhouse/types'

import { StrapiFaqProvider } from '@src/providers/faq'

import FaqCategoryCmsDataMapper from '@dataMappers/cms/faqCategoryCmsDataMapper'

describe('strapiFaqProvider', () => {
    const resultData = {
        meta: <CmsEntriesMeta>'',
        data: [],
    }

    const cmsService = new (mockClass(CmsService))(<StrapiConfig>{}, <HttpService>{}, <Logger>{})
    const faqCategoryCmsDataMapper = <FaqCategoryCmsDataMapper>{}

    const strapiFaqProvider = new StrapiFaqProvider(cmsService, faqCategoryCmsDataMapper)

    describe('method: `getCategoriesList`', () => {
        it('should return categories list', async () => {
            jest.spyOn(cmsService, 'getList').mockResolvedValueOnce(resultData)
            const list = await strapiFaqProvider.getCategoriesList(<SessionType>{}, {})

            expect(list).toStrictEqual(resultData.data)
        })
    })
})
