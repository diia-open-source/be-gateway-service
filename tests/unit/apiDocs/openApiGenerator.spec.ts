import { ACTION_RESPONSE } from '@diia-inhouse/diia-app'

import { ActionVersion, HttpMethod, SessionType } from '@diia-inhouse/types'

import OpenApiGenerator from '@src/apiDocs/openApiGenerator'
import RoutesBuilder from '@src/routes'

import {
    expectedActionWithArrayParam,
    expectedActionWithAuthBadge,
    expectedActionWithAuthBadges,
    expectedActionWithHeaders,
    expectedActionWithNonObjectParam,
    expectedActionWithPathParams,
    expectedActionWithoutResponses,
    expectedActionWithoutSecurity,
    expectedActionWithoutVersion,
    expectedAuthResponse,
    expectedAuthResponseWithDescription,
    expectedDocumentAcquirersResponse,
    expectedMultipartPostParams,
    expectedPostParams,
    expectedResultWithoutPermission,
} from '@mocks/apiDocs/file.mock'
import { moleculerService, moleculerServiceWithoutParams } from '@mocks/moleculerService'

import { RouteHeaderRawName } from '@interfaces/index'

describe('OpenApiGenerator', () => {
    describe('generateOpenApiSchemas', () => {
        it('schema should`nt have permission key', async () => {
            const routesBuilder = <RoutesBuilder>(<unknown>{
                servicesRoutes: {
                    DocumentAcquirers: [
                        {
                            auth: [
                                {
                                    version: 'v1',
                                },
                            ],
                            method: HttpMethod.GET,
                            path: '/api/path1',
                            action: 'actionWithoutPermissionAndScopes',
                            metadata: {
                                tags: [],
                            },
                        },
                    ],
                },
            })

            const generator = new OpenApiGenerator(routesBuilder, () => Object.assign(moleculerService))

            // Act
            await generator.generateOpenApiSchemas()
            const generatorResult = generator.specs['document-acquirers'].paths['/api/path1']?.get

            // Assert
            expect(generatorResult).toStrictEqual(expectedResultWithoutPermission)
        })

        it('schema should have permission and scopes', async () => {
            const routesBuilder = <RoutesBuilder>(<unknown>{
                servicesRoutes: {
                    DocumentAcquirers: [
                        {
                            auth: [
                                {
                                    version: 'v1',
                                    permissions: { open: ['permission1', 'permission2'] },
                                    scopes: { scope1: ['label1', 'label2'] },
                                },
                            ],
                            method: HttpMethod.GET,
                            path: '/api/path1',
                            action: 'actionWithAcquirersService',
                            metadata: {
                                tags: [],
                            },
                        },
                    ],
                },
            })

            const generator = new OpenApiGenerator(routesBuilder, () => Object.assign(moleculerService))

            // Act
            await generator.generateOpenApiSchemas()

            // Assert
            expect(generator.specs).toStrictEqual(expectedDocumentAcquirersResponse)
        })

        it('schema without version', async () => {
            const routesBuilder = <RoutesBuilder>(<unknown>{
                servicesRoutes: {
                    Auth: [
                        {
                            auth: [],
                            method: HttpMethod.GET,
                            path: '/api/path1',
                            action: 'actionWithoutVersion',
                            metadata: {
                                tags: [],
                            },
                        },
                    ],
                },
            })

            const generator = new OpenApiGenerator(routesBuilder, () => Object.assign(moleculerService))

            // Act
            await generator.generateOpenApiSchemas()

            // Assert
            expect(generator.specs).toStrictEqual(expectedActionWithoutVersion)
        })

        it('schema with invalid version', async () => {
            const routesBuilder = <RoutesBuilder>(<unknown>{
                servicesRoutes: {
                    Auth: [
                        {
                            auth: [
                                {
                                    version: 'vb',
                                },
                            ],
                            method: HttpMethod.GET,
                            path: '/api/path1',
                            action: 'actionWithoutVersion',
                            metadata: {
                                tags: [],
                            },
                        },
                    ],
                },
            })

            const generator = new OpenApiGenerator(routesBuilder, () => Object.assign(moleculerService))

            // Act
            await generator.generateOpenApiSchemas()

            // Assert
            expect(generator.specs).toStrictEqual(expectedActionWithoutVersion)
        })

        it('schema should have a post params', async () => {
            const routesBuilder = <RoutesBuilder>(<unknown>{
                servicesRoutes: {
                    DocumentAcquirers: [
                        {
                            auth: [{ version: 'v1' }],
                            method: HttpMethod.POST,
                            path: '/api/path1',
                            action: 'actionWithAcquirersService',
                            metadata: {
                                tags: [],
                            },
                        },
                    ],
                },
            })

            const generator = new OpenApiGenerator(routesBuilder, () => Object.assign(moleculerService))

            // Act
            await generator.generateOpenApiSchemas()

            // Assert
            expect(generator.specs['document-acquirers']).toEqual(expect.objectContaining(expectedPostParams))
        })

        it('schema should have a multipart form-data post params', async () => {
            const routesBuilder = <RoutesBuilder>(<unknown>{
                servicesRoutes: {
                    Documents: [
                        {
                            auth: [{ version: 'v1' }],
                            method: HttpMethod.POST,
                            path: '/api/path1',
                            action: 'multipartFormDataParamAction',
                            metadata: {
                                tags: [],
                            },
                        },
                    ],
                },
            })

            const generator = new OpenApiGenerator(routesBuilder, () => Object.assign(moleculerService))

            // Act
            await generator.generateOpenApiSchemas()

            // Assert
            expect(generator.specs.documents).toEqual(expect.objectContaining(expectedMultipartPostParams))
        })

        it('schema should not have a tags', async () => {
            const routesBuilder = <RoutesBuilder>(<unknown>{
                servicesRoutes: {
                    Auth: [
                        {
                            auth: [{ version: 'v1' }],
                            method: HttpMethod.POST,
                            path: '/api/path1',
                            action: 'postAction',
                            metadata: {
                                tags: [],
                            },
                        },
                    ],
                },
            })

            const generator = new OpenApiGenerator(routesBuilder, () => Object.assign(moleculerService))

            // Act
            await generator.generateOpenApiSchemas()

            // Assert
            expect(generator.specs.auth.tags).toEqual([])
        })

        it('schema should have a tags', async () => {
            const routesBuilder = <RoutesBuilder>(<unknown>{
                servicesRoutes: {
                    Auth: [
                        {
                            auth: [{ version: 'v1' }],
                            method: HttpMethod.POST,
                            path: '/api/path1',
                            action: 'postAction',
                            metadata: {
                                tags: ['tag1', 'tag2'],
                            },
                        },
                    ],
                },
            })

            const generator = new OpenApiGenerator(routesBuilder, () => Object.assign(moleculerService))

            // Act
            await generator.generateOpenApiSchemas()

            // Assert
            expect(generator.specs.auth.tags).toEqual([{ name: 'tag1' }, { name: 'tag2' }])
        })

        it('schema should have tags with prefixes', async () => {
            const routesBuilder = <RoutesBuilder>(<unknown>{
                servicesRoutes: {
                    Auth: [
                        {
                            auth: [{ version: 'v1' }],
                            method: HttpMethod.GET,
                            path: '/test-prefix/:apiVersion/path-3/',
                            action: 'withDifferentPrefixApi',
                            metadata: {
                                tags: ['tag1', 'tag2'],
                            },
                        },
                    ],
                },
            })

            const generator = new OpenApiGenerator(routesBuilder, () => Object.assign(moleculerService))

            // Act
            await generator.generateOpenApiSchemas()

            // Assert
            expect(generator.specs.auth.tags).toEqual([{ name: 'TestPrefix/tag1' }, { name: 'TestPrefix/tag2' }])
        })

        it('schema should have tags with prefixes constructed from path', async () => {
            const routesBuilder = <RoutesBuilder>(<unknown>{
                servicesRoutes: {
                    Auth: [
                        {
                            auth: [{ version: 'v1' }],
                            method: HttpMethod.GET,
                            path: '/test-prefix/:apiVersion/path-3/',
                            action: 'withDifferentPrefixApi',
                            metadata: {
                                tags: [],
                            },
                        },
                    ],
                },
            })

            const generator = new OpenApiGenerator(routesBuilder, () => Object.assign(moleculerService))

            // Act
            await generator.generateOpenApiSchemas()

            // Assert
            expect(generator.specs.auth.tags).toEqual([{ name: 'TestPrefix/Path 3' }])
        })

        it('should generate correct schema for serviceName suffix', async () => {
            const routesBuilder = <RoutesBuilder>(<unknown>{
                servicesRoutes: {
                    Auth: [
                        {
                            auth: [{ version: 'v1' }],
                            method: HttpMethod.GET,
                            path: '/api/:apiVersion/auth/',
                            action: 'pathWithServiceNameSuffix',
                            metadata: {
                                tags: [],
                            },
                        },
                    ],
                },
            })

            const generator = new OpenApiGenerator(routesBuilder, () => Object.assign(moleculerService))

            // Act
            await generator.generateOpenApiSchemas()

            // Assert
            expect(generator.specs).toStrictEqual(expectedAuthResponse)
        })

        it('schema should not have params if service action has no params', async () => {
            const routesBuilder = <RoutesBuilder>(<unknown>{
                servicesRoutes: {
                    Auth: [
                        {
                            auth: [{ version: 'v1' }],
                            method: HttpMethod.GET,
                            path: '/api/:apiVersion/auth/',
                            action: 'pathWithServiceNameSuffix',
                            metadata: {
                                tags: [],
                            },
                        },
                    ],
                },
            })

            const generator = new OpenApiGenerator(routesBuilder, () => Object.assign(moleculerServiceWithoutParams))

            // Act
            await generator.generateOpenApiSchemas()

            // Assert
            expect(generator.specs).toStrictEqual(expectedAuthResponse)
        })

        it('should generate correct schema with description', async () => {
            const routesBuilder = <RoutesBuilder>(<unknown>{
                servicesRoutes: {
                    Auth: [
                        {
                            auth: [{ version: 'v1' }],
                            method: HttpMethod.GET,
                            path: '/api/:apiVersion/auth/',
                            action: 'pathWithServiceNameSuffix',
                            metadata: {
                                summary: 'Summary of the route',
                                tags: [],
                            },
                        },
                    ],
                },
            })

            const generator = new OpenApiGenerator(routesBuilder, () => Object.assign(moleculerService))

            // Act
            await generator.generateOpenApiSchemas()

            // Assert
            expect(generator.specs).toStrictEqual(expectedAuthResponseWithDescription)
        })

        it(`schema should not have responses if ${ACTION_RESPONSE} is not specified in builder`, async () => {
            const routesBuilder = <RoutesBuilder>(<unknown>{
                servicesRoutes: {
                    Analytics: [
                        {
                            auth: [{ version: 'v1' }],
                            method: HttpMethod.GET,
                            path: '/api/:apiVersion/action',
                            action: 'actionWithoutResponses',
                            metadata: {
                                summary: 'Summary of the route',
                                tags: [],
                            },
                        },
                    ],
                },
            })

            const generator = new OpenApiGenerator(routesBuilder, () => Object.assign(moleculerService))

            // Act
            await generator.generateOpenApiSchemas()

            // Assert
            expect(generator.specs.analytics).toEqual(expect.objectContaining(expectedActionWithoutResponses))
        })

        it('schema should have headers if specified in routesBuilder', async () => {
            const routesBuilder = <RoutesBuilder>(<unknown>{
                servicesRoutes: {
                    Analytics: [
                        {
                            auth: [{ version: 'v1' }],
                            method: HttpMethod.GET,
                            path: '/api/:apiVersion/action',
                            action: 'actionWithHeaders',
                            headers: [
                                { name: RouteHeaderRawName.MOBILE_UID, versions: [ActionVersion.V1, ActionVersion.V2] },
                                { name: RouteHeaderRawName.APP_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
                                { name: RouteHeaderRawName.PLATFORM_TYPE, versions: [ActionVersion.V1, ActionVersion.V2] },
                                { name: RouteHeaderRawName.PLATFORM_VERSION, versions: [ActionVersion.V1, ActionVersion.V2] },
                                { name: RouteHeaderRawName.CERT, versions: [ActionVersion.V1] },
                            ],
                        },
                    ],
                },
            })

            const generator = new OpenApiGenerator(routesBuilder, () => Object.assign(moleculerService))

            // Act
            await generator.generateOpenApiSchemas()

            // Assert
            expect(generator.specs.analytics).toEqual(expect.objectContaining(expectedActionWithHeaders))
        })

        it('schema should have path parameters', async () => {
            const routesBuilder = <RoutesBuilder>(<unknown>{
                servicesRoutes: {
                    Documents: [
                        {
                            auth: [{ version: 'v1' }],
                            method: HttpMethod.GET,
                            path: '/api/:apiVersion/action/:param1',
                            action: 'actionWithPathParam',
                        },
                    ],
                },
            })

            const generator = new OpenApiGenerator(routesBuilder, () => Object.assign(moleculerService))

            // Act
            await generator.generateOpenApiSchemas()

            // Assert
            expect(generator.specs.documents).toEqual(expect.objectContaining(expectedActionWithPathParams))
        })

        it('schema should have optional array parameter', async () => {
            const routesBuilder = <RoutesBuilder>(<unknown>{
                servicesRoutes: {
                    Documents: [
                        {
                            auth: [{ version: 'v1' }],
                            method: HttpMethod.GET,
                            path: '/api/:apiVersion/action',
                            action: 'actionWithArrayParam',
                        },
                    ],
                },
            })

            const generator = new OpenApiGenerator(routesBuilder, () => Object.assign(moleculerService))

            // Act
            await generator.generateOpenApiSchemas()

            // Assert
            expect(generator.specs.documents).toEqual(expect.objectContaining(expectedActionWithArrayParam))
        })

        it.each([
            [
                'sessionType is passed',
                'actionWithAuthBadge',
                [{ sessionType: SessionType.User, version: 'v1' }],
                expectedActionWithAuthBadge,
            ],
            [
                'sessionTypes are passed',
                'actionWithAuthBadges',
                [{ sessionTypes: [SessionType.User, SessionType.CabinetUser], version: 'v1' }],
                expectedActionWithAuthBadges,
            ],
        ])('schema should have auth badges if %s', async (_msg, action, auth, expected) => {
            const routesBuilder = <RoutesBuilder>(<unknown>{
                servicesRoutes: {
                    Documents: [
                        {
                            action,
                            auth,
                            method: HttpMethod.GET,
                            path: '/api/:apiVersion/action',
                        },
                    ],
                },
            })

            const generator = new OpenApiGenerator(routesBuilder, () => Object.assign(moleculerService))

            // Act
            await generator.generateOpenApiSchemas()

            // Assert
            expect(generator.specs.documents).toEqual(expect.objectContaining(expected))
        })

        it.each([
            [`sessionType is ${SessionType.None}`, [{ sessionType: SessionType.None, version: 'v1' }]],
            [`sessionTypes starts with ${SessionType.None}`, [{ sessionTypes: [SessionType.None], version: 'v1' }]],
        ])(`schema should have security undefined if route %s`, async (_msg, auth) => {
            const routesBuilder = <RoutesBuilder>(<unknown>{
                servicesRoutes: {
                    Documents: [
                        {
                            auth,
                            method: HttpMethod.GET,
                            path: '/api/:apiVersion/action',
                            action: 'actionWithoutSecurity',
                        },
                    ],
                },
            })

            const generator = new OpenApiGenerator(routesBuilder, () => Object.assign(moleculerService))

            // Act
            await generator.generateOpenApiSchemas()

            // Assert
            expect(generator.specs.documents).toEqual(expect.objectContaining(expectedActionWithoutSecurity))
        })

        it('schema should have non-object params', async () => {
            const routesBuilder = <RoutesBuilder>(<unknown>{
                servicesRoutes: {
                    Documents: [
                        {
                            auth: [{ version: 'v1' }],
                            method: HttpMethod.GET,
                            path: '/api/:apiVersion/action',
                            action: 'actionWithNonObjectParam',
                        },
                    ],
                },
            })

            const generator = new OpenApiGenerator(routesBuilder, () => Object.assign(moleculerService))

            // Act
            await generator.generateOpenApiSchemas()

            // Assert
            expect(generator.specs.documents).toEqual(expect.objectContaining(expectedActionWithNonObjectParam))
        })
    })
})
