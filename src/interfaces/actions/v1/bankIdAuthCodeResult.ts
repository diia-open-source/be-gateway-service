import { ServiceActionArguments } from '@diia-inhouse/types'

export interface CustomActionArguments extends ServiceActionArguments {
    code: string
    state?: string
    error?: string
    error_description?: string
}
