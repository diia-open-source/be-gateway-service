export interface EventPayloadRequest extends Record<string, unknown> {
    partnerId: string
}

export interface EventPayload {
    uuid: string
    request: EventPayloadRequest
}
