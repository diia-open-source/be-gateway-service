import { SetRequired } from 'type-fest'

import { ExternalEvent, ExternalEventBus } from '@diia-inhouse/diia-queue'
import { NotFoundError, ServiceUnavailableError } from '@diia-inhouse/errors'
import { ActionVersion, PartnerSession, PartnerTokenData, SessionType } from '@diia-inhouse/types'

import AuthenticateMiddleware from '../middlewares/authenticate'
import RoutesBuilder from '../routes'

import Utils from '.'

import ErrorTemplateService from '@services/errorTemplate'
import PartnerService from '@services/partner'

import { MessageError, MessagePayload } from '@interfaces/externalEventListeners'
import { ResponseError } from '@interfaces/index'
import { AppRoute } from '@interfaces/routes/appRoute'

export default class ExternalEventListenersUtils {
    constructor(
        private readonly routesBuilder: RoutesBuilder,
        private readonly authenticateMiddleware: AuthenticateMiddleware,
        private readonly partnerService: PartnerService,
        private readonly errorTemplateService: ErrorTemplateService,
        private readonly externalEventBus: ExternalEventBus,
    ) {}

    async validatePartnerRoute(
        event: ExternalEvent,
        partnerToken: string,
    ): Promise<[SetRequired<AppRoute, 'action'>, PartnerSession] | never> {
        const route = this.routesBuilder.routeByExternalEventMap.get(event)
        if (!route?.action) {
            throw new NotFoundError('Unexpected event without handler received')
        }

        const { _id: id, scopes } = await this.partnerService.getPartnerByToken(partnerToken)
        const partner: PartnerTokenData = { _id: id, scopes, sessionType: SessionType.Partner, refreshToken: null }
        const routeAuthParams = this.authenticateMiddleware.getRouteAuthParams(ActionVersion.V1, route.auth)

        if (routeAuthParams?.scopes) {
            this.authenticateMiddleware.validateScopes(routeAuthParams.scopes, scopes)
        }

        return [<SetRequired<AppRoute, 'action'>>route, { partner, sessionType: SessionType.Partner }]
    }

    async handleError(err: unknown, event: ExternalEvent, eventUuid: string): Promise<void | never> {
        const error = <ResponseError>err

        Utils.handleValidationError(error)
        const messageError: MessageError = {
            http_code: error.code,
            message: error.message,
            data: error.data,
        }

        if (error.data?.processCode && Utils.isErrorCode(error.data?.processCode)) {
            const { processCode } = error.data

            messageError.errorCode = processCode

            const template = await this.errorTemplateService.fetchErrorTemplateByCode(processCode)
            if (template) {
                const {
                    template: { description },
                } = template

                messageError.description = description
            }
        }

        const message: MessagePayload = {
            uuid: eventUuid,
            error: messageError,
        }

        await this.externalEventBus.publish(event, message)

        throw new ServiceUnavailableError(error.message)
    }
}
