import { Env } from '@diia-inhouse/env'
import { ActionVersion, HttpMethod, PortalUserPetitionPermissions, PortalUserPollPermissions, SessionType } from '@diia-inhouse/types'

import { AppRoute } from '@interfaces/routes/appRoute'

enum BackOfficePetitionAction {
    // Petitions
    GetUserPermissions = 'getUserPermissions',
    GetModeratorInfo = 'getModeratorInfo',
    GetModerators = 'getModerators',
    CreateModerator = 'createModerator',
    InsertModerator = 'insertModerator',
    DeleteModerator = 'deleteModerator',
    RefuseModeratorRights = 'refuseModeratorRights',
    TransferProModeratorRights = 'transferProModeratorRights',

    // Polls
    GetPollsUserPermissions = 'getPollsUserPermissions',
    GetPollsAdmins = 'getPollsAdmins',
    CreatePollsAdmin = 'createPollsAdmin',
    UpdatePollsAdmin = 'updatePollsAdmin',
    DeletePollsAdmin = 'deletePollsAdmin',
    GetFilterCoverage = 'getFilterCoverage',

    // Petitions Admin
    GetPetitionsAdmins = 'getPetitionsAdmins',
    CreatePetitionsAdmin = 'createPetitionsAdmin',
    DeletePetitionsAdmin = 'deletePetitionsAdmin',

    GetAdminModerators = 'getAdminModerators',
    GetAdminModeratorInfo = 'getAdminModeratorInfo',
    UpdateAdminModerator = 'updateAdminModerator',
    CreateAdminModerator = 'createAdminModerator',
}

const routes: AppRoute[] = [
    // Petitions
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/back-office-petition/user/permissions',
        action: BackOfficePetitionAction.GetUserPermissions,
        auth: [{ sessionType: SessionType.PortalUser, version: ActionVersion.V1 }],
        metadata: {
            tags: ['User'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/back-office-petition/user',
        action: BackOfficePetitionAction.GetModeratorInfo,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    petition: [PortalUserPetitionPermissions.proModerator],
                },
            },
        ],
        metadata: {
            tags: ['Moderator'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/back-office-petition/moderators',
        action: BackOfficePetitionAction.GetModerators,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    petition: [PortalUserPetitionPermissions.proModerator],
                },
            },
        ],
        metadata: {
            tags: ['Pro-Moderator'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/back-office-petition/moderator',
        action: BackOfficePetitionAction.CreateModerator,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    petition: [PortalUserPetitionPermissions.proModerator],
                },
            },
        ],
        metadata: {
            tags: ['Pro-Moderator'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/back-office-petition/test/moderator',
        action: BackOfficePetitionAction.InsertModerator,
        auth: [{ sessionType: SessionType.None, version: ActionVersion.V1 }],
        forbiddenEnvs: [Env.Prod],
        metadata: {
            tags: ['Pro-Moderator'],
            summary: 'Insert moderator for testing (do not use in production)',
        },
    },
    {
        method: HttpMethod.DELETE,
        path: '/api/:apiVersion/back-office-petition/moderator/:id',
        action: BackOfficePetitionAction.DeleteModerator,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    petition: [PortalUserPetitionPermissions.proModerator],
                },
            },
        ],
        metadata: {
            tags: ['Pro-Moderator'],
        },
    },
    {
        method: HttpMethod.PUT,
        path: '/api/:apiVersion/back-office-petition/moderator/refuse',
        action: BackOfficePetitionAction.RefuseModeratorRights,
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
            tags: ['Moderator'],
        },
    },
    {
        method: HttpMethod.PUT,
        path: '/api/:apiVersion/back-office-petition/moderator/transfer-pro-rights',
        action: BackOfficePetitionAction.TransferProModeratorRights,
        auth: [
            {
                sessionType: SessionType.PortalUser,
                version: ActionVersion.V1,
                permissions: {
                    petition: [PortalUserPetitionPermissions.proModerator],
                },
            },
        ],
        metadata: {
            tags: ['Pro-Moderator'],
        },
    },

    // Polls
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/back-office-poll/user/permissions',
        action: BackOfficePetitionAction.GetPollsUserPermissions,
        auth: [{ sessionType: SessionType.PortalUser, version: ActionVersion.V1 }],
        metadata: {
            tags: ['User'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/back-office-poll/admins',
        action: BackOfficePetitionAction.GetPollsAdmins,
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
            tags: ['Poll'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/back-office-poll/admin',
        action: BackOfficePetitionAction.CreatePollsAdmin,
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
            tags: ['Poll'],
        },
    },
    {
        method: HttpMethod.PUT,
        path: '/api/:apiVersion/back-office-poll/admin/:id',
        action: BackOfficePetitionAction.UpdatePollsAdmin,
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
            tags: ['Poll'],
        },
    },
    {
        method: HttpMethod.DELETE,
        path: '/api/:apiVersion/back-office-poll/admin/:id',
        action: BackOfficePetitionAction.DeletePollsAdmin,
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
            tags: ['Poll'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/back-office-poll/filter-coverage',
        action: BackOfficePetitionAction.GetFilterCoverage,
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
            tags: ['Poll'],
        },
    },
    // Petition Admins
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/back-office-petitions/admin',
        action: BackOfficePetitionAction.CreatePetitionsAdmin,
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
            tags: ['Petition Admin'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/back-office-petitions/admins',
        action: BackOfficePetitionAction.GetPetitionsAdmins,
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
            tags: ['Petition Admin'],
        },
    },
    {
        method: HttpMethod.PUT,
        path: '/api/:apiVersion/back-office-petitions/admin',
        action: BackOfficePetitionAction.DeletePetitionsAdmin,
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
            tags: ['Petition Admin'],
        },
    },
    // Petition Admin Moderators
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/back-office-petitions/admins/moderators',
        action: BackOfficePetitionAction.GetAdminModerators,
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
            tags: ['Petition Admin'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/back-office-petitions/admins/moderator/:id',
        action: BackOfficePetitionAction.GetAdminModeratorInfo,
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
            tags: ['Petition Admin'],
        },
    },
    {
        method: HttpMethod.PUT,
        path: '/api/:apiVersion/back-office-petitions/admins/moderator/:id',
        action: BackOfficePetitionAction.UpdateAdminModerator,
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
            tags: ['Petition Admin'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/back-office-petitions/admins/moderator',
        action: BackOfficePetitionAction.CreateAdminModerator,
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
            tags: ['Petition Admin'],
        },
    },
]

export default routes
