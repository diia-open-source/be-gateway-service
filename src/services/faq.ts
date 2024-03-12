import { DatabaseService, MongoDBErrorCode } from '@diia-inhouse/db'
import { BadRequestError, DatabaseError, ModelNotFoundError } from '@diia-inhouse/errors'
import { StoreService, StoreTag } from '@diia-inhouse/redis'
import { SessionType, UserFeatures } from '@diia-inhouse/types'

import Utils from '@src/utils'

import faqCategoryModel from '@models/faqCategory'

import { FaqCategory } from '@interfaces/models/faqCategory'
import { FaqProvider } from '@interfaces/providers'
import { Faq, FaqResponse } from '@interfaces/services/faq'
import { AppConfig } from '@interfaces/types/config'

export default class FaqService {
    constructor(
        private readonly config: AppConfig,
        private readonly store: StoreService,
        private readonly faqProvider: FaqProvider,
        private readonly database: DatabaseService,
    ) {}

    async getFaq(session: SessionType, userFeatures: UserFeatures): Promise<FaqResponse> {
        const categories: FaqCategory[] = await this.fetchFaqCategories(session, userFeatures)
        const expirationDate: string = new Date(Date.now() + this.config.faq.expirationTimeInSec * 1000).toISOString()

        return {
            expirationDate,
            categories: categories.map((category) => {
                const { code, name, faq } = category

                return { code, name, faq }
            }),
        }
    }

    async createFaq(newFaq: Faq): Promise<Faq> {
        try {
            const { categories, session: sessionType } = newFaq

            const faqCategories = categories.map((category) => {
                const { code, name, faq, features } = category

                return { code, name, faq, features, sessionType }
            })

            const newCategories: FaqCategory[] = []

            for (const faq of faqCategories) {
                const upsertedFaq = await faqCategoryModel.create(faq)

                if (upsertedFaq) {
                    newCategories.push(upsertedFaq)
                }
            }

            await this.store.bumpTags([StoreTag.Faq])

            return {
                session: sessionType,
                categories: newCategories,
            }
        } catch (err) {
            if (Utils.isErrorWithCode(err) && err.code === MongoDBErrorCode.DuplicateKey) {
                throw new BadRequestError(`Faq for ${newFaq.session} already exists`)
            }

            throw err
        }
    }

    async replaceFaq(upsertFaq: Faq): Promise<Faq> {
        const { categories, session: sessionType } = upsertFaq

        const faqCategories = categories.map<FaqCategory>((category, indx) => {
            const { code, name, faq, features } = category

            return { code, name, faq, features, sessionType, order: indx }
        })

        const session = await this.database.beginTransaction()

        try {
            await faqCategoryModel.deleteMany({ sessionType }, { session })
            await faqCategoryModel.insertMany(faqCategories, { session })
            await session.commitTransaction()
        } catch (err) {
            await session.abortTransaction()
            throw new DatabaseError('Transaction failed', { err })
        } finally {
            await session.endSession()
        }

        await this.store.bumpTags([StoreTag.Faq])

        return {
            session: sessionType,
            categories: faqCategories,
        }
    }

    private async fetchFaqCategories(session: SessionType, userFeatures: UserFeatures): Promise<FaqCategory[]> {
        const categories = await this.faqProvider.getCategoriesList(session, userFeatures)

        if (!categories?.length) {
            throw new ModelNotFoundError(faqCategoryModel.modelName, session)
        }

        return categories
    }
}
