import { camelCase, capitalize, isObject, kebabCase, set, startCase } from 'lodash'
import { OpenAPIV3 } from 'openapi-types'
import { singular } from 'pluralize'

import { ACTION_PARAMS, ACTION_RESPONSE, MoleculerService } from '@diia-inhouse/diia-app'

import { ActionContext, ActionVersion, GenericObject, HttpMethod, HttpStatusCode, PlatformType, SessionType } from '@diia-inhouse/types'
import { ValidationRule } from '@diia-inhouse/validators'

import RoutesBuilder from '@src/routes'

import { RouteHeaderRawName } from '@interfaces/index'
import { AppRoute, CustomHeader, RouteAuthParams } from '@interfaces/routes/appRoute'

export default class OpenApiGenerator {
    specs: Record<string, OpenAPIV3.Document> = {}

    readonly specIncomplete = 'x-incomplete'

    private readonly versionPathParam = ':apiVersion'

    private headers: Partial<Record<RouteHeaderRawName, OpenAPIV3.ParameterObject>> = {
        [RouteHeaderRawName.MOBILE_UID]: {
            in: 'header',
            name: RouteHeaderRawName.MOBILE_UID,
            description: 'Mobile uid to identify each specific mobile device',
            schema: {
                type: 'string',
                format: 'uuid',
                example: 'd85a2569-dbaf-4130-828f-8b5ddfd2512f',
            },
            required: true,
        },
        [RouteHeaderRawName.APP_VERSION]: {
            in: 'header',
            name: RouteHeaderRawName.APP_VERSION,
            description: 'Application version of mobile device',
            schema: {
                type: 'string',
                example: '1.0.1',
            },
            required: true,
        },
        [RouteHeaderRawName.PLATFORM_TYPE]: {
            in: 'header',
            name: RouteHeaderRawName.PLATFORM_TYPE,
            description: 'Application platform (iOS/Android)',
            schema: {
                type: 'string',
                enum: Object.values(PlatformType),
                example: PlatformType.Android,
            },
            required: true,
        },
        [RouteHeaderRawName.PLATFORM_VERSION]: {
            in: 'header',
            name: RouteHeaderRawName.PLATFORM_VERSION,
            description: 'Device platform version',
            schema: {
                type: 'string',
                example: '12',
            },
            required: true,
        },
        [RouteHeaderRawName.CHANNEL_UUID]: {
            in: 'header',
            name: RouteHeaderRawName.CHANNEL_UUID,
            description: 'Channel uuid for client stream',
            schema: {
                type: 'string',
                example:
                    'b61542c962872d5d99f624c89f1ffaf6d09203723d4975be4724ec5b265fd6a57f61e167476b8573d5b3f584be72300f86fef21d917b7ae93f0dda3a3f569207',
            },
            required: true,
        },
    }

    constructor(
        private readonly routesBuilder: RoutesBuilder,

        private readonly lazyMoleculer: () => MoleculerService,
    ) {}

    generateOpenApiSchemas(): void {
        const { services: serviceCatalog } = this.lazyMoleculer().service.broker.registry
        const services = serviceCatalog.services.filter((service: { name: string }) => service.name !== '$node')
        const { servicesRoutes } = this.routesBuilder

        for (const [serviceName, routes] of Object.entries(servicesRoutes)) {
            const service = services.find(({ name }: { name: string }) => name === serviceName)
            const openApi: OpenAPIV3.Document = this.generateOpenApiSchema(serviceName, routes, service)
            const serviceNameKebabCase: string = kebabCase(serviceName)

            this.specs[serviceNameKebabCase] = openApi
        }
    }

    generateOpenApiSchema(serviceName: string, routes: AppRoute[], service?: unknown): OpenAPIV3.Document {
        const openApi = this.prepareOpenApiObject({
            name: startCase(serviceName),
        })

        openApi.tags = this.generateTags(serviceName, routes)

        if (!service) {
            const serviceNotFoundMsg = `Service \`${serviceName}\` is not registered in the broker`

            Reflect.set(openApi, this.specIncomplete, true)
            openApi.info.description = openApi.info.description?.concat(`\n${serviceNotFoundMsg}`) ?? serviceNotFoundMsg
        }

        for (const route of routes) {
            this.generatePathsFromAction(serviceName, openApi, route, service)
        }

        return openApi
    }

