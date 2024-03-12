import { AppAction } from '@diia-inhouse/diia-app'

import { StoreTag } from '@diia-inhouse/redis'
import { ActionVersion, SessionType } from '@diia-inhouse/types'
import { ValidationSchema } from '@diia-inhouse/validators'

import StoreManagementService from '@services/storeManagement'

import { ActionResult, CustomActionArguments } from '@interfaces/actions/v1/bumpStoreTags'

export default class BumpStoreTagsAction implements AppAction {
    constructor(private readonly storeManagementService: StoreManagementService) {}

    readonly sessionType: SessionType = SessionType.Partner

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'bumpStoreTags'

    readonly validationRules: ValidationSchema<CustomActionArguments['params']> = {
        tags: {
            type: 'array',
            items: {
                type: 'string',
                enum: Object.values(StoreTag),
            },
        },
    }

    async handler(args: CustomActionArguments): Promise<ActionResult> {
        const { tags } = args.params

        await this.storeManagementService.bumpTags(tags)

        return { success: true }
    }
}
