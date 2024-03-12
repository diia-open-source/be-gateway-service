import { AppAction } from '@diia-inhouse/diia-app'

import { UnauthorizedError } from '@diia-inhouse/errors'
import { CacheService } from '@diia-inhouse/redis'
import { ActionVersion, SessionType } from '@diia-inhouse/types'

import { ActionResult, CustomActionArguments } from '@interfaces/actions/v1/unauthorizedSimulate'

export default class UnauthorizedSimulateAction implements AppAction {
    readonly cachePrefix = 'unauth_emul_'

    constructor(private readonly cache: CacheService) {}

    readonly sessionType: SessionType = SessionType.User

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'unauthorizedSimulate'

    async handler(args: CustomActionArguments): Promise<ActionResult> {
        const redisKey = this.cachePrefix + args.session.user.mobileUid
        const isUnauth = (await this.cache.get(redisKey)) === '1'

        if (isUnauth) {
            await this.cache.set(redisKey, '0')
            throw new UnauthorizedError()
        }

        await this.cache.set(redisKey, '1')

        return { status: 'ok' }
    }
}
