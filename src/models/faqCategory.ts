import { Model, Schema, model, models } from '@diia-inhouse/db'
import { ProfileFeature, SessionType } from '@diia-inhouse/types'

import { FaqCategory, FaqItem, FaqParameter, FaqParameterType } from '@interfaces/models/faqCategory'

const faqParameterSchema = new Schema<FaqParameter>(
    {
        type: { type: String, enum: Object.values(FaqParameterType), required: true },
        data: {
            name: { type: String, required: true },
            alt: { type: String, required: true },
            resource: { type: String, required: true },
        },
    },
    {
        _id: false,
    },
)

const faqItemSchema = new Schema<FaqItem>(
    {
        question: { type: String, required: true },
        answer: { type: String, required: true },
        parameters: { type: [faqParameterSchema] },
        subFeatures: { type: [String], default: [] },
    },
    {
        _id: false,
    },
)

export const faqCategorySchema = new Schema<FaqCategory>(
    {
        code: { type: String, required: true },
        name: { type: String, required: true },
        faq: { type: [faqItemSchema], required: true },
        features: { type: [String], enum: Object.values(ProfileFeature), default: [] },
        sessionType: { type: String, enum: Object.values(SessionType), required: true },
        order: { type: Number, default: 1000 },
    },
    {
        _id: false,
    },
)

faqCategorySchema.index({ code: 1, sessionType: 1 }, { unique: true })

export default <Model<FaqCategory>>models.FaqCategory || model('FaqCategory', faqCategorySchema)
