import { AwilixContainer, Lifetime, asClass, asFunction, asValue } from 'awilix'
import { once } from 'lodash'
import { ServiceEvents } from 'moleculer'

import { DepsFactoryFn, DepsResolver, MoleculerService } from '@diia-inhouse/diia-app'

import { CmsService } from '@diia-inhouse/cms'
import { AuthService, CryptoDeps } from '@diia-inhouse/crypto'
import { DatabaseService, DbType } from '@diia-inhouse/db'
import DiiaLogger from '@diia-inhouse/diia-logger'
import {
    EventBus,
    EventMessageHandler,
    EventMessageValidator,
    ExternalCommunicator,
    ExternalCommunicatorChannel,
    ExternalEventBus,
    Queue,
    QueueDeps,
    ScheduledTask,
    ScheduledTaskQueueName,
} from '@diia-inhouse/diia-queue'
import { HealthCheck } from '@diia-inhouse/healthcheck'
import { HttpDeps, HttpService } from '@diia-inhouse/http'
import { CacheService, PubSubService, RedisDeps, RedlockService, StoreService } from '@diia-inhouse/redis'
import { HttpProtocol } from '@diia-inhouse/types'

import OpenApiGenerator from './apiDocs/openApiGenerator'
import openApiNodeConnectedEvent from './apiDocs/openApiNodeConnectedEvent'
import ApiDocsRoute from './apiDocs/route'
import apiService from './apiService'
import RoutesBuilder from './routes'
import HeaderValidation from './validation/header'

import MongodbFaqProvider from '@src/providers/faq/mongodbFaqProvider'
import StrapiFaqProvider from '@src/providers/faq/strapiFaqProvider'

import ExternalEventListenersUtils from '@utils/externalEventListeners'
import TrackingUtils from '@utils/tracking'

import { AppDeps, InternalDeps } from '@interfaces/application'
import { AppConfig } from '@interfaces/types/config'

export default (config: AppConfig): ReturnType<DepsFactoryFn<AppConfig, AppDeps>> => {
    const { redis, store, rabbit, db, healthCheck, strapi, auth } = config

    const internalDeps: DepsResolver<InternalDeps> = {
        trackingUtils: asClass(TrackingUtils).singleton(),
        externalEventListenersUtils: asClass(ExternalEventListenersUtils).singleton(),
        routesBuilder: asClass(RoutesBuilder).singleton(),
        headerValidation: asClass(HeaderValidation).singleton(),
        apiService: asFunction(apiService).singleton(),
        apiDocsRoute: asClass(ApiDocsRoute).singleton(),
        openApiGenerator: asClass(OpenApiGenerator).singleton(),
        openApiNodeConnectedEvent: asFunction(openApiNodeConnectedEvent).singleton(),
        faqProvider: config.strapi.isEnabled ? asClass(StrapiFaqProvider).singleton() : asClass(MongodbFaqProvider).singleton(),
        lazyMoleculer: {
            resolve: (c: AwilixContainer) => once(() => c.resolve('moleculer')),
            lifetime: Lifetime.SINGLETON,
        },
    }

    const cryptoDeps: DepsResolver<CryptoDeps> = {
        auth: asClass(AuthService, { injector: () => ({ authConfig: auth }) }).singleton(),
    }

    const queueDeps: DepsResolver<QueueDeps> = {
        queue: asClass(Queue, { injector: () => ({ connectionConfig: rabbit }) }).singleton(),
        eventMessageHandler: asClass(EventMessageHandler).singleton(),
        eventMessageValidator: asClass(EventMessageValidator).singleton(),
        eventBus: asClass(EventBus, { injector: (c) => ({ queueProvider: c.resolve<Queue>('queue').getInternalQueue() }) }).singleton(),
        scheduledTask: asClass(ScheduledTask, {
            injector: (c) => ({
                queueProvider: c.resolve<Queue>('queue').getInternalQueue(),
                queueName: ScheduledTaskQueueName.ScheduledTasksQueueGateway,
            }),
        }).singleton(),
        externalEventBus: asClass(ExternalEventBus, {
            injector: (c) => ({ queueProvider: c.resolve<Queue>('queue').getExternalQueue() }),
        }).singleton(),
        external: asClass(ExternalCommunicator).singleton(),
        externalChannel: asClass(ExternalCommunicatorChannel).singleton(),
    }

    const redisDeps: DepsResolver<RedisDeps> = {
        cache: asClass(CacheService, { injector: () => ({ redisConfig: redis }) }).singleton(),
        pubsub: asClass(PubSubService, { injector: () => ({ redisConfig: redis }) }).singleton(),
        store: asClass(StoreService, { injector: () => ({ storeConfig: store }) }).singleton(),
        redlock: asClass(RedlockService, { injector: () => ({ storeConfig: store }) }).singleton(),
    }

    const httpDeps: DepsResolver<HttpDeps> = {
        httpService: asClass(HttpService, { injector: () => ({ protocol: HttpProtocol.Http }) }).singleton(),
        httpsService: asClass(HttpService, { injector: () => ({ protocol: HttpProtocol.Https }) }).singleton(),
    }

    return {
        moleculer: asClass(MoleculerService, {
            injector: (c) => ({
                apiService: c.resolve('apiService'),
                moleculerEvents: { ...c.resolve<ServiceEvents>('openApiNodeConnectedEvent') },
            }),
        }).singleton(),

        config: asValue(config),
        logger: asClass(DiiaLogger, { injector: () => ({ options: { logLevel: process.env.LOG_LEVEL } }) }).singleton(),
        cms: asClass(CmsService, { injector: () => ({ cmsConfig: strapi }) }).singleton(),
        healthCheck: asClass(HealthCheck, { injector: (c) => ({ container: c.cradle, healthCheckConfig: healthCheck }) }).singleton(),
        database: asClass(DatabaseService, { injector: () => ({ dbConfigs: { [DbType.Main]: db } }) }).singleton(),

        ...internalDeps,
        ...cryptoDeps,
        ...queueDeps,
        ...httpDeps,
        ...redisDeps,
    }
}
