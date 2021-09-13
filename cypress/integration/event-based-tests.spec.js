/// <reference types="cypress" />

/*
 * tests to cover $ma.trackEvent
 */

context('BDD Tests', () => {
    it('click through navigation', () => {
        cy.visit('/demo/user')
        cy.get('[data-test=nav-menu-item]').click({ multiple: true })
    })

    it('triggers Code Sandbox Run', () => {
        cy.visit('/demo/code')
        cy.get('[data-test=code-sandbox-run]').click()
    })

    it('triggers Stripe Button $${button.price} Click', () => {
        cy.visit('/demo/stripe')
        cy.get('[data-test=stripe-checkout-button]').click({ multiple: true })
    })
})
