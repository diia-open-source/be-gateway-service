import { ProfileFeature, SessionType, UserFeatures } from '@diia-inhouse/types'
import { profileFeaturesToList } from '@diia-inhouse/utils'

import faqModel from '@models/faqCategory'

import { FaqCategory } from '@interfaces/models/faqCategory'
import { FaqProvider } from '@interfaces/providers'

export default class MongodbFaqProvider implements FaqProvider {
    async getCategoriesList(session: SessionType, userFeatures: UserFeatures): Promise<FaqCategory[]> {
        const subFeatures = this.getSubFeatures(userFeatures)
        const featuresList = profileFeaturesToList(userFeatures)

        const categoriesModels = await faqModel
            .aggregate([
                {
                    $match: {
                        sessionType: session,
                        $or: [
                            {
                                features: {
                                    $in: featuresList,
                                },
                            },
                            {
                                features: [],
                            },
                        ],
                    },
                },
                {
                    $project: {
                        _id: 1,
                        code: 1,
                        name: 1,
                        sessionType: 1,
                        features: 1,
                        order: 1,
                        faq: {
                            $filter: {
                                input: '$faq',
                                cond: {
                                    $or: [
                                        {
                                            $setIsSubset: ['$$item.subFeatures', subFeatures],
                                        },
                                        {
                                            $eq: ['$$item.subFeatures', []],
                                        },
                                    ],
                                },
                                as: 'item',
                            },
                        },
                    },
                },
            ])
            .sort({ order: 1 })
            .exec()

        return categoriesModels.map(({ code, name, sessionType, faq, features, order }) => ({
            code,
            name,
            sessionType,
            faq,
            features,
            order,
        }))
    }

    private getSubFeatures(userFeatures: UserFeatures): string[] {
        return userFeatures[ProfileFeature.office]?.googleWorkspace === 'true' ? ['GoogleWorkspace'] : []
    }
}
