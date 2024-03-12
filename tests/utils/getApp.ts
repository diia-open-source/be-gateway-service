import { asClass } from 'awilix'

import { Application, MoleculerService, ServiceContext, ServiceOperator } from '@diia-inhouse/diia-app'

import { EventBus, ExternalEventBus, Queue, ScheduledTask, Task } from '@diia-inhouse/diia-queue'
import { CacheService, StoreService } from '@diia-inhouse/redis'
import { mockClass } from '@diia-inhouse/test'

import config from '@src/config'

import { TestDeps } from '@tests/interfaces/utils'
import deps from '@tests/utils/getDeps'

import { AppDeps } from '@interfaces/application'
import { AppConfig } from '@interfaces/types/config'

export async function getApp(): Promise<ServiceOperator<AppConfig, AppDeps & TestDeps>> {
    const app = new Application<ServiceContext<AppConfig, AppDeps & TestDeps>>('Gateway')

    await app.setConfig(config)

    app.setDeps(deps)
    app.loadDepsFromFolder({ folderName: 'middlewares', nameFormatter: (name: string) => `${name}Middleware` })
    app.overrideDeps({
        moleculer: asClass(mockClass(MoleculerService)).singleton(),
        queue: asClass(mockClass(Queue)).singleton(),
        scheduledTask: asClass(mockClass(ScheduledTask)).singleton(),
        store: asClass(mockClass(StoreService)).singleton(),
        cache: asClass(mockClass(CacheService)).singleton(),
        externalEventBus: asClass(mockClass(ExternalEventBus)).singleton(),
        eventBus: asClass(mockClass(EventBus)).singleton(),
        task: asClass(mockClass(Task)).singleton(),
    })

    return app.initialize()
}
