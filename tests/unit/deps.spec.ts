import depsFactory from '@src/deps'

import { AppConfig } from '@interfaces/types/config'

describe('Deps', () => {
    it('should return dependencies', () => {
        const config = <AppConfig>{ strapi: {} }

        const result = depsFactory(config)

        expect(result).toEqual({
            moleculer: expect.any(Object),
            config: expect.any(Object),
            logger: expect.any(Object),
            cms: expect.any(Object),
            healthCheck: expect.any(Object),
            database: expect.any(Object),
            externalEventListenersUtils: expect.any(Object),
            routesBuilder: expect.any(Object),
            headerValidation: expect.any(Object),
            apiService: expect.any(Object),
            apiDocsRoute: expect.any(Object),
            openApiGenerator: expect.any(Object),
            openApiNodeConnectedEvent: expect.any(Object),
            faqProvider: expect.any(Object),
            lazyMoleculer: expect.any(Object),
            auth: expect.any(Object),
            queue: expect.any(Object),
            eventMessageHandler: expect.any(Object),
            eventMessageValidator: expect.any(Object),
            eventBus: expect.any(Object),
            scheduledTask: expect.any(Object),
            externalEventBus: expect.any(Object),
            external: expect.any(Object),
            externalChannel: expect.any(Object),
            httpService: expect.any(Object),
            httpsService: expect.any(Object),
            cache: expect.any(Object),
            pubsub: expect.any(Object),
            store: expect.any(Object),
            redlock: expect.any(Object),
            trackingUtils: expect.any(Object),
        })
    })
})
