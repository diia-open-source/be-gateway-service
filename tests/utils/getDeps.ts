import { DepsFactoryFn, MoleculerService, asClass } from '@diia-inhouse/diia-app'

import { EventBus, ExternalEventBus, Queue, ScheduledTask, Task } from '@diia-inhouse/diia-queue'
import { CacheService, StoreService } from '@diia-inhouse/redis'
import TestKit, { mockClass } from '@diia-inhouse/test'

import depsFactory from '@src/deps'

import { TestDeps } from '@tests/interfaces/utils'

import { AppDeps } from '@interfaces/application'
import { AppConfig } from '@interfaces/types/config'

export default async (config: AppConfig): ReturnType<DepsFactoryFn<AppConfig, AppDeps & TestDeps>> => {
    const deps = await depsFactory(config)

    return {
        testKit: asClass(TestKit).singleton(),
        moleculer: asClass(mockClass(MoleculerService)).singleton(),
        queue: asClass(mockClass(Queue)).singleton(),
        scheduledTask: asClass(mockClass(ScheduledTask)).singleton(),
        store: asClass(mockClass(StoreService)).singleton(),
        cache: asClass(mockClass(CacheService)).singleton(),
        externalEventBus: asClass(mockClass(ExternalEventBus)).singleton(),
        eventBus: asClass(mockClass(EventBus)).singleton(),
        task: asClass(mockClass(Task)).singleton(),
        ...deps,
    }
}
