import { StoreService } from '@diia-inhouse/redis'
import TestKit, { mockClass } from '@diia-inhouse/test'

import GetErrorTemplateByErrorCodeAction from '@actions/v1/errorTemplate/getErrorTemplateByErrorCode'

import ErrorTemplateService from '@services/errorTemplate'

import ErrorTemplateDataMapper from '@dataMappers/errorTemplateDataMapper'

import { CustomActionArguments } from '@interfaces/actions/v1/errorTemplates/getErrorTemplateByErrorCode'
import { ErrorTemplateResult } from '@interfaces/services/errorTemplate'

const ErrorTemplateServiceMock = mockClass(ErrorTemplateService)

describe(`Action ${GetErrorTemplateByErrorCodeAction.constructor.name}`, () => {
    const testKit = new TestKit()
    const errorTemplateService = new ErrorTemplateServiceMock(<ErrorTemplateDataMapper>{}, <StoreService>{})
    const getErrorTemplateByErrorCodeAction = new GetErrorTemplateByErrorCodeAction(errorTemplateService)

    describe('Method `handler`', () => {
        it('should successfully return error template by code', async () => {
            const headers = testKit.session.getHeaders()
            const expectedResult: ErrorTemplateResult = {
                id: 'template-id',
                errorCode: 1111,
                template: {
                    description: 'description',
                },
            }

            const args: CustomActionArguments = {
                headers,
                session: testKit.session.getPartnerSession(),
                params: {
                    errorCode: expectedResult.errorCode,
                },
            }

            jest.spyOn(errorTemplateService, 'fetchErrorTemplateByCode').mockResolvedValueOnce(expectedResult)

            expect(await getErrorTemplateByErrorCodeAction.handler(args)).toEqual(expectedResult)
            expect(errorTemplateService.fetchErrorTemplateByCode).toHaveBeenLastCalledWith(expectedResult.errorCode)
        })
    })
})
