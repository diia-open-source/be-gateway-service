import TestKit, { mockClass } from '@diia-inhouse/test'

import GetAppSettingsAction from '@actions/v1/getAppSettings'

import NotificationService from '@services/notification'
import SettingsService from '@services/settings'
import VersionService from '@services/version'

import { AppSettings } from '@interfaces/services/settings'

const SettingsServiceMock = mockClass(SettingsService)

describe(`Action ${GetAppSettingsAction.constructor.name}`, () => {
    const testKit = new TestKit()
    const settingsService = new SettingsServiceMock(<NotificationService>{}, <VersionService>{})
    const getAppSettingsAction = new GetAppSettingsAction(settingsService)

    describe('Method `handler`', () => {
        it('should successfully return app settings', async () => {
            const headers = testKit.session.getHeaders()
            const args = {
                headers,
            }
            const expectedAppSettings: AppSettings = {
                minVersion: '1.0.0',
                needActions: [],
            }

            jest.spyOn(settingsService, 'getAppSettings').mockResolvedValueOnce(expectedAppSettings)

            expect(await getAppSettingsAction.handler(args)).toEqual(expectedAppSettings)
        })
    })
})
