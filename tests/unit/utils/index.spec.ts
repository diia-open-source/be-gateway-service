import { AccessDeniedError } from '@diia-inhouse/errors'

import Utils from '@src/utils'

import { Request, ResponseError } from '@interfaces/index'

describe('Utils', () => {
    describe(`method: ${Utils.calculateResponseTime.name}`, () => {
        it.each([
            [5000, 5],
            [6000, 6],
            [10000, 10],
        ])(
            'should calculate and return response time %s when start time is %s seconds before now',
            (expectedTime, startTimeDeltaInSeconds) => {
                const [startTimeSeconds, startTimeNanoseconds] = process.hrtime()

                expect(
                    Utils.calculateResponseTime(<Request>{
                        $startTime: [startTimeSeconds - startTimeDeltaInSeconds, startTimeNanoseconds],
                    }),
                ).toBe(expectedTime)
            },
        )

        it('should return 0 response time in case start time is undefined', () => {
            expect(Utils.calculateResponseTime(<Request>{})).toBe(0)
        })
    })

    describe(`method: ${Utils.handleValidationError.name}`, () => {
        it.each([
            [
                'should not change error in case error name is not validation error',
                { name: 'InternalError', data: [] },
                { name: 'InternalError', data: [] },
            ],
            [
                'should not change error in case error name is validation error but data is not a list of errors',
                { name: 'ValidationError', data: {} },
                { name: 'ValidationError', data: {} },
            ],
            [
                'should not change error in case error name is validation error but list of errors is empty',
                { name: 'ValidationError', data: [] },
                { name: 'ValidationError', data: [] },
            ],
            [
                'should not change error in case error name is validation error but error inside list of errors does not contain field name',
                { name: 'ValidationError', data: [{ message: 'Invalid unknown field' }] },
                { name: 'ValidationError', data: [{ message: 'Invalid unknown field' }] },
            ],
            [
                'should not change error in case error name is validation error but error inside list of errors contain field name without `params.`',
                { name: 'ValidationError', data: [{ field: 'id', message: 'Invalid id field' }] },
                { name: 'ValidationError', data: [{ field: 'id', message: 'Invalid id field' }] },
            ],
            [
                'should remove `.params` from errors inside list of errors',
                { name: 'ValidationError', data: [{ field: 'params.id', message: 'Invalid params.id field' }] },
                { name: 'ValidationError', data: [{ field: 'id', message: 'Invalid id field' }] },
            ],
        ])('%s', (_msg, inputError, expectedError) => {
            Utils.handleValidationError(<ResponseError>inputError)

            expect(inputError).toEqual(expectedError)
        })
    })

    describe(`method: ${Utils.isErrorCode.name}`, () => {
        it.each([
            [1000, true],
            [1001, true],
            [100, false],
            [10000, false],
        ])('isErrorCode(%s) should return %s', (code, expectedResult) => {
            expect(Utils.isErrorCode(code)).toBe(expectedResult)
        })
    })

    describe(`method: ${Utils.isResponseError}`, () => {
        it.each([
            [1000, false],
            ['1001', false],
            [null, false],
            [undefined, false],
            [[], false],
            [{}, false],
            [{ code: 1000 }, false],
            [{ message: 'Unknown error' }, false],
            [{ code: 400, message: 'Bad Request' }, true],
        ])('isResponseError(%s) should return %s', (error, expectedResult) => {
            expect(Utils.isResponseError(error)).toBe(expectedResult)
        })
    })

    describe(`method: ${Utils.isError}`, () => {
        it.each([
            [new Error('Service error'), true],
            [null, false],
            [undefined, false],
            [[], false],
            [{}, false],
            [{ code: 400, message: 'Bad Request' }, false],
        ])('isError(%s) should return %s', (error, expectedResult) => {
            expect(Utils.isError(error)).toBe(expectedResult)
        })
    })

    describe(`method: ${Utils.isErrorWithCode}`, () => {
        it.each([
            [new AccessDeniedError('Access denied', {}, 1000), true],
            [null, false],
            [undefined, false],
            [[], false],
            [{}, false],
            [{ code: 400, message: 'Bad Request' }, false],
        ])('isError(%s) should return %s', (error, expectedResult) => {
            expect(Utils.isErrorWithCode(error)).toBe(expectedResult)
        })
    })
})
