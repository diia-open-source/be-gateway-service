import { ActionVersion, HttpMethod, SessionType } from '@diia-inhouse/types'

import { AppRoute } from '@interfaces/routes/appRoute'
import { PartnerPartnersScope, PartnerScopeType, PartnerVaccinationAidScope } from '@interfaces/routes/partner'

enum ParnerActions {
    AddVaccinationAidBankAccount = 'addVaccinationAidBankAccount',
    DeleteVaccinationAidBankAccount = 'deleteVaccinationAidBankAccount',
    ProcessVaccinationAidBankReport = 'processVaccinationAidBankReport',
    GetVaccinationAidBankReport = 'getVaccinationAidBankReport',
    GetVaccinationAidBankReports = 'getVaccinationAidBankReports',
    CreateBankAccount = 'createBankAccount',
    DeleteBankAccount = 'deleteBankAccount',
    CreatePartner = 'createPartner',
}

const routes: AppRoute[] = [
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/partner/vaccination-aid/bank-account',
        action: ParnerActions.AddVaccinationAidBankAccount,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.vaccinationAid]: [PartnerVaccinationAidScope.AddAccount],
                },
            },
        ],
    },
    {
        method: HttpMethod.DELETE,
        path: '/api/:apiVersion/partner/vaccination-aid/bank-account',
        action: ParnerActions.DeleteVaccinationAidBankAccount,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.vaccinationAid]: [PartnerVaccinationAidScope.DeleteAccount],
                },
            },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/partner/vaccination-aid/report/process',
        action: ParnerActions.ProcessVaccinationAidBankReport,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.vaccinationAid]: [PartnerVaccinationAidScope.ProcessReport],
                },
            },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/partner/vaccination-aid/report/:reportId',
        action: ParnerActions.GetVaccinationAidBankReport,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
            },
        ],
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/partner/vaccination-aid/reports',
        action: ParnerActions.GetVaccinationAidBankReports,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
            },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/partner/bank/create-account',
        action: ParnerActions.CreateBankAccount,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.vaccinationAid]: [PartnerVaccinationAidScope.AddAccount],
                },
            },
        ],
    },
    {
        method: HttpMethod.DELETE,
        path: '/api/:apiVersion/partner/bank/delete-account',
        action: ParnerActions.DeleteBankAccount,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.vaccinationAid]: [PartnerVaccinationAidScope.DeleteAccount],
                },
            },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/partner/create',
        action: ParnerActions.CreatePartner,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.partners]: [PartnerPartnersScope.Create],
                },
            },
        ],
        metadata: {
            tags: ['Partner'],
        },
    },
]

export default routes
