import { ActionVersion, HttpMethod, SessionType } from '@diia-inhouse/types'

import { DEFAULT_USER_AUTH, DEFAULT_USER_HEADERS } from './defaults'

import { AppRoute } from '@interfaces/routes/appRoute'
import { PartnerMiaScope, PartnerScopeType, PartnerVehicleReRegistrationScope } from '@interfaces/routes/vehicleReRegistration'

enum VehicleReRegistrationServiceActions {
    GetVehicleReRegistrationHomeScreen = 'getVehicleReRegistrationHomeScreen',
    GetVehicleReRegistrationApplicationsList = 'getVehicleReRegistrationApplicationsList',
    GetVehicleReRegistrationApplicationDetails = 'getVehicleReRegistrationApplicationDetails',
    GetVehicleReRegistrationVehicleDefinitionScreen = 'getVehicleReRegistrationVehicleDefinitionScreen',
    GetVehicleReRegistrationVehiclePriceDefinitionScreen = 'getVehicleReRegistrationVehiclePriceDefinitionScreen',
    GetVehicleReRegistrationSaleContractScreenContent = 'getVehicleReRegistrationSaleContractScreenContent',
    CreateVehicleReRegistrationSaleContract = 'createVehicleReRegistrationSaleContract',
    ShareVehicleReRegistration = 'shareVehicleReRegistration',
    GetVehicleReRegistrationContacts = 'getVehicleReRegistrationContacts',

    VerifyVehicleReRegistrationSharing = 'verifyVehicleReRegistrationSharing',
    RejectVehicleReRegistrationSharing = 'rejectVehicleReRegistrationSharing',
    GetVehicleReRegistrationLicensePlateScreen = 'getVehicleReRegistrationLicensePlateScreen',
    SetVehicleReRegistrationStep = 'setVehicleReRegistrationStep',
    GetVehicleReRegistrationGetLicensePlate = 'getVehicleReRegistrationGetLicensePlate',
    GetVehicleReRegistrationLicensePlatesByMask = 'getVehicleReRegistrationLicensePlatesByMask',
    SetVehicleReRegistrationVehicleLicenseType = 'setVehicleReRegistrationVehicleLicenseType',
    GetVehicleReRegistrationApplication = 'getVehicleReRegistrationApplication',
    GetVehicleReRegistrationApplicationConfirm = 'getVehicleReRegistrationApplicationConfirm',
    GetVehicleReRegistrationHashedFilesToSign = 'getVehicleReRegistrationHashedFilesToSign',
    SendVehicleReRegistrationSignedItems = 'sendVehicleReRegistrationSignedItems',
    CancelVehicleReRegistration = 'cancelVehicleReRegistration',
    CancelVehicleReRegistrationByApplicationId = 'cancelVehicleReRegistrationByApplicationId',
    DownloadVehicleReRegistrationFiles = 'downloadVehicleReRegistrationFiles',

    // Support
    SupportVehicleReRegistrationDeleteApplications = 'supportVehicleReRegistrationDeleteApplications',
    SupportVehicleReRegistrationGetDeliveryApplication = 'supportVehicleReRegistrationGetDeliveryApplication',

    // Mia
    HandleMiaExpertConclusionCallback = 'handleMiaExpertConclusionCallback',
    HandleMiaLicensePlateInfoCallback = 'handleMiaLicensePlateInfoCallback',
    HandleMiaPaymentCallback = 'handleMiaPaymentCallback',
    HandleMiaReservePlateCallback = 'handleMiaReservePlateCallback',
    HandleMiaGetCarContractCallback = 'handleMiaGetCarContractCallback',
    HandleMiaCancelCarContractCallback = 'handleMiaCancelCarContractCallback',
    HandleMiaCancelReservePlateCallback = 'handleMiaCancelReservePlateCallback',
    HandleMiaSendCarContractCallback = 'handleMiaSendCarContractCallback',
    HandleMiaCreateClientIdCallback = 'handleMiaCreateClientIdCallback',
}

