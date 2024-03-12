import { HttpStatusCode, SessionType } from '@diia-inhouse/types'

export const expectedAuthResponse = {
    auth: {
        openapi: '3.0.3',
        info: { version: '1.0.0', title: 'Auth', description: 'Service `Auth` is not registered in the broker' },
        components: {
            schemas: {},
            parameters: {
                mobile_uid: {
                    in: 'header',
                    name: 'mobile_uid',
                    description: 'Mobile uid to identify each specific mobile device',
                    schema: { type: 'string', format: 'uuid', example: 'd85a2569-dbaf-4130-828f-8b5ddfd2512f' },
                    required: true,
                },
                'app-version': {
                    in: 'header',
                    name: 'app-version',
                    description: 'Application version of mobile device',
                    schema: { type: 'string', example: '1.0.1' },
                    required: true,
                },
                'platform-type': {
                    in: 'header',
                    name: 'platform-type',
                    description: 'Application platform (iOS/Android)',
                    schema: { type: 'string', enum: ['iOS', 'Android', 'Huawei', 'Browser'], example: 'Android' },
                    required: true,
                },
                'platform-version': {
                    in: 'header',
                    name: 'platform-version',
                    description: 'Device platform version',
                    schema: { type: 'string', example: '12' },
                    required: true,
                },
                'channel-uuid': {
                    in: 'header',
                    name: 'channel-uuid',
                    description: 'Channel uuid for client stream',
                    schema: {
                        type: 'string',
                        example:
                            'b61542c962872d5d99f624c89f1ffaf6d09203723d4975be4724ec5b265fd6a57f61e167476b8573d5b3f584be72300f86fef21d917b7ae93f0dda3a3f569207',
                    },
                    required: true,
                },
            },
            securitySchemes: { 'http-bearer': { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } },
        },
        paths: {
            '/api/v1/auth/': {
                get: {
                    security: [{ 'http-bearer': [] }],
                    responses: {},
                    tags: [],
                    summary: 'Path with service name suffix',
                    description: '',
                    deprecated: false,
                    'x-badges': [],
                },
            },
        },
        tags: [],
        'x-incomplete': true,
    },
}

export const expectedAuthResponseWithDescription = {
    auth: {
        openapi: '3.0.3',
        info: { version: '1.0.0', title: 'Auth', description: 'Service `Auth` is not registered in the broker' },
        components: {
            schemas: {},
            parameters: {
                mobile_uid: {
                    in: 'header',
                    name: 'mobile_uid',
                    description: 'Mobile uid to identify each specific mobile device',
                    schema: { type: 'string', format: 'uuid', example: 'd85a2569-dbaf-4130-828f-8b5ddfd2512f' },
                    required: true,
                },
                'app-version': {
                    in: 'header',
                    name: 'app-version',
                    description: 'Application version of mobile device',
                    schema: { type: 'string', example: '1.0.1' },
                    required: true,
                },
                'platform-type': {
                    in: 'header',
                    name: 'platform-type',
                    description: 'Application platform (iOS/Android)',
                    schema: { type: 'string', enum: ['iOS', 'Android', 'Huawei', 'Browser'], example: 'Android' },
                    required: true,
                },
                'platform-version': {
                    in: 'header',
                    name: 'platform-version',
                    description: 'Device platform version',
                    schema: { type: 'string', example: '12' },
                    required: true,
                },
                'channel-uuid': {
                    in: 'header',
                    name: 'channel-uuid',
                    description: 'Channel uuid for client stream',
                    schema: {
                        type: 'string',
                        example:
                            'b61542c962872d5d99f624c89f1ffaf6d09203723d4975be4724ec5b265fd6a57f61e167476b8573d5b3f584be72300f86fef21d917b7ae93f0dda3a3f569207',
                    },
                    required: true,
                },
            },
            securitySchemes: { 'http-bearer': { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } },
        },
        paths: {
            '/api/v1/auth/': {
                get: {
                    security: [{ 'http-bearer': [] }],
                    responses: {},
                    tags: [],
                    summary: 'Summary of the route',
                    description: 'Path with service name suffix',
                    deprecated: false,
                    'x-badges': [],
                },
            },
        },
        tags: [],
        'x-incomplete': true,
    },
}

