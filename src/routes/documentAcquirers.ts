import { Env } from '@diia-inhouse/env'
import { ActionVersion, HttpMethod, SessionType } from '@diia-inhouse/types'

import { RouteHeaderRawName } from '@interfaces/index'
import { AppRoute } from '@interfaces/routes/appRoute'
import { PartnerAcquirersScope, PartnerAdministrativeFeesScope, PartnerScopeType } from '@interfaces/routes/documentAcquirers'

enum DocumentAcquirersActions {
    CreateRequestByBarcode = 'createRequestByBarcode',
    VerifyDocumentRequest = 'verifyDocumentRequest',
    GenerateDocuments = 'generateDocuments',
    SendSignedData = 'sendSignedData',
    SendDocumentRequest = 'sendDocumentRequest',
    SetDocumentRequestDeliveryStatus = 'setDocumentRequestDeliveryStatus',
    GetDocumentRequestIdByBarcode = 'getDocumentRequestIdByBarcode',
    GetDocumentRequestStatus = 'getDocumentRequestStatus',

    VerifyDocumentIdentification = 'verifyDocumentIdentification',
    VerifyDocumentIdentificationByAge = 'verifyDocumentIdentificationByAge',

    CreateIdentification = 'createIdentification',
    VerifyIdentification = 'verifyIdentification',
    ConfirmIdentification = 'confirmIdentification',
    DeclineIdentification = 'declineIdentification',

    GetAcquirerScopes = 'getAcquirerScopes',

    CreateBranch = 'createBranch',
    GetBranches = 'getBranches',
    GetBranchById = 'getBranchById',
    UpdateBranch = 'updateBranch',
    DeleteBranch = 'deleteBranch',

    CreateBranchOffer = 'createBranchOffer',
    GetBranchOffers = 'getBranchOffers',
    DeleteBranchOffer = 'deleteBranchOffer',

    CreateOfferRequest = 'createOfferRequest',
    VerifyOfferRequest = 'verifyOfferRequest',
    GenerateOfferRequestDocuments = 'generateOfferRequestDocuments',
    SetOfferRequestDeliveryStatus = 'setOfferRequestDeliveryStatus',
    GetOfferRequestStatus = 'getOfferRequestStatus',
    ConfirmDiiaOAuth = 'confirmDiiaOAuth',

    CreateAcquirer = 'createAcquirer',
    GetAcquirerById = 'getAcquirerById',
    GetAcquirers = 'getAcquirers',
    UpdateAcquirer = 'updateAcquirer',
    DeleteAcquirer = 'deleteAcquirer',

    LoadAdministrativeFees = 'loadAdministrativeFees',
    SendMailsOfferRequestCreated = 'sendMailsOfferRequestCreated',
}

