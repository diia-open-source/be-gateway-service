import path from 'node:path'

const fsMock = {
    promises: {
        readFile: jest.fn(),
    },
}

const listModulesMock = jest.fn()

jest.mock('node:fs', () => fsMock)
jest.mock('@diia-inhouse/diia-app', () => ({ listModules: listModulesMock }))

import { ActionSession, SessionType } from '@diia-inhouse/types'

import ProcessDataService from '@src/services/processData'

import { ProcessCode } from '@interfaces/index'
import { ProcessData, ProcessDataParams } from '@interfaces/services/processData'
import { AppConfig } from '@interfaces/types/config'

interface TestCase {
    description: string
    processCode: number
    processDataParams?: ProcessDataParams
    templatesFileContent: ProcessData[]
    session?: ActionSession
    endpointPath: string
    expected: ProcessData | undefined
}

describe('ProcessDataService', () => {
    describe('method: `onInit`', () => {
        it('should successfully init process code templates maps', async () => {
            const expectedProcessDataTemplate = {
                processCode: ProcessCode.AttestationNotPassed,
                template: {
                    type: 'middleCenterAlignAlert',
                    isClosable: false,
                },
            }

            listModulesMock
                .mockReturnValueOnce([{ path: './processCodesTemplates/auth.json' }])
                .mockReturnValueOnce([{ path: './eResidentProcessCodesTemplates/auth.json' }])
                .mockReturnValueOnce([{ path: './cabinetProcessCodesTemplates/auth.json' }])
            fsMock.promises.readFile.mockResolvedValueOnce(JSON.stringify([expectedProcessDataTemplate]))
            fsMock.promises.readFile.mockResolvedValueOnce(
                JSON.stringify([{ ...expectedProcessDataTemplate, processCode: `1${ProcessCode.AttestationNotPassed}` }]),
            )
            fsMock.promises.readFile.mockResolvedValueOnce(
                JSON.stringify([{ ...expectedProcessDataTemplate, processCode: `2${ProcessCode.AttestationNotPassed}` }]),
            )

            const processDataService = new ProcessDataService(<AppConfig>{
                processCodesTemplates: {
                    folderPath: './processCodesTemplates',
                    cabinetFolderPath: './cabinetProcessCodesTemplates',
                    eResidentFolderPath: './eResidentProcessCodesTemplates',
                },
            })

            await processDataService.onInit()

            expect(fsMock.promises.readFile).toHaveBeenCalledWith(path.resolve('./processCodesTemplates/auth.json'), { encoding: 'utf8' })
            expect(fsMock.promises.readFile).toHaveBeenCalledWith(path.resolve('./eResidentProcessCodesTemplates/auth.json'), {
                encoding: 'utf8',
            })
            expect(fsMock.promises.readFile).toHaveBeenCalledWith(path.resolve('./cabinetProcessCodesTemplates/auth.json'), {
                encoding: 'utf8',
            })
        })
    })

    describe('method: `getProcessData`', () => {
        const testCases: TestCase[] = [
            {
                description: 'should successfully get template for regular user',
                processCode: ProcessCode.AttestationNotPassed,
                templatesFileContent: [
                    {
                        processCode: ProcessCode.AttestationNotPassed,
                        template: {
                            type: 'middleCenterAlignAlert',
                            isClosable: false,
                            data: {
                                icon: '☝️',
                                description: 'description',
                                title: 'caption',
                            },
                        },
                    },
                ],
                session: <ActionSession>{ sessionType: SessionType.User },
                endpointPath: '/api/v1/path',
                expected: {
                    processCode: ProcessCode.AttestationNotPassed,
                    template: {
                        type: 'middleCenterAlignAlert',
                        isClosable: false,
                        data: {
                            icon: '☝️',
                            description: 'description',
                            title: 'caption',
                        },
                    },
                },
            },
            {
                description: 'should successfully get template with dynamic params for regular user',
                processCode: ProcessCode.AttestationNotPassed,
                processDataParams: {
                    templateParams: { template: 'replace', title: 'caption' },
                },
                templatesFileContent: [
                    {
                        processCode: ProcessCode.AttestationNotPassed,
                        template: {
                            type: 'middleCenterAlignAlert',
                            isClosable: false,
                            data: {
                                icon: '☝️',
                                description: 'template string {template} {template}',
                                title: '{title} title',
                            },
                        },
                    },
                ],
                session: <ActionSession>{ sessionType: SessionType.User },
                endpointPath: '/api/v1/path',
                expected: {
                    processCode: ProcessCode.AttestationNotPassed,
                    template: {
                        type: 'middleCenterAlignAlert',
                        isClosable: false,
                        data: {
                            icon: '☝️',
                            description: 'template string replace replace',
                            title: 'caption title',
                        },
                    },
                },
            },
            {
                description: 'should successfully get template with dynamic resource for regular user',
                processCode: ProcessCode.AttestationNotPassed,
                processDataParams: {
                    resource: '123',
                },
                templatesFileContent: [
                    {
                        processCode: ProcessCode.AttestationNotPassed,
                        template: {
                            type: 'middleCenterAlignAlert',
                            isClosable: false,
                            data: {
                                icon: '☝️',
                                description: 'description',
                                title: 'caption',
                                mainButton: {
                                    name: 'main',
                                    action: 'action',
                                },
                            },
                        },
                    },
                ],
                session: <ActionSession>{ sessionType: SessionType.User },
                endpointPath: '/api/v1/path',
                expected: {
                    processCode: ProcessCode.AttestationNotPassed,
                    template: {
                        type: 'middleCenterAlignAlert',
                        isClosable: false,
                        data: {
                            icon: '☝️',
                            description: 'description',
                            title: 'caption',
                            mainButton: {
                                name: 'main',
                                action: 'action',
                                resource: '123',
                            },
                        },
                    },
                },
            },
            {
                description: 'should successfully get template for e-resident by session type',
                processCode: ProcessCode.AttestationNotPassed,
                templatesFileContent: [
                    {
                        processCode: Number(`1${ProcessCode.AttestationNotPassed}`),
                        template: {
                            type: 'middleCenterAlignAlert',
                            isClosable: false,
                            data: {
                                icon: '☝️',
                                description: 'description',
                                title: 'caption',
                            },
                        },
                    },
                ],
                session: <ActionSession>{ sessionType: SessionType.EResident, user: {} },
                endpointPath: '/api/v1/path',
                expected: {
                    processCode: Number(`1${ProcessCode.AttestationNotPassed}`),
                    template: {
                        type: 'middleCenterAlignAlert',
                        isClosable: false,
                        data: {
                            icon: '☝️',
                            description: 'description',
                            title: 'caption',
                        },
                    },
                },
            },
            {
                description: 'should successfully get template for e-resident by path',
                processCode: ProcessCode.AttestationNotPassed,
                templatesFileContent: [
                    {
                        processCode: Number(`1${ProcessCode.AttestationNotPassed}`),
                        template: {
                            type: 'middleCenterAlignAlert',
                            isClosable: false,
                            data: {
                                icon: '☝️',
                                description: 'description',
                                title: 'caption',
                            },
                        },
                    },
                ],
                session: undefined,
                endpointPath: '/e-resident/api/v1/path',
                expected: {
                    processCode: Number(`1${ProcessCode.AttestationNotPassed}`),
                    template: {
                        type: 'middleCenterAlignAlert',
                        isClosable: false,
                        data: {
                            icon: '☝️',
                            description: 'description',
                            title: 'caption',
                        },
                    },
                },
            },
            {
                description: 'should successfully get template for e-resident by session type',
                processCode: ProcessCode.AttestationNotPassed,
                templatesFileContent: [
                    {
                        processCode: Number(`2${ProcessCode.AttestationNotPassed}`),
                        template: {
                            type: 'middleCenterAlignAlert',
                            isClosable: false,
                            data: {
                                icon: '☝️',
                                description: 'description',
                                title: 'caption',
                            },
                        },
                    },
                ],
                session: <ActionSession>{ sessionType: SessionType.CabinetUser, user: {} },
                endpointPath: '/api/v1/path',
                expected: {
                    processCode: Number(`2${ProcessCode.AttestationNotPassed}`),
                    template: {
                        type: 'middleCenterAlignAlert',
                        isClosable: false,
                        data: {
                            icon: '☝️',
                            description: 'description',
                            title: 'caption',
                        },
                    },
                },
            },
            {
                description: 'should successfully get template for cabinet by path',
                processCode: ProcessCode.AttestationNotPassed,
                templatesFileContent: [
                    {
                        processCode: Number(`2${ProcessCode.AttestationNotPassed}`),
                        template: {
                            type: 'middleCenterAlignAlert',
                            isClosable: false,
                            data: {
                                icon: '☝️',
                                description: 'description',
                                title: 'caption',
                            },
                        },
                    },
                ],
                session: undefined,
                endpointPath: '/cabinet/api/v1/path',
                expected: {
                    processCode: Number(`2${ProcessCode.AttestationNotPassed}`),
                    template: {
                        type: 'middleCenterAlignAlert',
                        isClosable: false,
                        data: {
                            icon: '☝️',
                            description: 'description',
                            title: 'caption',
                        },
                    },
                },
            },
            {
                description: 'should return undefined if no template data was found for given process code',
                processCode: 0,
                templatesFileContent: [],
                session: undefined,
                endpointPath: '/api/v1/path',
                expected: undefined,
            },
        ]

        it.each(testCases)(
            '$description',
            async ({ processCode, processDataParams, templatesFileContent, session, endpointPath, expected }) => {
                listModulesMock.mockReturnValue([{ path: './processCodesTemplates/auth.json' }])
                fsMock.promises.readFile.mockResolvedValue(JSON.stringify(templatesFileContent))

                const processDataService = new ProcessDataService(<AppConfig>{
                    processCodesTemplates: {
                        folderPath: './processCodesTemplates',
                        cabinetFolderPath: './cabinetProcessCodesTemplates',
                        eResidentFolderPath: './eResidentProcessCodesTemplates',
                    },
                })

                await processDataService.onInit()

                const result = processDataService.getProcessData(processCode, processDataParams, session, endpointPath)

                expect(result).toEqual(expected)
            },
        )
    })
})
