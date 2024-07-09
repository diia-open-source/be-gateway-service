import { Env } from '@diia-inhouse/env'
import { ActionVersion, HttpMethod, SessionType } from '@diia-inhouse/types'

import { DEFAULT_USER_AUTH, DEFAULT_USER_HEADERS } from '@src/routes/defaults'

import { RouteHeaderRawName } from '@interfaces/index'
import { AppRoute } from '@interfaces/routes/appRoute'
import { PartnerMaintenanceScope } from '@interfaces/routes/partner'
import {
    PartnerAwardScope,
    PartnerDriverLicenseReplacementScope,
    PartnerIdpSupervisorScope,
    PartnerMiaScope,
    PartnerMilitaryDonationScope,
    PartnerMortgageScope,
    PartnerProperUserScope,
    PartnerScopeType,
    PartnerTemporaryOccupiedTerritoryScope,
} from '@interfaces/routes/publicService'

enum PublicServiceActions {
    GetPublicServiceInfo = 'getPublicServiceInfo',
    GetPublicServiceContacts = 'getPublicServiceContacts',
    GetPublicServiceChildren = 'getPublicServiceChildren',
    GetMoneyAidBankAccounts = 'getMoneyAidBankAccounts',
    ReadPublicServiceOnboarding = 'readPublicServiceOnboarding',

    GetAllPenalties = 'getAllPenalties',
    GetPenaltiesByGroup = 'getPenaltiesByGroup',
    GetPenaltyById = 'getPenaltyById',

    GetAllDebts = 'getAllDebts',
    GetDebtsByGroup = 'getDebtsByGroup',
    GetDebtById = 'getDebtById',

    GetPaidAdministrativeFees = 'getPaidAdministrativeFees',
    GetAdministrativeFeePaymentById = 'getAdministrativeFeePaymentById',

    GetPaymentFee = 'getPaymentFee',
    GetPaymentData = 'getPaymentData',
    InitPaymentAuthorizationBank = 'initPaymentAuthorizationBank',
    SetPaymentStatus = 'setPaymentStatus',

    TestExternalBus = 'testExternalBus',

    GetPromo = 'getPromo',

    GetSocialAssistancePrograms = 'getSocialAssistancePrograms',
    CreateSocialAssistanceApplication = 'createSocialAssistanceApplication',
    CheckSocialAssistanceApplication = 'checkSocialAssistanceApplication',
    CheckSocialAssistanceApplicationById = 'checkSocialAssistanceApplicationById',
    CheckSocialAssistanceProgramAvailability = 'checkSocialAssistanceProgramAvailability',
    GetSocialAssistanceConfirmationData = 'getSocialAssistanceConfirmationData',

    SignUpForVaccination = 'signUpForVaccination',
    CheckVaccinationGroupAvailability = 'checkVaccinationGroupAvailability',
    DeleteVaccinationRecord = 'deleteVaccinationRecord',
    GetVaccinationInfo = 'getVaccinationInfo',
    GetVaccinationGroups = 'getVaccinationGroups',
    GetVaccinationUserData = 'getVaccinationUserData',
    GetVaccinationAddress = 'getVaccinationAddress',
    GetVaccinationPoint = 'getVaccinationPoint',
    UpdateVaccinationRecord = 'updateVaccinationRecord',
    GetVaccinationPoints = 'getVaccinationPoints',
    GetMassVaccinationPoints = 'getMassVaccinationPoints',
    GetVaccinationPointTimeSlots = 'getVaccinationPointTimeSlots',
    SignUpForMassVaccination = 'signUpForMassVaccination',
    GetMassVaccinationTicket = 'getMassVaccinationTicket',
    DeleteMassVaccinationTicket = 'deleteMassVaccinationTicket',

    // Vaccination Certificate
    GetVaccinationCertificateInfo = 'getVaccinationCertificateInfo',
    GetAvailableCertificates = 'getAvailableCertificates',
    GetVaccinationCertificateAgreement = 'getVaccinationCertificateAgreement',
    GetVaccinationCertificateChildAgreement = 'getVaccinationCertificateChildAgreement',
    GetVaccinationCertificateHashesToSign = 'getVaccinationCertificateHashesToSign',
    GetVaccinationCertificateHashesToSignByTypes = 'getVaccinationCertificateHashesToSignByTypes',
    SendVaccinationCertificateRequest = 'sendVaccinationCertificateRequest',
    SendVaccinationCertificateRequestWithoutSigning = 'sendVaccinationCertificateRequestWithoutSigning',

    // Private Entrepreneur
    GetPrivateEntrepreneurStatus = 'getPrivateEntrepreneurStatus',
    GetPrivateEntrepreneurBankAccounts = 'getPrivateEntrepreneurBankAccounts',
    TogglePrivateEntrepreneurBankSync = 'togglePrivateEntrepreneurBankSync',
    GetPrivateEntrepreneurReportPeriods = 'getPrivateEntrepreneurReportPeriods',
    GetPrivateEntrepreneurArchivedReportPeriods = 'getPrivateEntrepreneurArchivedReportPeriods',
    GetPrivateEntrepreneurTaxPeriods = 'getPrivateEntrepreneurTaxPeriods',
    GetPrivateEntrepreneurReportTaxAmount = 'getPrivateEntrepreneurReportTaxAmount',
    GetPrivateEntrepreneurTaxAmount = 'getPrivateEntrepreneurTaxAmount',
    GetPrivateEntrepreneurTaxResourceId = 'getPrivateEntrepreneurTaxResourceId',
    GetPrivateEntrepreneurBudgetPayments = 'getPrivateEntrepreneurBudgetPayments',
    GetPrivateEntrepreneurTaxes = 'getPrivateEntrepreneurTaxes',
    GetPrivateEntrepreneurTaxesHistory = 'getPrivateEntrepreneurTaxesHistory',
    GetPrivateEntrepreneurTaxById = 'getPrivateEntrepreneurTaxById',
    GetPrivateEntrepreneurReports = 'getPrivateEntrepreneurReports',
    GetPrivateEntrepreneurReportById = 'getPrivateEntrepreneurReportById',

    // Tax Declaration
    GetPrivateEntrepreneurFilledDeclaration = 'getPrivateEntrepreneurFilledDeclaration',
    GetPrivateEntrepreneurHashedFilesToSign = 'getPrivateEntrepreneurHashedFilesToSign',
    SendSignedDeclaration = 'sendSignedDeclaration',
    DownloadPrivateEntrepreneurDeclaration = 'downloadPrivateEntrepreneurDeclaration',
    DownloadPrivateEntrepreneurArchivedDeclaration = 'downloadPrivateEntrepreneurArchivedDeclaration',

    // Driver License Replacement
    GetDriverLicenseReplacementContacts = 'getDriverLicenseReplacementContacts',
    GetDriverLicenseReplacementStatus = 'getDriverLicenseReplacementStatus',
    GetDriverLicenseReplacementReasons = 'getDriverLicenseReplacementReasons',
    IdentifyDriverLicenseReplacementResidenceRegistration = 'identifyDriverLicenseReplacementResidenceRegistration',
    ConfirmDriverLicenseReplacement = 'confirmDriverLicenseReplacement',
    GetDriverLicenseReplacementHashedFilesToSign = 'getDriverLicenseReplacementHashedFilesToSign',
    SendDriverLicenseReplacement = 'sendDriverLicenseReplacement',
    CancelDriverLicenseReplacementApplication = 'cancelDriverLicenseReplacementApplication',
    CancelRepeatedDeliveryDriverLicenseReplacementApplication = 'cancelRepeatedDeliveryDriverLicenseReplacementApplication',
    GetDriverLicenseReplacementRepeatedDeliveryMethod = 'getDriverLicenseReplacementRepeatedDeliveryMethod',
    ConfirmDriverLicenseReplacementRepeatedDelivery = 'confirmDriverLicenseReplacementRepeatedDelivery',
    CreateDriverLicenseReplacementRepeatedDelivery = 'createDriverLicenseReplacementRepeatedDelivery',
    GetDriverLicenseReplacementRepeatedDeliveryContacts = 'getDriverLicenseReplacementRepeatedDeliveryContacts',
    IdentifyDriverLicenseReplacementDocumentType = 'identifyDriverLicenseReplacementDocumentType',
    GetDriverLicenseReplacementDepartments = 'getDriverLicenseReplacementDepartments',
    DriverLicenseReplacementCallback = 'driverLicenseReplacementCallback',
    DownloadDriverLicenseReplacementDocument = 'downloadDriverLicenseReplacementDocument',
    // Driver License Replacement Support
    SupportDriverLicenseReplacementChangeStatusApplications = 'supportDriverLicenseReplacementChangeStatusApplications',
    SupportDriverLicenseReplacementChangeNaisResponseIdApplications = 'supportDriverLicenseReplacementChangeNaisResponseIdApplications',
    SupportDriverLicenseReplacementChangeDataApplications = 'supportDriverLicenseReplacementChangeDataApplications',
    SupportDriverLicenseReplacementChangeDeliveryId = 'supportDriverLicenseReplacementChangeDeliveryId',

    // Vaccination Aid
    GetVaccinationAidStatus = 'getVaccinationAidStatus',
    GetVaccinationAidBankAccounts = 'getVaccinationAidBankAccounts',
    CreateVaccinationAidApplication = 'createVaccinationAidApplication',

    // OK-5/OK-7 Certificate
    GetOkCertificatesByStatus = 'getOkCertificatesByStatus',
    GetOkCertificateById = 'getOkCertificateById',
    SendOkCertificateApplication = 'sendOkCertificateApplication',
    DownloadOkCertificateArchiveZip = 'downloadOkCertificateArchiveZip',
    DownloadOkCertificatePdf = 'downloadOkCertificatePdf',

    // Residence Cert
    GetResidenceCertOrders = 'getResidenceCertOrders',
    GetResidenceCertOrderById = 'getResidenceCertOrderById',
    SendResidenceCertOrder = 'sendResidenceCertOrder',
    DownloadResidenceCertOrderPdf = 'downloadResidenceCertOrderPdf',
    GetResidenceCertChildrenOrders = 'getResidenceCertChildrenOrders',
    SendResidenceCertChildrenOrder = 'sendResidenceCertChildrenOrder',

    // Court Cases
    GetCourtCases = 'getCourtCases',
    GetCourtCase = 'getCourtCase',
    GetCourtCaseDecisions = 'getCourtCaseDecisions',
    GetCourtCaseDecision = 'getCourtCaseDecision',
    DownloadCourtCaseDecisionPdf = 'downloadCourtCaseDecisionPdf',
    DownloadCourtCaseDecisionArchive = 'downloadCourtCaseDecisionArchive',
    GetCourtCaseHearings = 'getCourtCaseHearings',
    GetCourtCaseHearing = 'getCourtCaseHearing',
    GetCourtCaseHearingCalendar = 'getCourtCaseHearingCalendar',

    // Court Penalties
    GetCourtPenaltiesUnpaid = 'getCourtPenaltiesUnpaid',
    GetCourtPenaltiesPaid = 'getCourtPenaltiesPaid',
    GetCourtPenalty = 'getCourtPenalty',
    SetCourtPenaltyPaid = 'setCourtPenaltyPaid',

