import { BadRequestError } from '@diia-inhouse/errors'
import { PlatformType } from '@diia-inhouse/types'

import { MinAppVersionConfigType } from '@interfaces/services/version'
import { AppConfig } from '@interfaces/types/config'

export default class VersionService {
    constructor(private readonly config: AppConfig) {}

    getMinAppVersion(
        platformType: PlatformType,
        configType: MinAppVersionConfigType = MinAppVersionConfigType.MinAppVersion,
    ): string | null {
        let minAppVersion: string | null

        switch (platformType) {
            case PlatformType.Android:
            case PlatformType.Huawei:
                minAppVersion = this.config[configType].android
                break
            case PlatformType.iOS:
                minAppVersion = this.config[configType].ios
                break
            case PlatformType.Browser:
                minAppVersion = null
                break
            default: {
                const unknownType: never = platformType

                throw new BadRequestError('Invalid platform type', { type: unknownType })
            }
        }

        return minAppVersion
    }
}
