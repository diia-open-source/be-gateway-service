import { AuthConfig as CoreAuthConfig } from '@diia-inhouse/crypto'

interface MinioConfigDisabled {
    isEnabled: false
    host: undefined
    port: undefined
    accessKey: undefined
    secretKey: undefined
}

interface MinioConfigEnabled {
    isEnabled: true
    host: string
    port: number
    accessKey: string
    secretKey: string
}

export type MinioConfig = MinioConfigDisabled | MinioConfigEnabled

export interface AuthConfig extends CoreAuthConfig {
    authHeader: string
    authSchema: string
    deviceHeaderUuidVersions: string[]
}
