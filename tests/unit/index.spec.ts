const initTracing = jest.fn()
const bootstrap = jest.fn()

jest.mock('@diia-inhouse/diia-app', () => ({
    ...jest.requireActual('@diia-inhouse/diia-app'),
    initTracing,
}))

jest.mock('@src/bootstrap', () => ({
    bootstrap,
}))

describe('Index', () => {
    it('should initTracing and call app bootstrap', () => {
        // eslint-disable-next-line n/no-missing-require
        require('@src/index')
        expect(initTracing).toHaveBeenCalledWith('Gateway')
        expect(bootstrap).toHaveBeenCalledWith('Gateway')
    })
})
