import { asClass } from 'awilix'

import { DepsFactoryFn } from '@diia-inhouse/diia-app'

import { IdentifierService } from '@diia-inhouse/crypto'
import TestKit from '@diia-inhouse/test'

import deps from '@src/deps'

import { TestDeps } from '@tests/interfaces/utils'

import { AppDeps } from '@interfaces/application'
import { AppConfig } from '@interfaces/types/config'

export default (config: AppConfig): ReturnType<DepsFactoryFn<AppConfig, AppDeps & TestDeps>> => {
    return {
        identifier: asClass(IdentifierService, { injector: () => ({ identifierConfig: config.identifier.salt }) }).singleton(),
        testKit: asClass(TestKit).singleton(),
        ...deps(config),
    }
}
