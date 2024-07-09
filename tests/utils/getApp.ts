import { Application, ServiceContext, ServiceOperator } from '@diia-inhouse/diia-app'

import config from '@src/config'

import { TestDeps } from '@tests/interfaces/utils'
import deps from '@tests/utils/getDeps'

import { AppDeps } from '@interfaces/application'
import { AppConfig } from '@interfaces/types/config'

export async function getApp(): Promise<ServiceOperator<AppConfig, AppDeps & TestDeps>> {
    const app = new Application<ServiceContext<AppConfig, AppDeps & TestDeps>>('Gateway')

    await app.setConfig(config)

    await app.setDeps(deps)
    await app.loadDepsFromFolder({ folderName: 'middlewares', nameFormatter: (name: string) => `${name}Middleware` })

    return await app.initialize()
}
