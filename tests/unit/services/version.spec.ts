import { BadRequestError } from '@diia-inhouse/errors'
import { PlatformType } from '@diia-inhouse/types'

import VersionService from '@services/version'

import { MinAppVersionConfigType } from '@interfaces/services/version'
import { AppConfig } from '@interfaces/types/config'

describe('VersionService', () => {
    const versionService = new VersionService(<AppConfig>{
        [MinAppVersionConfigType.MinAppVersion]: {
            android: '1.0.0',
            ios: '1.1.0',
        },
        [MinAppVersionConfigType.MinEResidentAppVersion]: {
            android: '1.3.0',
            ios: '1.2.0',
        },
    })

    describe('method: `getMinAppVersion`', () => {
        it.each([
            ['1.0.0', PlatformType.Android, MinAppVersionConfigType.MinAppVersion],
            ['1.0.0', PlatformType.Huawei, MinAppVersionConfigType.MinAppVersion],
            ['1.1.0', PlatformType.iOS, MinAppVersionConfigType.MinAppVersion],
            [null, PlatformType.Browser, MinAppVersionConfigType.MinAppVersion],
            ['1.3.0', PlatformType.Android, MinAppVersionConfigType.MinEResidentAppVersion],
            ['1.3.0', PlatformType.Huawei, MinAppVersionConfigType.MinEResidentAppVersion],
            ['1.2.0', PlatformType.iOS, MinAppVersionConfigType.MinEResidentAppVersion],
            [null, PlatformType.Browser, MinAppVersionConfigType.MinEResidentAppVersion],
        ])('should return min version %s for %s platform type and %s config type', (expectedMinVersion, platformType, configType) => {
            expect(versionService.getMinAppVersion(platformType, configType)).toEqual(expectedMinVersion)
        })
        it('should throw error for unknown platform type', () => {
            expect(() => {
                versionService.getMinAppVersion(<PlatformType>'unknown')
            }).toThrow(new BadRequestError('Invalid platform type', { type: 'unknown' }))
        })
    })
})
