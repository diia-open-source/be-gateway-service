import { AppAction } from '@diia-inhouse/diia-app'

import { ActionVersion, SessionType } from '@diia-inhouse/types'

import PublicServicesListService from '@services/publicServicesList'

import { ActionResult } from '@interfaces/actions/v1/getPublicServices'
import { PublicServiceResponse } from '@interfaces/services/publicServicesList'

export default class GetPublicServicesAction implements AppAction {
    constructor(private readonly publicServicesListService: PublicServicesListService) {}

    readonly sessionType: SessionType = SessionType.User

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'getPublicServices'

    async handler(): Promise<ActionResult> {
        const publicServices: PublicServiceResponse[] = await this.publicServicesListService.getPublicServices()

        return { publicServices }
    }
}