    // Proper User
    GetProperUserApplications = 'getProperUserApplications',
    GetProperUserAssignedProperUsers = 'getProperUserAssignedProperUsers',
    GetProperUserApplicationInfo = 'getProperUserApplicationInfo',
    GetProperUserVehiclesToShare = 'getProperUserVehiclesToShare',
    GetProperUserApplicantData = 'getProperUserApplicantData',
    CreateProperUserApplication = 'createProperUserApplication',
    GetProperUserApplication = 'getProperUserApplication',
    GetProperUserApplicationStatus = 'getProperUserApplicationStatus',
    ShareProperUserApplication = 'shareProperUserApplication',
    VerifyProperUserApplication = 'verifyProperUserApplication',
    UpdateProperUserApplication = 'updateProperUserApplication',
    CancelProperUserApplication = 'cancelProperUserApplication',
    GetProperUserApplicationHashesToSign = 'getProperUserApplicationHashesToSign',
    SendProperUserSignedItems = 'sendProperUserSignedItems',
    GetProperUserAddressRegistration = 'getProperUserAddressRegistration',
    SetProperUserApplicationResult = 'setProperUserApplicationResult',
    GetProperUserCanceling = 'getProperUserCanceling',
    GetProperUserCancelingApplication = 'getProperUserCancelingApplication',
    GetProperUserCancelingApplicationStatus = 'getProperUserCancelingApplicationStatus',
    VerifyProperUserCanceling = 'verifyProperUserCanceling',

    // Military Donation
    GetFundInfo = 'getFundInfo',
    GetFundReport = 'getFundReport',
    UpdateFundReport = 'updateFundReport',
    GetFundPaymentResource = 'getFundPaymentResource',
    ShareFundPayment = 'shareFundPayment',

    // Orcs
    CreatePartnerOrcEvent = 'createPartnerOrcEvent',
    InvalidatePartnerOrcEvent = 'invalidatePartnerOrcEvent',
    CreateOrcEvent = 'createOrcEvent',
    GetEnemiesList = 'getEnemies',
    GetEnemyDetails = 'getEnemyDetails',
    GetEnemyTrackLink = 'getEnemyTrackLink',

    // Doctor Consultation
    GetDoctorConsultationInfo = 'getDoctorConsultationInfo',
    GetDoctorConsultationSpecializations = 'getDoctorConsultationSpecializations',
    GetDoctorExperience = 'getDoctorExperience',
    GetDoctorContacts = 'getDoctorContacts',
    RequestDoctorRegistration = 'requestDoctorRegistration',
    DeleteDoctorRegistration = 'deleteDoctorRegistration',
    ChangeDoctorAccessibility = 'changeDoctorAccessibility',
    StartConsultationDoctor = 'startConsultationDoctor',
    CancelConsultationDoctor = 'cancelConsultationDoctor',
    ConfirmDoctorRegistration = 'confirmDoctorRegistration',
    NotifyDoctorConsultationStarted = 'notifyDoctorConsultationStarted',

    // Patient Consultation
    GetPatientConsultationInfo = 'getPatientConsultationInfo',
    GetPatientConsultationSpecializations = 'getPatientConsultationSpecializations',
    GetConsultationReason = 'getConsultationReason',
    GetConsultationDoctors = 'getConsultationDoctors',
    StartConsultationPatient = 'startConsultationPatient',
    CancelConsultationPatient = 'cancelConsultationPatient',
    GetInLineForConsultation = 'getInLineForConsultation',
    LeaveLineForConsultation = 'leaveLineForConsultation',
    NotifyPatientConsultationStarted = 'notifyPatientConsultationStarted',

    // Bayractar
    GetBayractarInfo = 'getBayractarInfo',
    SetBayractarNickname = 'setBayractarNickname',
    SetBayractarScore = 'setBayractarScore',

    // Drone Army
    SetDroneArmyScore = 'setDroneArmyScore',

    ApproveInternallyDisplacedPersonLocation = 'approveInternallyDisplacedPersonLocation',
    GetInternallyDisplacedPersonApplicationToConfirm = 'getInternallyDisplacedPersonApplicationToConfirm',
    GetInternallyDisplacedPersonAssistanceTypes = 'getInternallyDisplacedPersonAssistanceTypes',
    GetInternallyDisplacedPersonContacts = 'getInternallyDisplacedPersonContacts',
    GetInternallyDisplacedPersonAidApplication = 'getInternallyDisplacedPersonAidApplication',
    CancelInternallyDisplacedPersonApplication = 'cancelInternallyDisplacedPersonApplication',
    GetInternallyDisplacedPersonDisability = 'getInternallyDisplacedPersonDisability',
    GetInternallyDisplacedPersonApplicationHashedFilesToSign = 'getInternallyDisplacedPersonApplicationHashedFilesToSign',
    SendInternallyDisplacedPersonApplication = 'sendInternallyDisplacedPersonApplication',
    GetInternallyDisplacedPersonMembers = 'getInternallyDisplacedPersonMembers',
    ShareInternallyDisplacedPersonApplication = 'shareInternallyDisplacedPersonApplication',
    VerifyInternallyDisplacedPersonApplication = 'verifyInternallyDisplacedPersonApplication',
    RejectInternallyDisplacedPersonApplication = 'rejectInternallyDisplacedPersonApplication',
    ConfirmInternallyDisplacedPersonApplication = 'confirmInternallyDisplacedPersonApplication',
    InternallyDisplacedPersonSupervisorResendApplication = 'idpSupervisorResendApplication',
    InternallyDisplacedPersonSupervisorCheckApplication = 'idpSupervisorCheckApplication',
    SetInternallyDisplacedPersonChildren = 'setInternallyDisplacedPersonChildren',
    SetInternallyDisplacedPersonMembers = 'setInternallyDisplacedPersonMembers',

    GetInternallyDisplacedPersonCancelingApp = 'getInternallyDisplacedPersonCancelingApp',
    SendInternallyDisplacedPersonCancelingApp = 'sendInternallyDisplacedPersonCancelingApp',

    ApproveInternallyDisplacedPersonEditAddressLocation = 'approveInternallyDisplacedPersonEditAddressLocation',
    GetInternallyDisplacedPersonEditAddressApp = 'getInternallyDisplacedPersonEditAddressApp',
    SendInternallyDisplacedPersonEditAddressApp = 'sendInternallyDisplacedPersonEditAddressApp',
    CancelInternallyDisplacedPersonEditAddressApp = 'cancelInternallyDisplacedPersonEditAddressApp',

    // Temporary Occupied Territory
    ReplicateTemporaryOccupiedTerritoryCollection = 'replicateTemporaryOccupiedTerritoryCollection',

    // Unemployment Status
    GetUnemploymentStatusApplications = 'getUnemploymentStatusApplications',
    GetUnemploymentStatusApplicationInfo = 'getUnemploymentStatusApplicationInfo',
    DownloadUnemploymentStatusApplication = 'downloadUnemploymentStatusApplication',
    GetUnemploymentStatusCurrentEmployment = 'getUnemploymentStatusCurrentEmployment',
    GetUnemploymentStatusEmploymentCenters = 'getUnemploymentStatusEmploymentCenters',
    GetUnemploymentStatusPassportData = 'getUnemploymentStatusPassportData',
    GetUnemploymentStatusGeolocation = 'getUnemploymentStatusGeolocation',
    ConfirmUnemploymentStatusGeolocation = 'confirmUnemploymentStatusGeolocation',
    CreateUnemploymentStatusApplication = 'createUnemploymentStatusApplication',
    UpdateUnemploymentStatusApplication = 'updateUnemploymentStatusApplication',
    GetUnemploymentStatusApplicationToConfirm = 'getUnemploymentStatusApplicationToConfirm',
    SendUnemploymentStatusApplication = 'sendUnemploymentStatusApplication',
    CancelUnemploymentStatusApplication = 'cancelUnemploymentStatusApplication',

    // Unemployment Status Canceling
    GetUnemploymentStatusCancelingApplications = 'getUnemploymentStatusCancelingApplications',
    GetUnemploymentStatusCancelingApplicationInfo = 'getUnemploymentStatusCancelingApplicationInfo',
    DownloadUnemploymentStatusCancelingApplication = 'downloadUnemploymentStatusCancelingApplication',
    GetUnemploymentStatusCancelingEmploymentCenters = 'getUnemploymentStatusCancelingEmploymentCenters',
    GetUnemploymentStatusCancelingReasons = 'getUnemploymentStatusCancelingReasons',
    GetUnemploymentStatusCancelingPassportData = 'getUnemploymentStatusCancelingPassportData',
    GetUnemploymentStatusCancelingApplicationToConfirm = 'getUnemploymentStatusCancelingApplicationToConfirm',
    SendUnemploymentStatusCancelingApplication = 'sendUnemploymentStatusCancelingApplication',

    // IT Forces
    RegisterItForcesApplication = 'registerItForcesApplication',

    // ENot
    VerifyENotLink = 'verifyENotLink',
    GetENotRequestInfo = 'getENotRequestInfo',
    RequestENotApproval = 'requestENotApproval',
    GetENotHashedFilesToSign = 'getENotHashedFilesToSign',
    SendENotSignedItems = 'sendENotSignedItems',
    DownloadENotDocument = 'downloadENotDocument',
    CancelENotRequest = 'cancelENotRequest',

    // Homecoming Identity Card
    GetHomecomingIdentityCardLocations = 'getHomecomingIdentityCardLocations',
    ApproveHomecomingIdentityCardLocation = 'approveHomecomingIdentityCardLocation',
    GetHomecomingIdentityCardApplicationToConfirm = 'getHomecomingIdentityCardApplicationToConfirm',
    SendHomecomingIdentityCardApplication = 'sendHomecomingIdentityCardApplication',
    CancelHomecomingIdentityCardApplication = 'cancelHomecomingIdentityCardApplication',
    DownloadHomecomingIdentityCard = 'downloadHomecomingIdentityCard',

    // Military Bonds
    GetMilitaryBondsOrders = 'getMilitaryBondsOrders',
    GetMilitaryBondsOrderDocuments = 'getMilitaryBondsOrderDocuments',
    GetMilitaryBondsOrderCart = 'getMilitaryBondsOrderCart',
    GetMilitaryBondsOrderStatement = 'getMilitaryBondsOrderStatement',
    GetMilitaryBondsOrderPromotion = 'getMilitaryBondsOrderPromotion',
    GetMilitaryBondsOrderDetails = 'getMilitaryBondsOrderDetails',
    ConfirmationMilitaryBondOrder = 'confirmationMilitaryBondOrder',
    GetConfirmationMilitaryBondOrder = 'getConfirmationMilitaryBondOrder',
    SendMilitaryBondOrder = 'sendMilitaryBondOrder',
    AddMilitaryBondDicName = 'addMilitaryBondDicName',
    CancelMilitaryBondOrder = 'cancelMilitaryBondOrder',
    GetAvailableMilitaryBonds = 'getAvailableMilitaryBonds',
    GetAvailableMilitaryBondPartners = 'getAvailableMilitaryBondPartners',
    GetAvailableMilitaryBondPartnerCart = 'getAvailableMilitaryBondPartnerCart',
    GetMilitaryBondBankAccounts = 'getMilitaryBondBankAccounts',
    GetMilitaryBondBanks = 'getMilitaryBondBanks',
    GetMilitaryBondsHashedFilesToSign = 'getMilitaryBondsHashedFilesToSign',
    SendMilitaryBondsSignedItems = 'sendMilitaryBondsSignedItems',
    SetAvailableMilitaryBondsOffers = 'setAvailableMilitaryBondsOffers',
    SetMilitaryBondsOrderBankAccount = 'setMilitaryBondsOrderBankAccount',
    SetMilitaryBondsOrderAddress = 'setMilitaryBondsOrderAddress',
    SendMilitaryBondsDocumentsForSigning = 'sendMilitaryBondsDocumentsForSigning',
    UpdateMilitaryBondsOrderStatus = 'updateMilitaryBondsOrderStatus',
    GetMilitaryBondsUserInitiativeRatingForm = 'getMilitaryBondsUserInitiativeRatingForm',

