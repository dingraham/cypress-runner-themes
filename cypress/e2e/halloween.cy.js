require('../../src')

Cypress.env('theme', 'halloween')

describe('test', () => {
    it('test', () => {
        cy.visit('https://nhl.com')
    })
})