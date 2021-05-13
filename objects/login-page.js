import locators from '../support/login-page-locators.js';

export class LoginPage {

	// Go to login page after setting marketing consent cookie to close popup
	navigate () {
		cy.setCookie('marketingCookieConsent', 'true')
		cy.visit('/login')
	}

	// 
	login () {
		cy.get('[data-test-locator="input-email"]').type(Cypress.env('loginUserName'))
		cy.get('[data-test-locator="input-email"]').type('{Enter}')
		cy.get('[data-test-locator="password-input').type(Cypress.env('loginPassword'))
		cy.get('[data-component-locator="LoginFormPassword-ContinueButton"]').click()
	}
}