export const expectedDocumentAcquirersResponse = {
    'document-acquirers': {
        openapi: '3.0.3',
        info: { version: '1.0.0', title: 'Document Acquirers' },
        components: {
            schemas: {},
            parameters: {
                mobile_uid: {
                    in: 'header',
                    name: 'mobile_uid',
                    description: 'Mobile uid to identify each specific mobile device',
                    schema: { type: 'string', format: 'uuid', example: 'd85a2569-dbaf-4130-828f-8b5ddfd2512f' },
                    required: true,
                },
                'app-version': {
                    in: 'header',
                    name: 'app-version',
                    description: 'Application version of mobile device',
                    schema: { type: 'string', example: '1.0.1' },
                    required: true,
                },
                'platform-type': {
                    in: 'header',
                    name: 'platform-type',
                    description: 'Application platform (iOS/Android)',
                    schema: { type: 'string', enum: ['iOS', 'Android', 'Huawei', 'Browser'], example: 'Android' },
                    required: true,
                },
                'platform-version': {
                    in: 'header',
                    name: 'platform-version',
                    description: 'Device platform version',
                    schema: { type: 'string', example: '12' },
                    required: true,
                },
                'channel-uuid': {
                    in: 'header',
                    name: 'channel-uuid',
                    description: 'Channel uuid for client stream',
                    schema: {
                        type: 'string',
                        example:
                            'b61542c962872d5d99f624c89f1ffaf6d09203723d4975be4724ec5b265fd6a57f61e167476b8573d5b3f584be72300f86fef21d917b7ae93f0dda3a3f569207',
                    },
                    required: true,
                },
            },
            securitySchemes: { 'http-bearer': { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } },
        },
        paths: {
            '/api/path1': {
                get: {
                    security: [{ 'http-bearer': [] }],
                    responses: { [HttpStatusCode.OK]: { description: '', content: { 'application/json': { schema: 'schema' } } } },
                    tags: [],
                    parameters: [
                        {
                            name: 'param1[]',
                            in: 'query',
                            required: true,
                            schema: {
                                enum: undefined,
                                minItems: undefined,
                                maxItems: undefined,
                                type: 'array',
                                items: {
                                    enum: undefined,
                                    minimum: undefined,
                                    maximum: undefined,
                                    type: 'number',
                                    format: undefined,
                                },
                            },
                        },
                        {
                            name: 'params2',
                            in: 'query',
                            required: true,
                            schema: {
                                enum: undefined,
                                type: 'object',
                                format: undefined,
                                properties: {
                                    paramInternal: {
                                        enum: undefined,
                                        minLength: undefined,
                                        maxLength: undefined,
                                        type: 'string',
                                        format: undefined,
                                    },
                                    paramSecondInternal: {
                                        enum: undefined,
                                        minLength: undefined,
                                        maxLength: undefined,
                                        type: 'string',
                                        format: undefined,
                                    },
                                },
                                required: ['paramInternal', 'paramSecondInternal'],
                            },
                        },
                    ],
                    summary: 'Action with acquirers service',
                    description: '',
                    deprecated: false,
                    'x-badges': [
                        { label: 'scope1:label1', color: 'red' },
                        { label: 'scope1:label2', color: 'red' },
                        { label: 'open:permission1', color: 'orange' },
                        { label: 'open:permission2', color: 'orange' },
                    ],
                },
            },
        },
        tags: [],
    },
}

export const expectedResultWithoutPermission = {
    deprecated: true,
    description: '',
    responses: {},
    security: [{ 'http-bearer': [] }],
    summary: 'Action without permission and scopes',
    tags: [],
    'x-badges': [],
}

