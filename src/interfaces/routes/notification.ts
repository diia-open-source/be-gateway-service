export enum PartnerScopeType {
    notifications = 'notifications',
    maintenance = 'maintenance',
}

export enum PartnerNotificationsScope {
    CreateTemplate = 'createTemplate',
    CreateDistribution = 'createDistribution',
    DistributionStatus = 'distributionStatus',
    DistributionResults = 'distributionResults',
    DeleteDistribution = 'deleteDistribution',
    StartNotificationsByAppVersions = 'startNotificationsByAppVersions',
    PushTopic = 'pushTopic',
    PushCampaign = 'pushCampaign',
}

export enum PartnerMaintenanceScope {
    Admin = 'admin',
}
