import * as fs from 'node:fs'
import path from 'node:path'

import { listModules } from '@diia-inhouse/diia-app'

import { ActionSession, OnInit } from '@diia-inhouse/types'

import Utils from '@utils/index'

import { ProcessData, ProcessDataParams } from '@interfaces/services/processData'
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
        processDataParams: ProcessDataParams | undefined,
        session: ActionSession | undefined,
        endpointPath: string | undefined,
    ): ProcessData | undefined {
        const eResidentProcessData = this.getEResidentProcessDataIfExists(processCode, session, endpointPath)
        if (eResidentProcessData) {
            return this.enrichProcessData(eResidentProcessData, processDataParams)
        }

        const cabinetProcessData = this.getCabinetProcessDataIfExists(processCode, session, endpointPath)
        if (cabinetProcessData) {
            return this.enrichProcessData(cabinetProcessData, processDataParams)
        }

        const processData = this.getProcessDataIfExists(processCode)
        if (processData) {
            return this.enrichProcessData(processData, processDataParams)
        }
    }

    private enrichProcessData(processData: ProcessData, processDataParams: ProcessDataParams = {}): ProcessData {
        const { template } = processData
        const { templateParams, resource } = processDataParams

        if (templateParams) {
            if (template.data.title) {
                template.data.title = this.handlePlaceholders(template.data.title, templateParams)
            }

            if (template.data.description) {
                template.data.description = this.handlePlaceholders(template.data.description, templateParams)
            }
        }

        if (resource && template.data.mainButton) {
            template.data.mainButton.resource = resource
        }

        return processData
    }

    private handlePlaceholders(sourceString: string, templateParams: Record<string, string>): string {
        let resultString = sourceString

        for (const [placeholder, value] of Object.entries(templateParams)) {
            resultString = resultString.replaceAll(new RegExp(`\\{${placeholder}\\}`, 'g'), value)
        }

        return resultString
    }

    private async composeProcessCodeDataMapFromFolder(folderPath: string): Promise<Map<number, ProcessData>> {
        const dataMap = new Map()
        const fileContent: ProcessData[] = await this.loadProcessCodesDataFromFolder(folderPath)

        for (const data of fileContent) {
            const { processCode } = data

            dataMap.set(processCode, data)
        }

        return dataMap
    }

    private async loadProcessCodesDataFromFolder(folderPath: string): Promise<ProcessData[]> {
        const processCodesDataFiles = listModules(`${folderPath}/*.json`)
        const processCodesDataFilesContent = await Promise.all(
            processCodesDataFiles.map(
                async ({ path: filePath }) => await fs.promises.readFile(path.resolve(filePath), { encoding: 'utf8' }),
            ),
        )

        // eslint-disable-next-line unicorn/no-array-reduce
        const loadedProcessCodesData = processCodesDataFilesContent.reduce(
            (acc, fileContent) => {
                const serviceProcessCodesData = JSON.parse(fileContent)

                return [
                    ...acc,
                    ...((serviceProcessCodesData &&
                        Array.isArray(serviceProcessCodesData) &&
                        serviceProcessCodesData.length > 0 &&
                        serviceProcessCodesData) ||
                        []),
                ]
            },
            <ProcessData[]>[],
        )

        return loadedProcessCodesData
    }

    private getProcessDataIfExists(processCode: number): ProcessData | undefined {
        return structuredClone(this.processCodeDataMap.get(processCode))
    }

    private getEResidentProcessDataIfExists(
        processCode: number,
        session: ActionSession | undefined,
        endpointPath: string | undefined,
    ): ProcessData | undefined {
        const isEResident = Utils.isEResidentContext(session, endpointPath)
        if (isEResident) {
            const eResidentProcessCode = Number.parseInt(`1${processCode}`, 10)

            return structuredClone(this.eResidentProcessCodeDataMap.get(eResidentProcessCode))
        }
    }

    private getCabinetProcessDataIfExists(
        processCode: number,
        session: ActionSession | undefined,
        endpointPath: string | undefined,
    ): ProcessData | undefined {
        const isCabinetUser = Utils.isCabinetUserContext(session, endpointPath)
        if (isCabinetUser) {
            const cabinetProcessCode = Number.parseInt(`2${processCode}`, 10)

            return structuredClone(this.cabinetProcessCodeDataMap.get(cabinetProcessCode))
        }
    }
}
