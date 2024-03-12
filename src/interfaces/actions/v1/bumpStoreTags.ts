import { StoreTag } from '@diia-inhouse/redis'
import { PartnerActionArguments } from '@diia-inhouse/types'

export interface CustomActionArguments extends PartnerActionArguments {
    params: {
        tags: StoreTag[]
    }
}

export interface ActionResult {
    success: true
}
