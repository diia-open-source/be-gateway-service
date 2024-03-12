import { AsyncLocalStorage } from 'async_hooks'

import { isEmpty } from 'lodash'

import { BadRequestError } from '@diia-inhouse/errors'
import { ActionVersion, AlsData } from '@diia-inhouse/types'

import HeaderValidation from '../validation/header'

import AuthenticateMiddleware from './authenticate'

import { ActionCustomHeader, Request, Response, RouteHeaderName, RouteHeaderRawName } from '@interfaces/index'
import { Middleware, MiddlewareNext } from '@interfaces/middlewares'
import { CustomHeader } from '@interfaces/routes/appRoute'

export default class HeaderMiddleware {
    constructor(
        private readonly headerValidation: HeaderValidation,
        private readonly authenticateMiddleware: AuthenticateMiddleware,
        private readonly asyncLocalStorage: AsyncLocalStorage<AlsData>,
    ) {}

    addMobileUidHeader({ name, versions }: CustomHeader): Middleware {
        return (req: Request, _res: Response, next: MiddlewareNext): void => {
            const headerValue = HeaderMiddleware.getHeaderValue(req, name)

            const isValid: boolean = this.headerValidation.checkMobileUidHeader(headerValue)
            if (!isValid) {
                throw new BadRequestError('Mobile uuid header is not valid')
            }

            this.setHeaderValue(req, name, RouteHeaderName.MOBILE_UID, versions)

            next()
        }
    }

    setAcceptLanguageHeader(req: Request, _res: Response, next: MiddlewareNext): void {
        const headerValue = HeaderMiddleware.getHeaderValue(req, RouteHeaderRawName.APP_LOCALE)

        if (headerValue) {
            req.$params.headers[RouteHeaderName.APP_LOCALE] = headerValue
        }

        next()
    }

    addTokenHeader(): Middleware {
        return (req: Request, _res: Response, next: MiddlewareNext): void => {
            req.$params.headers[RouteHeaderName.TOKEN] = this.authenticateMiddleware.parseBearerToken(req)

            next()
        }
    }

    addAppVersionHeader({ name, versions }: CustomHeader): Middleware {
        return (req: Request, _res: Response, next: MiddlewareNext): void => {
            const headerValue = HeaderMiddleware.getHeaderValue(req, name)

            const isValid = this.headerValidation.checkAppVersionHeader(headerValue)
            const isHeaderRequiredForVersion: boolean = HeaderMiddleware.isHeaderRequiredForVersion(req, versions)
            if (!isValid && isHeaderRequiredForVersion) {
                throw new BadRequestError('App version header is not valid')
            }

            this.setHeaderValue(req, name, RouteHeaderName.APP_VERSION, versions)

            next()
        }
    }

    addPlatformTypeHeader({ name, versions }: CustomHeader): Middleware {
        return (req: Request, _res: Response, next: MiddlewareNext): void => {
            const headerValue = HeaderMiddleware.getHeaderValue(req, name)

            const isValid = this.headerValidation.checkPlatformTypeHeader(headerValue)
            const isHeaderRequiredForVersion = HeaderMiddleware.isHeaderRequiredForVersion(req, versions)
            if (!isValid && isHeaderRequiredForVersion) {
                throw new BadRequestError('Platform type header is not valid')
            }

            this.setHeaderValue(req, name, RouteHeaderName.PLATFORM_TYPE, versions)

            next()
        }
    }

    addPlatformVersionHeader({ name, versions }: CustomHeader): Middleware {
        return (req: Request, _res: Response, next: MiddlewareNext): void => {
            const headerValue = HeaderMiddleware.getHeaderValue(req, name)

            const isValid = this.headerValidation.checkPlatformVersionHeader(headerValue)
            const isHeaderRequiredForVersion = HeaderMiddleware.isHeaderRequiredForVersion(req, versions)
            if (!isValid && isHeaderRequiredForVersion) {
                throw new BadRequestError('Platform version header is not valid')
            }

            this.setHeaderValue(req, name, RouteHeaderName.PLATFORM_VERSION, versions)

            next()
        }
    }

