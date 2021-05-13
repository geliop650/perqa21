
import { LoginPage } from "../objects/login-page"

Cypress.Commands.add('getByTestLoc', (selector, ...args) => {
  return cy.get(`[data-test-locator=${selector}]`, ...args)
})

Cypress.Commands.add('getByTestLocLike', (selector, ...args) => {
  return cy.get(`[data-test-locator*=${selector}]`, ...args)
})

Cypress.Commands.add('getByCompomentLoc', (selector, ...args) => {
  return cy.get(`[data-component-locator=${selector}]`, ...args)
})

Cypress.Commands.add('getByComponentLocLike', (selector, ...args) => {
  return cy.get(`[data-component-locator*=${selector}]`, ...args)
})

Cypress.Commands.add('login', () => {
	cy.intercept('POST', /globals/).as('globals') 
	const loginPage = new LoginPage()
	loginPage.navigate()
	loginPage.login();
	cy.wait('@globals')
})

