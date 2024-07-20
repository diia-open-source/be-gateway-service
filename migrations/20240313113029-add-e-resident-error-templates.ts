import 'module-alias/register'
import { readFileSync } from 'fs'
import { resolve } from 'path'

import { Db } from 'mongodb'

import { ErrorTemplate } from '@interfaces/models/errorTemplate'

const collectionName = 'errortemplates'
const filepath: string = resolve('eResidentErrorTemplates.json')

export async function up(db: Db): Promise<void> {
    const errorTemplatesStr = await readFileSync(filepath).toString()
    try {
        const errorTemplates: ErrorTemplate[] = JSON.parse(errorTemplatesStr)
        const operations = errorTemplates.map((errorTemplate) => ({
            insertOne: { document: errorTemplate },
        }))

        await db.collection(collectionName).bulkWrite(operations)
    } catch (err) {}
}
