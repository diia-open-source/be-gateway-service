import { randomUUID } from 'node:crypto'

import { SetRequired } from 'type-fest'

import { ExternalEventBus } from '@diia-inhouse/diia-queue'
import { ValidationError } from '@diia-inhouse/errors'
import { PartnerSession } from '@diia-inhouse/types'

import NotificationDistributionCancelEventListener from '@src/externalEventListeners/notification/notificationDistributionCancel'
import NotificationDistributionCreateEventListener from '@src/externalEventListeners/notification/notificationDistributionCreate'
import NotificationDistributionStatusEventListener from '@src/externalEventListeners/notification/notificationDistributionStatus'
import NotificationDistributionStatusRecipientsEventListener from '@src/externalEventListeners/notification/notificationDistributionStatusRecipients'
import NotificationTemplateCreateEventListener from '@src/externalEventListeners/notification/notificationTemplateCreate'

import NotificationService from '@services/notification'

import ExternalEventListenersUtils from '@utils/externalEventListeners'

import { EventPayload } from '@interfaces/externalEventListeners/notification'
import { AppRoute } from '@interfaces/routes/appRoute'

describe.each([
    [NotificationTemplateCreateEventListener],
    [NotificationDistributionCancelEventListener],
    [NotificationDistributionCreateEventListener],
    [NotificationDistributionStatusEventListener],
    [NotificationDistributionStatusRecipientsEventListener],
])('EventListener:', (eventListener) => {
    describe(`${eventListener.name}:`, () => {
        const externalEventListenersUtils: ExternalEventListenersUtils = <ExternalEventListenersUtils>(<unknown>{
            handleError: jest.fn(),
            validatePartnerRoute: jest.fn(),
        })
        const notificationService: NotificationService = <NotificationService>(<unknown>{
            makeRequest: jest.fn(),
        })

        const externalEventBus: ExternalEventBus = <ExternalEventBus>(<unknown>{
            publish: jest.fn(),
        })

        const notificationEventListener = new eventListener(externalEventListenersUtils, notificationService, externalEventBus)

        const eventName = notificationEventListener.event

        describe('method: `validationErrorHandler`', () => {
            it('should call handleError', async () => {
                const error = new ValidationError()
                const uuid = randomUUID()

                await notificationEventListener.validationErrorHandler(error, uuid)

                expect(externalEventListenersUtils.handleError).toHaveBeenCalledWith(error, eventName, uuid)
            })
        })

        describe('method: `handler`', () => {
            const payload: EventPayload = {
                uuid: randomUUID(),
                request: {
                    partnerId: randomUUID(),
                    params: {},
                },
            }

            it('should successfully subscribe to event', async () => {
                const route = <SetRequired<AppRoute, 'action'>>{
                    action: 'action',
                }
                const session = <PartnerSession>{}

                jest.spyOn(externalEventListenersUtils, 'validatePartnerRoute').mockResolvedValueOnce([route, session])
                jest.spyOn(notificationService, 'makeRequest').mockResolvedValueOnce({})

                await notificationEventListener.handler(payload)

                expect(externalEventListenersUtils.validatePartnerRoute).toHaveBeenCalledWith(eventName, payload.request.partnerId)
                expect(notificationService.makeRequest).toHaveBeenCalledWith(route.action, { params: payload.request.params }, session)
                expect(externalEventBus.publish).toHaveBeenCalledWith(notificationEventListener.event, {
                    uuid: payload.uuid,
                    response: {},
                })
            })

            it('should catch throwed error', async () => {
                const error = new Error('test')

                jest.spyOn(externalEventListenersUtils, 'validatePartnerRoute').mockRejectedValueOnce(error)

                await notificationEventListener.handler(payload)

                expect(externalEventListenersUtils.handleError).toHaveBeenCalledWith(error, eventName, payload.uuid)
            })
        })
    })
})
