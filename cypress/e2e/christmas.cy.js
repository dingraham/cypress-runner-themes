require('../../src')

Cypress.env('theme', 'christmas')
describe('test', () => {
    it('test', () => {
        cy.visit('https://nhl.com')
    })
})