import { Env } from '@diia-inhouse/env'
import { ActionVersion, HttpMethod, SessionType } from '@diia-inhouse/types'

import { DEFAULT_USER_AUTH, DEFAULT_USER_HEADERS } from './defaults'

import { RouteHeaderRawName } from '@interfaces/index'
import { ExternalEvent } from '@interfaces/queue'
import { AppRoute } from '@interfaces/routes/appRoute'
import { PartnerMaintenanceScope, PartnerNotificationsScope, PartnerScopeType } from '@interfaces/routes/notification'

export enum NotificationActions {
    CreateMessages = 'createMessages',
    UpdateMessages = 'updateMessages',

    AddUnidentifiedUserPushToken = 'addUnidentifiedUserPushToken',
    EResidentAddUnidentifiedUserPushToken = 'eResidentAddUnidentifiedUserPushToken',
    CreateEResidentDistribution = 'createEResidentDistribution',
    AddUserPushToken = 'addUserPushToken',
    GetNotifications = 'getNotifications',
    GetNotificationById = 'getNotificationById',
    ReadNotifications = 'readNotifications',
    DeleteNotifications = 'deleteNotifications',
    GetMessageById = 'getMessageById',
    GetUserNotificationByMessageId = 'getUserNotificationByMessageId',
    CreateMessageTemplate = 'createMessageTemplate',
    CreateDistribution = 'createDistribution',
    GetDistributionStatus = 'getDistributionStatus',
    GetDistributionStatusRecipients = 'getDistributionStatusRecipients',
    DeleteDistribution = 'deleteDistribution',
    StartNotificationsByAppVersions = 'startNotificationsByAppVersions',
    UpdateAppVersion = 'updateAppVersion',

    SubscribeToTopicByAppVersions = 'subscribeToTopicByAppVersions',
    UnsubscribeFromTopic = 'unsubscribeFromTopic',
    SendTopicMessage = 'sendTopicMessage',

    GetPushNotificationCampaigns = 'getPushNotificationCampaigns',
    GetPushNotificationCampaign = 'getPushNotificationCampaign',
    CreatePushNotificationCampaign = 'createPushNotificationCampaign',
    DeletePushNotificationCampaign = 'deletePushNotificationCampaign',
    SendPushNotificationCampaignMessage = 'sendPushNotificationCampaignMessage',
    StopPushNotificationCampaign = 'stopPushNotificationCampaign',
    ResumePushNotificationCampaign = 'resumePushNotificationCampaign',

    SendTestEmail = 'sendTestEmail',
}

