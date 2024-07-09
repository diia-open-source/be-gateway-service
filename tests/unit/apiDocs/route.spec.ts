const mockedTemplate = 'template'
const ejsMock = {
    renderFile: jest.fn(),
}

jest.mock('ejs', () => ejsMock)

import OpenApiGenerator from '@src/apiDocs/openApiGenerator'
import ApiDocsRoute from '@src/apiDocs/route'

import { expectedRoute } from '@mocks/apiDocs/route.mock'
import { logger } from '@mocks/index'

import { Request, Response } from '@interfaces/index'
import { AppConfig } from '@interfaces/types/config'

describe('class `ApiDocsRoute`', () => {
    describe('method: `getRoute`', () => {
        const specs = {
            'service-name': {
                openapi: 'openapi',
                info: { title: 'title', version: 'version' },
                paths: {
                    '/': {
                        get: {
                            responses: {
                                200: { $ref: '$ref' },
                            },
                        },
                    },
                },
            },
        }
        const apiDocsRoute = new ApiDocsRoute(
            <AppConfig>{ swagger: { path: 'swagger-path' } },
            <OpenApiGenerator>(<unknown>{ specs }),
            logger,
        )

        it('should send template to response.end', async () => {
            const result = apiDocsRoute.getRoute()

            expect(result).toMatchObject(expectedRoute)
            const request = <Request>{}
            const response = <Response>(<unknown>{
                end: jest.fn(),
            })

            ejsMock.renderFile.mockClear().mockResolvedValueOnce(mockedTemplate)

            await result.aliases['GET /'](request, response)
            expect(response.end).toHaveBeenCalledWith(mockedTemplate)
        })

        it('should send template to response.end when service param is passed', async () => {
            const result = apiDocsRoute.getRoute()

            expect(result).toMatchObject(expectedRoute)
            const request = <Request>(<unknown>{
                $params: { service: 'service-name' },
            })
            const response = <Response>(<unknown>{
                end: jest.fn(),
            })

            ejsMock.renderFile.mockClear().mockResolvedValueOnce(mockedTemplate)

            await result.aliases['GET /:service'](request, response)
            expect(ejsMock.renderFile).toHaveBeenCalledWith(
                expect.stringMatching(/.*(\/apiDocs\/rapi-doc\.ejs)/),
                {
                    data: {
                        title: 'Service Name',
                        docPathPrefix: 'swagger-path',
                        specPathPrefix: `swagger-path/spec`,
                        service: 'service-name',
                        services: { 'service-name': 'Service Name' },
                    },
                },
                { async: true },
            )
            expect(response.end).toHaveBeenCalledWith(mockedTemplate)
        })

        it('should send service spec to response.end if service spec is requested', async () => {
            const result = apiDocsRoute.getRoute()

            expect(result).toMatchObject(expectedRoute)
            const serviceName = 'service-name'
            const request = <Request>(<unknown>{
                $params: { service: serviceName },
            })
            const response = <Response>(<unknown>{
                end: jest.fn(),
            })

            await result.aliases['GET /spec/:service'](request, response)

            expect(response.end).toHaveBeenCalledWith(JSON.stringify(specs[serviceName]))
        })

        it('should catch an exception', async () => {
            const result = apiDocsRoute.getRoute()

            expect(result).toMatchObject(expectedRoute)
            const request = <Request>{}
            const response = <Response>(<unknown>{
                end: jest.fn(),
            })

            jest.spyOn(ejsMock, 'renderFile').mockImplementationOnce(() => {
                throw new Error('Mocked error')
            })

            await result.aliases['GET /'](request, response)
            expect(response.end).toHaveBeenCalledWith('Failed render API Docs')
        })

        it('should catch an exception when service param is passed', async () => {
            const result = apiDocsRoute.getRoute()

            expect(result).toMatchObject(expectedRoute)
            const request = <Request>(<unknown>{
                $params: { service: 'service-name' },
            })
            const response = <Response>(<unknown>{
                end: jest.fn(),
            })

            jest.spyOn(ejsMock, 'renderFile').mockImplementationOnce(() => {
                throw new Error('Mocked error')
            })

            await result.aliases['GET /:service'](request, response)
            expect(response.end).toHaveBeenCalledWith('Failed to generate service-name API Docs: Mocked error')
        })

        it('should catch an exception when service spec is requested', async () => {
            const result = new ApiDocsRoute(
                <AppConfig>{ swagger: { path: 'swagger-path' } },
                <OpenApiGenerator>(<unknown>{}),
                logger,
            ).getRoute()

            expect(result).toMatchObject(expectedRoute)
            const serviceName = 'service-name'
            const request = <Request>(<unknown>{
                $params: { service: serviceName },
            })
            const response = <Response>(<unknown>{
                end: jest.fn(),
            })

            await result.aliases['GET /spec/:service'](request, response)

            expect(response.end).toHaveBeenCalledWith(expect.stringMatching(/(Failed to get spec for service-name API Docs):\s\.*/))
        })
    })

    describe('method: `getServiceName`', () => {
        const apiDocsRoute = new ApiDocsRoute(
            <AppConfig>{
                swagger: {
                    path: '',
                },
            },
            <OpenApiGenerator>(<unknown>{
                specs: {
                    auth: 'auth',
                    analytics: 'analytics',
                },
            }),
            logger,
        )

        it('should return services list', () => {
            const result = apiDocsRoute.getServiceNames()

            expect(result).toStrictEqual({
                auth: 'Auth',
                analytics: 'Analytics',
            })
        })
    })
})
