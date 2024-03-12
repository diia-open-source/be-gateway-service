jest.mock('@diia-inhouse/diia-app')

import { Application, LoadDepsFromFolderOptions, ServiceContext, ServiceOperator } from '@diia-inhouse/diia-app'

import { bootstrap } from '@src/bootstrap'
import config from '@src/config'
import deps from '@src/deps'

import { AppDeps } from '@interfaces/application'
import { AppConfig } from '@interfaces/types/config'

describe('Bootstrap', () => {
    const app = { Application }
    const appMock = <Application<ServiceContext>>(<unknown>{
        setConfig: jest.fn(),
        setDeps: jest.fn(),
        loadDepsFromFolder: jest.fn(),
        initialize: jest.fn(),
    })
    const appStartMock = jest.fn()
    const serviceName = 'Gateway'

    it('should initialize and start the app', async () => {
        const appSpy = jest.spyOn(app, 'Application').mockReturnValueOnce(appMock)

        jest.spyOn(appMock, 'setConfig').mockReturnThis()
        jest.spyOn(appMock, 'setDeps').mockReturnThis()
        jest.spyOn(appMock, 'loadDepsFromFolder').mockReturnThis()
        jest.spyOn(appMock, 'initialize').mockReturnValueOnce(<ServiceOperator<AppConfig, AppDeps>>(<unknown>{
            start: appStartMock,
            config: { swagger: { isEnabled: false } },
        }))

        await bootstrap(serviceName)

        expect(appSpy).toHaveBeenCalledWith(serviceName)
        expect(appMock.setConfig).toHaveBeenCalledWith(config)
        expect(appMock.setDeps).toHaveBeenCalledWith(deps)
        expect(appMock.loadDepsFromFolder).toHaveBeenCalledWith({ folderName: 'middlewares', nameFormatter: expect.any(Function) })
        expect(appMock.initialize).toHaveBeenCalled()
        expect(appStartMock).toHaveBeenCalled()
    })

    it('should register middlewares from folder', async () => {
        let middlewaresFolderName = ''
        const middlewareNames = ['middleware1', 'middleware2', 'middleware3']
        let middlewareNamesFormatted: string[] = []

        const appSpy = jest.spyOn(app, 'Application').mockReturnValueOnce(appMock)

        jest.spyOn(appMock, 'setConfig').mockReturnThis()
        jest.spyOn(appMock, 'setDeps').mockReturnThis()
        jest.spyOn(appMock, 'loadDepsFromFolder').mockImplementationOnce(({ folderName, nameFormatter }: LoadDepsFromFolderOptions) => {
            middlewaresFolderName = folderName
            middlewareNamesFormatted = middlewareNames.map(<(string: string) => string>nameFormatter)

            return appMock
        })
        jest.spyOn(appMock, 'initialize').mockReturnValueOnce(<ServiceOperator<AppConfig, AppDeps>>(<unknown>{
            start: appStartMock,
            config: { swagger: { isEnabled: false } },
        }))

        await bootstrap(serviceName)

        expect(appSpy).toHaveBeenCalledWith(serviceName)
        expect(middlewaresFolderName).toBe('middlewares')
        expect(middlewareNamesFormatted).toEqual(middlewareNames.map((name) => `${name}Middleware`))
        expect(appStartMock).toHaveBeenCalled()
    })

    it('should call generate open api schemas when swagger is enabled in config', async () => {
        const appSpy = jest.spyOn(app, 'Application').mockReturnValueOnce(appMock)
        const generateOpenApiSchemasMock = jest.fn()

        jest.spyOn(appMock, 'setConfig').mockReturnThis()
        jest.spyOn(appMock, 'setDeps').mockReturnThis()
        jest.spyOn(appMock, 'loadDepsFromFolder').mockReturnThis()
        jest.spyOn(appMock, 'initialize').mockReturnValueOnce(<ServiceOperator<AppConfig, AppDeps>>(<unknown>{
            start: appStartMock,
            config: { swagger: { isEnabled: true } },
            deps: { openApiGenerator: { generateOpenApiSchemas: generateOpenApiSchemasMock } },
        }))

        await bootstrap(serviceName)

        expect(appSpy).toHaveBeenCalledWith(serviceName)
        expect(appStartMock).toHaveBeenCalled()
        expect(generateOpenApiSchemasMock).toHaveBeenCalled()
    })
})
