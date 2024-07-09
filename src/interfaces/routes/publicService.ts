export enum PartnerScopeType {
    driverLicenseReplacement = 'driverLicenseReplacement',
    properUser = 'properUser',
    militaryDonation = 'militaryDonation',
    idpSupervisor = 'idpSupervisor',
    temporaryOccupiedTerritory = 'temporaryOccupiedTerritory',
    maintenance = 'maintenance',
    mortgage = 'mortgage',
    award = 'award',
    mia = 'mia',
}

export enum PartnerDriverLicenseReplacementScope {
    StatusCallback = 'statusCallback',
    DeliveryCallback = 'deliveryCallback',
    Support = 'support',
}

export enum PartnerMilitaryDonationScope {
    UpdateFundReport = 'update-fund-report',
}

export enum PartnerIdpSupervisorScope {
    ResendApplication = 'resend-application',
    CheckApplication = 'check-application',
}

export enum PartnerProperUserScope {
    ApplicationStatusCallback = 'applicationStatusCallback',
}

export enum PartnerTemporaryOccupiedTerritoryScope {
    ReplicateFromExternal = 'replicate-from-external',
}

export enum PartnerMortgageScope {
    All = 'all',
}

export enum PartnerAwardScope {
    UploadReceivers = 'upload-receivers',
    Revoke = 'revoke',
    UpdateDeliveryStatus = 'update-delivery-status',
}

export enum PartnerMiaScope {
    OperationCallback = 'operation-callback',
    ResultPushCallback = 'result-push-callback',
}
