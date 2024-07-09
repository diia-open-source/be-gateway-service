import { ActionVersion, HttpMethod, SessionType } from '@diia-inhouse/types'

import { PartnerMaintenanceScope, PartnerScopeType } from '@src/interfaces/routes/marriage'
import { DEFAULT_USER_AUTH, DEFAULT_USER_HEADERS } from '@src/routes/defaults'

import { RouteHeaderRawName } from '@interfaces/index'
import { AppRoute } from '@interfaces/routes/appRoute'

const serviceId = 'marriage'

const routes: AppRoute[] = [
    // marriage
    {
        method: HttpMethod.GET,
        path: '/api/v1/public-service/marriage',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.POST,
        path: '/api/v1/public-service/marriage/application/create',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.GET,
        path: '/api/v1/public-service/marriage/application/:applicationId/share-context',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.POST,
        path: '/api/v1/public-service/marriage/application/:applicationId/share',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.POST,
        path: '/api/v1/public-service/marriage/application/verify/:otp',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.POST,
        path: '/api/v1/public-service/marriage/application/:applicationId/join',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.POST,
        path: '/api/v1/public-service/marriage/application/:applicationId/reject',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.GET,
        path: '/api/v1/public-service/marriage/application/:applicationId/calendar',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.GET,
        path: '/api/v1/public-service/marriage/application/:applicationId/calendar-slots',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.PATCH,
        path: '/api/v1/public-service/marriage/application/:applicationId/save-slot',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.GET,
        path: '/api/v1/public-service/marriage/application/:applicationId/surname-options',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.PATCH,
        path: '/api/v1/public-service/marriage/application/:applicationId/save-surname-option',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.GET,
        path: '/api/v1/public-service/marriage/application/:applicationId/surname-correction',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.PATCH,
        path: '/api/v1/public-service/marriage/application/:applicationId/save-surname-correction',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.GET,
        path: '/api/v1/public-service/marriage/application/:applicationId/methods-of-obtaining',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.PATCH,
        path: '/api/v1/public-service/marriage/application/:applicationId/save-method-of-obtaining',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.PATCH,
        path: '/api/v1/public-service/marriage/application/:applicationId/save-delivery-address',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.GET,
        path: '/api/v3/public-service/marriage/contacts',
        proxyTo: { serviceId },
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V3 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V3] },
        ],
    },
    {
        method: HttpMethod.PATCH,
        path: '/api/v1/public-service/marriage/application/:applicationId/save-contacts',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.GET,
        path: '/api/v1/public-service/marriage/application/:applicationId/confirmation',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.POST,
        path: '/api/v1/public-service/marriage/application/:applicationId/confirm',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.POST,
        path: '/api/v1/public-service/marriage/application/:applicationId/signing',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.POST,
        path: '/api/v1/public-service/marriage/application/:applicationId/send',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.DELETE,
        path: '/api/v1/public-service/marriage/application/:applicationId/cancel',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.POST,
        path: '/api/v1/public-service/marriage/application/:applicationId/join-conference',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.GET,
        path: '/api/v1/public-service/marriage/application/:applicationId/agreement-to-sign',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.POST,
        path: '/api/v1/public-service/marriage/application/:applicationId/record-signing',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.POST,
        path: '/api/v1/public-service/marriage/application/:applicationId/record-send',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.GET,
        path: '/api/v1/analytics/service-rating/public-service/marriage/rating-form',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: {
            tags: ['Rating'],
        },
    },

    // proposal
    {
        method: HttpMethod.GET,
        path: '/api/v1/public-service/proposal',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.POST,
        path: '/api/v1/public-service/proposal/application/create',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.POST,
        path: '/api/v1/public-service/proposal/application/:applicationId/share',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.POST,
        path: '/api/v1/public-service/proposal/application/:applicationId',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.POST,
        path: '/api/v1/public-service/proposal/application/:applicationId/join',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.POST,
        path: '/api/v1/public-service/proposal/application/:applicationId/reject',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.DELETE,
        path: '/api/v1/public-service/proposal/application/:applicationId/cancel',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.GET,
        path: '/api/v1/analytics/service-rating/public-service/proposal/rating-form',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: {
            tags: ['Rating'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/v1/public-service/marriage/application/:applicationId/download',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.POST,
        path: '/api/v1/public-service/marriage/application/:applicationId/applicant-check',
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },

    // support
    {
        method: HttpMethod.GET,
        path: '/api/v1/public-service/proposal/support/generate-proposal-image',
        proxyTo: { serviceId },
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: { [PartnerScopeType.maintenance]: [PartnerMaintenanceScope.Admin] },
            },
        ],
        metadata: {
            tags: ['Support'],
        },
    },
]

export default routes
