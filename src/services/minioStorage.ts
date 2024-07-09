import { Client, ItemBucketMetadata, UploadedObjectInfo } from 'minio'

import { Logger } from '@diia-inhouse/types'

import { File } from '@interfaces/index'
import { AppConfig } from '@interfaces/types/config'

export default class MinioStorageService {
    private isEnabled: boolean

    private bucketName = 'demo'

    private region = 'ukraine'

    private minioClient!: Client

    constructor(
        private readonly config: AppConfig,
        private readonly logger: Logger,
    ) {
        this.isEnabled = this.config.minio.isEnabled

        if (this.config.minio.isEnabled === true) {
            this.minioClient = new Client({
                endPoint: this.config.minio.host,
                port: this.config.minio.port,
                useSSL: false,
                accessKey: this.config.minio.accessKey,
                secretKey: this.config.minio.secretKey,
            })
        }
    }

    async uploadFile(file: Buffer, filename: string): Promise<void> {
        if (!this.isEnabled) {
            return
        }

        await this.createBucket()

        const metaData: ItemBucketMetadata = {
            'Content-Type': 'application/octet-stream',
            'X-Amz-Meta-Testing': 1234,
            example: 5678,
        }

        try {
            const result: UploadedObjectInfo = await this.minioClient.putObject(this.bucketName, filename, Buffer.from(file), metaData)

            this.logger.info(`File [${filename}] uploaded successfully`, result)
        } catch (err) {
            this.logger.error(`Failed to upload file [${filename}]`, { err })
            throw err
        }
    }

    async uploadFiles(files: File[]): Promise<void> {
        if (!this.isEnabled) {
            return
        }

        const promises: Promise<void>[] = []

        for (const item of files) {
            promises.push(this.uploadFile(item.buffer, item.originalname))
        }

        await Promise.all(promises)
    }

    private async createBucket(): Promise<void> {
        const exists: boolean = await this.minioClient.bucketExists(this.bucketName)
        if (!exists) {
            try {
                await this.minioClient.makeBucket(this.bucketName, this.region)
                this.logger.info(`Bucket [${this.bucketName}] created successfully in region [${this.region}]`)
            } catch (err) {
                this.logger.error(`Failed to create bucket [${this.bucketName}]`, { err })
                throw err
            }
        }
    }
}
