import 'module-alias/register'
import { Db } from 'mongodb'

import { SessionType } from '@diia-inhouse/types'

const collectionName = 'faqcategories'

export async function up(db: Db): Promise<void> {
    const operations = ['general', 'yourBusiness', 'otherQuestions'].map((code, index) => ({
        updateOne: {
            filter: { code, sessionType: SessionType.EResident },
            update: {
                $set: { order: 1000 + index + 1 },
            },
        },
    }))

    await db.collection(collectionName).bulkWrite(operations)
}
