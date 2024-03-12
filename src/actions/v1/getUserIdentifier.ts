import { AppAction } from '@diia-inhouse/diia-app'

import { ActionVersion, SessionType } from '@diia-inhouse/types'

import { ActionResult, CustomActionArguments } from '@interfaces/actions/v1/getUserIdentifier'

export default class GetUserIdentifierAction implements AppAction {
    readonly sessionType: SessionType = SessionType.User

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'getUserIdentifier'

    async handler(args: CustomActionArguments): Promise<ActionResult> {
        return { identifier: args.session.user.identifier }
    }
}
