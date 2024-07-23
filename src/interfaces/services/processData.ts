export interface ProcessData {
    processCode: number
    template: {
        type: string
        isClosable: false
        data: TemplateData
    }
    alert?: Record<string, unknown>
}

export interface TemplateButton {
    name: string
    action: string
    resource?: string
}

export interface TemplateData {
    icon: string
    title: string
    description: string
    mainButton?: TemplateButton
    alternativeButton?: TemplateButton
}

export interface ProcessDataParams {
    templateParams?: Record<string, string>
    resource?: string
}
