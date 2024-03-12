import { kebabCase } from 'lodash'
import { BrokerNode, Context, Service, ServiceEvents } from 'moleculer'

import OpenApiGenerator from '@src/apiDocs/openApiGenerator'
import RoutesBuilder from '@src/routes'

import { AppConfig } from '@interfaces/types/config'

export default (config: AppConfig, routesBuilder: RoutesBuilder, openApiGenerator: OpenApiGenerator): ServiceEvents => ({
    '$node.connected': {
        handler(ctx: Context<{ node: BrokerNode; reconnected: boolean }>): void {
            if (!config.swagger.isEnabled) {
                return
            }

            const { node, reconnected } = ctx.params
            if (!node?.services?.length || reconnected) {
                return
            }

            const { services: brokerServices } = node
            const services = <Service[]>(<unknown>brokerServices.filter((service) => service.name !== '$node'))
            const { servicesRoutes } = routesBuilder

            services.forEach((service) => {
                const serviceName: string = service.name
                const serviceNameKebabCase: string = kebabCase(serviceName)
                const serviceSpec = openApiGenerator.specs[serviceNameKebabCase]
                const routesDeclarations = servicesRoutes[serviceName]

                if (routesDeclarations && serviceSpec) {
                    const spec = openApiGenerator.generateOpenApiSchema(serviceName, routesDeclarations, service)

                    openApiGenerator.specs[serviceNameKebabCase] = spec
                }
            })
        },
    },
})
