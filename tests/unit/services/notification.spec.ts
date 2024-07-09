import { randomUUID } from 'node:crypto'

import { MoleculerService } from '@diia-inhouse/diia-app'

import { ActionSession } from '@diia-inhouse/types'

import NotificationService from '@src/services/notification'

describe('NotificationService', () => {
    const mockAct = jest.fn()
    const lazyMoleculer = (): MoleculerService => <MoleculerService>(<unknown>{
            act: mockAct,
        })
    const notificationService = new NotificationService(lazyMoleculer)

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should make a request', async () => {
        const actionName = 'testAction'
        const params = { param1: 'value1', param2: 'value2' }
        const session: ActionSession = <ActionSession>(<unknown>{ userIdentifier: randomUUID(), deviceToken: 'device-123' })
        const expectedResult = { result: 'test' }

        mockAct.mockResolvedValue(expectedResult)

        const result = await notificationService.makeRequest(actionName, params, session)

        expect(mockAct).toHaveBeenCalledTimes(1)
        expect(mockAct).toHaveBeenCalledWith('Notification', { name: actionName, actionVersion: 'v1' }, { params, session })

        expect(result).toEqual(expectedResult)
    })

    it('should check if push token exists', async () => {
        const expectedResult = { hasPushToken: true }

        mockAct.mockResolvedValue(expectedResult)

        const result = await notificationService.hasPushToken()

        expect(mockAct).toHaveBeenCalledTimes(1)
        expect(mockAct).toHaveBeenCalledWith('Notification', { name: 'hasPushToken', actionVersion: 'v1' })

        expect(result).toEqual(expectedResult)
    })
})
