export interface MoleculerAliases {
    [name: string]: unknown[]
}

export interface BuildRoutesResult {
    aliases: MoleculerAliases
    preserveRawBodyIn: string[]
}
