import { ServiceEvents } from 'moleculer'

import { AppApiService, MoleculerService } from '@diia-inhouse/diia-app'

import { CmsService } from '@diia-inhouse/cms'
import { DatabaseService } from '@diia-inhouse/db'
import { QueueDeps } from '@diia-inhouse/diia-queue'
import { HealthCheck } from '@diia-inhouse/healthcheck'
import { HttpDeps } from '@diia-inhouse/http'
import { RedisDeps } from '@diia-inhouse/redis'

import OpenApiGenerator from '@src/apiDocs/openApiGenerator'
import ApiDocsRoute from '@src/apiDocs/route'
import RoutesBuilder from '@src/routes'
import HeaderValidation from '@src/validation/header'

import ExternalEventListenersUtils from '@utils/externalEventListeners'
import TrackingUtils from '@utils/tracking'

import { FaqProvider } from '@interfaces/providers'
import { AppConfig } from '@interfaces/types/config'

export type InternalDeps = {
    trackingUtils: TrackingUtils
    externalEventListenersUtils: ExternalEventListenersUtils
    routesBuilder: RoutesBuilder
    headerValidation: HeaderValidation
    apiService: AppApiService
    apiDocsRoute: ApiDocsRoute
    openApiGenerator: OpenApiGenerator
    openApiNodeConnectedEvent: ServiceEvents
    faqProvider: FaqProvider
    lazyMoleculer: () => MoleculerService
}

export type AppDeps = {
    config: AppConfig
    healthCheck: HealthCheck
    cms: CmsService
    database: DatabaseService
} & InternalDeps &
    QueueDeps &
    RedisDeps &
    HttpDeps
