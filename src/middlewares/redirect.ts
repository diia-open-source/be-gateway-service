import { Logger } from '@diia-inhouse/types'

import { Request, Response } from '@interfaces/index'

export default class RedirectMiddleware {
    constructor(private readonly logger: Logger) {}

    addRedirect(url: string): (req: Request, res: Response, next: (err?: Error) => void) => void {
        return (req: Request, _res: Response, next: (err?: Error) => void): void => {
            this.logger.debug(`Redirect to [${url}] with data [${JSON.stringify(req.$params.params)}]`)

            req.$params.redirect = url

            next()
        }
    }
}
