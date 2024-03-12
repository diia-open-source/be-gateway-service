import * as fs from 'fs'
import { resolve as resolvePath } from 'path'

import { listModules } from 'awilix'

import { ActionSession, OnInit, SessionType } from '@diia-inhouse/types'

import { ProcessData } from '@interfaces/services/processData'
import { AppConfig } from '@interfaces/types/config'

export default class ProcessDataService implements OnInit {
    private processCodeDataMap: Map<number, ProcessData> = new Map()

    private eResidentProcessCodeDataMap: Map<number, ProcessData> = new Map()

    private cabinetProcessCodeDataMap: Map<number, ProcessData> = new Map()

    constructor(private readonly config: AppConfig) {}

    async onInit(): Promise<void> {
        const folderPath = this.config.processCodesTemplates.folderPath
        const eResidentFolderPath = this.config.processCodesTemplates.eResidentFolderPath
        const cabinetFolderPath = this.config.processCodesTemplates.cabinetFolderPath

        const [processCodeDataMap, eResidentProcessCodeDataMap, cabinetProcessCodeDataMap] = await Promise.all([
            this.composeProcessCodeDataMapFromFolder(folderPath),
            this.composeProcessCodeDataMapFromFolder(eResidentFolderPath),
            this.composeProcessCodeDataMapFromFolder(cabinetFolderPath),
        ])

        this.processCodeDataMap = processCodeDataMap
        this.eResidentProcessCodeDataMap = eResidentProcessCodeDataMap
        this.cabinetProcessCodeDataMap = cabinetProcessCodeDataMap
    }

    getProcessData(
        processCode: number,
        $processDataParams: Record<string, string> | undefined,
        session: ActionSession | undefined,
        path: string | undefined,
    ): ProcessData | undefined {
        const eResidentProcessData = this.getEResidentProcessDataIfExists(processCode, session, path)
        if (eResidentProcessData) {
            return eResidentProcessData
        }

        const cabinetProcessData = this.getCabinetProcessDataIfExists(processCode, session, path)
        if (cabinetProcessData) {
            return cabinetProcessData
        }

        const templateData = this.processCodeDataMap.get(processCode)
        if (!templateData) {
            return undefined
        }

        if ($processDataParams) {
            const templateDataCopy = structuredClone(templateData)
            const {
                template: { data },
            } = templateDataCopy

            if (data.title) {
                data.title = this.handlePlaceholders(data.title, $processDataParams)
            }

            if (data.description) {
                data.description = this.handlePlaceholders(data.description, $processDataParams)
            }

            return templateDataCopy
        }

        return templateData
    }

    private handlePlaceholders(sourceString: string, templates: Record<string, string>): string {
        let resultString = sourceString

        for (const [placeholder, value] of Object.entries(templates)) {
            resultString = resultString.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), value)
        }

        return resultString
    }

    private async composeProcessCodeDataMapFromFolder(folderPath: string): Promise<Map<number, ProcessData>> {
        const dataMap = new Map()
        const fileContent: ProcessData[] = await this.loadProcessCodesDataFromFolder(folderPath)

        fileContent.forEach((data) => {
            const { processCode } = data

            dataMap.set(processCode, data)
        })

        return dataMap
    }

    private async loadProcessCodesDataFromFolder(folderPath: string): Promise<ProcessData[]> {
        const processCodesDataFiles = listModules(`${folderPath}/*.json`)
        const processCodesDataFilesContent = await Promise.all(
            processCodesDataFiles.map(async ({ path }) => await fs.promises.readFile(resolvePath(path), { encoding: 'utf8' })),
        )

        const loadedProcessCodesData = processCodesDataFilesContent.reduce(
            (acc, fileContent) => {
                const serviceProcessCodesData = JSON.parse(fileContent)

                return [
                    ...acc,
                    ...((serviceProcessCodesData &&
                        Array.isArray(serviceProcessCodesData) &&
                        serviceProcessCodesData.length &&
                        serviceProcessCodesData) ||
                        []),
                ]
            },
            <ProcessData[]>[],
        )

        return loadedProcessCodesData
    }

    private getEResidentProcessDataIfExists(
        processCode: number,
        session: ActionSession | undefined,
        path: string | undefined,
    ): ProcessData | undefined {
        const isEResident =
            (session && 'user' in session && [SessionType.EResident, SessionType.EResidentApplicant].includes(session.sessionType)) ||
            path?.startsWith('/e-resident')
        if (isEResident) {
            const eResidentProcessCode = parseInt(`1${processCode}`, 10)

            return this.eResidentProcessCodeDataMap.get(eResidentProcessCode)
        }
    }

    private getCabinetProcessDataIfExists(
        processCode: number,
        session: ActionSession | undefined,
        path: string | undefined,
    ): ProcessData | undefined {
        const isCabinetUser =
            (session && 'user' in session && session.sessionType === SessionType.CabinetUser) || path?.startsWith('/cabinet/')
        if (isCabinetUser) {
            const cabinetProcessCode = parseInt(`2${processCode}`, 10)

            return this.cabinetProcessCodeDataMap.get(cabinetProcessCode)
        }
    }
}
