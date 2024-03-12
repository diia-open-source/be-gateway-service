import 'module-alias/register'
import { readFileSync } from 'fs'
import { resolve } from 'path'

import { Db } from 'mongodb'

import { SessionType } from '@diia-inhouse/types'

const collectionName = 'faqs'
const filepath: string = resolve('eResidentFaq.json')

export async function up(db: Db): Promise<void> {
    const categoriesStr = await readFileSync(filepath).toString()
    try {
        const categories = JSON.parse(categoriesStr).categories

        await db.collection(collectionName).updateOne({ session: SessionType.EResident }, { $set: { categories } })
    } catch (err) {}
}
