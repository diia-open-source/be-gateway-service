import { MoleculerService } from '@diia-inhouse/diia-app'

import { ActionVersion } from '@diia-inhouse/types'

import { GetPartnerByTokenResult } from '@interfaces/services/partner'

export default class PartnerService {
    private readonly serviceName: string = 'Partner'

    constructor(private readonly lazyMoleculer: () => MoleculerService) {}

    async getPartnerByToken(partnerToken: string): Promise<GetPartnerByTokenResult> {
        return await this.lazyMoleculer().act(
            this.serviceName,
            { name: 'getPartnerByToken', actionVersion: ActionVersion.V1 },
            { params: { partnerToken } },
        )
    }
}