const routes: AppRoute[] = [
    // Document Request
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/acquirers/document-request',
        action: DocumentAcquirersActions.CreateRequestByBarcode,
        auth: [{ sessionType: SessionType.Acquirer, version: ActionVersion.V1 }],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/acquirers/document-request/verify',
        action: DocumentAcquirersActions.VerifyDocumentRequest,
        auth: [
            { sessionType: SessionType.User, version: ActionVersion.V1 },
            { sessionType: SessionType.User, version: ActionVersion.V2 },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/acquirers/document-request/:_id/generate',
        action: DocumentAcquirersActions.GenerateDocuments,
        auth: [
            { sessionType: SessionType.User, version: ActionVersion.V1 },
            { sessionType: SessionType.User, version: ActionVersion.V2 },
            { sessionType: SessionType.User, version: ActionVersion.V3 },
            { sessionType: SessionType.User, version: ActionVersion.V4 },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3, ActionVersion.V4] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3, ActionVersion.V4] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3, ActionVersion.V4] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3, ActionVersion.V4] },
            {
                name: RouteHeaderRawName.PLATFORM_VERSION,
                versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3, ActionVersion.V4],
            },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/acquirers/document-request/:documentRequestId/send',
        action: DocumentAcquirersActions.SendDocumentRequest,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/acquirers/document-request/:_id/status',
        action: DocumentAcquirersActions.SetDocumentRequestDeliveryStatus,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/acquirers/document-request/status',
        action: DocumentAcquirersActions.GetDocumentRequestStatus,
        auth: [{ sessionType: SessionType.Acquirer, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Document Request'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/test/acquirers/document-request/:barcode',
        action: DocumentAcquirersActions.GetDocumentRequestIdByBarcode,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        forbiddenEnvs: [Env.Prod],
        metadata: {
            tags: ['Document Request'],
        },
    },

    // Document Identification
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/acquirers/document-identification',
        action: DocumentAcquirersActions.VerifyDocumentIdentification,
        auth: [{ sessionType: SessionType.Acquirer, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Document Identification'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/acquirers/document-identification/age',
        action: DocumentAcquirersActions.VerifyDocumentIdentificationByAge,
        auth: [{ sessionType: SessionType.Acquirer, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Document Identification'],
        },
    },

    // Person Identification
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/acquirers/identification',
        action: DocumentAcquirersActions.CreateIdentification,
        auth: [{ sessionType: SessionType.Acquirer, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Person Identification'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/acquirers/identification/verify',
        action: DocumentAcquirersActions.VerifyIdentification,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Person Identification'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/acquirers/identification/confirm',
        action: DocumentAcquirersActions.ConfirmIdentification,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Person Identification'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/acquirers/identification/decline',
        action: DocumentAcquirersActions.DeclineIdentification,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Person Identification'],
        },
    },

    // Acquirers
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/acquirers/scopes',
        action: DocumentAcquirersActions.GetAcquirerScopes,
        auth: [{ sessionType: SessionType.Acquirer, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Acquirer'],
        },
    },

    // Branches
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/acquirers/branch',
        action: DocumentAcquirersActions.CreateBranch,
        auth: [
            { sessionType: SessionType.Acquirer, version: ActionVersion.V1 },
            { sessionType: SessionType.Acquirer, version: ActionVersion.V2 },
        ],
        metadata: {
            tags: ['Branch'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/acquirers/branches',
        action: DocumentAcquirersActions.GetBranches,
        auth: [
            { sessionType: SessionType.Acquirer, version: ActionVersion.V1 },
            { sessionType: SessionType.Acquirer, version: ActionVersion.V2 },
        ],
        metadata: {
            tags: ['Branch'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/acquirers/branch/:_id',
        action: DocumentAcquirersActions.GetBranchById,
        auth: [
            { sessionType: SessionType.Acquirer, version: ActionVersion.V1 },
            { sessionType: SessionType.Acquirer, version: ActionVersion.V2 },
        ],
        metadata: {
            tags: ['Branch'],
        },
    },
    {
        method: HttpMethod.PUT,
        path: '/api/:apiVersion/acquirers/branch/:_id',
        action: DocumentAcquirersActions.UpdateBranch,
        auth: [
            { sessionType: SessionType.Acquirer, version: ActionVersion.V1 },
            { sessionType: SessionType.Acquirer, version: ActionVersion.V2 },
        ],
        metadata: {
            tags: ['Branch'],
        },
    },
    {
        method: HttpMethod.DELETE,
        path: '/api/:apiVersion/acquirers/branch/:_id',
        action: DocumentAcquirersActions.DeleteBranch,
        auth: [
            { sessionType: SessionType.Acquirer, version: ActionVersion.V1 },
            { sessionType: SessionType.Acquirer, version: ActionVersion.V2 },
        ],
        metadata: {
            tags: ['Branch'],
        },
    },

    // Branch Offers
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/acquirers/branch/:branchId/offer',
        action: DocumentAcquirersActions.CreateBranchOffer,
        auth: [{ sessionType: SessionType.Acquirer, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Branch Offer'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/acquirers/branch/:branchId/offers',
        action: DocumentAcquirersActions.GetBranchOffers,
        auth: [{ sessionType: SessionType.Acquirer, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Branch Offer'],
        },
    },
    {
        method: HttpMethod.DELETE,
        path: '/api/:apiVersion/acquirers/branch/:branchId/offer/:_id',
        action: DocumentAcquirersActions.DeleteBranchOffer,
        auth: [{ sessionType: SessionType.Acquirer, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Branch Offer'],
        },
    },

    // Branch Offer Requests
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/acquirers/branch/:branchId/offer-request',
        action: DocumentAcquirersActions.CreateOfferRequest,
        auth: [{ sessionType: SessionType.Acquirer, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Branch Offer Request'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/acquirers/branch/:branchId/offer-request/:offerRequestType',
        action: DocumentAcquirersActions.CreateOfferRequest,
        auth: [{ sessionType: SessionType.Acquirer, version: ActionVersion.V2 }],
        metadata: {
            tags: ['Branch Offer Request'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/acquirers/offer-request/verify',
        action: DocumentAcquirersActions.VerifyOfferRequest,
        auth: [
            { sessionType: SessionType.User, version: ActionVersion.V1 },
            { sessionType: SessionType.User, version: ActionVersion.V4 },
            { sessionType: SessionType.User, version: ActionVersion.V5 },
            { sessionType: SessionType.User, version: ActionVersion.V6 },
            { sessionType: SessionType.User, version: ActionVersion.V7 },
        ],
        headers: [
            {
                name: RouteHeaderRawName.MOBILE_UID,
                versions: [ActionVersion.V1, ActionVersion.V4, ActionVersion.V5, ActionVersion.V6, ActionVersion.V7],
            },
            {
                name: RouteHeaderRawName.APP_VERSION,
                versions: [ActionVersion.V1, ActionVersion.V4, ActionVersion.V5, ActionVersion.V6, ActionVersion.V7],
            },
            {
                name: RouteHeaderRawName.PLATFORM_TYPE,
                versions: [ActionVersion.V1, ActionVersion.V4, ActionVersion.V5, ActionVersion.V6, ActionVersion.V7],
            },
            {
                name: RouteHeaderRawName.PLATFORM_VERSION,
                versions: [ActionVersion.V1, ActionVersion.V4, ActionVersion.V5, ActionVersion.V6, ActionVersion.V7],
            },
        ],
        metadata: {
            tags: ['Branch Offer Request'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/acquirers/offer-request/verify',
        action: DocumentAcquirersActions.VerifyOfferRequest,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V7 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V7] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V7] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V7] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V7] },
        ],
        metadata: {
            tags: ['Branch Offer Request'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/acquirers/offer-request/:offerRequestType/verify',
        action: DocumentAcquirersActions.VerifyOfferRequest,
        auth: [
            { sessionType: SessionType.User, version: ActionVersion.V2 },
            { sessionType: SessionType.User, version: ActionVersion.V3 },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2, ActionVersion.V3] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2, ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2, ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2, ActionVersion.V3] },
        ],
        metadata: {
            tags: ['Branch Offer Request'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/acquirers/offer-request/:offerRequestId/generate',
        action: DocumentAcquirersActions.GenerateOfferRequestDocuments,
        auth: [
            { sessionType: SessionType.User, version: ActionVersion.V1 },
            { sessionType: SessionType.User, version: ActionVersion.V2 },
            { sessionType: SessionType.User, version: ActionVersion.V3 },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3] },
        ],
        metadata: {
            tags: ['Branch Offer Request'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/acquirers/offer-request/:offerRequestId/generate',
        action: DocumentAcquirersActions.GenerateOfferRequestDocuments,
        auth: [
            { sessionType: SessionType.User, version: ActionVersion.V4 },
            { sessionType: SessionType.User, version: ActionVersion.V5 },
            { sessionType: SessionType.User, version: ActionVersion.V6 },
            { sessionType: SessionType.User, version: ActionVersion.V7 },
            { sessionType: SessionType.User, version: ActionVersion.V8 },
        ],
        headers: [
            {
                name: RouteHeaderRawName.MOBILE_UID,
                versions: [ActionVersion.V4, ActionVersion.V5, ActionVersion.V6, ActionVersion.V7, ActionVersion.V8],
            },
            {
                name: RouteHeaderRawName.APP_VERSION,
                versions: [ActionVersion.V4, ActionVersion.V5, ActionVersion.V6, ActionVersion.V7, ActionVersion.V8],
            },
            {
                name: RouteHeaderRawName.PLATFORM_TYPE,
                versions: [ActionVersion.V4, ActionVersion.V5, ActionVersion.V6, ActionVersion.V7, ActionVersion.V8],
            },
            {
                name: RouteHeaderRawName.TOKEN,
                versions: [ActionVersion.V4, ActionVersion.V5, ActionVersion.V6, ActionVersion.V7, ActionVersion.V8],
            },
            {
                name: RouteHeaderRawName.PLATFORM_VERSION,
                versions: [ActionVersion.V4, ActionVersion.V5, ActionVersion.V6, ActionVersion.V7, ActionVersion.V8],
            },
        ],
        metadata: {
            tags: ['Branch Offer Request'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/e-resident/api/:apiVersion/acquirers/offer-request/:offerRequestId/generate',
        action: DocumentAcquirersActions.GenerateOfferRequestDocuments,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V8 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V8] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V8] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V8] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V8] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V8] },
        ],
        metadata: {
            tags: ['Branch Offer Request'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/acquirers/offer-request/:offerRequestId/send',
        action: DocumentAcquirersActions.SendSignedData,
        auth: [
            { sessionType: SessionType.User, version: ActionVersion.V1 },
            { sessionType: SessionType.User, version: ActionVersion.V2 },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Branch Offer Request'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/e-resident/api/:apiVersion/acquirers/offer-request/:offerRequestId/send',
        action: DocumentAcquirersActions.SendSignedData,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V2 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Branch Offer Request'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/acquirers/offer-request/:offerRequestId/status',
        action: DocumentAcquirersActions.SetOfferRequestDeliveryStatus,
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
            tags: ['Branch Offer Request'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/acquirers/offer-request/status',
        action: DocumentAcquirersActions.GetOfferRequestStatus,
        auth: [{ sessionType: SessionType.Acquirer, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Branch Offer Request'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/e-resident/api/:apiVersion/acquirers/offer-request/:offerRequestId/status',
        action: DocumentAcquirersActions.SetOfferRequestDeliveryStatus,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V2 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Branch Offer Request'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/acquirers/oauth/confirm',
        action: DocumentAcquirersActions.ConfirmDiiaOAuth,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Branch Offer Request'],
        },
    },

    // Partners
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/acquirer',
        action: DocumentAcquirersActions.CreateAcquirer,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.acquirers]: [PartnerAcquirersScope.Create],
                },
            },
        ],
        metadata: {
            tags: ['Acquirer'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/acquirer/:acquirerId',
        action: DocumentAcquirersActions.GetAcquirerById,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.acquirers]: [PartnerAcquirersScope.Read],
                },
            },
        ],
        metadata: {
            tags: ['Acquirer'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/acquirers',
        action: DocumentAcquirersActions.GetAcquirers,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.acquirers]: [PartnerAcquirersScope.Read],
                },
            },
        ],
        metadata: {
            tags: ['Acquirer'],
        },
    },
    {
        method: HttpMethod.PUT,
        path: '/api/:apiVersion/acquirers/:acquirerId',
        action: DocumentAcquirersActions.UpdateAcquirer,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.acquirers]: [PartnerAcquirersScope.Update],
                },
            },
        ],
        metadata: {
            tags: ['Acquirer'],
        },
    },
    {
        method: HttpMethod.DELETE,
        path: '/api/:apiVersion/acquirers/:acquirerId',
        action: DocumentAcquirersActions.DeleteAcquirer,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.acquirers]: [PartnerAcquirersScope.Delete],
                },
            },
        ],
        metadata: {
            tags: ['Acquirer'],
        },
    },

    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/acquirers/administrative-fees/load',
        action: DocumentAcquirersActions.LoadAdministrativeFees,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.administrativeFees]: [PartnerAdministrativeFeesScope.Load],
                },
            },
        ],
        metadata: {
            tags: ['Administrative Fees'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/acquirers/mail/offer-request-created',
        action: DocumentAcquirersActions.SendMailsOfferRequestCreated,
        auth: [{ sessionType: SessionType.Partner, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Mail'],
        },
    },
]

export default routes
