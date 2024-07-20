import { ActionVersion, HttpMethod, SessionType } from '@diia-inhouse/types'

import { RouteHeaderRawName } from '@interfaces/index'
import { AppRoute } from '@interfaces/routes/appRoute'
import { PartnerDepositGuaranteePaymentsScope, PartnerScopeType } from '@interfaces/routes/depositGuaranteePayments'
import { PartnerMaintenanceScope } from '@interfaces/routes/partner'

enum DepositGuaranteePaymentsServiceActions {
    GetDepositGuaranteePaymentsServiceInfo = 'getDepositGuaranteePaymentsServiceInfo',
    GetDepositGuaranteePaymentsApplication = 'getDepositGuaranteePaymentsApplication',
    GetDepositGuaranteePaymentsLiquidatedBanks = 'getDepositGuaranteePaymentsLiquidatedBanks',
    CreateDepositGuaranteePaymentsApplication = 'createDepositGuaranteePaymentsApplication',
    GetDepositGuaranteePaymentsBankAccounts = 'getDepositGuaranteePaymentsBankAccounts',
    GetDepositGuaranteePaymentsBanks = 'getDepositGuaranteePaymentsBanks',
    GetDepositGuaranteePaymentsContacts = 'getDepositGuaranteePaymentsContacts',
    UpdateDepositGuaranteePaymentsApplication = 'updateDepositGuaranteePaymentsApplication',
    GetDepositGuaranteePaymentsApplicationToConfirm = 'getDepositGuaranteePaymentsApplicationToConfirm',
    GetDepositGuaranteePaymentsHashedFilesToSign = 'getDepositGuaranteePaymentsHashedFilesToSign',
    SendDepositGuaranteePaymentsSignedItems = 'sendDepositGuaranteePaymentsSignedItems',
    CancelDepositGuaranteePaymentsApplication = 'cancelDepositGuaranteePaymentsApplication',

    UpdateDepositGuaranteePaymentsApplicationStatus = 'updateDepositGuaranteePaymentsApplicationStatus',
    LoadCompensationDeposits = 'loadCompensationDeposits',
}

const routes: AppRoute[] = [
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/deposit-guarantee-payments',
        action: DepositGuaranteePaymentsServiceActions.GetDepositGuaranteePaymentsServiceInfo,
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
        path: '/api/:apiVersion/public-service/deposit-guarantee-payments/application/:applicationId',
        action: DepositGuaranteePaymentsServiceActions.GetDepositGuaranteePaymentsApplication,
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
        path: '/api/:apiVersion/public-service/deposit-guarantee-payments/liquidated-banks',
        action: DepositGuaranteePaymentsServiceActions.GetDepositGuaranteePaymentsLiquidatedBanks,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/deposit-guarantee-payments/application',
        action: DepositGuaranteePaymentsServiceActions.CreateDepositGuaranteePaymentsApplication,
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
        path: '/api/:apiVersion/public-service/deposit-guarantee-payments/bank-accounts',
        action: DepositGuaranteePaymentsServiceActions.GetDepositGuaranteePaymentsBankAccounts,
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
        path: '/api/:apiVersion/public-service/deposit-guarantee-payments/banks',
        action: DepositGuaranteePaymentsServiceActions.GetDepositGuaranteePaymentsBanks,
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
        path: '/api/:apiVersion/public-service/deposit-guarantee-payments/contacts',
        action: DepositGuaranteePaymentsServiceActions.GetDepositGuaranteePaymentsContacts,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.PATCH,
        path: '/api/:apiVersion/public-service/deposit-guarantee-payments/application/:applicationId',
        action: DepositGuaranteePaymentsServiceActions.UpdateDepositGuaranteePaymentsApplication,
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
        path: '/api/:apiVersion/public-service/deposit-guarantee-payments/application/:applicationId/confirmation',
        action: DepositGuaranteePaymentsServiceActions.GetDepositGuaranteePaymentsApplicationToConfirm,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/deposit-guarantee-payments/application/:applicationId/signing',
        action: DepositGuaranteePaymentsServiceActions.GetDepositGuaranteePaymentsHashedFilesToSign,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/deposit-guarantee-payments/application/:applicationId/send',
        action: DepositGuaranteePaymentsServiceActions.SendDepositGuaranteePaymentsSignedItems,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.DELETE,
        path: '/api/:apiVersion/public-service/deposit-guarantee-payments/application/:applicationId',
        action: DepositGuaranteePaymentsServiceActions.CancelDepositGuaranteePaymentsApplication,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },

    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/partner/deposit-guarantee-payments/:applicationId',
        action: DepositGuaranteePaymentsServiceActions.UpdateDepositGuaranteePaymentsApplicationStatus,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.depositGuaranteePayments]: [PartnerDepositGuaranteePaymentsScope.UpdateStatus],
                },
            },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/deposit-guarantee-payments/compensation-deposits/load',
        action: DepositGuaranteePaymentsServiceActions.LoadCompensationDeposits,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.maintenance]: [PartnerMaintenanceScope.Admin],
                },
            },
        ],
    },
]

export default routes
