import 'module-alias/register'
import { execSync } from 'child_process'
import { resolve } from 'path'

import { Db } from 'mongodb'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv-flow').config({ silent: true })

const collectionName = 'errortemplates'
const filepath: string = resolve('errorTemplates.json')

export async function up(): Promise<void> {
    const mongoImportCmd: string[] = ['mongoimport']
    let mongoUri = 'mongodb://'
    if (process.env.MONGO_USER && process.env.MONGO_PASSWORD) {
        mongoUri += `${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@`
    }

    mongoUri += `${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`

    const query: string[] = []
    if (process.env.MONGO_AUTH_SOURCE) {
        query.push(`authSource=${process.env.MONGO_AUTH_SOURCE}`)
    }

    if (process.env.MONGO_REPLICA_SET) {
        query.push(`replicaSet=${process.env.MONGO_REPLICA_SET}`)
    }

    mongoImportCmd.push(`--uri "${mongoUri}?${query.join('&')}"`)
    mongoImportCmd.push(`--collection=${collectionName}`)
    mongoImportCmd.push('--jsonArray')
    mongoImportCmd.push(`--file=${filepath}`)

    execSync(mongoImportCmd.join(' '))
}

export async function down(db: Db): Promise<void> {
    await db.dropCollection(collectionName)
}
