import { MoleculerService } from '@diia-inhouse/diia-app'

import { ActionSession, ActionVersion, GenericObject } from '@diia-inhouse/types'

export default class NotificationService {
    private readonly serviceName: string = 'Notification'

    constructor(private readonly lazyMoleculer: () => MoleculerService) {}

    async makeRequest<T = unknown>(actionName: string, params: GenericObject, session: ActionSession): Promise<T> {
        return await this.lazyMoleculer().act(this.serviceName, { name: actionName, actionVersion: ActionVersion.V1 }, { params, session })
    }

    async hasPushToken(): Promise<{ hasPushToken: boolean }> {
        return await this.lazyMoleculer().act(this.serviceName, { name: 'hasPushToken', actionVersion: ActionVersion.V1 })
    }
}
