import { CmsCollectionType, CmsService } from '@diia-inhouse/cms'
import { SessionType, UserFeatures } from '@diia-inhouse/types'
import { profileFeaturesToList } from '@diia-inhouse/utils'

import FaqCategoryCmsDataMapper from '@dataMappers/cms/faqCategoryCmsDataMapper'

import { CmsFaqCategory } from '@interfaces/models/cms/faq'
import { FaqCategory } from '@interfaces/models/faqCategory'
import { FaqProvider } from '@interfaces/providers'

export default class StrapiFaqProvider implements FaqProvider {
    constructor(
        private readonly cms: CmsService,
        private readonly faqCategoryCmsDataMapper: FaqCategoryCmsDataMapper,
    ) {}

    async getCategoriesList(session: SessionType, userFeatures: UserFeatures): Promise<FaqCategory[]> {
        const featuresList = profileFeaturesToList(userFeatures)
        const list = await this.cms.getList<CmsFaqCategory, FaqCategory>(
            CmsCollectionType.FaqCategory,
            {
                populate: 'deep',
                filters: {
                    $and: [
                        { sessionType: session },
                        {
                            $or: [
                                ...featuresList.map((feature) => ({ features: { value: feature } })),
                                { features: { value: { $null: true } } },
                            ],
                        },
                    ],
                },
            },
            this.faqCategoryCmsDataMapper,
        )

        return list.data
    }
}
