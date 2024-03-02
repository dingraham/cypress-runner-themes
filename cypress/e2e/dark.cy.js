require('../../src')

Cypress.env('theme', 'dark')
describe('test', () => {
    it('test', () => {
        cy.visit('https://nhl.com')
    })
})

// Add different testing cases, steal from Gleb