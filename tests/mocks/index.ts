import { AsyncLocalStorage } from 'node:async_hooks'

import DiiaLogger from '@diia-inhouse/diia-logger'
import { QueueContext } from '@diia-inhouse/diia-queue'
import { mockClass } from '@diia-inhouse/test'

export const logger = new (mockClass(DiiaLogger))()

export const asyncLocalStorageMock = <AsyncLocalStorage<QueueContext>>(<unknown>{
    getStore: jest.fn(),
})
