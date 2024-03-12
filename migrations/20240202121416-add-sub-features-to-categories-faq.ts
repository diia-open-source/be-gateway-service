import 'module-alias/register'

import { Db } from 'mongodb'

const categoryCollectionName = 'faqcategories'

export async function up(db: Db): Promise<void> {
    db.collection(categoryCollectionName).updateMany(
        {},
        { $set: { 'faq.$[el].subFeatures': [] } },
        { arrayFilters: [{ 'el.subFeatures': { $exists: false } }] },
    )
}
