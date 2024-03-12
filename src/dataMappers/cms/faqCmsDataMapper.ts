import { CmsFaq } from '@interfaces/models/cms/faq'
import { FaqItem } from '@interfaces/models/faqCategory'

export default class FaqCmsDataMapper {
    toEntity(item: CmsFaq): FaqItem {
        const { question, answer, parameters } = item

        return {
            question,
            answer,
            subFeatures: [],
            parameters: parameters.map((parameterItem) => {
                const {
                    type,
                    data: { name: parameterName, alt, resource },
                } = parameterItem

                return {
                    type,
                    data: {
                        name: parameterName,
                        alt,
                        resource,
                    },
                }
            }),
        }
    }
}
