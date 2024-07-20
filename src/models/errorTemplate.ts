import { Model, Schema, model, models } from '@diia-inhouse/db'

import { ErrorTemplate } from '@interfaces/models/errorTemplate'

const errorTemplateSchema = new Schema<ErrorTemplate>(
    {
        errorCode: { type: Number, unique: true, required: true },
        template: {
            description: { type: String, required: true },
        },
    },
    {
        timestamps: true,
    },
)

export default <Model<ErrorTemplate>>models.ErrorTemplate || model('ErrorTemplate', errorTemplateSchema)
