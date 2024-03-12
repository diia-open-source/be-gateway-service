import TestKit, { mockClass } from '@diia-inhouse/test'

import GetEResidentAppVersionAction from '@actions/v1/getEResidentAppVersion'

import VersionService from '@services/version'

import { MinAppVersionConfigType } from '@interfaces/services/version'
import { AppConfig } from '@interfaces/types/config'

const VersionServiceMock = mockClass(VersionService)

describe(`Action ${GetEResidentAppVersionAction.constructor.name}`, () => {
    const testKit = new TestKit()
    const versionService = new VersionServiceMock(<AppConfig>{})
    const getAppVersionAction = new GetEResidentAppVersionAction(versionService)

    describe('Method `handler`', () => {
        it('should successfully return min app version', async () => {
            const headers = testKit.session.getHeaders()

            const args = {
                headers,
            }

            jest.spyOn(versionService, 'getMinAppVersion').mockReturnValueOnce('1.0.0')

            expect(await getAppVersionAction.handler(args)).toEqual({ minVersion: '1.0.0' })
            expect(versionService.getMinAppVersion).toHaveBeenCalledWith(
                headers.platformType,
                MinAppVersionConfigType.MinEResidentAppVersion,
            )
        })
    })
})
