import { jsonResponseTransformer } from '@src/utils/transformers'

import { Response } from '@interfaces/index'

describe('Transformers', () => {
    describe(`method: ${jsonResponseTransformer.name}`, () => {
        it('should encode external response into JSON string and set content type header', () => {
            const externalResponse = { message: {} }
            const res = <Response>(<unknown>{
                setHeader: jest.fn(),
            })

            expect(jsonResponseTransformer(res, externalResponse)).toEqual(JSON.stringify(externalResponse))
            expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json; charset=utf-8')
        })
    })
})
