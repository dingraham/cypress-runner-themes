require('../../src')

Cypress.env('theme', 'colorblind')
describe('test', () => {
    it('test', () => {
        cy.visit('https://nhl.com')
    })
})