import { InternalServerError } from '@diia-inhouse/errors'
import { StoreService, StoreTag } from '@diia-inhouse/redis'

import StoreManagementService from '@services/storeManagement'

import { logger } from '@mocks/index'

describe('StoreManagementService', () => {
    const mockBumpTags = jest.fn()
    const mockStoreService = <StoreService>(<unknown>{ bumpTags: mockBumpTags })
    const storeManagementService = new StoreManagementService(mockStoreService, logger)

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should successfully bump tags', async () => {
        const tags = [StoreTag.ErrorTemplate, StoreTag.Faq]

        mockBumpTags.mockResolvedValue(true)

        await storeManagementService.bumpTags(tags)

        expect(mockBumpTags).toHaveBeenCalledTimes(1)
        expect(mockBumpTags).toHaveBeenCalledWith(tags)
        expect(logger.error).not.toHaveBeenCalled()
    })

    it('should throw InternalServerError when bump tags fails', async () => {
        const tags = [StoreTag.MilitaryBondsName, StoreTag.PublicService]

        mockBumpTags.mockResolvedValue(false)

        await expect(storeManagementService.bumpTags(tags)).rejects.toThrow(InternalServerError)

        expect(mockBumpTags).toHaveBeenCalledTimes(1)
        expect(mockBumpTags).toHaveBeenCalledWith(tags)
        expect(logger.error).toHaveBeenCalledTimes(1)
        expect(logger.error).toHaveBeenCalledWith('Failed to bump tags', { tags })
    })
})
