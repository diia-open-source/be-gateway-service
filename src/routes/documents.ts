import { ActionVersion, HttpMethod, ProfileFeature, SessionType } from '@diia-inhouse/types'

import { RouteHeaderRawName } from '@interfaces/index'
import { ProfileFeatureExpression } from '@interfaces/profileFeature'
import { AppRoute } from '@interfaces/routes/appRoute'

enum DocumentsActions {
    GetDocuments = 'getDocuments',
    GetDriverLicense = 'getDriverLicense',
    GetVehicleLicense = 'getVehicleLicense',
    GetPassports = 'getPassports',
    GetVehicleInsurance = 'getVehicleInsurance',
    GetStudentCards = 'getStudentCards',
    GetBirthCertificate = 'getBirthCertificate',
    GetBirthCertificates = 'getBirthCertificates',
    GetRegistrationPlaceForBirthCertificates = 'getRegistrationPlaceForBirthCertificates',
    GetRegistrationPlaceForPassport = 'getRegistrationPlaceForPassport',
    GetPensionCard = 'getPensionCard',
    GetPensionCardInfo = 'getPensionCardInfo',
    GetResidencePermitInfo = 'getResidencePermitInfo',

    ShareDriverLicense = 'shareDriverLicense',
    ShareEducationDocument = 'shareEducationDocument',
    ShareVehicleLicense = 'shareVehicleLicense',
    ShareInternalPassport = 'shareInternalPassport',
    ShareForeignPassport = 'shareForeignPassport',
    ShareVehicleInsurance = 'shareVehicleInsurance',
    ShareStudentCard = 'shareStudentCard',
    ShareTaxpayerCard = 'shareTaxpayerCard',
    ShareRefInternallyDisplacedPerson = 'shareRefInternallyDisplacedPerson',
    ShareBirthCertificate = 'shareBirthCertificate',
    SharePensionCard = 'sharePensionCard',
    ShareResidencePermitPermanent = 'shareResidencePermitPermanent',
    ShareResidencePermitTemporary = 'shareResidencePermitTemporary',
    ShareOfficialCertificate = 'shareOfficialCertificate',
    ShareDocument = 'shareDocument',

    VerifyDriverLicense = 'verifyDriverLicense',
    VerifyVehicleLicense = 'verifyVehicleLicense',
    VerifyInternalPassport = 'verifyInternalPassport',
    VerifyForeignPassport = 'verifyForeignPassport',
    VerifyVehicleInsurance = 'verifyVehicleInsurance',
    VerifyStudentCard = 'verifyStudentCard',
    VerifyTaxpayerCard = 'verifyTaxpayerCard',
    VerifyRefInternallyDisplacedPerson = 'verifyRefInternallyDisplacedPerson',
    VerifyBirthCertificate = 'verifyBirthCertificate',
    VerifyPensionCard = 'verifyPensionCard',
    VerifyResidencePermitPermanent = 'verifyResidencePermitPermanent',
    VerifyResidencePermitTemporary = 'verifyResidencePermitTemporary',
    VerifyOfficialCertificate = 'verifyOfficialCertificate',
    VerifyDocument = 'verifyDocument',
    GetVerifyDocument = 'getVerifyDocument',

    DownloadDocument = 'downloadDocument',
    DownloadInternationalVaccinationCertificate = 'downloadInternationalVaccinationCertificate',

    GetUserByITN = 'getUserByITN',

    VerifyServiceEntranceDocument = 'verifyServiceEntranceDocument',
    VerifyServiceEntranceDocumentByData = 'verifyServiceEntranceDocumentByData',

    GetManualDocumentsList = 'getManualDocumentsList',
    GetManualBirthCertificateScreen = 'getManualBirthCertificateScreen',
    GetManualBirthCertificatePersons = 'getManualBirthCertificatePersons',
    GetVaccinationCertificateValidity = 'getVaccinationCertificateValidity',

