import { SessionType } from '@diia-inhouse/types'

import { MongodbFaqProvider } from '@src/providers/faq'

const mockedCategories = [
    {
        code: '1',
        name: 'Category 1',
        sessionType: 'session',
        faq: [],
        features: ['feature1'],
        order: 1,
    },
]

jest.mock('@models/faqCategory', () => ({
    __esModule: true,
    default: {
        aggregate: (): unknown => <unknown[]>(<unknown>{
                sort: () => ({
                    exec: () => mockedCategories,
                }),
            }),
    },
}))

describe('mongodbFaqProvider', () => {
    const mongodbFaqProvider = new MongodbFaqProvider()

    describe('getList', () => {
        it('should return list from model', async () => {
            const result = await mongodbFaqProvider.getCategoriesList(SessionType.User, {})

            expect(result).toStrictEqual(mockedCategories)
        })
    })
})
