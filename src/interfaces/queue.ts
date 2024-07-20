export enum InternalQueueName {
    QueueGateway = 'QueueGateway',
}

export enum ScheduledTaskQueueName {
    ScheduledTasksQueueGateway = 'ScheduledTasksQueueGateway',
}

export enum ScheduledTaskEvent {}

export enum InternalEvent {
    GatewayUserActivity = 'gateway-user-activity',
}

export enum ExternalEvent {
    NotificationTemplateCreate = 'notification.template.create',
    NotificationDistributionCreate = 'notification.distribution.create',
    NotificationDistributionStatus = 'notification.distribution.status',
    NotificationDistributionStatusRecipients = 'notification.distribution.status-recipients',
    NotificationDistributionCancel = 'notification.distribution.cancel',
    OfficePollCreateAndPublish = 'vote.diia-office.poll.createAndPublish',
    OfficePollGet = 'vote.diia-office.poll.get',
    OfficePollOnboarding = 'vote.diia-office.poll.onboarding',
    OfficePollDelete = 'vote.diia-office.poll.delete',
    OfficePollCount = 'vote.diia-office.poll.count',
    AcquirerDocumentRequest = 'acquirer.document-request',
    AcquirerDocumentResponse = 'acquirer.document-response',
}

export enum InternalTopic {
    TopicGatewayUserActivity = 'TopicGatewayUserActivity',
    TopicScheduledTasks = 'TopicScheduledTasks',
}

export enum ExternalTopic {
    NotificationDistribution = 'NotificationDistribution',
    OfficePoll = 'OfficePoll',
    AcquirerSharing = 'AcquirerSharing',
}
