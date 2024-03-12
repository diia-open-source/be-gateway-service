import { ACTION_RESPONSE, MoleculerService } from '@diia-inhouse/diia-app'

export const moleculerService = <MoleculerService>{
    service: {
        broker: {
            registry: {
                services: {
                    services: [
                        {
                            name: 'DocumentAcquirers',
                            actions: {
                                [`DocumentAcquirers.actionWithAcquirersService.v1`]: {
                                    [ACTION_RESPONSE]: 'schema',
                                    params: {
                                        params: {
                                            type: 'object',
                                            props: {
                                                param1: {
                                                    type: 'array',
                                                    items: { type: 'number' },
                                                },
                                                params2: {
                                                    type: 'object',
                                                    props: {
                                                        paramInternal: { type: 'string' },
                                                        paramSecondInternal: { type: 'string' },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        {
                            name: 'Documents',
                            actions: {
                                [`Documents.multipartFormDataParamAction.v1`]: {
                                    [ACTION_RESPONSE]: 'schema',
                                    params: {
                                        params: {
                                            type: 'object',
                                            props: {
                                                param1: {
                                                    type: 'array',
                                                    items: {
                                                        type: 'object',
                                                        props: { prop1: { type: 'buffer' } },
                                                    },
                                                },
                                                param2: {
                                                    type: 'array',
                                                    items: { type: 'number' },
                                                },
                                                params3: {
                                                    type: 'object',
                                                    props: {
                                                        paramInternal: { type: 'string' },
                                                        paramSecondInternal: { type: 'string' },
                                                    },
                                                },
                                                param4: {
                                                    type: 'buffer',
                                                    optional: true,
                                                },
                                                param5: 'string',
                                                param6: 'boolean',
                                                param7: {
                                                    type: 'array',
                                                    items: {
                                                        type: 'object',
                                                        props: { prop1: { type: 'number' } },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                                [`Documents.actionWithPathParam.v1`]: {
                                    [ACTION_RESPONSE]: 'schema',
                                    params: {
                                        params: {
                                            type: 'object',
                                            props: {
                                                param1: { type: 'string' },
                                                param2: {
                                                    type: 'array',
                                                    items: { type: 'number' },
                                                },
                                                param3: {
                                                    type: 'string',
                                                    optional: true,
                                                },
                                            },
                                        },
                                    },
                                },
                                [`Documents.actionWithArrayParam.v1`]: {
                                    [ACTION_RESPONSE]: 'schema',
                                    params: {
                                        params: {
                                            type: 'object',
                                            props: {
                                                param1: [{ type: 'string', optional: true }],
                                            },
                                        },
                                    },
                                },
                                [`Documents.actionWithAuthBadges.v1`]: {
                                    [ACTION_RESPONSE]: 'schema',
                                    params: {
                                        params: { type: 'object', props: {} },
                                    },
                                },
                                [`Documents.actionWithoutSecurity.v1`]: {
                                    [ACTION_RESPONSE]: 'schema',
                                    params: {
                                        params: { type: 'object', props: {} },
                                    },
                                },
                                [`Documents.actionWithNonObjectParam.v1`]: {
                                    [ACTION_RESPONSE]: 'schema',
                                    params: {
                                        params: {
                                            type: 'object',
                                            props: { param1: 'string' },
                                        },
                                    },
                                },
                            },
                        },
                        {
                            name: 'Analytics',
                            actions: {
                                [`Analytics.actionWithoutResponses.v1`]: {
                                    params: {
                                        params: {
                                            type: 'object',
                                            props: {},
                                        },
                                    },
                                },
                            },
                        },
                    ],
                },
            },
        },
    },
}

export const moleculerServiceWithoutParams = <MoleculerService>{
    service: {
        broker: {
            registry: {
                services: {
                    services: [
                        {
                            name: 'DocumentAcquirers',
                            actions: {
                                [`DocumentAcquirers.actionWithAcquirersService.v1`]: {
                                    [ACTION_RESPONSE]: 'schema',
                                },
                            },
                        },
                    ],
                },
            },
        },
    },
}
