import { ErrorTemplateModel } from '@interfaces/models/errorTemplate'
import { ErrorTemplateResult } from '@interfaces/services/errorTemplate'

export default class ErrorTemplateDataMapper {
    toEntity(model: ErrorTemplateModel): ErrorTemplateResult {
        const { _id: id, errorCode, template } = model
        const result: ErrorTemplateResult = {
            id: id.toString(),
            errorCode,
            template,
        }

        return result
    }
}
