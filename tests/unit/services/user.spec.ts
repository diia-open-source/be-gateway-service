import { randomUUID } from 'crypto'

import { MoleculerService } from '@diia-inhouse/diia-app'

import { ProfileFeature } from '@diia-inhouse/types'

import UserService from '@services/user'

import { UserProfileFeatures } from '@interfaces/services/user'

describe('UserService', () => {
    const mockAct = jest.fn()
    const lazyMoleculer = (): MoleculerService => <MoleculerService>(<unknown>{
            act: mockAct,
        })

    const userService = new UserService(lazyMoleculer)

    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('should call getUserProfileFeatures', async () => {
        const userIdentifier = randomUUID()
        const features = [ProfileFeature.office, ProfileFeature.student]
        const expectedResult: UserProfileFeatures = {}

        mockAct.mockResolvedValue(expectedResult)

        const result = await userService.getUserProfileFeatures(userIdentifier, features)

        expect(mockAct).toHaveBeenCalledTimes(1)
        expect(mockAct).toHaveBeenCalledWith(
            'User',
            { name: 'getUserProfileFeatures', actionVersion: 'v1' },
            { params: { userIdentifier, features } },
        )

        expect(result).toEqual(expectedResult)
    })
})
