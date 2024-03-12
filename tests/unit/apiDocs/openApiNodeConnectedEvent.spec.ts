import { cloneDeep, kebabCase, merge } from 'lodash'
import { BrokerNode, Context, ServiceEvent, ServiceEventHandler } from 'moleculer'
import { SetRequired } from 'type-fest'

import { ACTION_RESPONSE } from '@diia-inhouse/diia-app'

import DiiaLogger from '@diia-inhouse/diia-logger'
import { EnvService } from '@diia-inhouse/env'
import { mockInstance } from '@diia-inhouse/test'
import { HttpMethod } from '@diia-inhouse/types'

import OpenApiGenerator from '@src/apiDocs/openApiGenerator'
import openApiNodeConnectedEvent from '@src/apiDocs/openApiNodeConnectedEvent'
import getConfig from '@src/config'
import RoutesBuilder from '@src/routes'

import { moleculerService } from '@mocks/moleculerService'

import { AppConfig } from '@interfaces/types/config'

describe('openApiNodeConnectedEvent', () => {
    const logger = mockInstance(DiiaLogger)
    const envService = new EnvService(logger)
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
                    metadata: { tags: [] },
                },
            ],
        },
    })
    const connectedNode = <BrokerNode>merge(cloneDeep(moleculerService.service.broker.registry.services), {
        services: [
            {
                actions: {
                    [`DocumentAcquirers.actionWithAcquirersService.v1`]: {
                        [ACTION_RESPONSE]: 'schema',
                        params: {
                            params: {
                                type: 'object',
                                props: {
                                    param3: {
                                        type: 'string',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        ],
    })

    it('should replace service schema', async () => {
        const config = await getConfig(envService, 'Gateway')
        const generator = new OpenApiGenerator(routesBuilder, () => Object.assign(moleculerService))
        const event = openApiNodeConnectedEvent(config, routesBuilder, generator)
        const serviceEvent = <SetRequired<ServiceEvent, 'handler'>>event['$node.connected']
        const handler = <ServiceEventHandler>serviceEvent.handler
        const context = <Context<{ node: BrokerNode; reconnected: boolean }>>{
            params: { node: connectedNode, reconnected: false },
        }

        generator.generateOpenApiSchemas()

        const oldSchema = cloneDeep(generator.specs[kebabCase('DocumentAcquirers')])

        handler(context)

        expect(generator.specs[kebabCase('DocumentAcquirers')]).not.toEqual(oldSchema)
    })

    it('should not replace service schema if swagger is disabled', () => {
        const generator = new OpenApiGenerator(routesBuilder, () => Object.assign(moleculerService))
        const event = openApiNodeConnectedEvent(<AppConfig>{ swagger: { isEnabled: false } }, routesBuilder, generator)
        const serviceEvent = <SetRequired<ServiceEvent, 'handler'>>event['$node.connected']
        const handler = <ServiceEventHandler>serviceEvent.handler
        const context = <Context<{ node: BrokerNode; reconnected: boolean }>>{
            params: { node: connectedNode, reconnected: false },
        }

        generator.generateOpenApiSchemas()

        const oldSchema = cloneDeep(generator.specs[kebabCase('DocumentAcquirers')])

        handler(context)

        expect(generator.specs[kebabCase('DocumentAcquirers')]).toEqual(oldSchema)
    })

    it('should not replace service schema if connected node has no services', async () => {
        const config = await getConfig(envService, 'Gateway')
        const generator = new OpenApiGenerator(routesBuilder, () => Object.assign(moleculerService))
        const event = openApiNodeConnectedEvent(config, routesBuilder, generator)
        const serviceEvent = <SetRequired<ServiceEvent, 'handler'>>event['$node.connected']
        const handler = <ServiceEventHandler>serviceEvent.handler
        const context = <Context<{ node: BrokerNode; reconnected: boolean }>>{
            params: { node: <BrokerNode>(<unknown>{ services: [] }), reconnected: false },
        }

        generator.generateOpenApiSchemas()

        const oldSchema = cloneDeep(generator.specs[kebabCase('DocumentAcquirers')])

        handler(context)

        expect(generator.specs[kebabCase('DocumentAcquirers')]).toEqual(oldSchema)
    })

    it('should not replace service schema if node is reconnected', async () => {
        const config = await getConfig(envService, 'Gateway')
        const generator = new OpenApiGenerator(routesBuilder, () => Object.assign(moleculerService))
        const event = openApiNodeConnectedEvent(config, routesBuilder, generator)
        const serviceEvent = <SetRequired<ServiceEvent, 'handler'>>event['$node.connected']
        const handler = <ServiceEventHandler>serviceEvent.handler
        const context = <Context<{ node: BrokerNode; reconnected: boolean }>>{
            params: { node: connectedNode, reconnected: true },
        }

        generator.generateOpenApiSchemas()

        const oldSchema = cloneDeep(generator.specs[kebabCase('DocumentAcquirers')])

        handler(context)

        expect(generator.specs[kebabCase('DocumentAcquirers')]).toEqual(oldSchema)
    })

    it('should not replace service schema if it was not generated before', async () => {
        const config = await getConfig(envService, 'Gateway')
        const generator = new OpenApiGenerator(routesBuilder, () => Object.assign(moleculerService))
        const event = openApiNodeConnectedEvent(config, routesBuilder, generator)
        const serviceEvent = <SetRequired<ServiceEvent, 'handler'>>event['$node.connected']
        const handler = <ServiceEventHandler>serviceEvent.handler
        const context = <Context<{ node: BrokerNode; reconnected: boolean }>>{
            params: { node: <BrokerNode>(<unknown>{ services: [{ name: 'Documents' }] }), reconnected: false },
        }

        generator.generateOpenApiSchemas()

        const oldSchema = cloneDeep(generator.specs)

        handler(context)

        expect(generator.specs).toEqual(oldSchema)
    })
})
