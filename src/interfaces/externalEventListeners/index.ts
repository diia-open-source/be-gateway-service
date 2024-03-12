export interface MessageError {
    http_code: number
    message: string
    errorCode?: number
    description?: string
    data?: Record<string, unknown>
}

export interface MessagePayload<T = unknown> {
    uuid: string
    error?: MessageError
    response?: T
}
