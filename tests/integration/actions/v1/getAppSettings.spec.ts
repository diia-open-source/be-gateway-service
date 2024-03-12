import TestKit from '@diia-inhouse/test'

import GetAppSettings from '@actions/v1/getAppSettings'

import NotificationService from '@services/notification'
import VersionService from '@services/version'

import { getApp } from '@tests/utils/getApp'

import { AppAction } from '@interfaces/services/settings'

describe(`Action ${GetAppSettings.name}`, () => {
    let app: Awaited<ReturnType<typeof getApp>>
    let getAppSettings: GetAppSettings
    let testKit: TestKit
    let notificationService: NotificationService
    let versionService: VersionService

    beforeAll(async () => {
        app = await getApp()
        getAppSettings = app.container.build(GetAppSettings)
        testKit = app.container.resolve('testKit')
        notificationService = app.container.resolve<NotificationService>('notificationService')
        versionService = app.container.resolve<VersionService>('versionService')
        await app.start()
    })

    afterAll(async () => {
        await app.stop()
    })

    it(`should return ${AppAction.PushTokenUpdate} if user without push token`, async () => {
        // Arrange
        const headers = testKit.session.getHeaders()

        jest.spyOn(notificationService, 'hasPushToken').mockImplementationOnce(async () => ({ hasPushToken: false }))

        // Act
        const result = await getAppSettings.handler({ headers })

        // Assert
        expect(result.needActions).toContain(AppAction.PushTokenUpdate)
    })

    it(`should not return ${AppAction.PushTokenUpdate} if user with push token`, async () => {
        // Arrange
        const headers = testKit.session.getHeaders()

        jest.spyOn(notificationService, 'hasPushToken').mockImplementationOnce(async () => ({ hasPushToken: true }))

        // Act
        const result = await getAppSettings.handler({ headers })

        // Assert
        expect(result.needActions).not.toContain(AppAction.PushTokenUpdate)
    })

    it(`should return ${AppAction.ForceUpdate} if appVersion is less than minVersion`, async () => {
        // Arrange
        const headers = testKit.session.getHeaders({ appVersion: '1.0.0' })

        jest.spyOn(notificationService, 'hasPushToken').mockImplementationOnce(async () => ({ hasPushToken: true }))
        jest.spyOn(versionService, 'getMinAppVersion').mockImplementationOnce(() => '1000.100.111')

        // Act
        const result = await getAppSettings.handler({ headers })

        // Assert
        expect(result.needActions).toContain(AppAction.ForceUpdate)
    })

    it(`should not return ${AppAction.ForceUpdate} if appVersion is equal to minVersion`, async () => {
        // Arrange
        const appVersion = '3.0.0'

        const headers = testKit.session.getHeaders({ appVersion })

        jest.spyOn(notificationService, 'hasPushToken').mockImplementationOnce(async () => ({ hasPushToken: true }))
        jest.spyOn(versionService, 'getMinAppVersion').mockImplementationOnce(() => appVersion)

        // Act
        const result = await getAppSettings.handler({ headers })

        // Assert
        expect(result.needActions).not.toContain(AppAction.ForceUpdate)
    })

    it(`should not return ${AppAction.ForceUpdate} if appVersion is greater than minVersion`, async () => {
        // Arrange
        const headers = testKit.session.getHeaders({ appVersion: '100.100.1' })

        jest.spyOn(notificationService, 'hasPushToken').mockImplementationOnce(async () => ({ hasPushToken: true }))
        jest.spyOn(versionService, 'getMinAppVersion').mockImplementationOnce(() => '3.0.0')

        // Act
        const result = await getAppSettings.handler({ headers })

        // Assert
        expect(result.needActions).not.toContain(AppAction.ForceUpdate)
    })
})
