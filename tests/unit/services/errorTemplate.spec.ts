const errorTemplateModel = {
    countDocuments: jest.fn().mockResolvedValueOnce(2),
    find: jest.fn(),
    create: jest.fn().mockImplementation((args) => args),
    findOneAndUpdate: jest.fn(),
    findOne: jest.fn(),
}

jest.mock('@models/errorTemplate', () => ({
    __esModule: true,
    default: errorTemplateModel,
}))

jest.mock('@diia-inhouse/redis', () => ({
    StoreTag: {
        ErrorTemplate: 'text',
    },
}))

import { randomUUID } from 'node:crypto'

import { MongoDBErrorCode } from '@diia-inhouse/db'
import { ApiError, BadRequestError, ModelNotFoundError } from '@diia-inhouse/errors'
import { StoreService, StoreTag } from '@diia-inhouse/redis'

import ErrorTemplateService from '@src/services/errorTemplate'

import { ErrorTemplate } from '@interfaces/models/errorTemplate'

describe('ErrorTemplateService', () => {
    let errorTemplateService: ErrorTemplateService
    const dataMapperMock = {
        toEntity: jest.fn(),
    }
    const storageServiceMock = <StoreService>(<unknown>{
        bumpTags: jest.fn(),
        getUsingTags: jest.fn(),
        set: jest.fn(),
    })

    const errorTemplate: ErrorTemplate = {
        errorCode: 1,
        template: {
            description: 'test',
        },
    }

    beforeEach(() => {
        errorTemplateService = new ErrorTemplateService(dataMapperMock, storageServiceMock)
    })

    describe('method: `getErrorTemplatesList`', () => {
        it('should return a list of error templates', async () => {
            errorTemplateModel.countDocuments.mockResolvedValue(2)
            errorTemplateModel.find.mockReturnValue({
                skip: jest.fn().mockReturnValue({
                    limit: jest.fn().mockReturnValue([{}, {}]),
                }),
            })

            const result = await errorTemplateService.getErrorTemplatesList({ skip: 0, limit: 10 })

            expect(result.total).toBe(2)
            expect(result.errorTemplates).toHaveLength(2)
            expect(dataMapperMock.toEntity).toHaveBeenCalledTimes(2)
        })
    })

    describe('method: `createErrorTemplate`', () => {
        it('should create an error template', async () => {
            await errorTemplateService.createErrorTemplate(errorTemplate)

            expect(errorTemplateModel.create).toHaveBeenCalledWith(errorTemplate)
            expect(storageServiceMock.bumpTags).toHaveBeenCalledWith(['text'])
            expect(dataMapperMock.toEntity).toHaveBeenCalledTimes(1)
        })

        it('should catch thrown exception', async () => {
            storageServiceMock.bumpTags = jest.fn().mockRejectedValueOnce(new Error('Mocked error'))
            await expect(() => errorTemplateService.createErrorTemplate(errorTemplate)).rejects.toBeInstanceOf(Error)
        })

        it('should catch thrown error with MongoDBErrorCode.DuplicateKey code', async () => {
            jest.spyOn(errorTemplateModel, 'create').mockRejectedValueOnce(new ApiError('Mocked error', MongoDBErrorCode.DuplicateKey))

            await expect(errorTemplateService.createErrorTemplate(errorTemplate)).rejects.toThrow(
                new BadRequestError(`Error template for errorCode: ${errorTemplate.errorCode} already exists`),
            )
        })
    })

    describe('method: `updateErrorTemplate`', () => {
        it('should return model not found', async () => {
            errorTemplateModel.findOneAndUpdate = jest.fn().mockReturnValueOnce(null)

            await expect(() => errorTemplateService.updateErrorTemplate(errorTemplate)).rejects.toBeInstanceOf(ModelNotFoundError)
        })

        it('should update template', async () => {
            errorTemplateModel.findOneAndUpdate = jest.fn().mockReturnValueOnce(errorTemplate)

            await errorTemplateService.updateErrorTemplate(errorTemplate)

            expect(errorTemplateModel.findOneAndUpdate).toHaveBeenCalledTimes(1)
            expect(storageServiceMock.bumpTags).toHaveBeenCalledWith(['text'])
            expect(dataMapperMock.toEntity).toHaveBeenCalledWith(errorTemplate)
        })
    })

    describe('method: `fetchErrorTemplateByCode`', () => {
        it('should return errorTemplate from cache', async () => {
            storageServiceMock.getUsingTags = jest.fn().mockReturnValueOnce(JSON.stringify(errorTemplate))

            const fetchedTemplate = await errorTemplateService.fetchErrorTemplateByCode(errorTemplate.errorCode)

            expect(fetchedTemplate).toStrictEqual(errorTemplate)
            expect(storageServiceMock.getUsingTags).toHaveBeenCalledTimes(1)
        })

        it('should return errorTemplate from model and write it to cache', async () => {
            const errorTemplateEntity = {
                ...errorTemplate,
                id: randomUUID(),
            }

            errorTemplateModel.findOne = jest.fn().mockResolvedValueOnce(errorTemplate)
            dataMapperMock.toEntity = jest.fn().mockReturnValueOnce(errorTemplateEntity)

            await errorTemplateService.fetchErrorTemplateByCode(errorTemplate.errorCode)

            expect(errorTemplateModel.findOne).toHaveBeenCalledTimes(1)
            expect(storageServiceMock.set).toHaveBeenCalledWith(
                `error-templates:${errorTemplate.errorCode}`,
                JSON.stringify(errorTemplateEntity),
                { tags: [StoreTag.ErrorTemplate] },
            )
        })

        it('should throw error if errorTemplate was not found in DB', async () => {
            // eslint-disable-next-line unicorn/no-useless-undefined
            errorTemplateModel.findOne = jest.fn().mockResolvedValueOnce(undefined)

            await expect(errorTemplateService.fetchErrorTemplateByCode(errorTemplate.errorCode)).rejects.toThrow(
                new Error(`Unexpected error code ${errorTemplate.errorCode}`),
            )
        })
    })
})