    private generatePathsFromAction(serviceName: string, openApi: OpenAPIV3.Document, route: AppRoute, service?: unknown): void {
        const { path: pathTemplate, method, action: actionName, auth, headers = [], metadata, proxyTo } = route
        const { paths } = openApi

        const actionNames: Record<string, string> = {}

        for (const { version } of auth) {
            const versionedPath = pathTemplate.replace(this.versionPathParam, version)

            actionNames[`${serviceName}.${actionName}.${version}`] = this.covertPathToOpenApiSpec(versionedPath)
        }

        for (const [action, path] of Object.entries(actionNames)) {
            const includesVersion = action.match(/\.v\d+$/)
            if (!includesVersion) {
                continue
            }

            const version: ActionVersion = <ActionVersion>includesVersion[0].replaceAll('.', '')
            const descriptionFromActionName = capitalize(startCase(actionName).toLowerCase())
            const description = metadata?.summary ? descriptionFromActionName : ''
            const summary: string = metadata?.summary ?? descriptionFromActionName
            const spec: OpenAPIV3.OperationObject = {
                security: this.setSecurityObject(version, auth),
                responses: {},
                tags: this.setTagsForPath(serviceName, pathTemplate, metadata),
                parameters: [],
                summary,
                description,
                deprecated: metadata?.deprecated ?? false,
            }

            this.addHeaders(version, headers, spec)
            this.addAuthBadges(version, auth, spec)

            const schema: OpenAPIV3.MediaTypeObject['schema'] = { type: 'object', properties: {} }
            const canHaveBody = [HttpMethod.POST, HttpMethod.PATCH, HttpMethod.PUT].includes(method)
            if (canHaveBody) {
                spec.requestBody = {
                    content: {
                        'application/json': {
                            schema,
                        },
                    },
                }
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let serviceAction: any
            if (service) {
                serviceAction = Reflect.get(service, 'actions')[action]
            }

            let isMultipartData = false
            if (serviceAction) {
                this.addResponseSchema(serviceAction, spec)

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { params = {} }: ActionContext<any> = serviceAction[ACTION_PARAMS] || serviceAction.params || {}

                if (params?.type === 'object') {
                    for (const [name, param] of Object.entries<GenericObject>(params?.props)) {
                        const obj: OpenAPIV3.SchemaObject = this.convertValidationParamToOpenApiSchema(param)

                        if (!param.optional) {
                            if (schema.required) {
                                schema.required.push(name)
                            } else {
                                schema.required = [name]
                            }
                        }

                        const isInPath: boolean = path.includes(`{${name}}`)
                        if (isInPath || !canHaveBody) {
                            const optional = Array.isArray(param) ? param.every((item) => item.optional) : param.optional

                            spec.parameters = spec.parameters || []

                            spec.parameters.push({
                                name: (<OpenAPIV3.SchemaObject>param).type === 'array' ? `${name}[]` : name,
                                in: isInPath ? 'path' : 'query',
                                required: !optional,
                                schema: obj,
                            })
                        } else {
                            const haveValidatorBuffer: boolean = this.checkIfParamsWithBuffer(<ValidationRule>param)

                            schema.properties = schema.properties || {}

                            if (haveValidatorBuffer) {
                                schema.properties[name] =
                                    param.type === 'array'
                                        ? { ...obj, type: 'array', items: { type: 'string', format: 'binary' } }
                                        : { ...obj, type: 'string', format: 'binary' }

                                isMultipartData = true
                            } else {
                                schema.properties[name] = obj
                            }
                        }
                    }
                }
            } else if (service && !serviceAction && !proxyTo) {
                spec.deprecated = true
            }

            if (schema.properties && Object.keys(schema.properties).length === 0) {
                delete spec.requestBody
            }

            if (spec.parameters && spec.parameters.length === 0) {
                delete spec.parameters
            }

            if (isMultipartData) {
                this.changeContentType(spec, 'multipart/form-data')
            }

            set(paths, [path, method.toLowerCase()], spec)
        }
    }

    private addResponseSchema(serviceAction: ActionContext, spec: OpenAPIV3.OperationObject): void {
        const schema = Reflect.get(serviceAction, ACTION_RESPONSE)
        if (!schema) {
            return
        }

        const statusCode = HttpStatusCode.OK

        spec.responses[statusCode] = {
            description: '',
            content: { 'application/json': { schema } },
        }
    }

    private addHeaders(version: ActionVersion, headers: CustomHeader[], spec: OpenAPIV3.OperationObject): void {
        const headersToIgnore = new Set([RouteHeaderRawName.TOKEN])
        const filteredHeaders = (headers || [])
            .filter(({ name }) => !headersToIgnore.has(name))
            .filter(({ versions }) => versions.includes(version))
        for (const { name } of filteredHeaders) {
            const header = this.headers[name]

            spec.parameters = spec.parameters || []

            if (header) {
                spec.parameters.push(header)
            } else {
                spec.parameters.push({
                    in: 'header',
                    name,
                    schema: { type: 'string' },
                    required: true,
                })
            }
        }
    }

    private addAuthBadges(version: ActionVersion, auth: RouteAuthParams[], spec: OpenAPIV3.OperationObject): void {
        const authByVersion = auth?.filter((a) => a.version === version)
        for (const authInfo of authByVersion) {
            const { sessionType, sessionTypes, scopes, permissions } = authInfo

            const badges: { label: string; color?: string }[] = []
            const sessionTypeColor = 'green'
            const scopeColor = 'red'
            const permissionColor = 'orange'

            if (sessionType) {
                badges.push({ label: sessionType, color: sessionTypeColor })
            }

            if (sessionTypes) {
                for (const session of sessionTypes) {
                    badges.push({ label: session, color: sessionTypeColor })
                }
            }

            if (scopes) {
                for (const [name, scopeList] of Object.entries(scopes)) {
                    for (const scope of scopeList) {
                        badges.push({ label: `${name}:${scope}`, color: scopeColor })
                    }
                }
            }

            if (permissions) {
                for (const [name, permissionList] of Object.entries(permissions)) {
                    for (const permission of permissionList) {
                        badges.push({ label: `${name}:${permission}`, color: permissionColor })
                    }
                }
            }

            Reflect.set(spec, 'x-badges', badges)
        }
    }

    private setSecurityObject(version: ActionVersion, auth: RouteAuthParams[]): OpenAPIV3.SecurityRequirementObject[] | undefined {
        let security: OpenAPIV3.SecurityRequirementObject[] | undefined = []
        const authByVersion = auth?.filter((a) => a.version === version)
        for (const authInfo of authByVersion) {
            const { sessionType, sessionTypes } = authInfo

            security =
                (sessionTypes?.length === 1 && sessionTypes?.[0] === SessionType.None) || sessionType === SessionType.None
                    ? undefined
                    : [{ 'http-bearer': [] }]
        }

        return security
    }

    private changeContentType(specification: OpenAPIV3.OperationObject, newContentType: string): void {
        const { content } = <OpenAPIV3.RequestBodyObject>specification.requestBody
        const [contentType] = Object.keys(content)

        content[newContentType] = content[`${contentType}`]
        delete content[`${contentType}`]
    }

    private getType(field: GenericObject): string {
        if (['boolean', 'string', 'number', 'array', 'object'].includes(field.type)) {
            return field.type
        }

        return 'string'
    }

    private setFormat(field: ValidationRule): string | undefined {
        if (!isObject(field)) {
            return
        }

        const { type } = field
        const mapper: Partial<Record<typeof type, string>> = {
            objectId: 'string',
            customDate: 'date-time',
            date: 'date-time',
            buffer: 'binary',
            uuid: 'uuid',
            email: 'email',
            enum: 'enum',
        }

        return mapper[type]
    }

    private checkIfParamsWithBuffer(param: ValidationRule): boolean {
        if (typeof param === 'string' || typeof param === 'boolean') {
            return false
        } else if (param.type === 'array') {
            const { items } = param

            if (isObject(items) && items.type === 'object' && isObject(items.props)) {
                return Object.entries(items?.props).some(([, item]) =>
                    !Array.isArray(item) && isObject(item) ? item.type === 'buffer' : false,
                )
            }
        }

        return param.type === 'buffer'
    }

    private convertValidationParamToOpenApiSchema(validationObject: GenericObject): OpenAPIV3.SchemaObject {
        let schema: OpenAPIV3.SchemaObject = {
            enum: validationObject?.enum,
            ...this.setAdditionalProperties(validationObject),
        }

        if (validationObject.type === 'array' && validationObject.items) {
            schema = <OpenAPIV3.ArraySchemaObject>{
                ...schema,
                type: 'array',
                items: this.convertValidationParamToOpenApiSchema(validationObject.items),
            }

            return schema
        }

        schema = <OpenAPIV3.NonArraySchemaObject>{
            ...schema,
            type: this.getType(validationObject),
            format: this.setFormat(<ValidationRule>validationObject),
        }

        if (validationObject.type === 'object' && validationObject.props) {
            schema.properties = {}
            for (const [name, param] of Object.entries<GenericObject>(validationObject.props)) {
                schema.properties[name] = this.convertValidationParamToOpenApiSchema(param)

                if (!param.optional) {
                    if (schema.required) {
                        schema.required.push(name)
                    } else {
                        schema.required = [name]
                    }
                }
            }
        }

        return schema
    }

    private setAdditionalProperties(validationObject: GenericObject): OpenAPIV3.SchemaObject | undefined {
        const type = this.getType(validationObject)
        switch (type) {
            case 'number': {
                return { minimum: validationObject?.min, maximum: validationObject?.max }
            }
            case 'string': {
                return { minLength: validationObject?.min, maxLength: validationObject?.max }
            }
            case 'array': {
                return { minItems: validationObject?.min, maxItems: validationObject?.max }
            }
            // No default
        }
    }

    private covertPathToOpenApiSpec(path: string): string {
        return path.replaceAll(/:(\w+)/g, '{$1}')
    }

    private setTagsForPath(serviceName: string, path: string, metadata?: AppRoute['metadata']): string[] {
        const tags: Set<string> = new Set()
        const [tagNames = [], prefix] = this.setTagsWithoutPrefixForRoute(serviceName, path, metadata) || []

        for (const tagName of tagNames) {
            tags.add(prefix ? `${prefix}/${tagName}` : tagName)
        }

        return Array.from(tags)
    }

    private generateTags(serviceName: string, routes: AppRoute[]): OpenAPIV3.TagObject[] {
        const tags: Set<string> = new Set()
        const tagsWithPrefix: Set<string> = new Set()

        for (const { path, metadata } of routes) {
            const [tagNames = [], prefix] = this.setTagsWithoutPrefixForRoute(serviceName, path, metadata) || []

            for (const tagName of tagNames) {
                if (prefix) {
                    tagsWithPrefix.add(`${prefix}/${tagName}`)
                } else {
                    tags.add(tagName)
                }
            }
        }

        const groupedTags: Record<string, string[]> = {}
        const tagsWithPrefixArray: string[] = Array.from(tagsWithPrefix)

        for (const tag of tagsWithPrefixArray) {
            const prefixName: string = tag.split('/', 1)[0]
            if (groupedTags[prefixName]) {
                groupedTags[prefixName].push(tag)
            } else {
                groupedTags[prefixName] = [tag]
            }
        }

        return [...Array.from(tags), ...Object.values(groupedTags).flat()].map((tag) => ({ name: tag }))
    }

    private setTagsWithoutPrefixForRoute(
        serviceName: string,
        path: string,
        metadata: AppRoute['metadata'],
    ): [string[], string] | undefined {
        const pathParts: string[] = path.split('/')
        const pathPrefix = pathParts.find(Boolean)
        let prefix = ''
        if (pathPrefix !== 'api') {
            const prefixName: string = camelCase(singular(pathPrefix || ''))

            prefix = prefixName[0].toUpperCase() + prefixName.slice(1)
        }

        if (metadata?.tags?.length) {
            return [metadata.tags, prefix]
        }

        let serviceKebabCaseName: string = kebabCase(serviceName)
        if (serviceName === 'DocumentAcquirers') {
            serviceKebabCaseName = 'acquirers'
        }

        const versionIndex: number = pathParts.indexOf(this.versionPathParam)

        if (versionIndex !== -1) {
            let tagPartIndex: number = versionIndex + 1
            if (pathParts[versionIndex + 1] === serviceKebabCaseName) {
                tagPartIndex = versionIndex + 2
            }

            const tagPart: string = pathParts[tagPartIndex]
            if (tagPart) {
                const tagName: string = startCase(singular(tagPart))

                return [[tagName], prefix]
            }
        }
    }

    private prepareOpenApiObject(opts: { name?: string } = {}): OpenAPIV3.Document {
        const openApiObject: OpenAPIV3.Document = {
            openapi: '3.0.3',
            info: {
                version: '1.0.0',
                title: opts.name || '',
            },
            components: {
                schemas: {},
                parameters: { ...this.headers },
                securitySchemes: {
                    'http-bearer': { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
                },
            },
            paths: {},
        }

        return openApiObject
    }
}
