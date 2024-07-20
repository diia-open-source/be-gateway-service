import { FilterQuery, UpdateQuery } from 'mongoose'

import { MongoDBErrorCode } from '@diia-inhouse/db'
import { BadRequestError, ModelNotFoundError } from '@diia-inhouse/errors'
import { StoreService, StoreTag } from '@diia-inhouse/redis'

import errorTemplateModel from '@models/errorTemplate'

import ErrorTemplateDataMapper from '@dataMappers/errorTemplateDataMapper'

import Utils from '@utils/index'

import { ErrorTemplate, ErrorTemplateModel } from '@interfaces/models/errorTemplate'
import { ErrorTemplateListResult, ErrorTemplateResult, GetErrorTemplatesListOptions } from '@interfaces/services/errorTemplate'

export default class ErrorTemplateService {
    private errorTemplateStoreKey = 'error-templates'

    constructor(
        private readonly errorTemplateDataMapper: ErrorTemplateDataMapper,

        private readonly store: StoreService,
    ) {}

    async getErrorTemplatesList({ skip, limit }: GetErrorTemplatesListOptions): Promise<ErrorTemplateListResult> {
        const [total, errorTemplates]: [number, ErrorTemplateModel[]] = await Promise.all([
            errorTemplateModel.countDocuments(),
            errorTemplateModel.find().skip(skip).limit(limit),
        ])

        return { total, errorTemplates: errorTemplates.map((errorTemplate) => this.errorTemplateDataMapper.toEntity(errorTemplate)) }
    }

    async createErrorTemplate(errorTemplate: ErrorTemplate): Promise<ErrorTemplateResult> {
        try {
            const newErrorTemplate: ErrorTemplateModel = await errorTemplateModel.create(errorTemplate)

            await this.store.bumpTags([StoreTag.ErrorTemplate])

            return this.errorTemplateDataMapper.toEntity(newErrorTemplate)
        } catch (err) {
            if (Utils.isErrorWithCode(err) && err.code === MongoDBErrorCode.DuplicateKey) {
                throw new BadRequestError(`Error template for errorCode: ${errorTemplate.errorCode} already exists`)
            }

            throw err
        }
    }

    async updateErrorTemplate(errorTemplate: ErrorTemplate): Promise<ErrorTemplateResult> {
        const { errorCode } = errorTemplate
        const query: FilterQuery<ErrorTemplate> = { errorCode }
        const modifier: UpdateQuery<ErrorTemplate> = { ...errorTemplate }
        const updatedErrorTemplate: ErrorTemplateModel | null = await errorTemplateModel.findOneAndUpdate(query, modifier, { new: true })
        if (!updatedErrorTemplate) {
            throw new ModelNotFoundError(errorTemplateModel.modelName, errorCode)
        }

        await this.store.bumpTags([StoreTag.ErrorTemplate])

        return this.errorTemplateDataMapper.toEntity(updatedErrorTemplate)
    }

    async fetchErrorTemplateByCode(errorCode: number): Promise<ErrorTemplateResult> {
        const storeKey: string = this.getStoreKey(errorCode)

        const cachedErrorTemplate = await this.store.getUsingTags(storeKey)
        if (cachedErrorTemplate) {
            return JSON.parse(cachedErrorTemplate)
        }

        const query: FilterQuery<ErrorTemplate> = { errorCode }
        const errorTemplate = await errorTemplateModel.findOne(query)

        if (!errorTemplate) {
            throw new Error(`Unexpected error code ${errorCode}`)
        }

        const errorTemplateResult = this.errorTemplateDataMapper.toEntity(errorTemplate)

        if (errorTemplateResult) {
            await this.store.set(storeKey, JSON.stringify(errorTemplateResult), { tags: [StoreTag.ErrorTemplate] })
        }

        return errorTemplateResult
    }

    private getStoreKey(errorCode: number): string {
        return `${this.errorTemplateStoreKey}:${errorCode}`
    }
}
