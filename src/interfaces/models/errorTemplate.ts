import { Document } from '@diia-inhouse/db'

export interface ErrorTemplate {
    errorCode: number
    template: {
        description: string
    }
}

export interface ErrorTemplateModel extends ErrorTemplate, Document {}
