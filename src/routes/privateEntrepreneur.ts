import { ActionVersion, HttpMethod, SessionType } from '@diia-inhouse/types'

import { RouteHeaderRawName } from '@interfaces/index'
import { AppRoute } from '@interfaces/routes/appRoute'

enum PrivateEntrepreneurActions {
    GetNace = 'getNace',
    GetPEExtractBusiness = 'getPEExtractBusiness',
    GetStep = 'getStep',
    StartRegisterProcess = 'startRegisterProcess',
    VerifyStep = 'verifyStep',
    GetDocument = 'getDocument',
}

const routes: AppRoute[] = [
    {
        method: HttpMethod.GET,
        path: '/cabinet/api/:apiVersion/private-entrepreneur/nace',
        action: PrivateEntrepreneurActions.GetNace,
        auth: [{ sessionType: SessionType.CabinetUser, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['PrivateEntrepreneur'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/cabinet/api/:apiVersion/private-entrepreneur/business',
        action: PrivateEntrepreneurActions.GetPEExtractBusiness,
        auth: [{ sessionType: SessionType.CabinetUser, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.TOKEN, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['PrivateEntrepreneur'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/cabinet/api/:apiVersion/private-entrepreneur/register/process/start',
        action: PrivateEntrepreneurActions.StartRegisterProcess,
        auth: [{ sessionType: SessionType.CabinetUser, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['PrivateEntrepreneur'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/cabinet/api/:apiVersion/private-entrepreneur/register/process/step',
        action: PrivateEntrepreneurActions.GetStep,
        auth: [{ sessionType: SessionType.CabinetUser, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['PrivateEntrepreneur'],
        },
    },
    {
        method: HttpMethod.POST,
        path: '/cabinet/api/:apiVersion/private-entrepreneur/register/process/:step/verify',
        action: PrivateEntrepreneurActions.VerifyStep,
        auth: [{ sessionType: SessionType.CabinetUser, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['PrivateEntrepreneur'],
        },
    },
    {
        method: HttpMethod.GET,
        path: '/cabinet/api/:apiVersion/private-entrepreneur/document',
        action: PrivateEntrepreneurActions.GetDocument,
        auth: [{ sessionType: SessionType.CabinetUser, version: ActionVersion.V1 }],
        headers: [
            { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1] },
            { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1] },
        ],
        metadata: {
            tags: ['PrivateEntrepreneur'],
        },
    },
]

export default routes