    // Vehicle Customs Clearance
    GetVehicleCustomsClearanceApplications = 'getVehicleCustomsClearanceApplications',
    GetVehicleCustomsClearanceApplicationInfo = 'getVehicleCustomsClearanceApplicationInfo',
    DownloadVehicleCustomsClearanceApplication = 'downloadVehicleCustomsClearanceApplication',
    GetVehicleCustomsClearancePurchaseInformation = 'getVehicleCustomsClearancePurchaseInformation',
    GetVehicleCustomsClearanceCarrier = 'getVehicleCustomsClearanceCarrier',
    GetVehicleCustomsClearanceVin = 'getVehicleCustomsClearanceVin',
    GetVehicleCustomsClearanceCharacteristics = 'getVehicleCustomsClearanceCharacteristics',
    GetVehicleCustomsClearancePayment = 'getVehicleCustomsClearancePayment',
    GetVehicleCustomsClearanceApplicationToConfirm = 'getVehicleCustomsClearanceApplicationToConfirm',
    CheckVehicleCustomsClearanceApplication = 'checkVehicleCustomsClearanceApplication',
    GetVehicleCustomsClearanceDeclarationInfo = 'getVehicleCustomsClearanceDeclarationInfo',
    GetVehicleCustomsClearanceHashedFilesToSign = 'getVehicleCustomsClearanceHashedFilesToSign',
    SendVehicleCustomsClearanceSignedItems = 'sendVehicleCustomsClearanceSignedItems',
    CancelVehicleCustomsClearanceApplication = 'cancelVehicleCustomsClearanceApplication',
    GetVehicleCustomsClearanceCancelReasons = 'getVehicleCustomsClearanceCancelReasons',
    GetVehicleCustomsClearanceCancelHashedFilesToSign = 'getVehicleCustomsClearanceCancelHashedFilesToSign',
    SendVehicleCustomsClearanceCancelSignedItems = 'sendVehicleCustomsClearanceCancelSignedItems',

    // Customs Clearance Calculator
    GetCustomsClearanceCalculatorCharacteristics = 'getCustomsClearanceCalculatorCharacteristics',
    GetCustomsClearanceCalculatorPayment = 'getCustomsClearanceCalculatorPayment',

    // Mortgage
    GetMortgageCategories = 'getMortgageCategories',
    GetMortgageMaritalStatus = 'getMortgageMaritalStatus',
    CreateMortgagePackage = 'createMortgagePackage',
    ShareMorgage = 'shareMortgage',
    VerifyMortgage = 'verifyMortgage',
    RejectMortgage = 'rejectMortgage',
    GetMortgageChildrenNumber = 'getMortgageChildrenNumber',
    SetMortgageChildrenNumber = 'setMortgageChildrenNumber',
    SetMortgageChildren = 'setMortgageChildren',
    GetMortgageRealEstate = 'getMortgageRealEstate',
    GetMortgageManualRealEstate = 'getMortgageManualRealEstate',
    GetMortgageIncome = 'getMortgageIncome',
    SetMortgageIncome = 'setMortgageIncome',
    SetMortgageManualResidencePlace = 'setMortgageManualResidencePlace',
    SetMortgageContacts = 'setMortgageContacts',
    GetMortgageApartment = 'getMortgageApartment',
    SetMortgageApartment = 'setMortgageApartment',
    GetMortgageBanks = 'getMortgageBanks',
    SetMortgageBanks = 'setMortgageBanks',
    GetMortgageApplicationToConfirm = 'getMortgageApplicationToConfirm',
    GetMortgageHashedFilesToSign = 'getMortgageHashedFilesToSign',
    SendMortgageSignedItems = 'sendMortgageSignedItems',
    GetMortgagePackageApplication = 'getMortgagePackageApplication',
    CancelMortgagePackageApplication = 'cancelMortgagePackageApplication',
    CancelMortgagePackage = 'cancelMortgagePackage',
    ConfirmMortgageApplication = 'confirmMortgageApplication',
    DownloadMortgageDocument = 'downloadMortgageDocument',
    DownloadMortgageApplicationDocument = 'downloadMortgageApplicationDocument',
    PartnerRefuseMortgage = 'partnerRefuseMortgage',
    PartnerProposeMortgage = 'partnerProposeMortgage',
    PartnerIssueMortgage = 'partnerIssueMortgage',

    // Led Exchange
    GetLedExchangeDelivery = 'getLedExchangeDelivery',
    GetLedExchangeSelection = 'getLedExchangeSelection',
    SendLedExchangeOrder = 'sendLedExchangeOrder',

    // Award
    GetAwardDelivery = 'getAwardDelivery',
    OrderAward = 'orderAward',
    UploadAwardReceivers = 'uploadAwardReceivers',
    RevokeAward = 'revokeAward',
    UpdateAwardDeliveryStatus = 'updateAwardDeliveryStatus',

    // EResident
    FetchEResidentBusinessDictionary = 'fetchEResidentBusinessDictionary',
    GetEResidentPEApplicationDetails = 'getEResidentPEApplicationDetails',
    GetEresidentPrivateEntrepreneurStatus = 'getEresidentPrivateEntrepreneurStatus',
    GetEResidentPEApplicationDocument = 'getEResidentPEApplicationDocument',
    GetEResidentPEChangesApplicationDocument = 'getEResidentPEChangesApplicationDocument',
    GetEResidentTerminationDetails = 'getEResidentTerminationDetails',
    GetEResidentTerminationDocument = 'getEResidentTerminationDocument',
    GetEResidentPEDocumentsHashes = 'getEResidentPEDocumentsHashes',
    GetEResidentPEChangesHashes = 'getEResidentPEChangesHashes',
    SendSignedEResidentPEDocuments = 'sendSignedEResidentPEDocuments',
    SendSignedEResidentPEChanges = 'sendSignedEResidentPEChanges',
    GetEResidentTerminationDocumentsHashes = 'getEResidentTerminationDocumentsHashes',
    SubmitEResidentTermination = 'submitEResidentTermination',

    // EResident Bank Account
    GetEResidentBAApplication = 'getEResidentBAApplication',
    GetEResidentBABanks = 'getEResidentBABanks',
    GetEResidentBAQuestionary = 'getEResidentBAQuestionary',
    StartEResidentBAApplication = 'startEResidentBAApplication',
    SubmitEResidentBAQuestionary = 'submitEResidentBAQuestionary',

    // EResident Applicant
    FetchEResidentApplication = 'fetchEResidentApplication',
    SubmitEResidentApplication = 'submitEResidentApplication',
    FetchEResidentCountriesDictionary = 'fetchEResidentCountriesDictionary',

    // Mia
    HandleMiaOperationCallback = 'handleMiaOperationCallback',
}

const serviceId = 'public-service-service'

const isStandaloneMortgageEnabled = process.env.PUBLIC_SERVICES_STANDALONE_MORTGAGE_IS_ENABLED === 'true'

