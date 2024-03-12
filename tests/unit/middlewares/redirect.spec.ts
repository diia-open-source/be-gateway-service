import DiiaLogger from '@diia-inhouse/diia-logger'
import { mockClass } from '@diia-inhouse/test'

import RedirectMiddleware from '@src/middlewares/redirect'

import { Request, Response } from '@interfaces/index'

const DiiaLoggerMock = mockClass(DiiaLogger)

describe('RedirectMiddleware', () => {
    const logger = new DiiaLoggerMock()
    const redirectMiddleware = new RedirectMiddleware(logger)

    describe('method: `addRedirect`', () => {
        test('should add redirect URL to req.$params', () => {
            const req = <Request>(<unknown>{
                $params: { params: {}, body: {}, query: {}, headers: {}, redirect: undefined },
                $route: { aliases: [] },
                $startTime: [0, 0],
                $alias: { fullPath: '/test', method: 'GET' },
                $ctx: { locals: {} },
                body: {},
                query: {},
                url: '/test',
                headers: {},
                method: 'GET',
            })

            const res: Response = <Response>{}

            const next = jest.fn()

            const url = '/redirect-url'
            const middlewareFn = redirectMiddleware.addRedirect(url)

            middlewareFn(req, res, next)

            expect(req.$params.redirect).toBe(url)

            expect(logger.debug).toHaveBeenCalledWith(`Redirect to [${url}] with data [{}]`)

            expect(next).toHaveBeenCalled()
            expect(next.mock.calls).toHaveLength(1)
            expect(next.mock.calls[0][0]).toBeUndefined()
        })

        test('should handle missing query parameters in req object', () => {
            const req = <Request>(<unknown>{
                $params: { params: {}, body: {}, query: {}, headers: {}, redirect: undefined },
                $route: { aliases: [] },
                $startTime: [0, 0],
                $alias: { fullPath: '/test', method: 'GET' },
                $ctx: { locals: {} },
                body: {},
                query: {},
                url: '/test',
                headers: {},
                method: 'GET',
            })
            const res = <Response>{}

            const url = '/redirect-url'
            const middlewareFn = redirectMiddleware.addRedirect(url)

            middlewareFn(req, res, () => {})

            expect(req.$params.redirect).toBe(url)

            expect(logger.debug).toHaveBeenCalledWith(`Redirect to [${url}] with data [{}]`)
        })

        test('should handle multiple middleware calls without overriding redirect URL', () => {
            const req = <Request>(<unknown>{
                $params: { params: {}, body: {}, query: {}, headers: {}, redirect: undefined },
                $route: { aliases: [] },
                $startTime: [0, 0],
                $alias: { fullPath: '/test', method: 'GET' },
                $ctx: { locals: {} },
                body: {},
                query: {},
                url: '/test',
                headers: {},
                method: 'GET',
            })

            const res = <Response>{}

            const url = '/redirect-url'
            const middlewareFn = redirectMiddleware.addRedirect(url)

            middlewareFn(req, res, () => {})
            middlewareFn(req, res, () => {})
            middlewareFn(req, res, () => {})
            middlewareFn(req, res, () => {})
            middlewareFn(req, res, () => {})

            expect(req.$params.redirect).toBe(url)

            expect(logger.debug).toHaveBeenCalledTimes(7)
            expect(logger.debug).toHaveBeenCalledWith(`Redirect to [${url}] with data [{}]`)
        })

        test('should handle different redirect URLs for different requests', () => {
            const req1 = <Request>(<unknown>{
                $params: { params: {}, body: {}, query: {}, headers: {}, redirect: undefined },
                $route: { aliases: [] },
                $startTime: [0, 0],
                $alias: { fullPath: '/test', method: 'GET' },
                $ctx: { locals: {} },
                body: {},
                query: {},
                url: '/test',
                headers: {},
                method: 'GET',
            })

            const req2 = <Request>(<unknown>{
                $params: { params: {}, body: {}, query: {}, headers: {}, redirect: undefined },
                $route: { aliases: [] },
                $startTime: [0, 0],
                $alias: { fullPath: '/another-route', method: 'GET' },
                $ctx: { locals: {} },
                body: {},
                query: {},
                url: '/another-route',
                headers: {},
                method: 'GET',
            })

            const res = <Response>{}

            const url1 = '/redirect-url-1'
            const url2 = '/redirect-url-2'
            const middlewareFn1 = redirectMiddleware.addRedirect(url1)
            const middlewareFn2 = redirectMiddleware.addRedirect(url2)

            middlewareFn1(req1, res, () => {})
            middlewareFn2(req2, res, () => {})

            expect(req1.$params.redirect).toBe(url1)
            expect(req2.$params.redirect).toBe(url2)

            expect(logger.debug).toHaveBeenCalledWith(`Redirect to [${url1}] with data [{}]`)
            expect(logger.debug).toHaveBeenCalledWith(`Redirect to [${url2}] with data [{}]`)
        })

        test('should not modify the original req object', () => {
            const req = <Request>(<unknown>{
                $params: { params: {}, body: {}, query: {}, headers: {}, redirect: undefined },
                $route: { aliases: [] },
                $startTime: [0, 0],
                $alias: { fullPath: '/test', method: 'GET' },
                $ctx: { locals: {} },
                body: {},
                query: {},
                url: '/test',
                headers: {},
                method: 'GET',
            })
            const res = <Response>{}

            const originalReq = { ...req }

            const url = '/redirect-url'
            const middlewareFn = redirectMiddleware.addRedirect(url)

            middlewareFn(req, res, () => {})

            expect(req.$params.redirect).toBe(url)

            expect(req).toEqual(originalReq)
        })
    })
})
