import { Document } from 'mongoose'

export interface ErrorTemplate {
    errorCode: number
    template: {
        description: string
    }
}

export interface ErrorTemplateModel extends ErrorTemplate, Document {}
