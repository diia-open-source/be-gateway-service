import { PlatformType } from '@diia-inhouse/types'

import { AppConfig } from '@interfaces/types/config'

export default class HeaderValidation {
    constructor(private readonly config: AppConfig) {}

    checkMobileUidHeader(mobileUid: string | undefined): boolean {
        if (!mobileUid) {
            return false
        }

        const pattern: RegExp = this.getMobileUuidRegExpPattern()

        return pattern.test(mobileUid)
    }

    checkAppVersionHeader(appVersion: string | undefined): boolean {
        if (!appVersion) {
            return false
        }

        const pattern = /^\d{1,2}.\d{1,2}(?:.\d{1,4}){0,2}$/

        return pattern.test(appVersion)
    }

    checkPlatformTypeHeader(platformType: string | undefined): boolean {
        if (!platformType) {
            return false
        }

        return Object.values(PlatformType).includes(<PlatformType>platformType)
    }

    checkPlatformVersionHeader(platformVersion: string | undefined): boolean {
        if (!platformVersion) {
            return false
        }

        const pattern = /^\d{1,2}(?:\.\d{1,2}){0,2}$/

        return pattern.test(platformVersion)
    }

    private getMobileUuidRegExpPattern(): RegExp {
        const uuidVersions: string[] = this.config.auth.deviceHeaderUuidVersions

        return new RegExp(`^[0-9A-F]{8}-[0-9A-F]{4}-[${uuidVersions.join('')}][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$`, 'i')
    }
}
