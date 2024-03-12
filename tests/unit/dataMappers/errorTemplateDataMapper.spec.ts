import ErrorTemplateDataMapper from '@dataMappers/errorTemplateDataMapper'

import { ErrorTemplateModel } from '@interfaces/models/errorTemplate'

describe(`Mapper ${ErrorTemplateDataMapper.name}`, () => {
    let errorTemplateDataMapper: ErrorTemplateDataMapper

    beforeEach(() => {
        errorTemplateDataMapper = new ErrorTemplateDataMapper()
    })

    it('should map ErrorTemplateModel to ErrorTemplateResult correctly', () => {
        const errorTemplateModel = {
            _id: 123,
            errorCode: 404,
            template: {
                description: 'Not found',
            },
        }

        const expectedErrorTemplateResult = {
            id: '123',
            errorCode: 404,
            template: {
                description: 'Not found',
            },
        }

        const result = errorTemplateDataMapper.toEntity(<ErrorTemplateModel>errorTemplateModel)

        expect(result).toEqual(expectedErrorTemplateResult)
    })

    it('should not modify the original ErrorTemplateModel object', () => {
        const errorTemplateModel = {
            _id: 123,
            errorCode: 404,
            template: {
                description: 'Not found',
            },
        }

        const originTemplateCopy = { ...errorTemplateModel }

        const expectedErrorTemplateResult = {
            id: '123',
            errorCode: 404,
            template: {
                description: 'Not found',
            },
        }

        const result = errorTemplateDataMapper.toEntity(<ErrorTemplateModel>errorTemplateModel)

        expect(result).toEqual(expectedErrorTemplateResult)
        expect(errorTemplateModel).toEqual(originTemplateCopy)
    })

    it('should handle empty template in ErrorTemplateModel', () => {
        const errorTemplateModel = {
            _id: 456,
            errorCode: 500,
            template: {},
        }

        const expectedErrorTemplateResult = {
            id: '456',
            errorCode: 500,
            template: {},
        }

        const result = errorTemplateDataMapper.toEntity(<ErrorTemplateModel>errorTemplateModel)

        expect(result).toEqual(expectedErrorTemplateResult)
    })

    it('should handle missing id in ErrorTemplateModel', () => {
        const errorTemplateModel = {
            errorCode: 400,
            template: {
                description: 'Bad Request',
            },
        }

        expect(() => {
            errorTemplateDataMapper.toEntity(<ErrorTemplateModel>errorTemplateModel)
        }).toThrow(new Error("Cannot read properties of undefined (reading 'toString')"))
    })
})
