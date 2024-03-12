import { ValidationPredicate } from '@interfaces/validation/sandbox'

export class ValidationSandBox {
    private error: Error | undefined

    private nextValidator: ValidationSandBox | null = null

    constructor(private readonly predicate: ValidationPredicate) {}

    next(validator: ValidationSandBox): ValidationSandBox {
        this.nextValidator = validator

        return this
    }

    validate(): Error | undefined {
        this.error = this.predicate()

        if (!this.error && this.nextValidator) {
            return this.nextValidator.validate()
        }

        return this.error
    }

    static build(predicate: ValidationPredicate): ValidationSandBox {
        return new ValidationSandBox(predicate)
    }
}
