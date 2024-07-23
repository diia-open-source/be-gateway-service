import type { Context } from 'moleculer'

import { Span } from '@diia-inhouse/diia-app'

import { ErrorCode } from '@diia-inhouse/errors'
import { ActionSession, ActionVersion, FileType, HttpMethod, PlatformType } from '@diia-inhouse/types'

import { ExternalEvent } from '@interfaces/queue'
import { ProcessDataParams } from '@interfaces/services/processData'

export enum ProcessCode {
    AttestationNotPassed = 10101007,
    UploadLimitExceeded = 33101002,
}

export type CustomObject = Record<string, unknown>

export enum ActionCustomHeader {
    ACTION_VERSION = 'actionVersion',
}

export enum RouteHeaderRawName {
    CONTENT_TYPE = 'content-type',
    MOBILE_UID = 'mobile_uid',
    TOKEN = 'authorization',
    APP_VERSION = 'app-version',
    PLATFORM_TYPE = 'platform-type',
    PLATFORM_VERSION = 'platform-version',
    TICKET = 'ticket',
    CHANNEL_UUID = 'channel-uuid',
    APP_PARTNER_ID = 'app-partner-id',
    APP_LOCALE = 'app-locale',
    DOCUMENT_REQUEST_TRACE_ID = 'x-document-request-trace-id',
    CERT = 'cert',
    WEBEX_WEBHOOK_SIGNATURE = 'x-spark-signature',
}

export enum MimeType {
    PDF = 'application/pdf',
    PkixCertificate = 'application/pkix-cert',
    X509Certificate = 'application/x-x509-ca-cert',
    OctetStream = 'application/octet-stream',
    JPEG = 'image/jpeg',
    PNG = 'image/png',
    HEIF = 'image/heif',
    HEIC = 'image/heic',
    MP4 = 'video/mp4',
    MultipartMixed = 'multipart/mixed',
    MultipartFormData = 'multipart/form-data',
}

export enum RouteHeaderName {
    MOBILE_UID = 'mobileUid',
    TOKEN = 'token',
    APP_VERSION = 'appVersion',
    PLATFORM_TYPE = 'platformType',
    PLATFORM_VERSION = 'platformVersion',
    TICKET = 'ticket',
    CHANNEL_UUID = 'channelUuid',
    APP_PARTNER_ID = 'appPartnerId',
    APP_LOCALE = 'appLocale',
    DOCUMENT_REQUEST_TRACE_ID = 'documentRequestTraceId',
}

export interface RequestHeaders {
    traceId?: string
    [RouteHeaderName.MOBILE_UID]?: string
    [RouteHeaderName.APP_VERSION]?: string
    [RouteHeaderName.PLATFORM_TYPE]?: PlatformType
    [RouteHeaderName.TOKEN]?: string | null
    [RouteHeaderName.APP_PARTNER_ID]?: string
    [RouteHeaderName.APP_LOCALE]?: string
    [RouteHeaderName.DOCUMENT_REQUEST_TRACE_ID]?: string
    [RouteHeaderName.PLATFORM_VERSION]?: string
    [RouteHeaderName.CHANNEL_UUID]?: string
    [RouteHeaderName.TICKET]?: string

    [ActionCustomHeader.ACTION_VERSION]: ActionVersion
}

export type ProxyRequestHeaders = RequestHeaders & { 'service-id': string; session?: string }

export interface RequestParams {
    params?: CustomObject
    body: CustomObject
    query: CustomObject
    headers: RequestHeaders
    session?: ActionSession
    redirect?: string
}

export interface File {
    mimetype: MimeType
    originalname: string
    buffer: Buffer
    size: number
}

export interface Route {
    method: HttpMethod
    path: string
    action?: string
}

export interface RequestContextLocals {
    span?: Span
    traceId?: string
    requestStart?: bigint
    serviceName?: string
}

export interface Request {
    $params: RequestParams
    $route: {
        aliases?: Route[]
    }
    $startTime: [number, number]
    $alias?: {
        fullPath: string
        action?: string
        method: HttpMethod
    }
    $ctx: Context<unknown, Record<string, unknown>, RequestContextLocals>
    body: CustomObject
    query: CustomObject
    connection?: CustomObject
    originalUrl?: string
    parsedUrl?: string
    url: string
    headers: {
        'x-forwarded-for'?: string
        [RouteHeaderRawName.MOBILE_UID]?: string
        [RouteHeaderRawName.APP_VERSION]?: string
        [RouteHeaderRawName.TOKEN]?: string
        [RouteHeaderRawName.APP_LOCALE]?: string
        [RouteHeaderRawName.DOCUMENT_REQUEST_TRACE_ID]?: string
        [RouteHeaderRawName.CONTENT_TYPE]?: string
        [RouteHeaderRawName.PLATFORM_TYPE]?: string
        [RouteHeaderRawName.PLATFORM_VERSION]?: string
        [RouteHeaderRawName.CHANNEL_UUID]?: string
        [RouteHeaderRawName.APP_PARTNER_ID]?: string
        [RouteHeaderRawName.TICKET]?: string
        [RouteHeaderRawName.CERT]?: string
        [RouteHeaderRawName.WEBEX_WEBHOOK_SIGNATURE]?: string
    }
    method: HttpMethod
    file?: File
    files?: Record<string, File[]>
    rawBody?: Buffer
}

export interface Response {
    setHeader(name: string, value: CustomObject | string): void
    writeHead(code: number): void
    end(data?: string | Buffer): void
}

export interface ResponseError {
    name: string
    message: string
    code: number
    type?: string
    errorCode?: number
    description?: string
    data?: {
        action?: string
        processCode?: number
        $processDataParams?: Record<string, string> // obsolete, use opProcessDataParams
        opProcessDataParams?: ProcessDataParams
        code?: number
        [key: string]: unknown
    }
}

export type ExternalResponseTransformer = (res: Response, externalResponse: unknown) => string | Buffer

export interface ExternalAlias {
    event: ExternalEvent
    responseTransformer?: ExternalResponseTransformer
}

export interface Proxy {
    serviceId: string
    path?: string
    responseTransformer?: ExternalResponseTransformer
    proxyHeaders?: RouteHeaderRawName[]
}

export interface ResponsePayload {
    $fileType?: FileType
    disposition?: string
    filename?: string
    content?: string
    processCode?: ProcessCode
    $processDataParams?: Record<string, string> // obsolete, use opProcessDataParams
    opProcessDataParams?: ProcessDataParams
    errorCode?: ErrorCode
    error?: ResponseError
}
