import { ObjectId } from 'bson'

import { PartnerScopes } from '@diia-inhouse/types'

export interface GetPartnerByTokenResult {
    _id: ObjectId
    scopes: PartnerScopes
}
