import { formidable } from 'formidable'
import type { ServiceEvents } from 'moleculer'

import { AppApiService, MoleculerService } from '@diia-inhouse/diia-app'

import { CmsService } from '@diia-inhouse/cms'
import { HttpDeps } from '@diia-inhouse/http'

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
    formidable: typeof formidable
}

export type AppDeps = {
    config: AppConfig
    cms: CmsService
} & InternalDeps &
    HttpDeps
