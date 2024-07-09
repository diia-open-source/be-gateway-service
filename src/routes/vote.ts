import {
    ActionVersion,
    HttpMethod,
    PortalUserPetitionPermissions,
    PortalUserPollPermissions,
    ProfileFeature,
    SessionType,
} from '@diia-inhouse/types'

import { DEFAULT_USER_AUTH, DEFAULT_USER_HEADERS } from '@src/routes/defaults'

import { RouteHeaderRawName } from '@interfaces/index'
import { ProfileFeatureExpression } from '@interfaces/profileFeature'
import { ExternalEvent } from '@interfaces/queue'
import { AppRoute } from '@interfaces/routes/appRoute'

enum VoteActions {
    GetCatalog = 'getCatalog',
    GetCommunityContacts = 'getCommunityContacts',
    JoinCommunity = 'joinCommunity',
    GetCommunityPetitions = 'getCommunityPetitions',
    GetAllCommunityPetitions = 'getAllCommunityPetitions',
    SearchPetitions = 'searchPetitions',
    GetOwnPetitions = 'getOwnPetitions',
    GetOwnSubmittedPetitions = 'getOwnSubmittedPetitions',
    GetOwnSignedPetitions = 'getOwnSignedPetitions',
    GetPetitionInfo = 'getPetitionInfo',
    GetPetitionAnswer = 'getPetitionAnswer',
    SignPetition = 'signPetition',
    GetPetitionFollowers = 'getPetitionFollowers',
    GetCategories = 'getCategories',
    GetCategoryImages = 'getCategoryImages',
    GetSimilarPetitions = 'getSimilarPetitions',
    GetAllSimilarPetitions = 'getAllSimilarPetitions',
    CreatePetition = 'createPetition',

    PortalJoinCommunity = 'portalJoinCommunity',
    PortalSearchPetitions = 'portalSearchPetitions',
    GetPortalPetitionInfo = 'getPortalPetitionInfo',
    GetPortalPetitionAnswer = 'getPortalPetitionAnswer',
    GetPortalPetitionFollowers = 'getPortalPetitionFollowers',
    PortalSignPetition = 'portalSignPetition',
    GetPortalCategories = 'getPortalCategories',
    GetPortalCategoryImages = 'getPortalCategoryImages',
    PortalCreatePetition = 'portalCreatePetition',

    GetModeratorPetitions = 'getModeratorPetitions',
    BackOfficeSearchPetitions = 'backOfficeSearchPetitions',
    BackOfficeDownloadPetitions = 'backOfficeDownloadPetitions',
    GetBackOfficePetitionInfo = 'getBackOfficePetitionInfo',
    BackOfficeUpdatePetition = 'backOfficeUpdatePetition',
    GetCommunityStatistics = 'getCommunityStatistics',
    BackOfficeGetCommunities = 'backOfficeGetCommunities',
    BackOfficeGetCommunityInfo = 'backOfficeGetCommunityInfo',
    BackOfficeCreateCommunity = 'backOfficeCreateCommunity',
    BackOfficeUpdateCommunity = 'backOfficeUpdateCommunity',

    BackOfficeGetPetitionUsers = 'backOfficeGetPetitionUsers',
    BackOfficeGetPetitionsForUser = 'backOfficeGetUserPetitions',

    GetBackOfficePolls = 'getBackOfficePolls',
    GetBackOfficePoll = 'getBackOfficePoll',
    CreatePoll = 'createPoll',
    UpdatePoll = 'updatePoll',
    DeletePoll = 'deletePoll',
    PublishPoll = 'publishPoll',
    GetPollHistory = 'getPollHistory',
    ForceClosePoll = 'forceClosePoll',
    LaunchPoll = 'launchPoll',
    GetPollResults = 'getPollResults',
    AddUserToPoll = 'addUserToPoll',

    GetPolls = 'getPolls',
    GetArchivedPolls = 'getArchivedPolls',
    GetPoll = 'getPoll',
    SubmitPoll = 'submitPoll',
    RevokePoll = 'revokePoll',
}

