import { ValidationSandBox } from '@src/validation/sandbox'

describe(`${ValidationSandBox.name}`, () => {
    describe('method: validate', () => {
        it('should successfully run validation process and return error on second step', () => {
            const expectedResult = new Error('Invalid input')
            const predicateWithoutError = (): Error | undefined => {
                return
            }

            const predicateWithError = (): Error | undefined => expectedResult

            expect(ValidationSandBox.build(predicateWithoutError).next(ValidationSandBox.build(predicateWithError)).validate()).toEqual(
                expectedResult,
            )
        })
    })
})
