import { MoleculerService } from '@diia-inhouse/diia-app'

import { ActionVersion, ProfileFeature } from '@diia-inhouse/types'

import { UserProfileFeatures } from '@interfaces/services/user'

export default class UserService {
    private readonly serviceName: string = 'User'

    constructor(private readonly lazyMoleculer: () => MoleculerService) {}

    async getUserProfileFeatures(userIdentifier: string, features: ProfileFeature[]): Promise<UserProfileFeatures> {
        return await this.lazyMoleculer().act(
            this.serviceName,
            { name: 'getUserProfileFeatures', actionVersion: ActionVersion.V1 },
            { params: { userIdentifier, features } },
        )
    }
}
