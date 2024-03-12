import FaqCmsDataMapper from '@dataMappers/cms/faqCmsDataMapper'

import { CmsFaqCategory } from '@interfaces/models/cms/faq'
import { FaqCategory } from '@interfaces/models/faqCategory'

export default class FaqCategoryCmsDataMapper {
    constructor(private readonly faqCmsDataMapper: FaqCmsDataMapper) {}

    toEntity(item: CmsFaqCategory): FaqCategory {
        const { code, name, faq, features, order } = item

        return {
            code,
            name,
            sessionType: item.sessionType,
            faq: faq.data.map((faqItem) => this.faqCmsDataMapper.toEntity(faqItem.attributes)),
            features: features?.map(({ value }) => value),
            order,
        }
    }
}
