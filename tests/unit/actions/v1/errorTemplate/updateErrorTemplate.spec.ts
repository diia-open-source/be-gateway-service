import { StoreService } from '@diia-inhouse/redis'
import TestKit, { mockClass } from '@diia-inhouse/test'

import UpdateErrorTemplateAction from '@actions/v1/errorTemplate/updateErrorTemplate'

import ErrorTemplateService from '@services/errorTemplate'

import ErrorTemplateDataMapper from '@dataMappers/errorTemplateDataMapper'

import { CustomActionArguments } from '@interfaces/actions/v1/errorTemplates/updateErrorTemplate'
import { ErrorTemplateResult } from '@interfaces/services/errorTemplate'

const ErrorTemplateServiceMock = mockClass(ErrorTemplateService)

describe(`Action ${UpdateErrorTemplateAction.constructor.name}`, () => {
    const testKit = new TestKit()
    const errorTemplateService = new ErrorTemplateServiceMock(<ErrorTemplateDataMapper>{}, <StoreService>{})
    const updateErrorTemplateAction = new UpdateErrorTemplateAction(errorTemplateService)

    describe('Method `handler`', () => {
        it('should successfully update and return error template', async () => {
            const headers = testKit.session.getHeaders()
            const template: ErrorTemplateResult = {
                id: 'template-id',
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

            jest.spyOn(errorTemplateService, 'updateErrorTemplate').mockResolvedValueOnce(template)

            expect(await updateErrorTemplateAction.handler(args)).toEqual(template)
            expect(errorTemplateService.updateErrorTemplate).toHaveBeenLastCalledWith(template)
        })
    })
})
