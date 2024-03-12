import { InternalServerError } from '@diia-inhouse/errors'
import { StoreService, StoreTag } from '@diia-inhouse/redis'
import { Logger } from '@diia-inhouse/types'

export default class StoreManagementService {
    constructor(
        private readonly store: StoreService,
        private readonly logger: Logger,
    ) {}

    async bumpTags(tags: StoreTag[]): Promise<void> {
        const result = await this.store.bumpTags(tags)

        if (!result) {
            this.logger.error('Failed to bump tags', { tags })

            throw new InternalServerError('Failed to bump tags')
        }
    }
}
