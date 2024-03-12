import { ServiceActionArguments } from '@diia-inhouse/types'

export interface CustomActionArguments extends ServiceActionArguments {
    encryptedFile: Buffer
    encryptedFileName: string
    encodeData: string
}

export interface ActionResult {
    success: boolean
    error?: string
}
