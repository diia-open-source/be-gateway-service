import { ActionVersion, HttpMethod, SessionType } from '@diia-inhouse/types'

import { RouteHeaderRawName } from '@interfaces/index'
import { AppRoute } from '@interfaces/routes/appRoute'
import { PartnerMaintenanceScope } from '@interfaces/routes/partner'
import { PartnerPaymentScope, PartnerScopeType } from '@interfaces/routes/payment'

enum PaymentServiceActions {
    RetryPaymentCallbackStatus = 'retryPaymentCallbackStatus',
    SavePaymentStatus = 'savePaymentStatus',
    GetReceiptLink = 'getReceiptLink',
    GetReceipts = 'getReceipts',
    GetReceiptData = 'getReceiptData',

    GetPaymentMethods = 'getPaymentMethods',
    GetPaymentMethodsByTarget = 'getPaymentMethodsByTarget',
    getPaymentMethodsByTargetWithAmounts = 'getPaymentMethodsByTargetWithAmounts',
    GetPaymentMethodCards = 'getPaymentMethodCards',

    HandleBankPaymentRequestCallback = 'handleBankPaymentRequestCallback',
}

const routes: AppRoute[] = [
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/payment/retry-status',
        action: PaymentServiceActions.RetryPaymentCallbackStatus,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.maintenance]: [PartnerMaintenanceScope.Admin],
                },
            },
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V2,
                scopes: {
                    [PartnerScopeType.maintenance]: [PartnerMaintenanceScope.Admin],
                },
            },
        ],
        metadata: {
            tags: ['Payment Status'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/payment/status',
        action: PaymentServiceActions.SavePaymentStatus,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.payment]: [PartnerPaymentScope.Debt, PartnerPaymentScope.Penalty],
                },
            },
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V2,
                scopes: {
                    [PartnerScopeType.payment]: [PartnerPaymentScope.Debt, PartnerPaymentScope.Penalty],
                },
            },
        ],
        metadata: {
            tags: ['Payment Status'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/payment/receipt/:publicServiceCode/:resourceId',
        action: PaymentServiceActions.GetReceiptLink,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            deprecated: true,
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/payment/receipts/:target/:resourceId',
        action: PaymentServiceActions.GetReceipts,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/payment/methods',
        action: PaymentServiceActions.GetPaymentMethods,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Payment Method'],
            deprecated: true,
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/payment/:target/methods',
        action: PaymentServiceActions.GetPaymentMethodsByTarget,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Payment Method'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/payment/:target/methods',
        action: PaymentServiceActions.getPaymentMethodsByTargetWithAmounts,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Payment Method'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/payment/:method/cards',
        action: PaymentServiceActions.GetPaymentMethodCards,
        auth: [
            { sessionType: SessionType.User, version: ActionVersion.V1 },
            { sessionType: SessionType.User, version: ActionVersion.V2 },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Payment Method'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/payment/request/callback',
        action: PaymentServiceActions.HandleBankPaymentRequestCallback,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.payment]: [PartnerPaymentScope.Debt, PartnerPaymentScope.Penalty],
                },
            },
        ],
        metadata: {
            tags: ['Payment Status'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/payment/receipt/:orderId',
        action: PaymentServiceActions.GetReceiptData,
        auth: [{ sessionType: SessionType.Partner, version: ActionVersion.V1 }],
    },
]

export default routes
