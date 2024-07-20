import { randomUUID } from 'node:crypto'

import { PlatformType } from '@diia-inhouse/types'

import HeaderValidation from '@src/validation/header'

import { AppConfig } from '@interfaces/types/config'

describe('HeaderValidation', () => {
    const config = { auth: { deviceHeaderUuidVersions: ['4', '5'] } }
    const headerValidation = new HeaderValidation(<AppConfig>config)

    describe('method: `checkMobileUidHeader`', () => {
        it.each([
            [false, ''],
            [false, 'invalid-uuid'],
            [true, randomUUID()],
            [true, '1cbbade9-666a-5556-a3b2-97c012213abb'],
        ])('should return %s in case mobile uuid %s', (expectedResult, inputMobileUuid) => {
            expect(headerValidation.checkMobileUidHeader(inputMobileUuid)).toEqual(expectedResult)
        })
    })

    describe('method: `checkAppVersionHeader`', () => {
        it.each([
            [false, ''],
            [false, 'invalid-version'],
            [true, '1.0.0'],
        ])('should return %s in case app version %s', (expectedResult, inputVersion) => {
            expect(headerValidation.checkAppVersionHeader(inputVersion)).toEqual(expectedResult)
        })
    })

    describe('method: `checkPlatformTypeHeader`', () => {
        it.each([
            [false, ''],
            [false, 'invalid-platform-type'],
            [true, PlatformType.Android],
        ])('should return %s in case platform type %s', (expectedResult, inputPlatformType) => {
            expect(headerValidation.checkPlatformTypeHeader(inputPlatformType)).toEqual(expectedResult)
        })
    })

    describe('method: `checkPlatformVersionHeader`', () => {
        it.each([
            [false, ''],
            [false, 'invalid-platform-version'],
            [true, '13'],
        ])('should return %s in case platform type %s', (expectedResult, inputPlatformVersion) => {
            expect(headerValidation.checkPlatformVersionHeader(inputPlatformVersion)).toEqual(expectedResult)
        })
    })
})