const routes: AppRoute[] = [
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/notification/messages',
        action: NotificationActions.CreateMessages,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.maintenance]: [PartnerMaintenanceScope.Admin],
                },
            },
        ],
        headers: [{ name: RouteHeaderRawName.APP_PARTNER_ID, versions: [ActionVersion.V1] }],
    },
    {
        method: HttpMethod.PUT,
        path: '/api/:apiVersion/notification/messages',
        action: NotificationActions.UpdateMessages,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.maintenance]: [PartnerMaintenanceScope.Admin],
                },
            },
        ],
        headers: [{ name: RouteHeaderRawName.APP_PARTNER_ID, versions: [ActionVersion.V1] }],
    },

    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/notification/push-token',
        action: NotificationActions.AddUnidentifiedUserPushToken,
        auth: [{ sessionTypes: [SessionType.None, SessionType.User], version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Push Token'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/notification/user-push-token',
        action: NotificationActions.AddUserPushToken,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Push Token'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/notification/notifications',
        action: NotificationActions.GetNotifications,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V3 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V3] },
        ],
        metadata: {
            tags: ['Notification'],
        },
    },
    {
        method: HttpMethod.PUT,
        path: '/api/:apiVersion/notification/notifications/read',
        action: NotificationActions.ReadNotifications,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V2 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Notification'],
        },
    },
    {
        method: HttpMethod.PUT,
        path: '/api/:apiVersion/notification/notifications/delete',
        action: NotificationActions.DeleteNotifications,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V2 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
        ],
        metadata: {
            tags: ['Notification'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/notification/notification/:notificationId',
        action: NotificationActions.GetNotificationById,
        auth: [
            { sessionType: SessionType.User, version: ActionVersion.V3 },
            { sessionType: SessionType.User, version: ActionVersion.V4 },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V3, ActionVersion.V4] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V3, ActionVersion.V4] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V3, ActionVersion.V4] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V3, ActionVersion.V4] },
        ],
        metadata: {
            tags: ['Notification'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/notification/message/:messageId',
        action: NotificationActions.GetMessageById,
        auth: [
            { sessionType: SessionType.None, version: ActionVersion.V3 },
            { sessionType: SessionType.None, version: ActionVersion.V4 },
        ],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V3, ActionVersion.V4] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V3, ActionVersion.V4] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V3, ActionVersion.V4] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V3, ActionVersion.V4] },
        ],
        metadata: {
            tags: ['Notification'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/notification/notification/message/:messageId',
        action: NotificationActions.GetUserNotificationByMessageId,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: {
            tags: ['Notification'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/notification/template',
        action: NotificationActions.CreateMessageTemplate,
        externalEvent: ExternalEvent.NotificationTemplateCreate,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.notifications]: [PartnerNotificationsScope.CreateTemplate],
                },
            },
        ],
        headers: [{ name: RouteHeaderRawName.APP_PARTNER_ID, versions: [ActionVersion.V1] }],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/notification/distribution/push',
        action: NotificationActions.CreateDistribution,
        externalEvent: ExternalEvent.NotificationDistributionCreate,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.notifications]: [PartnerNotificationsScope.CreateDistribution],
                },
            },
        ],
        headers: [{ name: RouteHeaderRawName.APP_PARTNER_ID, versions: [ActionVersion.V1] }],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/notification/distribution/:distributionId/status',
        action: NotificationActions.GetDistributionStatus,
        externalEvent: ExternalEvent.NotificationDistributionStatus,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.notifications]: [PartnerNotificationsScope.DistributionStatus],
                },
            },
        ],
        headers: [{ name: RouteHeaderRawName.APP_PARTNER_ID, versions: [ActionVersion.V1] }],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/notification/distribution/push/:distributionId/status',
        action: NotificationActions.GetDistributionStatusRecipients,
        externalEvent: ExternalEvent.NotificationDistributionStatusRecipients,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.notifications]: [PartnerNotificationsScope.DistributionResults],
                },
            },
        ],
        headers: [{ name: RouteHeaderRawName.APP_PARTNER_ID, versions: [ActionVersion.V1] }],
    },
    {
        method: HttpMethod.DELETE,
        path: '/api/:apiVersion/notification/distribution/push/:distributionId',
        action: NotificationActions.DeleteDistribution,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.notifications]: [PartnerNotificationsScope.DeleteDistribution],
                },
            },
        ],
        headers: [{ name: RouteHeaderRawName.APP_PARTNER_ID, versions: [ActionVersion.V1] }],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/notification/start/app-versions',
        action: NotificationActions.StartNotificationsByAppVersions,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.notifications]: [PartnerNotificationsScope.StartNotificationsByAppVersions],
                },
            },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/notification/app-version',
        action: NotificationActions.UpdateAppVersion,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Push Token'],
        },
    },

    // EResident
    {
        method: HttpMethod.POST,
        path: '/e-resident/api/:apiVersion/notification/push-token',
        action: NotificationActions.EResidentAddUnidentifiedUserPushToken,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Push Token'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/e-resident/api/:apiVersion/notification/user-push-token',
        action: NotificationActions.AddUserPushToken,
        auth: [{ sessionTypes: [SessionType.EResident, SessionType.EResidentApplicant], version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Push Token'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/notification/notifications',
        action: NotificationActions.GetNotifications,
        auth: [{ sessionTypes: [SessionType.EResident, SessionType.EResidentApplicant], version: ActionVersion.V3 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V3] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V3] },
        ],
    },
    {
        method: HttpMethod.PUT,
        path: '/e-resident/api/:apiVersion/notification/notifications/read',
        action: NotificationActions.ReadNotifications,
        auth: [{ sessionTypes: [SessionType.EResident, SessionType.EResidentApplicant], version: ActionVersion.V2 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V2] },
        ],
    },
    {
        method: HttpMethod.PUT,
        path: '/e-resident/api/:apiVersion/notification/notifications/delete',
        action: NotificationActions.DeleteNotifications,
        auth: [{ sessionTypes: [SessionType.EResident, SessionType.EResidentApplicant], version: ActionVersion.V2 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V2] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/notification/notification/:notificationId',
        action: NotificationActions.GetNotificationById,
        auth: [{ sessionTypes: [SessionType.EResident, SessionType.EResidentApplicant], version: ActionVersion.V3 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2, ActionVersion.V3] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2, ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2, ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2, ActionVersion.V3] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V2, ActionVersion.V3] },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/notification/message/:messageId',
        action: NotificationActions.GetMessageById,
        auth: [{ sessionTypes: [SessionType.EResident, SessionType.EResidentApplicant], version: ActionVersion.V3 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V2, ActionVersion.V3] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V2, ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V2, ActionVersion.V3] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V2, ActionVersion.V3] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V2, ActionVersion.V3] },
        ],
        metadata: {
            tags: ['Notification'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/e-resident/api/:apiVersion/notification/notification/message/:messageId',
        action: NotificationActions.GetUserNotificationByMessageId,
        auth: [{ sessionTypes: [SessionType.EResident, SessionType.EResidentApplicant], version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Notification'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/e-resident/api/:apiVersion/notification/distribution/push',
        action: NotificationActions.CreateEResidentDistribution,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.notifications]: [PartnerNotificationsScope.CreateDistribution],
                },
            },
        ],
        headers: [{ name: RouteHeaderRawName.APP_PARTNER_ID, versions: [ActionVersion.V1] }],
    },

    // Old Notifications API V1
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/notifications',
        action: NotificationActions.GetNotifications,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Old Notifications API'],
        },
    },
    {
        method: HttpMethod.PUT,
        path: '/api/:apiVersion/notifications/read',
        action: NotificationActions.ReadNotifications,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Old Notifications API'],
        },
    },
    {
        method: HttpMethod.PUT,
        path: '/api/:apiVersion/notifications/delete',
        action: NotificationActions.DeleteNotifications,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['Old Notifications API'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/notifications/notification/:notificationId',
        action: NotificationActions.GetNotificationById,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },

    // Topics
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/notification/topic/app-versions',
        action: NotificationActions.SubscribeToTopicByAppVersions,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.notifications]: [PartnerNotificationsScope.PushTopic],
                },
            },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/notification/topic/unsubscribe',
        action: NotificationActions.UnsubscribeFromTopic,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.notifications]: [PartnerNotificationsScope.PushTopic],
                },
            },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/notification/topic/send',
        action: NotificationActions.SendTopicMessage,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.notifications]: [PartnerNotificationsScope.PushTopic],
                },
            },
        ],
    },

    // Campaigns
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/notification/campaigns',
        action: NotificationActions.GetPushNotificationCampaigns,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.notifications]: [PartnerNotificationsScope.PushCampaign],
                },
            },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/notification/campaign/:campaignId',
        action: NotificationActions.GetPushNotificationCampaign,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.notifications]: [PartnerNotificationsScope.PushCampaign],
                },
            },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/notification/campaign',
        action: NotificationActions.CreatePushNotificationCampaign,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.notifications]: [PartnerNotificationsScope.PushCampaign],
                },
            },
        ],
    },
    {
        method: HttpMethod.DELETE,
        path: '/api/:apiVersion/notification/campaign/:campaignId',
        action: NotificationActions.DeletePushNotificationCampaign,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.notifications]: [PartnerNotificationsScope.PushCampaign],
                },
            },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/notification/campaign/:campaignId/send',
        action: NotificationActions.SendPushNotificationCampaignMessage,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.notifications]: [PartnerNotificationsScope.PushCampaign],
                },
            },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/notification/campaign/:campaignId/stop',
        action: NotificationActions.StopPushNotificationCampaign,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.notifications]: [PartnerNotificationsScope.PushCampaign],
                },
            },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/notification/campaign/:campaignId/resume',
        action: NotificationActions.ResumePushNotificationCampaign,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.notifications]: [PartnerNotificationsScope.PushCampaign],
                },
            },
        ],
    },

    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/notification/email/test',
        action: NotificationActions.SendTestEmail,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        forbiddenEnvs: [Env.Prod],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },
]

export default routes
