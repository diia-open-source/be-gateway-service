import 'module-alias/register'
import { execSync } from 'child_process'
import { resolve } from 'path'

import { Db } from 'mongodb'

import { SessionType } from '@diia-inhouse/types'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv-flow').config({ silent: true })

const collectionName = 'faqs'
const filepath: string = resolve('faq.json')
const sessions: SessionType[] = [SessionType.User, SessionType.EResident]

export async function up(db: Db): Promise<void> {
    try {
        await db.dropCollection(collectionName)
    } catch (err) {}

    await db.createCollection(collectionName)

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
    mongoImportCmd.push(`--file=${filepath}`)

    const tasks = sessions.map(async (session: SessionType) => {
        execSync(mongoImportCmd.join(' '))
        await db.collection(collectionName).updateOne({ session: { $exists: false } }, { $set: { session } })
    })

    await Promise.all(tasks)
}

export async function down(db: Db): Promise<void> {
    await db.dropCollection(collectionName)
}