    addTicketHeader({ name, versions }: CustomHeader): Middleware {
        return (req: Request, _res: Response, next: MiddlewareNext): void => {
            const headerValue = HeaderMiddleware.getHeaderValue(req, name)

            const isHeaderRequiredForVersion = HeaderMiddleware.isHeaderRequiredForVersion(req, versions)
            if (!headerValue && isHeaderRequiredForVersion) {
                throw new BadRequestError('Ticket header is absent')
            }

            this.setHeaderValue(req, name, RouteHeaderName.TICKET, versions)

            next()
        }
    }

    addChannelUuidHeader({ name, versions }: CustomHeader): Middleware {
        return (req: Request, _res: Response, next: MiddlewareNext): void => {
            const headerValue = HeaderMiddleware.getHeaderValue(req, name)

            const isHeaderRequiredForVersion = HeaderMiddleware.isHeaderRequiredForVersion(req, versions)
            if (!headerValue && isHeaderRequiredForVersion) {
                throw new BadRequestError('Channel uuid header is absent')
            }

            this.setHeaderValue(req, name, RouteHeaderName.CHANNEL_UUID, versions)

            next()
        }
    }

    addDiiaPartnerIdHeader({ name, versions }: CustomHeader): Middleware {
        return (req: Request, _res: Response, next: MiddlewareNext): void => {
            const isHeaderRequiredForVersion = HeaderMiddleware.isHeaderRequiredForVersion(req, versions)
            if (!isHeaderRequiredForVersion) {
                return next()
            }

            const headerValue = HeaderMiddleware.getHeaderValue(req, name)
            if (isEmpty(headerValue)) {
                return next()
            }

            this.setHeaderValue(req, name, RouteHeaderName.APP_PARTNER_ID, versions)

            return next()
        }
    }

    addDocumentRequestTraceIdHeader({ name, versions }: CustomHeader): Middleware {
        return (req: Request, _res: Response, next: MiddlewareNext): void => {
            const isHeaderRequiredForVersion = HeaderMiddleware.isHeaderRequiredForVersion(req, versions)
            if (!isHeaderRequiredForVersion) {
                return next()
            }

            const headerValue = HeaderMiddleware.getHeaderValue(req, name)
            if (isEmpty(headerValue)) {
                return next()
            }

            this.setHeaderValue(req, name, RouteHeaderName.DOCUMENT_REQUEST_TRACE_ID, versions)

            return next()
        }
    }

    static getActionVersion(req: Request): ActionVersion {
        return req.$params.headers[ActionCustomHeader.ACTION_VERSION]
    }

    getHeaderByName(req: Request, name: RouteHeaderName): string | undefined | null {
        return req.$params.headers[name]
    }

    private setHeaderValue(
        req: Request,
        headerRawName: RouteHeaderRawName,
        routeHeaderName: RouteHeaderName,
        routeVersions: ActionVersion[],
    ): void | never {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const headerValue: any = HeaderMiddleware.getHeaderValue(req, headerRawName)
        const isHeaderRequiredForVersion = HeaderMiddleware.isHeaderRequiredForVersion(req, routeVersions)

        if (isEmpty(headerValue) && isHeaderRequiredForVersion) {
            throw new BadRequestError(`Header [${headerRawName}] is absent`)
        }

        if (isHeaderRequiredForVersion) {
            req.$params.headers[routeHeaderName] = headerValue
            const store = this.asyncLocalStorage.getStore()
            if (store?.headers) {
                store.headers[routeHeaderName] = headerValue
            }
        }
    }

    private static isHeaderRequiredForVersion(req: Request, routeVersions: ActionVersion[]): boolean {
        const actionVersion = this.getActionVersion(req)

        return routeVersions.includes(actionVersion)
    }

    private static getHeaderValue(req: Request, headerRawName: RouteHeaderRawName): string | undefined {
        return req.headers[headerRawName]
    }
}
