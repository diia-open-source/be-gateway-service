import { Application, ServiceContext } from '@diia-inhouse/diia-app'

import configFactory from '@src/config'
import deps from '@src/deps'

import { AppDeps } from '@interfaces/application'
import { AppConfig } from '@interfaces/types/config'

export async function bootstrap(serviceName: string): Promise<void> {
    const app = new Application<ServiceContext<AppConfig, AppDeps>>(serviceName)

    await app.setConfig(configFactory)

    await app.setDeps(deps)
    await app.loadDepsFromFolder({ folderName: 'middlewares', nameFormatter: (name: string) => `${name}Middleware` })

    const { config, start, container } = await app.initialize()

    await start()

    if (config.swagger.isEnabled) {
        container.resolve('openApiGenerator').generateOpenApiSchemas()
    }
}
