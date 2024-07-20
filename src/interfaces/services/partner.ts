export type PartnerScopes = Record<string, string[]>

export interface GetPartnerByTokenResult {
    _id: string
    scopes: PartnerScopes
}
