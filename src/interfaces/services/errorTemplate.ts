import { ErrorTemplate } from '@interfaces/models/errorTemplate'

export interface ErrorTemplateFileItem {
    errorCode: number
    template: ErrorTemplate
}

export interface ErrorTemplateResult extends ErrorTemplate {
    id: string
}

export interface ErrorTemplateListResult {
    errorTemplates: ErrorTemplateResult[]
    total: number
}

export interface GetErrorTemplatesListOptions {
    skip: number
    limit: number
}
