export enum PublicServiceStatus {
    InDevelopment = 'inDevelopment',
    Inactive = 'inactive',
    Archival = 'archival',
    Active = 'active',
}

interface BasePublicService {
    code: string
    name: string
    status: PublicServiceStatus
}

export interface PublicService extends BasePublicService {
    sortOrder: number
}

export type PublicServiceResponse = BasePublicService
