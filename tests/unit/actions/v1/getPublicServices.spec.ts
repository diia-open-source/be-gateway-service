import DiiaLogger from '@diia-inhouse/diia-logger'
import { CacheService } from '@diia-inhouse/redis'
import { mockClass } from '@diia-inhouse/test'
import { PublicServiceCode } from '@diia-inhouse/types'

import PublicServiceDataMapper from '@src/dataMappers/publicServiceDataMapper'

import GetPublicServicesAction from '@actions/v1/getPublicServices'

import PublicServicesListService from '@services/publicServicesList'

import { PublicServiceResponse, PublicServiceStatus } from '@interfaces/services/publicServicesList'

const PublicServicesListServiceMock = mockClass(PublicServicesListService)

describe(`Action ${GetPublicServicesAction.constructor.name}`, () => {
    const publicServicesListService = new PublicServicesListServiceMock(<PublicServiceDataMapper>{}, <CacheService>{}, <DiiaLogger>{})
    const getPublicServicesAction = new GetPublicServicesAction(publicServicesListService)

    describe('Method `handler`', () => {
        it('should successfully return list of public services', async () => {
            const expectedResult: PublicServiceResponse[] = [
                {
                    code: PublicServiceCode.criminalRecordCertificate,
                    name: 'criminalRecordCertificate',
                    status: PublicServiceStatus.Active,
                },
            ]

            jest.spyOn(publicServicesListService, 'getPublicServices').mockResolvedValueOnce(expectedResult)

            expect(await getPublicServicesAction.handler()).toEqual({ publicServices: expectedResult })
            expect(publicServicesListService.getPublicServices).toHaveBeenCalledWith()
        })
    })
})
