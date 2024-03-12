import { Document } from 'mongoose'

import { ProfileFeature, SessionType } from '@diia-inhouse/types'

export enum FaqParameterType {
    Link = 'link',
    Phone = 'phone',
    Email = 'email',
}

export interface FaqParameter {
    type: FaqParameterType
    data: {
        name: string
        alt: string
        resource: string
    }
}

export interface FaqItem {
    question: string
    answer: string
    parameters: FaqParameter[]
    subFeatures: string[]
}

export interface FaqCategory {
    code: string
    name: string
    sessionType: SessionType
    faq: FaqItem[]
    features?: ProfileFeature[]
    order: number
}

export interface FaqCategoryModel extends FaqCategory, Document {
    createdAt?: Date
}
