import { StoreService } from '@diia-inhouse/redis'
import TestKit, { mockClass } from '@diia-inhouse/test'

import GetErrorTemplatesListAction from '@actions/v1/errorTemplate/getErrorTemplatesList'

import ErrorTemplateService from '@services/errorTemplate'

import ErrorTemplateDataMapper from '@dataMappers/errorTemplateDataMapper'

import { CustomActionArguments } from '@interfaces/actions/v1/errorTemplates/getErrorTemplatesList'
import { ErrorTemplateListResult } from '@interfaces/services/errorTemplate'

const ErrorTemplateServiceMock = mockClass(ErrorTemplateService)

describe(`Action ${GetErrorTemplatesListAction.constructor.name}`, () => {
    const testKit = new TestKit()
    const errorTemplateService = new ErrorTemplateServiceMock(<ErrorTemplateDataMapper>{}, <StoreService>{})
    const getErrorTemplatesListAction = new GetErrorTemplatesListAction(errorTemplateService)

    describe('Method `handler`', () => {
        it('should successfully return error templates list', async () => {
            const headers = testKit.session.getHeaders()
            const expectedResult: ErrorTemplateListResult = {
                errorTemplates: [
                    {
                        id: 'template-id',
                        errorCode: 1111,
                        template: {
                            description: 'description',
                        },
                    },
                ],
                total: 1,
            }

            const args: CustomActionArguments = {
                headers,
                session: testKit.session.getPartnerSession(),
                params: {
                    limit: 10,
                    skip: 0,
                },
            }

            jest.spyOn(errorTemplateService, 'getErrorTemplatesList').mockResolvedValueOnce(expectedResult)

            expect(await getErrorTemplatesListAction.handler(args)).toEqual(expectedResult)
            expect(errorTemplateService.getErrorTemplatesList).toHaveBeenLastCalledWith({
                skip: args.params.skip,
                limit: args.params.limit,
            })
        })
    })
})
