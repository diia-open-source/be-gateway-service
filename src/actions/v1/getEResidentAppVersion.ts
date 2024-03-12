import { AppAction } from '@diia-inhouse/diia-app'

import { ActionVersion, SessionType } from '@diia-inhouse/types'

import VersionService from '@services/version'

import { ActionResult, CustomActionArguments } from '@interfaces/actions/v1/getAppVersion'
import { MinAppVersionConfigType } from '@interfaces/services/version'

export default class GetEResidentAppVersion implements AppAction {
    constructor(private readonly versionService: VersionService) {}

    readonly sessionType: SessionType = SessionType.None

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'getEResidentAppVersion'

    async handler(args: CustomActionArguments): Promise<ActionResult> {
        const minVersion = this.versionService.getMinAppVersion(args.headers.platformType, MinAppVersionConfigType.MinEResidentAppVersion)

        return { minVersion }
    }
}
