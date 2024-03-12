import { ProfileFeature } from '@diia-inhouse/types'
import { ValidationRule } from '@diia-inhouse/validators'

import { FaqParameterType } from '@interfaces/models/faqCategory'

export const getFaqCategoryRule = (optional = false): ValidationRule => {
    return {
        type: 'object',
        props: {
            code: { type: 'string', optional },
            name: { type: 'string', optional },
            features: {
                type: 'array',
                optional: true,
                items: { type: 'string', enum: Object.values(ProfileFeature) },
            },
            faq: {
                type: 'array',
                optional,
                items: {
                    type: 'object',
                    props: {
                        question: { type: 'string' },
                        answer: { type: 'string' },
                        parameters: {
                            type: 'array',
                            items: {
                                type: 'object',
                                props: {
                                    type: { type: 'string', enum: Object.values(FaqParameterType) },
                                    data: {
                                        type: 'object',
                                        props: {
                                            name: { type: 'string' },
                                            alt: { type: 'string' },
                                            resource: { type: 'string' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    }
}
