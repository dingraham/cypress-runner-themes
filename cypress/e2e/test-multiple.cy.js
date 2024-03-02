require('../../src')

describe('test', () => {
    it('test', () => {
        cy.visit('https://nhl.com')
    })

    it('passes', () => {
        expect(true).to.be.eq(true)
    })

    it('fails', () => {
        expect(true).to.be.eq(false)
    })

    it.skip('skipped test', () => {})
})