export const expectedActionWithoutVersion = {
    auth: {
        components: {
            parameters: {
                'app-version': {
                    description: 'Application version of mobile device',
                    in: 'header',
                    name: 'app-version',
                    required: true,
                    schema: {
                        example: '1.0.1',
                        type: 'string',
                    },
                },
                'channel-uuid': {
                    description: 'Channel uuid for client stream',
                    in: 'header',
                    name: 'channel-uuid',
                    required: true,
                    schema: {
                        example:
                            'b61542c962872d5d99f624c89f1ffaf6d09203723d4975be4724ec5b265fd6a57f61e167476b8573d5b3f584be72300f86fef21d917b7ae93f0dda3a3f569207',
                        type: 'string',
                    },
                },
                mobile_uid: {
                    description: 'Mobile uid to identify each specific mobile device',
                    in: 'header',
                    name: 'mobile_uid',
                    required: true,
                    schema: {
                        example: 'd85a2569-dbaf-4130-828f-8b5ddfd2512f',
                        format: 'uuid',
                        type: 'string',
                    },
                },
                'platform-type': {
                    description: 'Application platform (iOS/Android)',
                    in: 'header',
                    name: 'platform-type',
                    required: true,
                    schema: {
                        enum: ['iOS', 'Android', 'Huawei', 'Browser'],
                        example: 'Android',
                        type: 'string',
                    },
                },
                'platform-version': {
                    description: 'Device platform version',
                    in: 'header',
                    name: 'platform-version',
                    required: true,
                    schema: {
                        example: '12',
                        type: 'string',
                    },
                },
            },
            schemas: {},
            securitySchemes: {
                'http-bearer': {
                    bearerFormat: 'JWT',
                    scheme: 'bearer',
                    type: 'http',
                },
            },
        },
        info: {
            description: 'Service `Auth` is not registered in the broker',
            title: 'Auth',
            version: '1.0.0',
        },
        openapi: '3.0.3',
        paths: {},
        tags: [],
        'x-incomplete': true,
    },
}

export const expectedActionWithoutResponses = {
    paths: {
        '/api/v1/action': {
            get: {
                security: [{ 'http-bearer': [] }],
                responses: {},
                tags: ['Action'],
                summary: 'Summary of the route',
                description: 'Action without responses',
                deprecated: false,
                'x-badges': [],
            },
        },
    },
}

export const expectedMultipartPostParams = {
    paths: {
        '/api/path1': {
            post: {
                security: [{ 'http-bearer': [] }],
                responses: {
                    [HttpStatusCode.OK]: {
                        description: '',
                        content: {
                            'application/json': {
                                schema: 'schema',
                            },
                        },
                    },
                },
                tags: [],
                summary: 'Multipart form data param action',
                description: '',
                deprecated: false,
                'x-badges': [],
                requestBody: {
                    content: {
                        'multipart/form-data': {
                            schema: {
                                type: 'object',
                                properties: {
                                    param1: {
                                        type: 'array',
                                        items: { type: 'string', format: 'binary' },
                                    },
                                    param2: {
                                        type: 'array',
                                        items: { type: 'number' },
                                    },
                                    params3: {
                                        type: 'object',
                                        properties: {
                                            paramInternal: { type: 'string' },
                                            paramSecondInternal: { type: 'string' },
                                        },
                                        required: ['paramInternal', 'paramSecondInternal'],
                                    },
                                    param4: { type: 'string', format: 'binary' },
                                    param5: { type: 'string' },
                                    param6: { type: 'string' },
                                    param7: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: { prop1: { type: 'number' } },
                                            required: ['prop1'],
                                        },
                                    },
                                },
                                required: ['param1', 'param2', 'params3', 'param5', 'param6', 'param7'],
                            },
                        },
                    },
                },
            },
        },
    },
}

export const expectedPostParams = {
    paths: {
        '/api/path1': {
            post: {
                deprecated: false,
                description: '',
                responses: {
                    [HttpStatusCode.OK]: {
                        description: '',
                        content: {
                            'application/json': {
                                schema: 'schema',
                            },
                        },
                    },
                },
                security: [{ 'http-bearer': [] }],
                summary: 'Action with acquirers service',
                tags: [],
                'x-badges': [],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    param1: {
                                        type: 'array',
                                        items: {
                                            type: 'number',
                                        },
                                    },
                                    params2: {
                                        type: 'object',
                                        properties: {
                                            paramInternal: {
                                                type: 'string',
                                            },
                                            paramSecondInternal: {
                                                type: 'string',
                                            },
                                        },
                                        required: ['paramInternal', 'paramSecondInternal'],
                                    },
                                },
                                required: ['param1', 'params2'],
                            },
                        },
                    },
                },
            },
        },
    },
}

