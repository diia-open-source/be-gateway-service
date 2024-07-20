import { ActionVersion, HttpMethod, SessionType } from '@diia-inhouse/types'

import { AppRoute } from '@interfaces/routes/appRoute'
import { PartnerDocumentDeliveryScope, PartnerScopeType } from '@interfaces/routes/documentDelivery'

enum DocumentDeliveryServiceActions {
    DocumentDeliveryStatusCallback = 'documentDeliveryStatusCallback',
    CreateDeliveryAndSendOffert = 'createDeliveryAndSendOffert',
}

const routes: AppRoute[] = [
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/partner/infotech/delivery-status',
        action: DocumentDeliveryServiceActions.DocumentDeliveryStatusCallback,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.documentDelivery]: [PartnerDocumentDeliveryScope.StatusCallback],
                },
            },
        ],
    },
    {
        method: HttpMethod.POST,
        path: '/api/:apiVersion/public-service/document-delivery/create',
        action: DocumentDeliveryServiceActions.CreateDeliveryAndSendOffert,
        auth: [
            {
                sessionType: SessionType.Partner,
                version: ActionVersion.V1,
                scopes: {
                    [PartnerScopeType.documentDelivery]: [PartnerDocumentDeliveryScope.CreateDelivery],
                },
            },
        ],
    },
]

export default routes
