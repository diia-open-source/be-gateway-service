import { resolve as resolvePath } from 'path'

const fsMock = {
    promises: {
        readFile: jest.fn(),
    },
}
const awilixMock = {
    listModules: jest.fn(),
}

jest.mock('fs', () => fsMock)
jest.mock('awilix', () => awilixMock)

import { ActionSession, SessionType } from '@diia-inhouse/types'

import ProcessDataService from '@src/services/processData'

import { ProcessCode } from '@interfaces/index'
import { AppConfig } from '@interfaces/types/config'

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

            awilixMock.listModules
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

            expect(fsMock.promises.readFile).toHaveBeenCalledWith(resolvePath('./processCodesTemplates/auth.json'), { encoding: 'utf8' })
            expect(fsMock.promises.readFile).toHaveBeenCalledWith(resolvePath('./eResidentProcessCodesTemplates/auth.json'), {
                encoding: 'utf8',
            })
            expect(fsMock.promises.readFile).toHaveBeenCalledWith(resolvePath('./cabinetProcessCodesTemplates/auth.json'), {
                encoding: 'utf8',
            })
        })
    })

    describe('method: `getProcessData`', () => {
        it.each([
            [
                'should successfully get template for regular user',
                ProcessCode.AttestationNotPassed,
                undefined,
                [
                    {
                        processCode: ProcessCode.AttestationNotPassed,
                        template: {
                            type: 'middleCenterAlignAlert',
                            isClosable: false,
                            data: {
                                description: 'description',
                                title: 'caption',
                            },
                        },
                    },
                ],
                <ActionSession>{ sessionType: SessionType.User },
                '/api/v1/path',
                {
                    processCode: ProcessCode.AttestationNotPassed,
                    template: {
                        type: 'middleCenterAlignAlert',
                        isClosable: false,
                        data: { description: 'description', title: 'caption' },
                    },
                },
            ],
            [
                'should successfully get template with dynamic params for regular user',
                ProcessCode.AttestationNotPassed,
                { template: 'replace', title: 'caption' },
                [
                    {
                        processCode: ProcessCode.AttestationNotPassed,
                        template: {
                            type: 'middleCenterAlignAlert',
                            isClosable: false,
                            data: {
                                description: 'template string {template} {template}',
                                title: '{title} title',
                            },
                        },
                    },
                ],
                <ActionSession>{ sessionType: SessionType.User },
                '/api/v1/path',
                {
                    processCode: ProcessCode.AttestationNotPassed,
                    template: {
                        type: 'middleCenterAlignAlert',
                        isClosable: false,
                        data: { description: 'template string replace replace', title: 'caption title' },
                    },
                },
            ],
            [
                'should successfully get template for e-resident by session type',
                ProcessCode.AttestationNotPassed,
                undefined,
                [
                    {
                        processCode: Number(`1${ProcessCode.AttestationNotPassed}`),
                        template: {
                            type: 'middleCenterAlignAlert',
                            isClosable: false,
                        },
                    },
                ],
                <ActionSession>{ sessionType: SessionType.EResident, user: {} },
                '/api/v1/path',
                {
                    processCode: Number(`1${ProcessCode.AttestationNotPassed}`),
                    template: {
                        type: 'middleCenterAlignAlert',
                        isClosable: false,
                    },
                },
            ],
            [
                'should successfully get template for e-resident by path',
                ProcessCode.AttestationNotPassed,
                undefined,
                [
                    {
                        processCode: Number(`1${ProcessCode.AttestationNotPassed}`),
                        template: {
                            type: 'middleCenterAlignAlert',
                            isClosable: false,
                        },
                    },
                ],
                undefined,
                '/e-resident/api/v1/path',
                {
                    processCode: Number(`1${ProcessCode.AttestationNotPassed}`),
                    template: {
                        type: 'middleCenterAlignAlert',
                        isClosable: false,
                    },
                },
            ],
            [
                'should successfully get template for e-resident by session type',
                ProcessCode.AttestationNotPassed,
                undefined,
                [
                    {
                        processCode: Number(`2${ProcessCode.AttestationNotPassed}`),
                        template: {
                            type: 'middleCenterAlignAlert',
                            isClosable: false,
                        },
                    },
                ],
                <ActionSession>{ sessionType: SessionType.CabinetUser, user: {} },
                '/api/v1/path',
                {
                    processCode: Number(`2${ProcessCode.AttestationNotPassed}`),
                    template: {
                        type: 'middleCenterAlignAlert',
                        isClosable: false,
                    },
                },
            ],
            [
                'should successfully get template for cabinet by path',
                ProcessCode.AttestationNotPassed,
                undefined,
                [
                    {
                        processCode: Number(`2${ProcessCode.AttestationNotPassed}`),
                        template: {
                            type: 'middleCenterAlignAlert',
                            isClosable: false,
                        },
                    },
                ],
                undefined,
                '/cabinet/api/v1/path',
                {
                    processCode: Number(`2${ProcessCode.AttestationNotPassed}`),
                    template: {
                        type: 'middleCenterAlignAlert',
                        isClosable: false,
                    },
                },
            ],
            [
                'should return undefined if no template data was found for given process code',
                <ProcessCode>0,
                undefined,
                [],
                undefined,
                '/api/v1/path',
                undefined,
            ],
        ])('%s', async (_msg, processCode, $processDataParams, templatesFileContent, session, path, expectedTemplate) => {
            awilixMock.listModules.mockReturnValue([{ path: './processCodesTemplates/auth.json' }])
            fsMock.promises.readFile.mockResolvedValue(JSON.stringify(templatesFileContent))

            const processDataService = new ProcessDataService(<AppConfig>{
                processCodesTemplates: {
                    folderPath: './processCodesTemplates',
                    cabinetFolderPath: './cabinetProcessCodesTemplates',
                    eResidentFolderPath: './eResidentProcessCodesTemplates',
                },
            })

            await processDataService.onInit()

            expect(processDataService.getProcessData(processCode, $processDataParams, session, path)).toEqual(expectedTemplate)
        })
    })
})
