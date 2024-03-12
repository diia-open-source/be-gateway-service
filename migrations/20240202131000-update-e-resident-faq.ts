import 'module-alias/register'
import { readFileSync } from 'fs'
import { resolve } from 'path'

import { Db } from 'mongodb'

import { SessionType } from '@diia-inhouse/types'

import { FaqCategory } from '@interfaces/models/faqCategory'

const collectionName = 'faqcategories'
const filepath: string = resolve('eResidentFaq.json')

export async function up(db: Db): Promise<void> {
    const categoriesStr = await readFileSync(filepath).toString()
    try {
        const categories: FaqCategory[] = JSON.parse(categoriesStr).categories

        const operations = categories.map(({ code, name, faq }) => ({
            updateOne: {
                filter: { code, sessionType: SessionType.EResident },
                update: {
                    $set: { name, faq },
                },
            },
        }))

        await db.collection(collectionName).bulkWrite(operations)
    } catch (err) {}
}
