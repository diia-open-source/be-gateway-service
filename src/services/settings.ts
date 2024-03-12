import { compare as compareSemver } from 'compare-versions'

import { AppUserActionHeaders } from '@diia-inhouse/types'

import NotificationService from '@services/notification'
import VersionService from '@services/version'

import { AppAction, AppSettings } from '@interfaces/services/settings'

export default class SettingsService {
    constructor(
        private readonly notificationService: NotificationService,
        private readonly versionService: VersionService,
    ) {}

    async getAppSettings(headers: AppUserActionHeaders): Promise<AppSettings> {
        const { platformType } = headers

        const needActions: AppAction[] = []
        const tasks = Object.values(AppAction).map(async (action) => {
            const isActionNeeded = await this.isActionNeeded(action, headers)

            if (isActionNeeded) {
                needActions.push(action)
            }
        })

        await Promise.all(tasks)

        return {
            needActions,
            minVersion: this.versionService.getMinAppVersion(platformType),
        }
    }

    async isActionNeeded(action: AppAction, appHeaders: AppUserActionHeaders): Promise<boolean> {
        switch (action) {
            case AppAction.PushTokenUpdate: {
                const { hasPushToken } = await this.notificationService.hasPushToken()

                return !hasPushToken
            }
            case AppAction.ForceUpdate: {
                const { platformType, appVersion } = appHeaders

                const minVersion = this.versionService.getMinAppVersion(platformType)

                if (!minVersion) {
                    return false
                }

                return compareSemver(minVersion, appVersion, '>')
            }
            default: {
                const unhandledAction: never = action

                throw new TypeError(`Unhandled app action: ${unhandledAction}`)
            }
        }
    }
}