export const expectedActionWithHeaders = {
    paths: {
        '/api/v1/action': {
            get: {
                security: [{ 'http-bearer': [] }],
                responses: {},
                tags: ['Action'],
                parameters: [
                    {
                        in: 'header',
                        name: 'mobile_uid',
                        description: 'Mobile uid to identify each specific mobile device',
                        schema: {
                            type: 'string',
                            format: 'uuid',
                            example: 'd85a2569-dbaf-4130-828f-8b5ddfd2512f',
                        },
                        required: true,
                    },
                    {
                        in: 'header',
                        name: 'app-version',
                        description: 'Application version of mobile device',
                        schema: {
                            type: 'string',
                            example: '1.0.1',
                        },
                        required: true,
                    },
                    {
                        in: 'header',
                        name: 'platform-type',
                        description: 'Application platform (iOS/Android)',
                        schema: {
                            type: 'string',
                            enum: ['iOS', 'Android', 'Huawei', 'Browser'],
                            example: 'Android',
                        },
                        required: true,
                    },
                    {
                        in: 'header',
                        name: 'platform-version',
                        description: 'Device platform version',
                        schema: {
                            type: 'string',
                            example: '12',
                        },
                        required: true,
                    },
                    {
                        in: 'header',
                        name: 'cert',
                        schema: { type: 'string' },
                        required: true,
                    },
                ],
                summary: 'Action with headers',
                description: '',
                deprecated: true,
                'x-badges': [],
            },
        },
    },
}

export const expectedActionWithArrayParam = {
    paths: {
        '/api/v1/action': {
            get: {
                security: [{ 'http-bearer': [] }],
                responses: {
                    [HttpStatusCode.OK]: {
                        description: '',
                        content: { 'application/json': { schema: 'schema' } },
                    },
                },
                tags: ['Action'],
                parameters: [
                    {
                        name: 'param1',
                        in: 'query',
                        required: false,
                        schema: { type: 'string' },
                    },
                ],
                summary: 'Action with array param',
                description: '',
                deprecated: false,
                'x-badges': [],
            },
        },
    },
}

export const expectedActionWithAuthBadge = {
    paths: {
        '/api/v1/action': {
            get: {
                security: [{ 'http-bearer': [] }],
                responses: {},
                tags: ['Action'],
                summary: 'Action with auth badge',
                description: '',
                deprecated: true,
                'x-badges': [{ label: SessionType.User, color: 'green' }],
            },
        },
    },
}

export const expectedActionWithAuthBadges = {
    paths: {
        '/api/v1/action': {
            get: {
                security: [{ 'http-bearer': [] }],
                responses: {
                    [HttpStatusCode.OK]: {
                        description: '',
                        content: { 'application/json': { schema: 'schema' } },
                    },
                },
                tags: ['Action'],
                summary: 'Action with auth badges',
                description: '',
                deprecated: false,
                'x-badges': [
                    {
                        label: SessionType.User,
                        color: 'green',
                    },
                    {
                        label: SessionType.CabinetUser,
                        color: 'green',
                    },
                ],
            },
        },
    },
}

export const expectedActionWithNonObjectParam = {
    paths: {
        '/api/v1/action': {
            get: {
                security: [{ 'http-bearer': [] }],
                responses: {
                    [HttpStatusCode.OK]: {
                        description: '',
                        content: {
                            'application/json': { schema: 'schema' },
                        },
                    },
                },
                tags: ['Action'],
                parameters: [
                    {
                        name: 'param1',
                        in: 'query',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                summary: 'Action with non object param',
                description: '',
                deprecated: false,
                'x-badges': [],
            },
        },
    },
}

export const expectedActionWithPathParams = {
    paths: {
        '/api/v1/action/{param1}': {
            get: {
                security: [{ 'http-bearer': [] }],
                responses: {
                    [HttpStatusCode.OK]: {
                        description: '',
                        content: { 'application/json': { schema: 'schema' } },
                    },
                },
                tags: ['Action'],
                parameters: [
                    {
                        name: 'param1',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                    },
                    {
                        name: 'param2[]',
                        in: 'query',
                        required: true,
                        schema: {
                            type: 'array',
                            items: { type: 'number' },
                        },
                    },
                    {
                        name: 'param3',
                        in: 'query',
                        required: false,
                        schema: { type: 'string' },
                    },
                ],
                summary: 'Action with path param',
                description: '',
                deprecated: false,
                'x-badges': [],
            },
        },
    },
}

export const expectedActionWithoutSecurity = {
    paths: {
        '/api/v1/action': {
            get: {
                security: undefined,
                responses: {
                    [HttpStatusCode.OK]: {
                        description: '',
                        content: { 'application/json': { schema: 'schema' } },
                    },
                },
                tags: ['Action'],
                summary: 'Action without security',
                description: '',
                deprecated: false,
                'x-badges': [{ label: SessionType.None, color: 'green' }],
            },
        },
    },
}
