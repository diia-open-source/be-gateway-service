import { CacheService } from '@diia-inhouse/redis'

import PublicServicesListService from '@services/publicServicesList'

import PublicServiceDataMapper from '@dataMappers/publicServiceDataMapper'

import { logger } from '@mocks/index'

import { PublicServiceStatus } from '@interfaces/services/publicServicesList'

describe('PublicServicesListService', () => {
    const mockCacheService: CacheService = <CacheService>(<unknown>{
        set: jest.fn(),
        getKeysByPattern: jest.fn(),
        getByKeys: jest.fn(),
    })
    const mockDataMapper = new PublicServiceDataMapper()

    const publicServicesListService = new PublicServicesListService(mockDataMapper, mockCacheService, logger)

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should initialize public services list', async () => {
        await publicServicesListService.onInit()

        expect(mockCacheService.set).toHaveBeenCalledTimes(7)
        expect(logger.info).toHaveBeenCalledWith('Start insert public services')
        expect(logger.info).toHaveBeenCalledWith('Public services inserted successfully')
    })

    it('should get public services', async () => {
        const keys = [
            'public-service.penalties',
            'public-service.debts',
            'public-service.taxes',
            'public-service.documentRecovery',
            'public-service.individualEntrepreneurRegistration',
            'public-service.residenceRegistrationChange',
            'public-service.marriageRegistration',
        ]
        const publicServicesJSON = [
            JSON.stringify({ code: 'penalties', name: 'Штрафи за порушення ПДР', status: PublicServiceStatus.Active, sortOrder: 100 }),
            JSON.stringify({ code: 'debts', name: 'Виконавчі провадження', status: PublicServiceStatus.Active, sortOrder: 101 }),
            JSON.stringify({ code: 'taxes', name: 'Податки', status: PublicServiceStatus.InDevelopment, sortOrder: 102 }),
        ]

        jest.spyOn(mockCacheService, 'getKeysByPattern').mockResolvedValue(keys)

        jest.spyOn(mockCacheService, 'getByKeys').mockResolvedValue(publicServicesJSON)

        const result = await publicServicesListService.getPublicServices()

        expect(mockCacheService.getKeysByPattern).toHaveBeenCalledWith('public-service.*')
        expect(mockCacheService.getByKeys).toHaveBeenCalledWith(keys)
        expect(result).toHaveLength(3)
    })

    it('should return an empty array if no keys are found', async () => {
        jest.spyOn(mockCacheService, 'getKeysByPattern').mockResolvedValue([])

        const result = await publicServicesListService.getPublicServices()

        expect(mockCacheService.getKeysByPattern).toHaveBeenCalledWith('public-service.*')
        expect(logger.error).toHaveBeenCalledWith('Failed to find public services keys')
        expect(result).toEqual([])
    })

    it('should return an empty array if no public services are found by keys', async () => {
        const keys = ['public-service.penalties', 'public-service.debts', 'public-service.taxes']

        jest.spyOn(mockCacheService, 'getKeysByPattern').mockResolvedValue(keys)
        jest.spyOn(mockCacheService, 'getByKeys').mockResolvedValue([])

        const result = await publicServicesListService.getPublicServices()

        expect(mockCacheService.getKeysByPattern).toHaveBeenCalledWith('public-service.*')
        expect(mockCacheService.getByKeys).toHaveBeenCalledWith(keys)
        expect(logger.error).toHaveBeenCalledWith('Failed to find public services by keys')
        expect(result).toEqual([])
    })
})
