import BankDataMapper from '@dataMappers/publicServiceDataMapper'

import { PublicServiceStatus } from '@interfaces/services/publicServicesList'

describe(`Mapper ${BankDataMapper.name}`, () => {
    let bankDataMapper: BankDataMapper

    beforeEach(() => {
        bankDataMapper = new BankDataMapper()
    })

    it('should map PublicService to PublicServiceResponse correctly', () => {
        const publicService = {
            id: 1,
            name: 'Bank A',
            code: 'BANK_A',
            status: PublicServiceStatus.Active,
            sortOrder: 5,
        }

        const expectedResponse = {
            id: 1,
            name: 'Bank A',
            code: 'BANK_A',
            status: PublicServiceStatus.Active,
        }

        const result = bankDataMapper.toEntity(publicService)

        expect(result).toEqual(expectedResponse)
    })

    it('should not modify the original PublicService object', () => {
        const publicServiceTemplate = {
            id: 1,
            name: 'Bank A',
            code: 'BANK_A',
            status: PublicServiceStatus.Active,
            sortOrder: 5,
        }

        const expectedResponse = {
            id: 1,
            name: 'Bank A',
            code: 'BANK_A',
            status: PublicServiceStatus.Active,
        }
        const originPublicServiceTemplateCopy = { ...publicServiceTemplate }

        const result = bankDataMapper.toEntity(publicServiceTemplate)

        expect(result).toEqual(expectedResponse)
        expect(publicServiceTemplate).toEqual(originPublicServiceTemplateCopy)
    })
})
