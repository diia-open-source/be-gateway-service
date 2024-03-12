import { MoleculerService } from '@diia-inhouse/diia-app'

import PartnerService from '@src/services/partner'

import { GetPartnerByTokenResult } from '@interfaces/services/partner'

describe('PartnerService', () => {
    const mockAct = jest.fn()
    const lazyMoleculer = (): MoleculerService => <MoleculerService>(<unknown>{
            act: mockAct,
        })

    const partnerService = new PartnerService(lazyMoleculer)

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should get partner by token', async () => {
        const partnerToken = 'partner-token-123'
        const expectedResult: GetPartnerByTokenResult = <GetPartnerByTokenResult>{}

        mockAct.mockResolvedValue(expectedResult)

        const result = await partnerService.getPartnerByToken(partnerToken)

        expect(mockAct).toHaveBeenCalledTimes(1)
        expect(mockAct).toHaveBeenCalledWith('Partner', { name: 'getPartnerByToken', actionVersion: 'v1' }, { params: { partnerToken } })

        expect(result).toEqual(expectedResult)
    })
})