const routes: AppRoute[] = [
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/vote/catalog',
        action: VoteActions.GetCatalog,
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
        path: '/api/:apiVersion/vote/community/contacts',
        action: VoteActions.GetCommunityContacts,
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
        path: '/api/:apiVersion/vote/community',
        action: VoteActions.JoinCommunity,
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
        path: '/api/:apiVersion/vote/petitions/community',
        action: VoteActions.GetCommunityPetitions,
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
        path: '/api/:apiVersion/vote/petitions/community/:target',
        action: VoteActions.GetAllCommunityPetitions,
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
        path: '/api/:apiVersion/vote/petitions/search',
        action: VoteActions.SearchPetitions,
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
        path: '/api/:apiVersion/vote/petitions/own',
        action: VoteActions.GetOwnPetitions,
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
        path: '/api/:apiVersion/vote/petitions/own/submitted',
        action: VoteActions.GetOwnSubmittedPetitions,
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
        path: '/api/:apiVersion/vote/petitions/own/signed',
        action: VoteActions.GetOwnSignedPetitions,
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
        path: '/api/:apiVersion/vote/petition/:id',
        action: VoteActions.GetPetitionInfo,
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
        path: '/api/:apiVersion/vote/petition/:id/answer',
        action: VoteActions.GetPetitionAnswer,
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
        path: '/api/:apiVersion/vote/petition/:id/sign',
        action: VoteActions.SignPetition,
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
        path: '/api/:apiVersion/vote/petition/:id/followers',
        action: VoteActions.GetPetitionFollowers,
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
        path: '/api/:apiVersion/vote/categories',
        action: VoteActions.GetCategories,
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
        path: '/api/:apiVersion/vote/petitions/similar',
        action: VoteActions.GetSimilarPetitions,
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
        path: '/api/:apiVersion/vote/petitions/similar/all',
        action: VoteActions.GetAllSimilarPetitions,
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
        path: '/api/:apiVersion/vote/petition',
        action: VoteActions.CreatePetition,
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
        path: '/api/:apiVersion/vote/petition/images',
        action: VoteActions.GetCategoryImages,
        auth: [{ sessionType: SessionType.User, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
    },

    // Portal
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/vote/portal/community',
        action: VoteActions.PortalJoinCommunity,
        auth: [{ sessionType: SessionType.PortalUser, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Community (Portal)'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/vote/portal/petitions/search',
        action: VoteActions.PortalSearchPetitions,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        headers: [{ name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] }],
        metadata: {
            tags: ['Petition (Portal)'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/vote/portal/petition/:id',
        action: VoteActions.GetPortalPetitionInfo,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        headers: [{ name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] }],
        metadata: {
            tags: ['Petition (Portal)'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/vote/portal/petition/:id/answer',
        action: VoteActions.GetPortalPetitionAnswer,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Petition (Portal)'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/vote/portal/petition/:id/followers',
        action: VoteActions.GetPortalPetitionFollowers,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Petition (Portal)'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/vote/portal/petition/:id/sign',
        action: VoteActions.PortalSignPetition,
        auth: [{ sessionType: SessionType.PortalUser, version: ActionVersion.V1 }],
        metadata: {
            tags: ['Petition (Portal)'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/vote/portal/categories',
        action: VoteActions.GetPortalCategories,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/vote/portal/petition/images',
        action: VoteActions.GetPortalCategoryImages,
        auth: [{ sessionType: SessionType.PortalUser, version: ActionVersion.V1 }],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/vote/portal/petition',
        action: VoteActions.PortalCreatePetition,
        auth: [{ sessionType: SessionType.PortalUser, version: ActionVersion.V1 }],
    },

    // Backstage Office
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/vote/back-office/petitions/moderator',
        action: VoteActions.GetModeratorPetitions,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    petition: [PortalUserPetitionPermissions.moderator, PortalUserPetitionPermissions.proModerator],
                },
            },
        ],
        metadata: {
            tags: ['Petition Back Office'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/vote/back-office/petitions/moderator/:id',
        action: VoteActions.GetModeratorPetitions,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    petition: [PortalUserPetitionPermissions.moderator, PortalUserPetitionPermissions.proModerator],
                },
            },
        ],
        metadata: {
            tags: ['Petition Back Office'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/vote/back-office/petitions/search',
        action: VoteActions.BackOfficeSearchPetitions,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    petition: [PortalUserPetitionPermissions.moderator, PortalUserPetitionPermissions.proModerator],
                },
            },
        ],
        metadata: {
            tags: ['Petition Back Office'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/vote/back-office/petitions/download/csv',
        action: VoteActions.BackOfficeDownloadPetitions,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    petition: [PortalUserPetitionPermissions.moderator, PortalUserPetitionPermissions.proModerator],
                },
            },
        ],
        metadata: {
            tags: ['Petition Back Office'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/vote/back-office/petition',
        action: VoteActions.GetBackOfficePetitionInfo,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    petition: [PortalUserPetitionPermissions.moderator, PortalUserPetitionPermissions.proModerator],
                },
            },
        ],
        metadata: {
            tags: ['Petition Back Office'],
        },
    },
    {
        method: HttpMethod.PUT,
        path: '/api/:apiVersion/vote/back-office/petition/:id',
        action: VoteActions.BackOfficeUpdatePetition,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    petition: [PortalUserPetitionPermissions.moderator, PortalUserPetitionPermissions.proModerator],
                },
            },
        ],
        metadata: {
            tags: ['Petition Back Office'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/vote/back-office/communities',
        action: VoteActions.BackOfficeGetCommunities,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    petition: [PortalUserPetitionPermissions.administrator],
                },
            },
        ],
        metadata: {
            tags: ['Community Back Office'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/vote/back-office/community',
        action: VoteActions.BackOfficeCreateCommunity,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    petition: [PortalUserPetitionPermissions.administrator],
                },
            },
        ],
        metadata: {
            tags: ['Community Back Office'],
        },
    },
    {
        method: HttpMethod.PUT,
        path: '/api/:apiVersion/vote/back-office/community/:id',
        action: VoteActions.BackOfficeUpdateCommunity,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    petition: [PortalUserPetitionPermissions.administrator],
                },
            },
        ],
        metadata: {
            tags: ['Community Back Office'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/vote/back-office/community/:id',
        action: VoteActions.BackOfficeGetCommunityInfo,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    petition: [PortalUserPetitionPermissions.administrator],
                },
            },
        ],
        metadata: {
            tags: ['Community Back Office'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/vote/back-office/community/statistics',
        action: VoteActions.GetCommunityStatistics,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    petition: [PortalUserPetitionPermissions.moderator, PortalUserPetitionPermissions.proModerator],
                },
            },
        ],
        metadata: {
            tags: ['Community Back Office'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/vote/back-office/users',
        action: VoteActions.BackOfficeGetPetitionUsers,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    petition: [PortalUserPetitionPermissions.administrator],
                },
            },
        ],
        metadata: {
            tags: ['Users Back Office'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/vote/back-office/users/:id/petitions',
        action: VoteActions.BackOfficeGetPetitionsForUser,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    petition: [PortalUserPetitionPermissions.administrator],
                },
            },
        ],
        metadata: {
            tags: ['Users Back Office'],
        },
    },

    // Polls
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/vote/polls',
        proxyTo: {
            serviceId: 'covope',
        },
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
            tags: ['Polls'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/vote/polls/archive',
        proxyTo: {
            serviceId: 'covope',
        },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: {
            tags: ['Polls'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/vote/poll/:pollId',
        proxyTo: {
            serviceId: 'covope',
        },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: {
            tags: ['Polls'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/vote/poll/submit',
        proxyTo: {
            serviceId: 'covope',
        },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: {
            tags: ['Polls'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/vote/poll/revoke',
        action: VoteActions.RevokePoll,
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
        path: '/api/:apiVersion/vote/questionnaire/:questionnaireId',
        proxyTo: {
            serviceId: 'covope',
        },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: {
            tags: ['Polls'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/vote/questionnaire/:questionnaireId/confirm',
        proxyTo: {
            serviceId: 'covope',
        },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: {
            tags: ['Polls'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/vote/questionnaire/:questionnaireId/send',
        proxyTo: {
            serviceId: 'covope',
        },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: {
            tags: ['Polls'],
        },
    },
    // Poll BackOffice
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/vote/back-office/polls',
        action: VoteActions.GetBackOfficePolls,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    poll: [PortalUserPollPermissions.masterAdministrator],
                },
            },
        ],
        metadata: {
            tags: ['Poll Back Office'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/vote/back-office/poll/:id',
        action: VoteActions.GetBackOfficePoll,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    poll: [PortalUserPollPermissions.masterAdministrator],
                },
            },
        ],
        metadata: {
            tags: ['Poll Back Office'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/vote/back-office/poll',
        action: VoteActions.CreatePoll,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    poll: [PortalUserPollPermissions.masterAdministrator],
                },
            },
        ],
        metadata: {
            tags: ['Poll Back Office'],
        },
    },
    {
        method: HttpMethod.PUT,
        path: '/api/:apiVersion/vote/back-office/poll/:id',
        action: VoteActions.UpdatePoll,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    poll: [PortalUserPollPermissions.masterAdministrator],
                },
            },
        ],
        metadata: {
            tags: ['Poll Back Office'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/vote/questionnaire/upload-questionnaire',
        proxyTo: {
            serviceId: 'covope',
        },
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    poll: [PortalUserPollPermissions.masterAdministrator],
                },
            },
        ],
        metadata: {
            tags: ['Poll Back Office'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/vote/questionnaire/:questionnaireId/report',
        proxyTo: {
            serviceId: 'covope',
        },
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    poll: [PortalUserPollPermissions.masterAdministrator],
                },
            },
        ],
        metadata: {
            tags: ['Poll Back Office'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/v1/vote/questionnaire/remind',
        proxyTo: {
            serviceId: 'covope',
        },
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    poll: [PortalUserPollPermissions.masterAdministrator],
                },
            },
        ],
        metadata: {
            tags: ['Poll Back Office'],
        },
    },
    {
        method: HttpMethod.DELETE,
        path: '/api/:apiVersion/vote/back-office/poll/:id',
        action: VoteActions.DeletePoll,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    poll: [PortalUserPollPermissions.masterAdministrator],
                },
            },
        ],
        metadata: {
            tags: ['Poll Back Office'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/vote/back-office/poll/:id/publish',
        action: VoteActions.PublishPoll,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    poll: [PortalUserPollPermissions.masterAdministrator],
                },
            },
        ],
        metadata: {
            tags: ['Poll Back Office'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/vote/back-office/poll/:id/history',
        action: VoteActions.GetPollHistory,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    poll: [PortalUserPollPermissions.masterAdministrator],
                },
            },
        ],
        metadata: {
            tags: ['Poll Back Office'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/vote/back-office/poll/:id/close',
        action: VoteActions.ForceClosePoll,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    poll: [PortalUserPollPermissions.masterAdministrator],
                },
            },
        ],
        metadata: {
            tags: ['Poll Back Office'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/vote/back-office/poll/:id/launch',
        action: VoteActions.LaunchPoll,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    poll: [PortalUserPollPermissions.masterAdministrator],
                },
            },
        ],
        metadata: {
            tags: ['Poll Back Office'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/vote/back-office/poll/:id/results',
        action: VoteActions.GetPollResults,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    poll: [PortalUserPollPermissions.masterAdministrator],
                },
            },
        ],
        metadata: {
            tags: ['Poll Back Office'],
        },
    },
    {
        method: HttpMethod.PUT,
        path: '/api/:apiVersion/vote/back-office/poll/:id/user',
        action: VoteActions.AddUserToPoll,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    poll: [PortalUserPollPermissions.masterAdministrator],
                },
            },
        ],
        metadata: {
            tags: ['Poll Back Office'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/diia-office/vote/polls/createAndPublish',
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        externalAlias: {
            event: ExternalEvent.OfficePollCreateAndPublish,
        },
        profileFeaturesExpression: ProfileFeatureExpression.only(ProfileFeature.office),
        metadata: {
            tags: ['Poll Diia Office'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/diia-office/vote/polls',
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        externalAlias: {
            event: ExternalEvent.OfficePollGet,
        },
        profileFeaturesExpression: ProfileFeatureExpression.only(ProfileFeature.office),
        metadata: {
            tags: ['Poll Diia Office'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/diia-office/vote/polls/onboarding',
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        externalAlias: {
            event: ExternalEvent.OfficePollOnboarding,
        },
        profileFeaturesExpression: ProfileFeatureExpression.only(ProfileFeature.office),
        metadata: {
            tags: ['Poll Diia Office'],
        },
    },
    {
        method: HttpMethod.DELETE,
        path: '/api/:apiVersion/diia-office/vote/polls/:pollId',
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        externalAlias: {
            event: ExternalEvent.OfficePollDelete,
        },
        profileFeaturesExpression: ProfileFeatureExpression.only(ProfileFeature.office),
        metadata: {
            tags: ['Poll Diia Office'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/diia-office/vote/polls/count',
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        externalAlias: {
            event: ExternalEvent.OfficePollCount,
        },
        profileFeaturesExpression: ProfileFeatureExpression.only(ProfileFeature.office),
        metadata: {
            tags: ['Poll Diia Office'],
        },
    },
]

export default routes
