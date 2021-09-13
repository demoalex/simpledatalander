/// <reference types="cypress" />

context('Basic Demo Tests', () => {
    it('hello demo world – visit all demo pages', () => {
        cy.visit('/demo/intercom')
        cy.contains('h2', 'Messages')
        cy.visit('/demo/user')
        cy.contains('h3', 'Agent Info')
        cy.visit('/demo/stripe')
        cy.contains('button', 'Checkout')
        cy.visit('/demo/code')
        cy.contains('h3', 'Code Sandbox')
        cy.visit('/demo/events')
        cy.contains('h3', 'Demo Events by Day')
    })
    it('404 on non-existent demo page', () => {
        cy.request({ url: '/demo/nonexistentpage', failOnStatusCode: false})
            .its('status').should('equal', 404)
    })
})
