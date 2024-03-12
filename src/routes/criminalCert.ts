import { HttpMethod } from '@diia-inhouse/types'

import { DEFAULT_USER_AUTH, DEFAULT_USER_HEADERS } from '@src/routes/defaults'

import { AppRoute } from '@interfaces/routes/appRoute'

enum CriminalCertActions {
    DownloadCriminalRecordCertificateArchiveZip = 'downloadCriminalRecordCertificateArchiveZip',
    DownloadCriminalRecordCertificatePdf = 'downloadCriminalRecordCertificatePdf',
    GetCriminalRecordCertificateApplicationBirthPlace = 'getCriminalRecordCertificateApplicationBirthPlace',
    GetCriminalRecordCertificateApplicationContacts = 'getCriminalRecordCertificateApplicationContacts',
    GetCriminalRecordCertificateApplicationInfo = 'getCriminalRecordCertificateApplicationInfo',
    GetCriminalRecordCertificateApplicationNationalities = 'getCriminalRecordCertificateApplicationNationalities',
    GetCriminalRecordCertificateApplicationReasons = 'getCriminalRecordCertificateApplicationReasons',
    GetCriminalRecordCertificateApplicationRequester = 'getCriminalRecordCertificateApplicationRequester',
    GetCriminalRecordCertificateApplicationTypes = 'getCriminalRecordCertificateApplicationTypes',
    GetCriminalRecordCertificateById = 'getCriminalRecordCertificateById',
    GetCriminalRecordCertificatesByStatus = 'getCriminalRecordCertificatesByStatus',
    SendCriminalRecordCertificateApplication = 'sendCriminalRecordCertificateApplication',
    SendCriminalRecordCertificateApplicationConfirmation = 'sendCriminalRecordCertificateApplicationConfirmation',
}

const serviceId = 'criminal-cert'

const routes: AppRoute[] = [
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/criminal-cert/:id/download',
        action: CriminalCertActions.DownloadCriminalRecordCertificateArchiveZip,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: { tags: ['Criminal Record Certificate'] },
        proxyTo: { serviceId },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/criminal-cert/:id/pdf',
        action: CriminalCertActions.DownloadCriminalRecordCertificatePdf,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: { tags: ['Criminal Record Certificate'] },
        proxyTo: { serviceId },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/criminal-cert/birth-place',
        action: CriminalCertActions.GetCriminalRecordCertificateApplicationBirthPlace,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: { tags: ['Criminal Record Certificate'] },
        proxyTo: { serviceId },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/criminal-cert/application/info',
        action: CriminalCertActions.GetCriminalRecordCertificateApplicationInfo,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: { tags: ['Criminal Record Certificate'] },
        proxyTo: { serviceId },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/criminal-cert/nationalities',
        action: CriminalCertActions.GetCriminalRecordCertificateApplicationNationalities,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: { tags: ['Criminal Record Certificate'] },
        proxyTo: { serviceId },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/criminal-cert/reasons',
        action: CriminalCertActions.GetCriminalRecordCertificateApplicationReasons,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: { tags: ['Criminal Record Certificate'] },
        proxyTo: { serviceId },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/criminal-cert/requester',
        action: CriminalCertActions.GetCriminalRecordCertificateApplicationRequester,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: { tags: ['Criminal Record Certificate'] },
        proxyTo: { serviceId },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/criminal-cert/types',
        action: CriminalCertActions.GetCriminalRecordCertificateApplicationTypes,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: { tags: ['Criminal Record Certificate'] },
        proxyTo: { serviceId },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/criminal-cert/:id',
        action: CriminalCertActions.GetCriminalRecordCertificateById,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: { tags: ['Criminal Record Certificate'] },
        proxyTo: { serviceId },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/criminal-cert/applications/:status',
        action: CriminalCertActions.GetCriminalRecordCertificatesByStatus,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: { tags: ['Criminal Record Certificate'] },
        proxyTo: { serviceId },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/criminal-cert/application',
        action: CriminalCertActions.SendCriminalRecordCertificateApplication,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: { tags: ['Criminal Record Certificate'] },
        proxyTo: { serviceId },
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/criminal-cert/confirmation',
        action: CriminalCertActions.SendCriminalRecordCertificateApplicationConfirmation,
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: { tags: ['Criminal Record Certificate'] },
        proxyTo: { serviceId },
    },
    {
        method: HttpMethod.GET,
        path: '/api/:apiVersion/public-service/criminal-cert/contacts',
        action: CriminalCertActions.GetCriminalRecordCertificateApplicationContacts,
        proxyTo: { serviceId },
        auth: DEFAULT_USER_AUTH,
        headers: DEFAULT_USER_HEADERS,
        metadata: { tags: ['Criminal Record Certificate'] },
    },
]

export default routes