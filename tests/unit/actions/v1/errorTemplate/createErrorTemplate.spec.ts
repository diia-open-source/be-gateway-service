import { StoreService } from '@diia-inhouse/redis'
import TestKit, { mockClass } from '@diia-inhouse/test'

import CreateErrorTemplateAction from '@actions/v1/errorTemplate/createErrorTemplate'

import ErrorTemplateService from '@services/errorTemplate'

import ErrorTemplateDataMapper from '@dataMappers/errorTemplateDataMapper'

import { CustomActionArguments } from '@interfaces/actions/v1/errorTemplates/createErrorTemplate'
import { ErrorTemplate } from '@interfaces/models/errorTemplate'
import { ErrorTemplateResult } from '@interfaces/services/errorTemplate'

const ErrorTemplateServiceMock = mockClass(ErrorTemplateService)

describe(`Action ${CreateErrorTemplateAction.constructor.name}`, () => {
    const testKit = new TestKit()
    const errorTemplateService = new ErrorTemplateServiceMock(<ErrorTemplateDataMapper>{}, <StoreService>{})
    const createErrorTemplateAction = new CreateErrorTemplateAction(errorTemplateService)

    describe('Method `handler`', () => {
        it('should successfully create error template and return it', async () => {
            const headers = testKit.session.getHeaders()
            const template: ErrorTemplate = {
                errorCode: 1111,
                template: {
                    description: 'description',
                },
            }
            const args: CustomActionArguments = {
                headers,
                session: testKit.session.getPartnerSession(),
                params: template,
            }

            const expectedResult: ErrorTemplateResult = {
                id: 'template-id',
                ...template,
            }

            jest.spyOn(errorTemplateService, 'createErrorTemplate').mockResolvedValueOnce(expectedResult)

            expect(await createErrorTemplateAction.handler(args)).toEqual(expectedResult)
            expect(errorTemplateService.createErrorTemplate).toHaveBeenLastCalledWith(template)
        })
    })
})
