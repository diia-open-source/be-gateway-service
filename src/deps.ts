import formidable from 'formidable'
import { once } from 'lodash'

import { AwilixContainer, DepsFactoryFn, Lifetime, NameAndRegistrationPair, asClass, asFunction, asValue } from '@diia-inhouse/diia-app'

import { CmsService } from '@diia-inhouse/cms'
import { HttpDeps, HttpService } from '@diia-inhouse/http'
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

export default async (config: AppConfig): ReturnType<DepsFactoryFn<AppConfig, AppDeps>> => {
    const { strapi } = config

    const internalDeps: NameAndRegistrationPair<InternalDeps> = {
        trackingUtils: asClass(TrackingUtils).singleton(),
        externalEventListenersUtils: asClass(ExternalEventListenersUtils).singleton(),
        routesBuilder: asClass(RoutesBuilder).singleton(),
        headerValidation: asClass(HeaderValidation).singleton(),
        apiService: asFunction(apiService).singleton(),
        apiDocsRoute: asClass(ApiDocsRoute).singleton(),
        openApiGenerator: asClass(OpenApiGenerator).singleton(),
        openApiNodeConnectedEvent: asFunction(openApiNodeConnectedEvent).singleton(),
        faqProvider: strapi.isEnabled ? asClass(StrapiFaqProvider).singleton() : asClass(MongodbFaqProvider).singleton(),
        lazyMoleculer: {
            resolve: (c: AwilixContainer) => once(() => c.resolve('moleculer')),
            lifetime: Lifetime.SINGLETON,
        },
        formidable: asValue(formidable),
    }

    const httpDeps: NameAndRegistrationPair<HttpDeps> = {
        httpService: asClass(HttpService, { injector: () => ({ protocol: HttpProtocol.Http }) }).singleton(),
        httpsService: asClass(HttpService, { injector: () => ({ protocol: HttpProtocol.Https }) }).singleton(),
    }

    return {
        cms: asClass(CmsService, { injector: () => ({ cmsConfig: strapi }) }).singleton(),

        ...internalDeps,
        ...httpDeps,
    }
}