    GetDocument = 'getDocument',
    AddDocument = 'addDocument',
    DeleteDocument = 'deleteDocument',
}

const routes: AppRoute[] = [
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents',
        action: DocumentsActions.GetDocuments,
        auth: [
            { sessionType: SessionType.User, version: ActionVersion.V1 },
            { sessionType: SessionType.User, version: ActionVersion.V2 },
            { sessionType: SessionType.User, version: ActionVersion.V3 },
            { sessionType: SessionType.User, version: ActionVersion.V4 },
        ],
        headers: [
            {
                name: RouteHeaderRawName.MOBILE_UID,
                versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3, ActionVersion.V4],
            },
            {
                name: RouteHeaderRawName.APP_VERSION,
                versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3, ActionVersion.V4],
            },
            {
                name: RouteHeaderRawName.PLATFORM_TYPE,
                versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3, ActionVersion.V4],
            },
            {
                name: RouteHeaderRawName.PLATFORM_VERSION,
                versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3, ActionVersion.V4],
            },
            {
                name: RouteHeaderRawName.TOKEN,
                versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3, ActionVersion.V4],
            },
        ],
        metadata: {
            tags: ['Get Documents'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents',
        action: DocumentsActions.GetDocuments,
        auth: [
            { sessionType: SessionType.User, version: ActionVersion.V5 },
            { sessionType: SessionType.User, version: ActionVersion.V6 },
        ],
        profileFeaturesExpression: ProfileFeatureExpression.mayHave([ProfileFeature.office]),
        headers: [
            {
                name: RouteHeaderRawName.MOBILE_UID,
                versions: [ActionVersion.V5, ActionVersion.V6],
            },
            {
                name: RouteHeaderRawName.APP_VERSION,
                versions: [ActionVersion.V5, ActionVersion.V6],
            },
            {
                name: RouteHeaderRawName.PLATFORM_TYPE,
                versions: [ActionVersion.V5, ActionVersion.V6],
            },
            {
                name: RouteHeaderRawName.PLATFORM_VERSION,
                versions: [ActionVersion.V5, ActionVersion.V6],
            },
            {
                name: RouteHeaderRawName.TOKEN,
                versions: [ActionVersion.V5, ActionVersion.V6],
            },
        ],
        metadata: {
            tags: ['Get Documents'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/documents',
        action: DocumentsActions.GetDocuments,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V7 }],
        profileFeaturesExpression: ProfileFeatureExpression.mayHave([ProfileFeature.office]),
        headers: [
            {
                name: RouteHeaderRawName.MOBILE_UID,
                versions: [ActionVersion.V7],
            },
            {
                name: RouteHeaderRawName.APP_VERSION,
                versions: [ActionVersion.V7],
            },
            {
                name: RouteHeaderRawName.PLATFORM_TYPE,
                versions: [ActionVersion.V7],
            },
            {
                name: RouteHeaderRawName.PLATFORM_VERSION,
                versions: [ActionVersion.V7],
            },
            {
                name: RouteHeaderRawName.TOKEN,
                versions: [ActionVersion.V7],
            },
        ],
        metadata: {
            tags: ['Get Documents'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/documents',
        action: DocumentsActions.GetDocuments,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V2 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Get Documents'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/driver-license',
        action: DocumentsActions.GetDriverLicense,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Get Documents From Registry'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/passport',
        action: DocumentsActions.GetPassports,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Get Documents From Registry'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/documents/vehicle-insurance',
        action: DocumentsActions.GetVehicleInsurance,
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
            tags: ['Get Documents From Registry'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/documents/birth-certificate',
        action: DocumentsActions.GetBirthCertificate,
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
            {
                name: RouteHeaderRawName.PLATFORM_VERSION,
                versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3, ActionVersion.V4],
            },
        ],
        metadata: {
            tags: ['Get Documents From Registry'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/documents/birth-certificates',
        action: DocumentsActions.GetBirthCertificates,
        auth: [
            { sessionType: SessionType.User, version: ActionVersion.V1 },
            { sessionType: SessionType.User, version: ActionVersion.V2 },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1, ActionVersion.V2] },
            {
                name: RouteHeaderRawName.PLATFORM_VERSION,
                versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3, ActionVersion.V4],
            },
        ],
        metadata: {
            tags: ['Get Documents From Registry'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/registration-place/birth-certificates',
        action: DocumentsActions.GetRegistrationPlaceForBirthCertificates,
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
        path: '/api/:apiVersion/documents/registration-place/passport',
        action: DocumentsActions.GetRegistrationPlaceForPassport,
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
        path: '/api/:apiVersion/documents/vehicle-license',
        action: DocumentsActions.GetVehicleLicense,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Get Documents From Registry'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/student-id-card',
        action: DocumentsActions.GetStudentCards,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Get Documents From Registry'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/pension-card/info',
        action: DocumentsActions.GetPensionCardInfo,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Get Documents From Registry'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/pension-card',
        action: DocumentsActions.GetPensionCard,
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
            tags: ['Get Documents From Registry'],
        },
    },

    // Share document
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/driver-license/:documentId/share',
        action: DocumentsActions.ShareDriverLicense,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Share Document'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/education-document/:documentId/share',
        action: DocumentsActions.ShareEducationDocument,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Share Document'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/vehicle-license/:documentId/share',
        action: DocumentsActions.ShareVehicleLicense,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Share Document'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/internal-passport/:documentId/share',
        action: DocumentsActions.ShareInternalPassport,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Share Document'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/foreign-passport/:documentId/share',
        action: DocumentsActions.ShareForeignPassport,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Share Document'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/vehicle-insurance/:documentId/share',
        action: DocumentsActions.ShareVehicleInsurance,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Share Document'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/student-id-card/:documentId/share',
        action: DocumentsActions.ShareStudentCard,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Share Document'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/taxpayer-card/:documentId/share',
        action: DocumentsActions.ShareTaxpayerCard,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Share Document'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/reference-internally-displaced-person/:documentId/share',
        action: DocumentsActions.ShareRefInternallyDisplacedPerson,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Share Document'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/documents/birth-certificate/:documentId/share',
        action: DocumentsActions.ShareBirthCertificate,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Share Document'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/pension-card/:documentId/share',
        action: DocumentsActions.SharePensionCard,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Share Document'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/residence-permit-permanent/:documentId/share',
        action: DocumentsActions.ShareResidencePermitPermanent,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Share Document'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/residence-permit-temporary/:documentId/share',
        action: DocumentsActions.ShareResidencePermitTemporary,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Share Document'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/:documentType/:documentId/share',
        action: DocumentsActions.ShareDocument,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Share Document'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/official-certificate/:documentId/share',
        action: DocumentsActions.ShareOfficialCertificate,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        profileFeaturesExpression: ProfileFeatureExpression.only(ProfileFeature.office),
        metadata: {
            tags: ['Share Document'],
        },
    },

    // Verify document
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/driver-license/verify',
        action: DocumentsActions.VerifyDriverLicense,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1, blockAccess: false }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Verify Document'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/vehicle-license/verify',
        action: DocumentsActions.VerifyVehicleLicense,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1, blockAccess: false }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Verify Document'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/internal-passport/verify',
        action: DocumentsActions.VerifyInternalPassport,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1, blockAccess: false }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Verify Document'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/foreign-passport/verify',
        action: DocumentsActions.VerifyForeignPassport,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1, blockAccess: false }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Verify Document'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/vehicle-insurance/verify',
        action: DocumentsActions.VerifyVehicleInsurance,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1, blockAccess: false }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Verify Document'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/student-id-card/verify',
        action: DocumentsActions.VerifyStudentCard,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1, blockAccess: false }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Verify Document'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/taxpayer-card/verify',
        action: DocumentsActions.VerifyTaxpayerCard,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1, blockAccess: false }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Verify Document'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/reference-internally-displaced-person/verify',
        action: DocumentsActions.VerifyRefInternallyDisplacedPerson,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1, blockAccess: false }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Verify Document'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/birth-certificate/verify',
        action: DocumentsActions.VerifyBirthCertificate,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1, blockAccess: false }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Verify Document'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/documents/verify',
        action: DocumentsActions.VerifyDocument,
        auth: [
            { sessionType: SessionType.User, version: ActionVersion.V1, blockAccess: false },
            { sessionType: SessionType.User, version: ActionVersion.V2, blockAccess: false },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Verify Document'],
            summary: 'Verify COVID certificate',
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/:documentType/verify',
        action: DocumentsActions.GetVerifyDocument,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V2, blockAccess: false }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Verify Document'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/pension-card/verify',
        action: DocumentsActions.VerifyPensionCard,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Verify Document'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/residence-permit-permanent/verify',
        action: DocumentsActions.VerifyResidencePermitPermanent,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Verify Document'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/residence-permit-temporary/verify',
        action: DocumentsActions.VerifyResidencePermitTemporary,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Verify Document'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/official-certificate/verify',
        action: DocumentsActions.VerifyOfficialCertificate,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Verify Document'],
        },
    },

    // Download
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/:documentType/:documentId/download',
        action: DocumentsActions.DownloadDocument,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Download Document'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/documents/international-vaccination-certificate/download',
        action: DocumentsActions.DownloadInternationalVaccinationCertificate,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Download Document'],
        },
    },

    // ITN
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/itn',
        action: DocumentsActions.GetUserByITN,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['ITN'],
        },
    },

    // Service entrance
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/:documentType/service-entrance/verify',
        action: DocumentsActions.VerifyServiceEntranceDocument,
        auth: [
            { sessionType: SessionType.ServiceEntrance, version: ActionVersion.V1 },
            { sessionType: SessionType.ServiceEntrance, version: ActionVersion.V2 },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Service Entrance'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/documents/service-entrance/verify',
        action: DocumentsActions.VerifyServiceEntranceDocumentByData,
        auth: [
            { sessionType: SessionType.ServiceEntrance, version: ActionVersion.V1 },
            { sessionType: SessionType.ServiceEntrance, version: ActionVersion.V2 },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Service Entrance'],
        },
    },

    // Manual Documents
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/manual',
        action: DocumentsActions.GetManualDocumentsList,
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
        path: '/api/:apiVersion/documents/manual-birth-certificate/screen',
        action: DocumentsActions.GetManualBirthCertificateScreen,
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
        path: '/api/:apiVersion/documents/manual-birth-certificate/persons',
        action: DocumentsActions.GetManualBirthCertificatePersons,
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
        path: '/api/:apiVersion/documents/vaccination-certificate/validity',
        action: DocumentsActions.GetVaccinationCertificateValidity,
        auth: [
            { sessionType: SessionType.User, version: ActionVersion.V1 },
            { sessionType: SessionType.User, version: ActionVersion.V2 },
            { sessionType: SessionType.User, version: ActionVersion.V3 },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1, ActionVersion.V2, ActionVersion.V3] },
        ],
    },

    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/documents/:documentType/:documentId',
        action: DocumentsActions.GetDocument,
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
            tags: ['CRUD'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/documents/:documentType',
        action: DocumentsActions.AddDocument,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['CRUD'],
        },
    },
    {
        method: HttpMethod.DELETE,
        path: '/api/:apiVersion/documents/:documentType/:documentId',
        action: DocumentsActions.DeleteDocument,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['CRUD'],
        },
    },
    {
        method: HttpMethod.DELETE,
        path: '/api/:apiVersion/user/documents/:documentType/:documentId',
        action: DocumentsActions.DeleteDocument,
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
        path: '/api/:apiVersion/documents/:documentType/info',
        action: DocumentsActions.GetResidencePermitInfo,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Get Documents From Registry'],
        },
    },
]

export default routes