const routes: AppRoute[] = [
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/:service',
        action: PublicServiceActions.GetPublicServiceInfo,
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
            tags: ['Common'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/public-service/:service',
        action: PublicServiceActions.GetPublicServiceInfo,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Common'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/:service/contacts',
        action: PublicServiceActions.GetPublicServiceContacts,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Common'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/:service/children',
        action: PublicServiceActions.GetPublicServiceChildren,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Common'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/:service/bank-accounts',
        action: PublicServiceActions.GetMoneyAidBankAccounts,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Common'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/:service/onboarding/read',
        action: PublicServiceActions.ReadPublicServiceOnboarding,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Common'],
        },
    },

    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/penalties',
        action: PublicServiceActions.GetAllPenalties,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V3 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V3] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/penalties/:group',
        action: PublicServiceActions.GetPenaltiesByGroup,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V3 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V3] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/penalty/:id',
        action: PublicServiceActions.GetPenaltyById,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V3 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V3] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/debts',
        action: PublicServiceActions.GetAllDebts,
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
        path: '/api/:apiVersion/public-service/debts/:group',
        action: PublicServiceActions.GetDebtsByGroup,
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
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/debt/:id',
        action: PublicServiceActions.GetDebtById,
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
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/administrative-fees/paid',
        action: PublicServiceActions.GetPaidAdministrativeFees,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V2 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/administrative-fee/:id',
        action: PublicServiceActions.GetAdministrativeFeePaymentById,
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
        path: '/api/:apiVersion/public-service/payment/:target/fee',
        action: PublicServiceActions.GetPaymentFee,
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
        path: '/api/:apiVersion/public-service/payment/:target/:resourceId',
        action: PublicServiceActions.GetPaymentData,
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
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/payment/:target/:resourceId',
        action: PublicServiceActions.InitPaymentAuthorizationBank,
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
        path: '/api/:apiVersion/public-service/payment/:target/:resourceId/status',
        action: PublicServiceActions.SetPaymentStatus,
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
        path: '/api/:apiVersion/public-service/test/external-bus',
        action: PublicServiceActions.TestExternalBus,
        auth: [{ sessionType: SessionType.Partner, version: ActionVersion.V1 }],
        forbiddenEnvs: [Env.Prod],
        metadata: {
            tags: ['External Bus'],
        },
    },

    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/promo',
        action: PublicServiceActions.GetPromo,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Common'],
        },
    },

    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/social-assistance-programs',
        action: PublicServiceActions.GetSocialAssistancePrograms,
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
        path: '/api/:apiVersion/public-service/social-assistance-programs/:programId',
        action: PublicServiceActions.CreateSocialAssistanceApplication,
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
        path: '/api/:apiVersion/public-service/social-assistance-programs/:programId',
        action: PublicServiceActions.CheckSocialAssistanceApplication,
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
        path: '/api/:apiVersion/public-service/social-assistance-programs/:programId/application/:applicationId',
        action: PublicServiceActions.CheckSocialAssistanceApplicationById,
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
        path: '/api/:apiVersion/public-service/social-assistance-programs/:programId/accessibility',
        action: PublicServiceActions.CheckSocialAssistanceProgramAvailability,
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
        path: '/api/:apiVersion/public-service/vaccination/app',
        action: PublicServiceActions.SignUpForVaccination,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.PUT,
        path: '/api/:apiVersion/public-service/vaccination/app',
        action: PublicServiceActions.UpdateVaccinationRecord,
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
        path: '/api/:apiVersion/public-service/vaccination/group/available',
        action: PublicServiceActions.CheckVaccinationGroupAvailability,
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
        path: '/api/:apiVersion/public-service/vaccination',
        action: PublicServiceActions.DeleteVaccinationRecord,
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
        path: '/api/:apiVersion/public-service/vaccination',
        action: PublicServiceActions.GetVaccinationInfo,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V3 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V3] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/vaccination/groups',
        action: PublicServiceActions.GetVaccinationGroups,
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
        path: '/api/:apiVersion/public-service/vaccination/user-data',
        action: PublicServiceActions.GetVaccinationUserData,
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
        path: '/api/:apiVersion/public-service/vaccination/address',
        action: PublicServiceActions.GetVaccinationAddress,
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
        path: '/api/:apiVersion/public-service/vaccination/vaccination-point',
        action: PublicServiceActions.GetVaccinationPoint,
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
        path: '/api/:apiVersion/public-service/vaccination/vaccination-points',
        action: PublicServiceActions.GetVaccinationPoints,
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
        path: '/api/:apiVersion/public-service/vaccination/mass-vaccination-points',
        action: PublicServiceActions.GetMassVaccinationPoints,
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
        path: '/api/:apiVersion/public-service/vaccination/mass-vaccination-point/:vaccinationPointId/time-slots',
        action: PublicServiceActions.GetVaccinationPointTimeSlots,
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
        path: '/api/:apiVersion/public-service/vaccination/mass-vaccination',
        action: PublicServiceActions.SignUpForMassVaccination,
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
        path: '/api/:apiVersion/public-service/vaccination/mass-vaccination/ticket',
        action: PublicServiceActions.GetMassVaccinationTicket,
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
        path: '/api/:apiVersion/public-service/vaccination/mass-vaccination',
        action: PublicServiceActions.DeleteMassVaccinationTicket,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },

    // Vaccination Certificate
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/vaccination-certificate',
        action: PublicServiceActions.GetVaccinationCertificateInfo,
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
        path: '/api/:apiVersion/public-service/vaccination-certificate/available-certificates',
        action: PublicServiceActions.GetAvailableCertificates,
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
        path: '/api/:apiVersion/public-service/vaccination-certificate/agreement',
        action: PublicServiceActions.GetVaccinationCertificateAgreement,
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
        path: '/api/:apiVersion/public-service/vaccination-certificate/agreement/child',
        action: PublicServiceActions.GetVaccinationCertificateChildAgreement,
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
        path: '/api/:apiVersion/public-service/vaccination-certificate/signing',
        action: PublicServiceActions.GetVaccinationCertificateHashesToSign,
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
        path: '/api/:apiVersion/public-service/vaccination-certificate/signing',
        action: PublicServiceActions.GetVaccinationCertificateHashesToSignByTypes,
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
        path: '/api/:apiVersion/public-service/vaccination-certificate',
        action: PublicServiceActions.SendVaccinationCertificateRequest,
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
        path: '/api/:apiVersion/public-service/vaccination-certificate/no-signing-send',
        action: PublicServiceActions.SendVaccinationCertificateRequestWithoutSigning,
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
        path: '/api/:apiVersion/public-service/private-entrepreneur/status',
        action: PublicServiceActions.GetPrivateEntrepreneurStatus,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V3 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V3] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/private-entrepreneur/bank-accounts',
        action: PublicServiceActions.GetPrivateEntrepreneurBankAccounts,
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
        path: '/api/:apiVersion/public-service/private-entrepreneur/bank-synchronization',
        action: PublicServiceActions.TogglePrivateEntrepreneurBankSync,
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
        path: '/api/:apiVersion/public-service/private-entrepreneur/report/:target/periods',
        action: PublicServiceActions.GetPrivateEntrepreneurReportPeriods,
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
        path: '/api/:apiVersion/public-service/private-entrepreneur/reports/periods/archive',
        action: PublicServiceActions.GetPrivateEntrepreneurArchivedReportPeriods,
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
        path: '/api/:apiVersion/public-service/private-entrepreneur/tax/:target/periods',
        action: PublicServiceActions.GetPrivateEntrepreneurTaxPeriods,
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
        path: '/api/:apiVersion/public-service/private-entrepreneur/report/period/:periodId/amount',
        action: PublicServiceActions.GetPrivateEntrepreneurReportTaxAmount,
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
        path: '/api/:apiVersion/public-service/private-entrepreneur/tax/period/:periodId/amount',
        action: PublicServiceActions.GetPrivateEntrepreneurTaxAmount,
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
        path: '/api/:apiVersion/public-service/private-entrepreneur/tax/period/:periodId/resource-id',
        action: PublicServiceActions.GetPrivateEntrepreneurTaxResourceId,
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
        path: '/api/:apiVersion/public-service/private-entrepreneur/budget-payments',
        action: PublicServiceActions.GetPrivateEntrepreneurBudgetPayments,
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
        path: '/api/:apiVersion/public-service/private-entrepreneur/taxes',
        action: PublicServiceActions.GetPrivateEntrepreneurTaxes,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V3 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V3] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/private-entrepreneur/taxes/history',
        action: PublicServiceActions.GetPrivateEntrepreneurTaxesHistory,
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
        path: '/api/:apiVersion/public-service/private-entrepreneur/tax/:id',
        action: PublicServiceActions.GetPrivateEntrepreneurTaxById,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        path: '/api/:apiVersion/public-service/private-entrepreneur/reports',
        method: HttpMethod.GET,
        action: PublicServiceActions.GetPrivateEntrepreneurReports,
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
        path: '/api/:apiVersion/public-service/private-entrepreneur/report/:id',
        action: PublicServiceActions.GetPrivateEntrepreneurReportById,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },

    // Tax Declaration
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/private-entrepreneur/report/declaration/period/:periodId',
        action: PublicServiceActions.GetPrivateEntrepreneurFilledDeclaration,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Private Entrepreneur Declaration'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/private-entrepreneur/report/declaration/:id/signing',
        action: PublicServiceActions.GetPrivateEntrepreneurHashedFilesToSign,
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
            tags: ['Private Entrepreneur Declaration'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/private-entrepreneur/report/declaration/:id/send',
        action: PublicServiceActions.SendSignedDeclaration,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Private Entrepreneur Declaration'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/private-entrepreneur/report/declaration/:id/download',
        action: PublicServiceActions.DownloadPrivateEntrepreneurDeclaration,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Private Entrepreneur Declaration'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/private-entrepreneur/report/declaration/archive/download',
        action: PublicServiceActions.DownloadPrivateEntrepreneurArchivedDeclaration,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Private Entrepreneur Declaration'],
        },
    },

    // EResident Private Entrepreneur
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/public-service/application/business',
        action: PublicServiceActions.FetchEResidentBusinessDictionary,
        auth: [{ sessionTypes: [SessionType.EResident, SessionType.EResidentApplicant], version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/public-service/private-entrepreneur/status',
        action: PublicServiceActions.GetEresidentPrivateEntrepreneurStatus,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['e-Resident Private Entrepreneur'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/public-service/private-entrepreneur/details',
        action: PublicServiceActions.GetEResidentPEApplicationDetails,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['e-Resident Private Entrepreneur'],
        },
    },

    // EResident Private Entrepreneur Opening
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/public-service/private-entrepreneur/document',
        action: PublicServiceActions.GetEResidentPEApplicationDocument,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['e-Resident Private Entrepreneur Opening'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/public-service/private-entrepreneur/hashes',
        action: PublicServiceActions.GetEResidentPEDocumentsHashes,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['e-Resident Private Entrepreneur Opening'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/e-resident/api/:apiVersion/public-service/private-entrepreneur/send',
        action: PublicServiceActions.SendSignedEResidentPEDocuments,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['e-Resident Private Entrepreneur Opening'],
        },
    },

    // EResident Private Entrepreneur Changes
    {
        method: HttpMethod.POST,
        path: '/e-resident/api/:apiVersion/public-service/private-entrepreneur/changes/document',
        action: PublicServiceActions.GetEResidentPEChangesApplicationDocument,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['e-Resident Private Entrepreneur Changes'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/e-resident/api/:apiVersion/public-service/private-entrepreneur/changes/hashes',
        action: PublicServiceActions.GetEResidentPEChangesHashes,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['e-Resident Private Entrepreneur Changes'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/e-resident/api/:apiVersion/public-service/private-entrepreneur/changes',
        action: PublicServiceActions.SendSignedEResidentPEChanges,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['e-Resident Private Entrepreneur Changes'],
        },
    },

    // EResident Termination
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/public-service/termination/details',
        action: PublicServiceActions.GetEResidentTerminationDetails,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: DEFAULT_USER_HEADERS,
        metadata: {
            tags: ['e-Resident Termination'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/public-service/termination/document/:id',
        action: PublicServiceActions.GetEResidentTerminationDocument,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: DEFAULT_USER_HEADERS,
        metadata: {
            tags: ['e-Resident Termination'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/public-service/termination/hashes',
        action: PublicServiceActions.GetEResidentTerminationDocumentsHashes,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: DEFAULT_USER_HEADERS,
        metadata: {
            tags: ['e-Resident Termination'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/e-resident/api/:apiVersion/public-service/termination',
        action: PublicServiceActions.SubmitEResidentTermination,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: DEFAULT_USER_HEADERS,
        metadata: {
            tags: ['e-Resident Termination'],
        },
    },

    // EResident Bank Account
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/public-service/bank-account/application',
        action: PublicServiceActions.GetEResidentBAApplication,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: DEFAULT_USER_HEADERS,
        metadata: {
            tags: ['e-Resident Bank account'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/public-service/bank-account/banks',
        action: PublicServiceActions.GetEResidentBABanks,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: DEFAULT_USER_HEADERS,
        metadata: {
            tags: ['e-Resident Bank account'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/e-resident/api/:apiVersion/public-service/bank-account/questionary/receive',
        action: PublicServiceActions.GetEResidentBAQuestionary,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: DEFAULT_USER_HEADERS,
        metadata: {
            tags: ['e-Resident Bank account'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/e-resident/api/:apiVersion/public-service/bank-account/questionary/submit',
        action: PublicServiceActions.SubmitEResidentBAQuestionary,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: DEFAULT_USER_HEADERS,
        metadata: {
            tags: ['e-Resident Bank account'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/e-resident/api/:apiVersion/public-service/bank-account/start',
        action: PublicServiceActions.StartEResidentBAApplication,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: DEFAULT_USER_HEADERS,
        metadata: {
            tags: ['e-Resident Bank account'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/public-service/bank-account/documents',
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: DEFAULT_USER_HEADERS,
        proxyTo: { serviceId },
        metadata: {
            tags: ['e-Resident Bank account'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/public-service/bank-account/hashes',
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: DEFAULT_USER_HEADERS,
        proxyTo: { serviceId },
        metadata: {
            tags: ['e-Resident Bank account'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/e-resident/api/:apiVersion/public-service/bank-account/signing',
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: DEFAULT_USER_HEADERS,
        proxyTo: { serviceId },
        metadata: {
            tags: ['e-Resident Bank account'],
        },
    },

    // EResident Applicant
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/public-service/application',
        action: PublicServiceActions.FetchEResidentApplication,
        auth: [{ sessionType: SessionType.EResidentApplicant, version: ActionVersion.V1 }],
        headers: DEFAULT_USER_HEADERS,
        metadata: { tags: ['E-Resident applicant'] },
    },
    {
        method: HttpMethod.POST,
        path: '/e-resident/api/:apiVersion/public-service/application',
        action: PublicServiceActions.SubmitEResidentApplication,
        auth: [{ sessionType: SessionType.EResidentApplicant, version: ActionVersion.V1 }],
        headers: DEFAULT_USER_HEADERS,
        metadata: { tags: ['E-Resident applicant'] },
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/public-service/application/countries',
        action: PublicServiceActions.FetchEResidentCountriesDictionary,
        auth: [{ sessionType: SessionType.EResidentApplicant, version: ActionVersion.V1 }],
        headers: DEFAULT_USER_HEADERS,
        metadata: { tags: ['E-Resident applicant'] },
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/public-service/application/tax-code-rules',
        auth: [{ sessionType: SessionType.EResidentApplicant, version: ActionVersion.V1 }],
        headers: DEFAULT_USER_HEADERS,
        proxyTo: { serviceId },
        metadata: { tags: ['E-Resident applicant'] },
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/public-service/application/e-queue/status',
        auth: [{ sessionType: SessionType.EResidentApplicant, version: ActionVersion.V1 }],
        headers: DEFAULT_USER_HEADERS,
        proxyTo: { serviceId },
        metadata: { tags: ['E-Resident applicant'] },
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/public-service/application/e-queue/institutions',
        auth: [{ sessionType: SessionType.EResidentApplicant, version: ActionVersion.V1 }],
        headers: DEFAULT_USER_HEADERS,
        proxyTo: { serviceId },
        metadata: { tags: ['E-Resident applicant'] },
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/public-service/application/e-queue/schedule',
        auth: [{ sessionType: SessionType.EResidentApplicant, version: ActionVersion.V1 }],
        headers: DEFAULT_USER_HEADERS,
        proxyTo: { serviceId },
        metadata: { tags: ['E-Resident applicant'] },
    },
    {
        method: HttpMethod.POST,
        path: '/e-resident/api/:apiVersion/public-service/application/e-queue/book',
        auth: [{ sessionType: SessionType.EResidentApplicant, version: ActionVersion.V1 }],
        headers: DEFAULT_USER_HEADERS,
        proxyTo: { serviceId },
        metadata: { tags: ['E-Resident applicant'] },
    },

    // Driver License Replacement
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/document-replacement/driver-license/contacts',
        action: PublicServiceActions.GetDriverLicenseReplacementContacts,
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
            tags: ['Driver License Replacement'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/document-replacement/driver-license',
        action: PublicServiceActions.GetDriverLicenseReplacementStatus,
        auth: [
            { sessionType: SessionType.User, version: ActionVersion.V4 },
            { sessionType: SessionType.User, version: ActionVersion.V5 },
            { sessionType: SessionType.User, version: ActionVersion.V6 },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V4, ActionVersion.V5, ActionVersion.V6] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V4, ActionVersion.V5, ActionVersion.V6] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V4, ActionVersion.V5, ActionVersion.V6] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V4, ActionVersion.V5, ActionVersion.V6] },
        ],
        metadata: {
            tags: ['Driver License Replacement'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/document-replacement/driver-license/application/reason-for-replacement',
        action: PublicServiceActions.GetDriverLicenseReplacementReasons,
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
        metadata: {
            tags: ['Driver License Replacement'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/document-replacement/driver-license/application/applicant',
        action: PublicServiceActions.IdentifyDriverLicenseReplacementResidenceRegistration,
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
        metadata: {
            tags: ['Driver License Replacement'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/document-replacement/driver-license/application-confirmation',
        action: PublicServiceActions.ConfirmDriverLicenseReplacement,
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
        metadata: {
            tags: ['Driver License Replacement'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/document-replacement/driver-license/application/:applicationId/signing',
        action: PublicServiceActions.GetDriverLicenseReplacementHashedFilesToSign,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Driver License Replacement'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/document-replacement/driver-license/send',
        action: PublicServiceActions.SendDriverLicenseReplacement,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Driver License Replacement'],
        },
    },
    {
        method: HttpMethod.DELETE,
        path: '/api/:apiVersion/public-service/document-replacement/driver-license/cancel-application/:applicationId',
        action: PublicServiceActions.CancelDriverLicenseReplacementApplication,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Driver License Replacement'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/document-replacement/driver-license/callback',
        action: PublicServiceActions.DriverLicenseReplacementCallback,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.driverLicenseReplacement]: [PartnerDriverLicenseReplacementScope.StatusCallback],
                },
            },
        ],
        metadata: {
            tags: ['Driver License Replacement'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/document-replacement/driver-license/document-type',
        action: PublicServiceActions.IdentifyDriverLicenseReplacementDocumentType,
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
        metadata: {
            tags: ['Driver License Replacement'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/document-replacement/driver-license/departments',
        action: PublicServiceActions.GetDriverLicenseReplacementDepartments,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Driver License Replacement'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/document-replacement/driver-license/:applicationId/document/:loadActionType/download',
        action: PublicServiceActions.DownloadDriverLicenseReplacementDocument,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Driver License Replacement'],
        },
    },
    {
        method: HttpMethod.DELETE,
        path: '/api/:apiVersion/public-service/document-replacement/driver-license/cancel-repeated-delivery/:applicationId',
        action: PublicServiceActions.CancelRepeatedDeliveryDriverLicenseReplacementApplication,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Driver License Replacement'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/document-replacement/driver-license/method-of-obtaining-repeated-delivery/:applicationId',
        action: PublicServiceActions.GetDriverLicenseReplacementRepeatedDeliveryMethod,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Driver License Replacement'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/document-replacement/driver-license/application-confirmation-repeated-delivery',
        action: PublicServiceActions.ConfirmDriverLicenseReplacementRepeatedDelivery,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Driver License Replacement'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/document-replacement/driver-license/repeated-delivery-application',
        action: PublicServiceActions.CreateDriverLicenseReplacementRepeatedDelivery,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Driver License Replacement'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/document-replacement/driver-license/contacts-repeated-delivery',
        action: PublicServiceActions.GetDriverLicenseReplacementRepeatedDeliveryContacts,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Driver License Replacement'],
        },
    },
    // Support Driver License Replacement
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/document-replacement/driver-license/support/change-status-applications',
        action: PublicServiceActions.SupportDriverLicenseReplacementChangeStatusApplications,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.driverLicenseReplacement]: [PartnerDriverLicenseReplacementScope.Support],
                },
            },
        ],
        metadata: {
            tags: ['Support Driver License Replacement Applications'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/document-replacement/driver-license/support/change-naisresposeid-applications',
        action: PublicServiceActions.SupportDriverLicenseReplacementChangeNaisResponseIdApplications,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.driverLicenseReplacement]: [PartnerDriverLicenseReplacementScope.Support],
                },
            },
        ],
        metadata: {
            tags: ['Support Driver License Replacement Applications'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/document-replacement/driver-license/support/change-data-applications',
        action: PublicServiceActions.SupportDriverLicenseReplacementChangeDataApplications,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.driverLicenseReplacement]: [PartnerDriverLicenseReplacementScope.Support],
                },
            },
        ],
        metadata: {
            tags: ['Support Driver License Replacement Applications'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/document-replacement/driver-license/support/change-deliveryid',
        action: PublicServiceActions.SupportDriverLicenseReplacementChangeDeliveryId,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.driverLicenseReplacement]: [PartnerDriverLicenseReplacementScope.Support],
                },
            },
        ],
        metadata: {
            tags: ['Support Driver License Replacement Applications'],
        },
    },

    // Vaccination Aid
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/vaccination-aid',
        action: PublicServiceActions.GetVaccinationAidStatus,
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
        path: '/api/:apiVersion/public-service/vaccination-aid/bank-accounts',
        action: PublicServiceActions.GetVaccinationAidBankAccounts,
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
        path: '/api/:apiVersion/public-service/vaccination-aid',
        action: PublicServiceActions.CreateVaccinationAidApplication,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },

    // OK-5/OK-7 Certificate
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/:service/list',
        action: PublicServiceActions.GetOkCertificatesByStatus,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['OK-5/OK-7 Certificate'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/:service/:id',
        action: PublicServiceActions.GetOkCertificateById,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['OK-5/OK-7 Certificate'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/:service/application',
        action: PublicServiceActions.SendOkCertificateApplication,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['OK-5/OK-7 Certificate'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/:service/:id/download',
        action: PublicServiceActions.DownloadOkCertificateArchiveZip,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['OK-5/OK-7 Certificate'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/:service/:id/pdf',
        action: PublicServiceActions.DownloadOkCertificatePdf,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['OK-5/OK-7 Certificate'],
        },
    },

    // Residence Cert
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/residence-cert/orders',
        action: PublicServiceActions.GetResidenceCertOrders,
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
            tags: ['Residence Cert'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/residence-cert/order/:id',
        action: PublicServiceActions.GetResidenceCertOrderById,
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
            tags: ['Residence Cert'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/residence-cert/order',
        action: PublicServiceActions.SendResidenceCertOrder,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Residence Cert'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/residence-cert/order/:id/download',
        action: PublicServiceActions.DownloadResidenceCertOrderPdf,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Residence Cert'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/residence-cert-children/orders',
        action: PublicServiceActions.GetResidenceCertChildrenOrders,
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
            tags: ['Residence Cert'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/residence-cert-children/order/:id',
        action: PublicServiceActions.GetResidenceCertOrderById,
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
            tags: ['Residence Cert'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/residence-cert-children/order',
        action: PublicServiceActions.SendResidenceCertChildrenOrder,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Residence Cert'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/residence-cert-children/order/:id/download',
        action: PublicServiceActions.DownloadResidenceCertOrderPdf,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Residence Cert'],
        },
    },

    // Court Cases
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/court-cases/list',
        action: PublicServiceActions.GetCourtCases,
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
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/court-cases/:id',
        action: PublicServiceActions.GetCourtCase,
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
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/court-cases/:id/decisions',
        action: PublicServiceActions.GetCourtCaseDecisions,
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
        path: '/api/:apiVersion/public-service/court-cases/decisions/:id',
        action: PublicServiceActions.GetCourtCaseDecision,
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
        path: '/api/:apiVersion/public-service/court-cases/decisions/:id/pdf/download',
        action: PublicServiceActions.DownloadCourtCaseDecisionPdf,
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
        path: '/api/:apiVersion/public-service/court-cases/decisions/:id/archive/download',
        action: PublicServiceActions.DownloadCourtCaseDecisionArchive,
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
        path: '/api/:apiVersion/public-service/court-cases/:id/hearings',
        action: PublicServiceActions.GetCourtCaseHearings,
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
        path: '/api/:apiVersion/public-service/court-cases/hearings/:id',
        action: PublicServiceActions.GetCourtCaseHearing,
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
        path: '/api/:apiVersion/public-service/court-cases/hearings/:id/calendar-data',
        action: PublicServiceActions.GetCourtCaseHearingCalendar,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },

    // Court Penalties
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/court-penalties',
        action: PublicServiceActions.GetCourtPenaltiesUnpaid,
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
        path: '/api/:apiVersion/public-service/court-penalties/paid',
        action: PublicServiceActions.GetCourtPenaltiesPaid,
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
        path: '/api/:apiVersion/public-service/court-penalties/:id',
        action: PublicServiceActions.GetCourtPenalty,
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
        path: '/api/:apiVersion/public-service/partner/court-penalties/paid',
        action: PublicServiceActions.SetCourtPenaltyPaid,
        auth: [{ sessionType: SessionType.Partner, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Court Penalty'],
        },
    },

    // Proper User
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/proper-user/applications',
        action: PublicServiceActions.GetProperUserApplications,
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
        path: '/api/:apiVersion/public-service/proper-user/assigned-proper-users',
        action: PublicServiceActions.GetProperUserAssignedProperUsers,
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
        path: '/api/:apiVersion/public-service/proper-user/:serviceActionCode/application/info',
        action: PublicServiceActions.GetProperUserApplicationInfo,
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
        path: '/api/:apiVersion/public-service/proper-user/vehicles-to-share',
        action: PublicServiceActions.GetProperUserVehiclesToShare,
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
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/proper-user/:serviceActionCode/application',
        action: PublicServiceActions.GetProperUserApplicantData,
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
        path: '/api/:apiVersion/public-service/proper-user/:serviceActionCode/application',
        action: PublicServiceActions.CreateProperUserApplication,
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
        path: '/api/:apiVersion/public-service/proper-user/application/:applicationId',
        action: PublicServiceActions.GetProperUserApplication,
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
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/proper-user/application/:applicationId/status',
        action: PublicServiceActions.GetProperUserApplicationStatus,
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
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/proper-user/application/:applicationId/share',
        action: PublicServiceActions.ShareProperUserApplication,
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
        path: '/api/:apiVersion/public-service/proper-user/application/verify',
        action: PublicServiceActions.VerifyProperUserApplication,
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
        path: '/api/:apiVersion/public-service/proper-user/application/:applicationId',
        action: PublicServiceActions.UpdateProperUserApplication,
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
        path: '/api/:apiVersion/public-service/proper-user/application/:applicationId/cancel',
        action: PublicServiceActions.CancelProperUserApplication,
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
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/proper-user/application/:applicationId/signing',
        action: PublicServiceActions.GetProperUserApplicationHashesToSign,
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
        path: '/api/:apiVersion/public-service/proper-user/application/:applicationId/send',
        action: PublicServiceActions.SendProperUserSignedItems,
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
        path: '/api/:apiVersion/public-service/proper-user/address-registration',
        action: PublicServiceActions.GetProperUserAddressRegistration,
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
        path: '/api/:apiVersion/public-service/proper-user/application/callback',
        action: PublicServiceActions.SetProperUserApplicationResult,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.properUser]: [PartnerProperUserScope.ApplicationStatusCallback],
                },
            },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/proper-user/canceling',
        action: PublicServiceActions.GetProperUserCanceling,
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
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/proper-user/canceling/application',
        action: PublicServiceActions.GetProperUserCancelingApplication,
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
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/proper-user/canceling/application/:applicationId/status',
        action: PublicServiceActions.GetProperUserCancelingApplicationStatus,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1, ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/proper-user/canceling/verify',
        action: PublicServiceActions.VerifyProperUserCanceling,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },

    // Military Donation
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/military-donation/:fundCode',
        action: PublicServiceActions.GetFundInfo,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V2 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/military-donation/:fundCode/report',
        action: PublicServiceActions.GetFundReport,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V3 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V3] },
        ],
    },
    {
        method: HttpMethod.PUT,
        path: '/api/:apiVersion/public-service/military-donation/:fundCode/report',
        action: PublicServiceActions.UpdateFundReport,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.militaryDonation]: [PartnerMilitaryDonationScope.UpdateFundReport],
                },
            },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/military-donation/:fundCode/resource-id',
        action: PublicServiceActions.GetFundPaymentResource,
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
        path: '/api/:apiVersion/public-service/military-donation/:fundCode/:id/share',
        action: PublicServiceActions.ShareFundPayment,
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
        path: '/e-resident/api/:apiVersion/public-service/military-donation/:fundCode/resource-id',
        action: PublicServiceActions.GetFundPaymentResource,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/public-service/military-donation/:fundCode/:id/share',
        action: PublicServiceActions.ShareFundPayment,
        auth: [{ sessionType: SessionType.EResident, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },

    // Orcs
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/partner/enemy-track',
        action: PublicServiceActions.CreatePartnerOrcEvent,
        auth: [{ sessionType: SessionType.Partner, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Enemy Track'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/partner/enemy-track/invalidate',
        action: PublicServiceActions.InvalidatePartnerOrcEvent,
        auth: [{ sessionType: SessionType.Partner, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Enemy Track'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/enemy-track',
        action: PublicServiceActions.CreateOrcEvent,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Enemy Track'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/enemies',
        action: PublicServiceActions.GetEnemiesList,
        auth: [{ sessionType: SessionType.ServiceUser, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Enemy Track'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/enemy/:uid',
        action: PublicServiceActions.GetEnemyDetails,
        auth: [{ sessionType: SessionType.ServiceUser, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Enemy Track'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/enemy-track/link',
        action: PublicServiceActions.GetEnemyTrackLink,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Enemy Track'],
        },
    },

    // Doctor Consultation
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/doctor-consultation',
        action: PublicServiceActions.GetDoctorConsultationInfo,
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
        path: '/api/:apiVersion/public-service/doctor-consultation/specialization',
        action: PublicServiceActions.GetDoctorConsultationSpecializations,
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
        path: '/api/:apiVersion/public-service/doctor-consultation/experience',
        action: PublicServiceActions.GetDoctorExperience,
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
        path: '/api/:apiVersion/public-service/doctor-consultation/contacts',
        action: PublicServiceActions.GetDoctorContacts,
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
        path: '/api/:apiVersion/public-service/doctor-consultation/registration',
        action: PublicServiceActions.RequestDoctorRegistration,
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
        path: '/api/:apiVersion/public-service/doctor-consultation/registration',
        action: PublicServiceActions.DeleteDoctorRegistration,
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
        path: '/api/:apiVersion/public-service/doctor-consultation/accessibility',
        action: PublicServiceActions.ChangeDoctorAccessibility,
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
        path: '/api/:apiVersion/public-service/doctor-consultation/consultations/:consultationId/start',
        action: PublicServiceActions.StartConsultationDoctor,
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
        path: '/api/:apiVersion/public-service/doctor-consultation/consultations/:consultationId/cancel',
        action: PublicServiceActions.CancelConsultationDoctor,
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
        path: '/api/:apiVersion/public-service/partner/doctor-consultation/registration',
        action: PublicServiceActions.ConfirmDoctorRegistration,
        auth: [{ sessionType: SessionType.Partner, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Doctor Consultation'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/partner/doctor-consultation/start',
        action: PublicServiceActions.NotifyDoctorConsultationStarted,
        auth: [{ sessionType: SessionType.Partner, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Doctor Consultation'],
        },
    },

    // Patient Consultation
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/patient-consultation',
        action: PublicServiceActions.GetPatientConsultationInfo,
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
        path: '/api/:apiVersion/public-service/patient-consultation/specialization',
        action: PublicServiceActions.GetPatientConsultationSpecializations,
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
        path: '/api/:apiVersion/public-service/patient-consultation/reason',
        action: PublicServiceActions.GetConsultationReason,
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
        path: '/api/:apiVersion/public-service/patient-consultation/:specializationId/doctors',
        action: PublicServiceActions.GetConsultationDoctors,
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
        path: '/api/:apiVersion/public-service/patient-consultation/consultations/:doctorId/start',
        action: PublicServiceActions.StartConsultationPatient,
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
        path: '/api/:apiVersion/public-service/patient-consultation/consultations/:doctorId/cancel',
        action: PublicServiceActions.CancelConsultationPatient,
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
        path: '/api/:apiVersion/public-service/patient-consultation/:specializationId/in-line',
        action: PublicServiceActions.GetInLineForConsultation,
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
        path: '/api/:apiVersion/public-service/patient-consultation/out-line',
        action: PublicServiceActions.LeaveLineForConsultation,
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
        path: '/api/:apiVersion/public-service/partner/patient-consultation/start',
        action: PublicServiceActions.NotifyPatientConsultationStarted,
        auth: [{ sessionType: SessionType.Partner, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Patient Consultation'],
        },
    },

    // Bayractar
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/bayraktar',
        action: PublicServiceActions.GetBayractarInfo,
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
        path: '/api/:apiVersion/public-service/bayraktar/nickname',
        action: PublicServiceActions.SetBayractarNickname,
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
        path: '/api/:apiVersion/public-service/bayraktar/rating',
        action: PublicServiceActions.SetBayractarScore,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },

    // Drone Army
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/drone-army/rating',
        action: PublicServiceActions.SetDroneArmyScore,
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
        path: '/api/:apiVersion/public-service/internally-displaced-person/geolocation',
        action: PublicServiceActions.ApproveInternallyDisplacedPersonLocation,
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
        path: '/api/:apiVersion/public-service/internally-displaced-person/children',
        action: PublicServiceActions.SetInternallyDisplacedPersonChildren,
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
        method: HttpMethod.PATCH,
        path: '/api/:apiVersion/public-service/internally-displaced-person/members',
        action: PublicServiceActions.SetInternallyDisplacedPersonMembers,
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
        path: '/api/:apiVersion/public-service/internally-displaced-person/assistance-types',
        action: PublicServiceActions.GetInternallyDisplacedPersonAssistanceTypes,
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
        path: '/api/:apiVersion/public-service/internally-displaced-person/contacts',
        action: PublicServiceActions.GetInternallyDisplacedPersonContacts,
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
        path: '/api/:apiVersion/public-service/internally-displaced-person/aid-application',
        action: PublicServiceActions.GetInternallyDisplacedPersonAidApplication,
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
        path: '/api/:apiVersion/public-service/internally-displaced-person/application',
        action: PublicServiceActions.GetInternallyDisplacedPersonApplicationToConfirm,
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
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/internally-displaced-person/cancel',
        action: PublicServiceActions.CancelInternallyDisplacedPersonApplication,
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
        path: '/api/:apiVersion/public-service/internally-displaced-person/disability',
        action: PublicServiceActions.GetInternallyDisplacedPersonDisability,
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
        path: '/api/:apiVersion/public-service/internally-displaced-person/application/:applicationId/signing',
        action: PublicServiceActions.GetInternallyDisplacedPersonApplicationHashedFilesToSign,
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
        path: '/api/:apiVersion/public-service/internally-displaced-person/application/:applicationId/send',
        action: PublicServiceActions.SendInternallyDisplacedPersonApplication,
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
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/internally-displaced-person/share',
        action: PublicServiceActions.ShareInternallyDisplacedPersonApplication,
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
        path: '/api/:apiVersion/public-service/internally-displaced-person/application/verify',
        action: PublicServiceActions.VerifyInternallyDisplacedPersonApplication,
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
        path: '/api/:apiVersion/public-service/internally-displaced-person/application/confirm',
        action: PublicServiceActions.ConfirmInternallyDisplacedPersonApplication,
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
        path: '/api/:apiVersion/public-service/internally-displaced-person/members',
        action: PublicServiceActions.GetInternallyDisplacedPersonMembers,
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
        path: '/api/:apiVersion/public-service/internally-displaced-person/application/reject',
        action: PublicServiceActions.RejectInternallyDisplacedPersonApplication,
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
        path: '/api/:apiVersion/public-service/internally-displaced-person/supervisor/resend-application',
        action: PublicServiceActions.InternallyDisplacedPersonSupervisorResendApplication,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.idpSupervisor]: [PartnerIdpSupervisorScope.ResendApplication],
                },
            },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/internally-displaced-person/supervisor/check-application',
        action: PublicServiceActions.InternallyDisplacedPersonSupervisorCheckApplication,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.idpSupervisor]: [PartnerIdpSupervisorScope.CheckApplication],
                },
            },
        ],
    },

    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/cancel-internally-displaced-person/application',
        action: PublicServiceActions.GetInternallyDisplacedPersonCancelingApp,
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
        path: '/api/:apiVersion/public-service/cancel-internally-displaced-person/application/send',
        action: PublicServiceActions.SendInternallyDisplacedPersonCancelingApp,
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
        path: '/api/:apiVersion/public-service/edit-internally-displaced-person-address/geolocation',
        action: PublicServiceActions.ApproveInternallyDisplacedPersonEditAddressLocation,
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
        path: '/api/:apiVersion/public-service/edit-internally-displaced-person-address/application',
        action: PublicServiceActions.GetInternallyDisplacedPersonEditAddressApp,
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
        path: '/api/:apiVersion/public-service/edit-internally-displaced-person-address/send',
        action: PublicServiceActions.SendInternallyDisplacedPersonEditAddressApp,
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
        path: '/api/:apiVersion/public-service/edit-internally-displaced-person-address/cancel',
        action: PublicServiceActions.CancelInternallyDisplacedPersonEditAddressApp,
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
        path: '/api/:apiVersion/public-service/temporary-occupied-territory/replicate',
        action: PublicServiceActions.ReplicateTemporaryOccupiedTerritoryCollection,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.temporaryOccupiedTerritory]: [PartnerTemporaryOccupiedTerritoryScope.ReplicateFromExternal],
                },
            },
        ],
    },

    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/unemployment-status/applications',
        action: PublicServiceActions.GetUnemploymentStatusApplications,
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
        path: '/api/:apiVersion/public-service/unemployment-status/application/:id',
        action: PublicServiceActions.GetUnemploymentStatusApplicationInfo,
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
        path: '/api/:apiVersion/public-service/unemployment-status/application/:id/download',
        action: PublicServiceActions.DownloadUnemploymentStatusApplication,
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
        path: '/api/:apiVersion/public-service/unemployment-status/current-employment',
        action: PublicServiceActions.GetUnemploymentStatusCurrentEmployment,
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
        path: '/api/:apiVersion/public-service/unemployment-status/employment-center',
        action: PublicServiceActions.GetUnemploymentStatusEmploymentCenters,
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
        path: '/api/:apiVersion/public-service/unemployment-status/passport',
        action: PublicServiceActions.GetUnemploymentStatusPassportData,
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
        path: '/api/:apiVersion/public-service/unemployment-status/geolocation',
        action: PublicServiceActions.GetUnemploymentStatusGeolocation,
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
        path: '/api/:apiVersion/public-service/unemployment-status/geolocation',
        action: PublicServiceActions.ConfirmUnemploymentStatusGeolocation,
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
        path: '/api/:apiVersion/public-service/unemployment-status/application',
        action: PublicServiceActions.CreateUnemploymentStatusApplication,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
    {
        method: HttpMethod.PUT,
        path: '/api/:apiVersion/public-service/unemployment-status/application/:id',
        action: PublicServiceActions.UpdateUnemploymentStatusApplication,
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
        path: '/api/:apiVersion/public-service/unemployment-status/application/:id/confirmation',
        action: PublicServiceActions.GetUnemploymentStatusApplicationToConfirm,
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
        path: '/api/:apiVersion/public-service/unemployment-status/application/:id/send',
        action: PublicServiceActions.SendUnemploymentStatusApplication,
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
        path: '/api/:apiVersion/public-service/unemployment-status/application/:id/cancel',
        action: PublicServiceActions.CancelUnemploymentStatusApplication,
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
        path: '/api/:apiVersion/public-service/unemployment-status-canceling/applications',
        action: PublicServiceActions.GetUnemploymentStatusCancelingApplications,
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
        path: '/api/:apiVersion/public-service/unemployment-status-canceling/application/:id',
        action: PublicServiceActions.GetUnemploymentStatusCancelingApplicationInfo,
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
        path: '/api/:apiVersion/public-service/unemployment-status-canceling/application/:id/download',
        action: PublicServiceActions.DownloadUnemploymentStatusCancelingApplication,
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
        path: '/api/:apiVersion/public-service/unemployment-status-canceling/employment-center',
        action: PublicServiceActions.GetUnemploymentStatusCancelingEmploymentCenters,
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
        path: '/api/:apiVersion/public-service/unemployment-status-canceling/cancel-reason',
        action: PublicServiceActions.GetUnemploymentStatusCancelingReasons,
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
        path: '/api/:apiVersion/public-service/unemployment-status-canceling/passport',
        action: PublicServiceActions.GetUnemploymentStatusCancelingPassportData,
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
        path: '/api/:apiVersion/public-service/unemployment-status-canceling/application',
        action: PublicServiceActions.GetUnemploymentStatusCancelingApplicationToConfirm,
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
        path: '/api/:apiVersion/public-service/unemployment-status-canceling/application/send',
        action: PublicServiceActions.SendUnemploymentStatusCancelingApplication,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },

    // IT Forces
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/it-forces',
        action: PublicServiceActions.RegisterItForcesApplication,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },

    // ENot
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/e-not/verify',
        action: PublicServiceActions.VerifyENotLink,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['ENot'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/e-not/:requestId/request',
        action: PublicServiceActions.RequestENotApproval,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['ENot'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/e-not/:requestId',
        action: PublicServiceActions.GetENotRequestInfo,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['ENot'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/e-not/:requestId/signing',
        action: PublicServiceActions.GetENotHashedFilesToSign,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['ENot'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/e-not/:requestId/send',
        action: PublicServiceActions.SendENotSignedItems,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['ENot'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/e-not/:requestId/download',
        action: PublicServiceActions.DownloadENotDocument,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['ENot'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/e-not/:requestId/cancel',
        action: PublicServiceActions.CancelENotRequest,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['ENot'],
        },
    },

    // Homecoming identity card
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/homecoming-identity-card/location',
        action: PublicServiceActions.GetHomecomingIdentityCardLocations,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Homecoming Identity Card'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/homecoming-identity-card/geolocation',
        action: PublicServiceActions.ApproveHomecomingIdentityCardLocation,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Homecoming Identity Card'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/homecoming-identity-card/application',
        action: PublicServiceActions.GetHomecomingIdentityCardApplicationToConfirm,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Homecoming Identity Card'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/homecoming-identity-card/application/:applicationId/send',
        action: PublicServiceActions.SendHomecomingIdentityCardApplication,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Homecoming Identity Card'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/homecoming-identity-card/cancel',
        action: PublicServiceActions.CancelHomecomingIdentityCardApplication,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Homecoming Identity Card'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/homecoming-identity-card/download',
        action: PublicServiceActions.DownloadHomecomingIdentityCard,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Homecoming Identity Card'],
        },
    },

    // Military Bonds
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/military-bonds/orders',
        action: PublicServiceActions.GetMilitaryBondsOrders,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V2 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Military Bond'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/military-bonds/order/:orderId',
        action: PublicServiceActions.GetMilitaryBondsOrderDetails,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V2 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Military Bond'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/military-bonds/dictionary-name',
        action: PublicServiceActions.AddMilitaryBondDicName,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.maintenance]: [PartnerMaintenanceScope.Admin],
                },
            },
        ],
        metadata: {
            tags: ['Military Bond'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/military-bonds/order/:orderId/cancel',
        action: PublicServiceActions.CancelMilitaryBondOrder,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Military Bond'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/military-bonds/order/:orderId/confirmation',
        action: PublicServiceActions.ConfirmationMilitaryBondOrder,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V2 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Military Bond'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/military-bonds/order/:orderId/confirmation',
        action: PublicServiceActions.GetConfirmationMilitaryBondOrder,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Military Bond'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/military-bonds/order/:orderId/send',
        action: PublicServiceActions.SendMilitaryBondOrder,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Military Bond'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/military-bonds/order/:orderId/documents',
        action: PublicServiceActions.GetMilitaryBondsOrderDocuments,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V2 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Military Bond'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/military-bonds/order/:orderId/cart',
        action: PublicServiceActions.GetMilitaryBondsOrderCart,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V2 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Military Bond'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/military-bonds/order/:orderId/statement',
        action: PublicServiceActions.GetMilitaryBondsOrderStatement,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Military Bond'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/military-bonds/order/:orderId/promotion',
        action: PublicServiceActions.GetMilitaryBondsOrderPromotion,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Military Bond'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/military-bonds/available-bonds',
        action: PublicServiceActions.GetAvailableMilitaryBonds,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V2 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Military Bond'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/military-bonds/available-bonds/:isin/partners',
        action: PublicServiceActions.GetAvailableMilitaryBondPartners,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Military Bond'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/military-bonds/available-bonds/:isin/partners/:partnerId/cart',
        action: PublicServiceActions.GetAvailableMilitaryBondPartnerCart,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V2 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Military Bond'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/military-bonds/bank-accounts',
        action: PublicServiceActions.GetMilitaryBondBankAccounts,
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
            tags: ['Military Bond'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/military-bonds/banks',
        action: PublicServiceActions.GetMilitaryBondBanks,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Military Bond'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/military-bonds/order/:orderId/documents/signing',
        action: PublicServiceActions.GetMilitaryBondsHashedFilesToSign,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Military Bond'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/military-bonds/order/:orderId/documents/send',
        action: PublicServiceActions.SendMilitaryBondsSignedItems,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Military Bond'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/partner/bonds',
        action: PublicServiceActions.SetAvailableMilitaryBondsOffers,
        auth: [{ sessionType: SessionType.Partner, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Military Bond'],
        },
    },
    {
        method: HttpMethod.PATCH,
        path: '/api/:apiVersion/public-service/military-bonds/order/:orderId/bank-accounts',
        action: PublicServiceActions.SetMilitaryBondsOrderBankAccount,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Military Bond'],
        },
    },
    {
        method: HttpMethod.PATCH,
        path: '/api/:apiVersion/public-service/military-bonds/order/:orderId/address',
        action: PublicServiceActions.SetMilitaryBondsOrderAddress,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Military Bond'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/partner/bonds/documents/:requestId',
        action: PublicServiceActions.SendMilitaryBondsDocumentsForSigning,
        auth: [{ sessionType: SessionType.Partner, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Military Bond'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/partner/bonds/order/:requestId',
        action: PublicServiceActions.UpdateMilitaryBondsOrderStatus,
        auth: [{ sessionType: SessionType.Partner, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Military Bond'],
        },
    },
    // Rating
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/analytics/service-rating/public-service/military-bonds/rating-form',
        action: PublicServiceActions.GetMilitaryBondsUserInitiativeRatingForm,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: {
            tags: ['Rating'],
        },
    },

    // Vehicle Custmos Clearance
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/vehicle-customs-clearance/applications',
        action: PublicServiceActions.GetVehicleCustomsClearanceApplications,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Vehicle Custmos Clearance'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/vehicle-customs-clearance/application/:applicationId',
        action: PublicServiceActions.GetVehicleCustomsClearanceApplicationInfo,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Vehicle Custmos Clearance'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/vehicle-customs-clearance/application/:applicationId/download',
        action: PublicServiceActions.DownloadVehicleCustomsClearanceApplication,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Vehicle Custmos Clearance'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/vehicle-customs-clearance/purchase-information',
        action: PublicServiceActions.GetVehicleCustomsClearancePurchaseInformation,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Vehicle Custmos Clearance'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/vehicle-customs-clearance/carrier',
        action: PublicServiceActions.GetVehicleCustomsClearanceCarrier,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Vehicle Custmos Clearance'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/vehicle-customs-clearance/vin',
        action: PublicServiceActions.GetVehicleCustomsClearanceVin,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Vehicle Custmos Clearance'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/vehicle-customs-clearance/characteristics',
        action: PublicServiceActions.GetVehicleCustomsClearanceCharacteristics,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Vehicle Custmos Clearance'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/vehicle-customs-clearance/payment',
        action: PublicServiceActions.GetVehicleCustomsClearancePayment,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Vehicle Custmos Clearance'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/vehicle-customs-clearance/application',
        action: PublicServiceActions.GetVehicleCustomsClearanceApplicationToConfirm,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Vehicle Custmos Clearance'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/vehicle-customs-clearance/application/:applicationId/check',
        action: PublicServiceActions.CheckVehicleCustomsClearanceApplication,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Vehicle Custmos Clearance'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/vehicle-customs-clearance/application/:applicationId/declaration',
        action: PublicServiceActions.GetVehicleCustomsClearanceDeclarationInfo,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Vehicle Custmos Clearance'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/vehicle-customs-clearance/application/:applicationId/signing',
        action: PublicServiceActions.GetVehicleCustomsClearanceHashedFilesToSign,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Vehicle Custmos Clearance'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/vehicle-customs-clearance/application/:applicationId/send',
        action: PublicServiceActions.SendVehicleCustomsClearanceSignedItems,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Vehicle Custmos Clearance'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/vehicle-customs-clearance/application/:applicationId/cancel',
        action: PublicServiceActions.CancelVehicleCustomsClearanceApplication,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Vehicle Custmos Clearance'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/vehicle-customs-clearance/application/:applicationId/cancel/reasons',
        action: PublicServiceActions.GetVehicleCustomsClearanceCancelReasons,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Vehicle Custmos Clearance'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/vehicle-customs-clearance/application/:applicationId/cancel/signing',
        action: PublicServiceActions.GetVehicleCustomsClearanceCancelHashedFilesToSign,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Vehicle Custmos Clearance'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/vehicle-customs-clearance/application/:applicationId/cancel/send',
        action: PublicServiceActions.SendVehicleCustomsClearanceCancelSignedItems,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Vehicle Custmos Clearance'],
        },
    },

    // Customs Clearance Calculator
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/customs-clearance-calculator/characteristics',
        action: PublicServiceActions.GetCustomsClearanceCalculatorCharacteristics,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Customs Clearance Calculator'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/customs-clearance-calculator/payment',
        action: PublicServiceActions.GetCustomsClearanceCalculatorPayment,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Customs Clearance Calculator'],
        },
    },

    // Mortgage
    ...(isStandaloneMortgageEnabled
        ? []
        : [
              {
                  method: HttpMethod.GET,
                  path: '/api/:apiVersion/public-service/mortgage/categories',
                  action: PublicServiceActions.GetMortgageCategories,
                  auth: [
                      {
                          sessionType: SessionType.User,
                          version: ActionVersion.V1,
                      },
                  ],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.GET,
                  path: '/api/:apiVersion/public-service/mortgage/marital-status',
                  action: PublicServiceActions.GetMortgageMaritalStatus,
                  auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.POST,
                  path: '/api/:apiVersion/public-service/mortgage/package',
                  action: PublicServiceActions.CreateMortgagePackage,
                  auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.POST,
                  path: '/api/:apiVersion/public-service/mortgage/share',
                  action: PublicServiceActions.ShareMorgage,
                  auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.POST,
                  path: '/api/:apiVersion/public-service/mortgage/verify',
                  action: PublicServiceActions.VerifyMortgage,
                  auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.DELETE,
                  path: '/api/:apiVersion/public-service/mortgage/reject',
                  action: PublicServiceActions.RejectMortgage,
                  auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.GET,
                  path: '/api/:apiVersion/public-service/mortgage/children/number',
                  action: PublicServiceActions.GetMortgageChildrenNumber,
                  auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.PATCH,
                  path: '/api/:apiVersion/public-service/mortgage/children/number',
                  action: PublicServiceActions.SetMortgageChildrenNumber,
                  auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.PATCH,
                  path: '/api/:apiVersion/public-service/mortgage/children',
                  action: PublicServiceActions.SetMortgageChildren,
                  auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.POST,
                  path: '/api/:apiVersion/public-service/mortgage/real-estate',
                  action: PublicServiceActions.GetMortgageRealEstate,
                  auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.GET,
                  path: '/api/:apiVersion/public-service/mortgage/real-estate/manual',
                  action: PublicServiceActions.GetMortgageManualRealEstate,
                  auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.GET,
                  path: '/api/:apiVersion/public-service/mortgage/income',
                  action: PublicServiceActions.GetMortgageIncome,
                  auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.PATCH,
                  path: '/api/:apiVersion/public-service/mortgage/income',
                  action: PublicServiceActions.SetMortgageIncome,
                  auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.PATCH,
                  path: '/api/:apiVersion/public-service/mortgage/manual-residence-place',
                  action: PublicServiceActions.SetMortgageManualResidencePlace,
                  auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.PATCH,
                  path: '/api/:apiVersion/public-service/mortgage/contacts',
                  action: PublicServiceActions.SetMortgageContacts,
                  auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.GET,
                  path: '/api/:apiVersion/public-service/mortgage/apartment',
                  action: PublicServiceActions.GetMortgageApartment,
                  auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.PATCH,
                  path: '/api/:apiVersion/public-service/mortgage/apartment',
                  action: PublicServiceActions.SetMortgageApartment,
                  auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.GET,
                  path: '/api/:apiVersion/public-service/mortgage/banks',
                  action: PublicServiceActions.GetMortgageBanks,
                  auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.PATCH,
                  path: '/api/:apiVersion/public-service/mortgage/banks',
                  action: PublicServiceActions.SetMortgageBanks,
                  auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.POST,
                  path: '/api/:apiVersion/public-service/mortgage/application',
                  action: PublicServiceActions.GetMortgageApplicationToConfirm,
                  auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.POST,
                  path: '/api/:apiVersion/public-service/mortgage/package/applications/signing',
                  action: PublicServiceActions.GetMortgageHashedFilesToSign,
                  auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.POST,
                  path: '/api/:apiVersion/public-service/mortgage/package/applications/send',
                  action: PublicServiceActions.SendMortgageSignedItems,
                  auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.GET,
                  path: '/api/:apiVersion/public-service/mortgage/package/application/:applicationId',
                  action: PublicServiceActions.GetMortgagePackageApplication,
                  auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.DELETE,
                  path: '/api/:apiVersion/public-service/mortgage/package/application/:applicationId',
                  action: PublicServiceActions.CancelMortgagePackageApplication,
                  auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.DELETE,
                  path: '/api/:apiVersion/public-service/mortgage/package',
                  action: PublicServiceActions.CancelMortgagePackage,
                  auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.POST,
                  path: '/api/:apiVersion/public-service/mortgage/package/application/:applicationId/processing',
                  action: PublicServiceActions.ConfirmMortgageApplication,
                  auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.GET,
                  path: '/api/:apiVersion/public-service/mortgage/package/document/:loadActionType/download',
                  action: PublicServiceActions.DownloadMortgageDocument,
                  auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.GET,
                  path: '/api/:apiVersion/public-service/mortgage/package/application/:applicationId/document/:loadActionType/download',
                  action: PublicServiceActions.DownloadMortgageApplicationDocument,
                  auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
                  headers: [
                      { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
                      { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.POST,
                  path: '/api/:apiVersion/public-service/partner/mortgage/application/refuse',
                  action: PublicServiceActions.PartnerRefuseMortgage,
                  auth: [
                      {
                          sessionType: SessionType.Partner,
                          version: ActionVersion.V1,
                          scopes: {
                              [PartnerScopeType.mortgage]: [PartnerMortgageScope.All],
                          },
                      },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.POST,
                  path: '/api/:apiVersion/public-service/partner/mortgage/application/proposal',
                  action: PublicServiceActions.PartnerProposeMortgage,
                  auth: [
                      {
                          sessionType: SessionType.Partner,
                          version: ActionVersion.V1,
                          scopes: {
                              [PartnerScopeType.mortgage]: [PartnerMortgageScope.All],
                          },
                      },
                      {
                          sessionType: SessionType.Partner,
                          version: ActionVersion.V2,
                          scopes: {
                              [PartnerScopeType.mortgage]: [PartnerMortgageScope.All],
                          },
                      },
                      {
                          sessionType: SessionType.Partner,
                          version: ActionVersion.V3,
                          scopes: {
                              [PartnerScopeType.mortgage]: [PartnerMortgageScope.All],
                          },
                      },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
              {
                  method: HttpMethod.POST,
                  path: '/api/:apiVersion/public-service/partner/mortgage/issue',
                  action: PublicServiceActions.PartnerIssueMortgage,
                  auth: [
                      {
                          sessionType: SessionType.Partner,
                          version: ActionVersion.V1,
                          scopes: {
                              [PartnerScopeType.mortgage]: [PartnerMortgageScope.All],
                          },
                      },
                  ],
                  metadata: {
                      tags: ['Mortgage'],
                  },
              },
          ]),

    // Led Exchange
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/led-exchange/delivery',
        action: PublicServiceActions.GetLedExchangeDelivery,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Led Exchange'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/led-exchange/led-selection',
        action: PublicServiceActions.GetLedExchangeSelection,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Led Exchange'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/led-exchange/send',
        action: PublicServiceActions.SendLedExchangeOrder,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Led Exchange'],
        },
    },

    // Award
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/award/:awardType/delivery',
        action: PublicServiceActions.GetAwardDelivery,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Award'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/award/order',
        action: PublicServiceActions.OrderAward,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Award'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/award/upload-receivers',
        action: PublicServiceActions.UploadAwardReceivers,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.award]: [PartnerAwardScope.UploadReceivers],
                },
            },
        ],
        metadata: {
            tags: ['Award'],
        },
    },
    {
        method: HttpMethod.DELETE,
        path: '/api/:apiVersion/public-service/award/revoke',
        action: PublicServiceActions.RevokeAward,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.award]: [PartnerAwardScope.Revoke],
                },
            },
        ],
        metadata: {
            tags: ['Award'],
        },
    },
    {
        method: HttpMethod.PUT,
        path: '/api/:apiVersion/public-service/award/delivery-status',
        action: PublicServiceActions.UpdateAwardDeliveryStatus,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.award]: [PartnerAwardScope.UpdateDeliveryStatus],
                },
            },
        ],
        metadata: {
            tags: ['Award'],
        },
    },

    // NACP Declarant Relatives
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/nacp-declarant-relatives/:requestId/confirm',
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        proxyTo: { serviceId },
        metadata: {
            tags: ['NACP Declarant Relatives'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/nacp-declarant-relatives/:requestId/refuse',
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        proxyTo: { serviceId },
        metadata: {
            tags: ['NACP Declarant Relatives'],
        },
    },

    // Mia
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/mia/operation/callback',
        action: PublicServiceActions.HandleMiaOperationCallback,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.mia]: [PartnerMiaScope.OperationCallback],
                },
            },
        ],
        metadata: {
            tags: ['Mia'],
        },
    },
]

export default routes
