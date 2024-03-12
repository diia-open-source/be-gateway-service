import { AppAction } from '@diia-inhouse/diia-app'

import { ActionVersion, SessionType } from '@diia-inhouse/types'

import SettingsService from '@services/settings'

import { ActionResult, CustomActionArguments } from '@interfaces/actions/v1/getAppSettings'

export default class GetAppSettingsAction implements AppAction {
    constructor(private readonly settingsService: SettingsService) {}

    readonly sessionType: SessionType = SessionType.None

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'getAppSettings'

    async handler(args: CustomActionArguments): Promise<ActionResult> {
        const { headers } = args

        return await this.settingsService.getAppSettings(headers)
    }
}
