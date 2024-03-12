import { AppUserActionHeaders, PlatformType } from '@diia-inhouse/types'

import NotificationService from '@services/notification'
import SettingsService from '@services/settings'
import VersionService from '@services/version'

import { AppAction, AppSettings } from '@interfaces/services/settings'

describe('SettingsService', () => {
    const mockHasPushToken = jest.fn()
    const mockGetMinAppVersion = jest.fn()

    const mockNotificationService = <NotificationService>(<unknown>{
        hasPushToken: mockHasPushToken,
    })
    const mockVersionService = <VersionService>(<unknown>{
        getMinAppVersion: mockGetMinAppVersion,
    })

    const settingsService = new SettingsService(mockNotificationService, mockVersionService)

    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe(`method ${settingsService.getAppSettings.name}`, () => {
        it('should get app settings', async () => {
            const headers = <AppUserActionHeaders>(<unknown>{
                platformType: PlatformType.Android,
                appVersion: '1.0.0',
            })
            const expectedResult = <AppSettings>(<unknown>{
                needActions: [AppAction.ForceUpdate],
                minVersion: '1.1.0',
            })

            mockHasPushToken.mockResolvedValue({ hasPushToken: true })
            mockGetMinAppVersion.mockReturnValue('1.1.0')

            const result = await settingsService.getAppSettings(headers)

            expect(mockHasPushToken).toHaveBeenCalledTimes(1)
            expect(result).toEqual(expectedResult)
        })
    })

    describe(`method ${settingsService.isActionNeeded.name}`, () => {
        it('should return true if action is needed', async () => {
            const action = AppAction.ForceUpdate
            const headers = <AppUserActionHeaders>(<unknown>{
                platformType: PlatformType.Android,
                appVersion: '1.0.0',
            })

            mockGetMinAppVersion.mockClear().mockReturnValue('1.1.0')

            const result = await settingsService.isActionNeeded(action, headers)

            expect(mockGetMinAppVersion).toHaveBeenCalledTimes(1)
            expect(mockGetMinAppVersion).toHaveBeenCalledWith(PlatformType.Android)
            expect(result).toBe(true)
        })

        it('should false true if action is not needed', async () => {
            const action = AppAction.ForceUpdate
            const headers = <AppUserActionHeaders>(<unknown>{
                platformType: PlatformType.Android,
                appVersion: '1.0.0',
            })

            mockGetMinAppVersion.mockClear().mockReturnValue(undefined)

            const result = await settingsService.isActionNeeded(action, headers)

            expect(mockGetMinAppVersion).toHaveBeenCalledWith(PlatformType.Android)
            expect(result).toBe(false)
        })

        it('should throw error for unhandled app action', async () => {
            const action = 'UnhandledAction'
            const headers = <AppUserActionHeaders>(<unknown>{
                platformType: PlatformType.Android,
                appVersion: '1.0.0',
            })

            await expect(settingsService.isActionNeeded(<AppAction>action, headers)).rejects.toThrow(TypeError)

            expect(mockGetMinAppVersion).not.toHaveBeenCalled()
        })
    })
})
