import { AppAction } from '@diia-inhouse/diia-app'

import { ActionVersion, SessionType } from '@diia-inhouse/types'

import VersionService from '@services/version'

import { ActionResult, CustomActionArguments } from '@interfaces/actions/v1/getAppVersion'

export default class GetAppVersionAction implements AppAction {
    constructor(private readonly versionService: VersionService) {}

    readonly sessionType: SessionType = SessionType.None

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'getAppVersion'

    async handler(args: CustomActionArguments): Promise<ActionResult> {
        const {
            headers: { platformType },
        } = args

        const minVersion = this.versionService.getMinAppVersion(platformType)

        return { minVersion }
    }
}
