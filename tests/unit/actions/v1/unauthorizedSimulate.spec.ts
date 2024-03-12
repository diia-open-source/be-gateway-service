import DiiaLogger from '@diia-inhouse/diia-logger'
import { EnvService } from '@diia-inhouse/env'
import { UnauthorizedError } from '@diia-inhouse/errors'
import { CacheService, RedisConfig } from '@diia-inhouse/redis'
import TestKit, { mockClass } from '@diia-inhouse/test'

import UnauthorizedSimulateAction from '@actions/v1/unauthorizedSimulate'

import { CustomActionArguments } from '@interfaces/actions/v1/unauthorizedSimulate'

const CacheServiceMock = mockClass(CacheService)

describe(`Action ${UnauthorizedSimulateAction.constructor.name}`, () => {
    const testKit = new TestKit()
    const cacheService = new CacheServiceMock(<RedisConfig>{}, <EnvService>{}, <DiiaLogger>{})
    const unauthorizedSimulateAction = new UnauthorizedSimulateAction(cacheService)

    describe('Method `handler`', () => {
        it('should return status ok', async () => {
            const headers = testKit.session.getHeaders()
            const args: CustomActionArguments = {
                headers,
                session: testKit.session.getUserSession(),
            }
            const redisKey = unauthorizedSimulateAction.cachePrefix + args.session.user.mobileUid

            jest.spyOn(cacheService, 'get').mockResolvedValueOnce('0')
            jest.spyOn(cacheService, 'set').mockResolvedValueOnce('true')

            expect(await unauthorizedSimulateAction.handler(args)).toEqual({ status: 'ok' })
            expect(cacheService.get).toHaveBeenCalledWith(redisKey)
            expect(cacheService.set).toHaveBeenCalledWith(redisKey, '1')
        })
        it('should fail with error in case is unauth', async () => {
            const headers = testKit.session.getHeaders()
            const args: CustomActionArguments = {
                headers,
                session: testKit.session.getUserSession(),
            }
            const redisKey = unauthorizedSimulateAction.cachePrefix + args.session.user.mobileUid

            jest.spyOn(cacheService, 'get').mockResolvedValueOnce('1')
            jest.spyOn(cacheService, 'set').mockResolvedValueOnce('true')

            await expect(async () => {
                await unauthorizedSimulateAction.handler(args)
            }).rejects.toEqual(new UnauthorizedError())
            expect(cacheService.get).toHaveBeenCalledWith(redisKey)
            expect(cacheService.set).toHaveBeenCalledWith(redisKey, '0')
        })
    })
})
