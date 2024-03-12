const fs = require('fs')
const path = require('path')
const { groupBy } = require('lodash')

function normalizeTemplates(filePath) {
    const templatesPath = path.resolve(filePath)
    const templates = JSON.parse(fs.readFileSync(templatesPath, { encoding: 'utf8' }))

    const duplicateReplacements = Object.values(groupBy(templates, 'processCode'))
        .filter((el) => el.length > 1)
        .map((el) => el.at(-1))

    const replaced = []
    const normalizedTemplates = templates
        .map((element) => {
            const code = element.processCode
            if (replaced.includes(code)) {
                return
            }

            const replacement = duplicateReplacements.find((repl) => repl.processCode === code)

            if (replacement) {
                replaced.push(code)
                return replacement
            }

            return element
        })
        .filter(Boolean)
        .sort((a, b) => a.processCode - b.processCode)

    const json = JSON.stringify(normalizedTemplates, null, 4).replace(/\u00A0/g, ' ') + '\n'
    fs.writeFileSync(filePath, json)
}

const dir = 'processCodesTemplates'
const filesList = fs.readdirSync(dir)

filesList.forEach((fileName) => {
    normalizeTemplates([dir, fileName].join('/'))
})