const routes: AppRoute[] = [
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/vehicle-re-registration',
        action: VehicleReRegistrationServiceActions.GetVehicleReRegistrationHomeScreen,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/vehicle-re-registration/applications',
        action: VehicleReRegistrationServiceActions.GetVehicleReRegistrationApplicationsList,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/vehicle-re-registration/application/:applicationId',
        action: VehicleReRegistrationServiceActions.GetVehicleReRegistrationApplicationDetails,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/vehicle-re-registration/vehicles',
        action: VehicleReRegistrationServiceActions.GetVehicleReRegistrationVehicleDefinitionScreen,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/vehicle-re-registration/contract-price/:documentId',
        action: VehicleReRegistrationServiceActions.GetVehicleReRegistrationVehiclePriceDefinitionScreen,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/vehicle-re-registration/application-screen',
        action: VehicleReRegistrationServiceActions.GetVehicleReRegistrationSaleContractScreenContent,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/vehicle-re-registration/application/create',
        action: VehicleReRegistrationServiceActions.CreateVehicleReRegistrationSaleContract,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/vehicle-re-registration/application/:applicationId/share',
        action: VehicleReRegistrationServiceActions.ShareVehicleReRegistration,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/vehicle-re-registration/contacts',
        action: VehicleReRegistrationServiceActions.GetVehicleReRegistrationContacts,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/vehicle-re-registration/application/verify',
        action: VehicleReRegistrationServiceActions.VerifyVehicleReRegistrationSharing,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/vehicle-re-registration/application/:applicationId/reject',
        action: VehicleReRegistrationServiceActions.RejectVehicleReRegistrationSharing,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/vehicle-re-registration/application/:applicationId/license-plate',
        action: VehicleReRegistrationServiceActions.GetVehicleReRegistrationLicensePlateScreen,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.PATCH,
        path: '/api/:apiVersion/public-service/vehicle-re-registration/application/:applicationId',
        action: VehicleReRegistrationServiceActions.SetVehicleReRegistrationStep,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/vehicle-re-registration/application/:applicationId/gen-license-plate/screen',
        action: VehicleReRegistrationServiceActions.GetVehicleReRegistrationGetLicensePlate,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/vehicle-re-registration/application/:applicationId/license-plates',
        action: VehicleReRegistrationServiceActions.GetVehicleReRegistrationLicensePlatesByMask,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/vehicle-re-registration/application/:applicationId/vehicle-license-type',
        action: VehicleReRegistrationServiceActions.SetVehicleReRegistrationVehicleLicenseType,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/vehicle-re-registration/application-confirmation/:applicationId',
        action: VehicleReRegistrationServiceActions.GetVehicleReRegistrationApplication,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/vehicle-re-registration/application/:applicationId/confirm',
        action: VehicleReRegistrationServiceActions.GetVehicleReRegistrationApplicationConfirm,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/vehicle-re-registration/application/:applicationId/signing',
        action: VehicleReRegistrationServiceActions.GetVehicleReRegistrationHashedFilesToSign,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/vehicle-re-registration/application/:applicationId/send',
        action: VehicleReRegistrationServiceActions.SendVehicleReRegistrationSignedItems,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.DELETE,
        path: '/api/:apiVersion/public-service/vehicle-re-registration/application',
        action: VehicleReRegistrationServiceActions.CancelVehicleReRegistration,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.DELETE,
        path: '/api/:apiVersion/public-service/vehicle-re-registration/application/:applicationId',
        action: VehicleReRegistrationServiceActions.CancelVehicleReRegistrationByApplicationId,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/vehicle-re-registration/application/:applicationId/:loadActionType/download',
        action: VehicleReRegistrationServiceActions.DownloadVehicleReRegistrationFiles,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
    },

    // Support
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/vehicle-re-registration/support/delete-applications',
        action: VehicleReRegistrationServiceActions.SupportVehicleReRegistrationDeleteApplications,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: { [PartnerScopeType.vehicleReRegistration]: [PartnerVehicleReRegistrationScope.Support] },
            },
        ],
        metadata: {
            tags: ['Support'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/vehicle-re-registration/support/get-delivery-application',
        action: VehicleReRegistrationServiceActions.SupportVehicleReRegistrationGetDeliveryApplication,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: { [PartnerScopeType.vehicleReRegistration]: [PartnerVehicleReRegistrationScope.Support] },
            },
        ],
        metadata: {
            tags: ['Support'],
        },
    },

    // Mia
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/mia/expert-conclusion/callback',
        action: VehicleReRegistrationServiceActions.HandleMiaExpertConclusionCallback,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.mia]: [PartnerMiaScope.ResultPushCallback],
                },
            },
        ],
        metadata: {
            tags: ['Mia'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/mia/license-plate-info/callback',
        action: VehicleReRegistrationServiceActions.HandleMiaLicensePlateInfoCallback,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.mia]: [PartnerMiaScope.ResultPushCallback],
                },
            },
        ],
        metadata: {
            tags: ['Mia'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/mia/payment/callback',
        action: VehicleReRegistrationServiceActions.HandleMiaPaymentCallback,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.mia]: [PartnerMiaScope.ResultPushCallback],
                },
            },
        ],
        metadata: {
            tags: ['Mia'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/mia/reserve-plates/callback',
        action: VehicleReRegistrationServiceActions.HandleMiaReservePlateCallback,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.mia]: [PartnerMiaScope.ResultPushCallback],
                },
            },
        ],
        metadata: {
            tags: ['Mia'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/mia/get-car-contract/callback',
        action: VehicleReRegistrationServiceActions.HandleMiaGetCarContractCallback,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.mia]: [PartnerMiaScope.ResultPushCallback],
                },
            },
        ],
        metadata: {
            tags: ['Mia'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/mia/cancel-car-contract/callback',
        action: VehicleReRegistrationServiceActions.HandleMiaCancelCarContractCallback,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.mia]: [PartnerMiaScope.ResultPushCallback],
                },
            },
        ],
        metadata: {
            tags: ['Mia'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/mia/send-car-contract/callback',
        action: VehicleReRegistrationServiceActions.HandleMiaSendCarContractCallback,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.mia]: [PartnerMiaScope.ResultPushCallback],
                },
            },
        ],
        metadata: {
            tags: ['Mia'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/mia/create-client-id/callback',
        action: VehicleReRegistrationServiceActions.HandleMiaCreateClientIdCallback,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.mia]: [PartnerMiaScope.ResultPushCallback],
                },
            },
        ],
        metadata: {
            tags: ['Mia'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/mia/cancel-reserve-plates/callback',
        action: VehicleReRegistrationServiceActions.HandleMiaCancelReservePlateCallback,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.mia]: [PartnerMiaScope.ResultPushCallback],
                },
            },
        ],
        metadata: {
            tags: ['Mia'],
        },
    },
]

export default routes
