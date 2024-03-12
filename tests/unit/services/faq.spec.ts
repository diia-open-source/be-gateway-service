const faqCategoryModel = {
    create: jest.fn(),
    deleteMany: jest.fn(),
    insertMany: jest.fn(),
    modelName: 'FaqCategory',
}

jest.mock('@models/faqCategory', () => ({
    __esModule: true,
    default: faqCategoryModel,
}))

import { DatabaseService, MongoDBErrorCode } from '@diia-inhouse/db'
import { ApiError, BadRequestError, DatabaseError, ModelNotFoundError } from '@diia-inhouse/errors'
import { StoreService } from '@diia-inhouse/redis'
import { SessionType } from '@diia-inhouse/types'

import FaqService from '@src/services/faq'

import { FaqCategory } from '@interfaces/models/faqCategory'
import { FaqProvider } from '@interfaces/providers'
import { Faq } from '@interfaces/services/faq'
import { AppConfig } from '@interfaces/types/config'

describe('FaqService', () => {
    const configMock = <AppConfig>(<unknown>{ faq: { expirationTimeInSec: 3600 } })
    const storeMock = <StoreService>(<unknown>{
        bumpTags: jest.fn(),
    })
    const faqProviderMock = <FaqProvider>(<unknown>{})
    const sessionMock = {
        commitTransaction: jest.fn(),
        abortTransaction: jest.fn(),
        endSession: jest.fn(),
    }
    const databaseMock = <DatabaseService>(<unknown>{
        beginTransaction: () => sessionMock,
    })

    let faqService: FaqService

    beforeEach(() => {
        faqService = new FaqService(configMock, storeMock, faqProviderMock, databaseMock)
    })

    describe('method: `getFaq`', () => {
        it('should return faq response', async () => {
            const mockCategories = [{ code: 'cat1', name: 'Category 1', faq: [] }]

            faqProviderMock.getCategoriesList = jest.fn().mockResolvedValue(mockCategories)

            const result = await faqService.getFaq(SessionType.User, {})

            expect(result.expirationDate).toBeDefined()
            expect(result.categories).toHaveLength(1)
        })

        it('should throw error if no categories was found', async () => {
            faqProviderMock.getCategoriesList = jest.fn().mockResolvedValue([])

            await expect(faqService.getFaq(SessionType.User, {})).rejects.toThrow(
                new ModelNotFoundError(faqCategoryModel.modelName, SessionType.User),
            )
        })
    })

    describe('method: `createFaq`', () => {
        it('should catch thrown exception', async () => {
            const expectedCategories = [
                {
                    sessionType: SessionType.User,
                    code: 'code1',
                    faq: undefined,
                    features: undefined,
                    name: undefined,
                },
            ]
            const mockNewFaq = { session: SessionType.User, categories: expectedCategories }

            jest.spyOn(storeMock, 'bumpTags').mockRejectedValueOnce(new Error())

            await expect(() => faqService.createFaq(<Faq>(<unknown>mockNewFaq))).rejects.toBeInstanceOf(Error)
        })

        it('should catch thrown error with MongoDBErrorCode.DuplicateKey code', async () => {
            const categories = [
                {
                    sessionType: SessionType.User,
                    code: 'code1',
                    faq: undefined,
                    features: undefined,
                    name: undefined,
                },
            ]
            const mockNewFaq = { session: SessionType.User, categories }

            jest.spyOn(faqCategoryModel, 'create').mockRejectedValueOnce(new ApiError('Mocked error', MongoDBErrorCode.DuplicateKey))

            await expect(faqService.createFaq(<Faq>(<unknown>mockNewFaq))).rejects.toThrow(
                new BadRequestError(`Faq for ${mockNewFaq.session} already exists`),
            )
        })

        it('should create faq', async () => {
            const expectedCategories = [
                {
                    sessionType: SessionType.User,
                    code: 'code1',
                    faq: undefined,
                    features: undefined,
                    name: undefined,
                },
                {
                    sessionType: SessionType.User,
                    code: 'code2',
                    faq: undefined,
                    features: undefined,
                    name: undefined,
                },
            ]
            const mockNewFaq = { session: SessionType.User, categories: expectedCategories }

            jest.spyOn(faqCategoryModel, 'create').mockImplementation((args: FaqCategory): FaqCategory => args)

            const result = await faqService.createFaq(<Faq>(<unknown>mockNewFaq))

            expect(storeMock.bumpTags).toHaveBeenCalled()

            expect(result.session).toBe(SessionType.User)
            expect(result.categories).toStrictEqual(expectedCategories)
        })
    })

    describe('method: `replaceFaq`', () => {
        it('should call abortTransaction when throwed exception', async () => {
            const expectedCategories = [
                {
                    sessionType: SessionType.User,
                    code: 'code1',
                    faq: undefined,
                    features: undefined,
                    name: undefined,
                },
            ]
            const mockFaq = { session: SessionType.User, categories: expectedCategories }

            sessionMock.commitTransaction.mockRejectedValueOnce(new Error())

            await expect(() => faqService.replaceFaq(<Faq>(<unknown>mockFaq))).rejects.toBeInstanceOf(DatabaseError)

            expect(sessionMock.abortTransaction).toHaveBeenCalledTimes(1)
        })

        it('should replace faq with transaction', async () => {
            const expectedCategories = [
                {
                    sessionType: SessionType.User,
                    code: 'code1',
                    faq: undefined,
                    features: undefined,
                    name: undefined,
                },
            ]
            const mockFaq = { session: SessionType.User, categories: expectedCategories }

            await faqService.replaceFaq(<Faq>(<unknown>mockFaq))

            expect(sessionMock.commitTransaction).toHaveBeenCalledTimes(1)
            expect(sessionMock.endSession).toHaveBeenCalledTimes(1)
            expect(faqCategoryModel.deleteMany).toHaveBeenCalledTimes(1)
            expect(faqCategoryModel.insertMany).toHaveBeenCalledTimes(1)
        })
    })
})
