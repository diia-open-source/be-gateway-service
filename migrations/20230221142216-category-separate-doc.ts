import 'module-alias/register'

import { Db } from 'mongodb'

import { SessionType } from '@diia-inhouse/types'

import { FaqCategory } from '@interfaces/models/faqCategory'

const collectionName = 'faqs'
const categoryCollectionName = 'faqcategories'

export async function up(db: Db): Promise<void> {
    const faqsCollection = db.collection(collectionName)
    const faqsCategoryCollection = db.collection(categoryCollectionName)
    const allFaqs = faqsCollection.find()

    const categoriesToInsert: FaqCategory[] = []

    let i = 0
    await allFaqs.forEach((faq) => {
        const categories = faq.categories
        let j = i * 1000 + 1
        for (const category of categories) {
            categoriesToInsert.push({
                code: category.code,
                name: category.name,
                faq: category.faq,
                sessionType: <SessionType>faq.session,
                features: [],
                order: j,
            })

            j += 1
        }

        i += 1
    })

    await faqsCategoryCollection.insertMany(categoriesToInsert)
}
