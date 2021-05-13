import locators from '../support/search-page-locators.js';

export class SeachPage {
	// Go to search page and set marketing consent cookie to close popup
	navigate () {
		cy.setCookie('marketingCookieConsent', 'true')
		cy.visit('/search')
	}

	// Click on a randomly selected Language from the corresponding dropdown
	pickRandomLanguage() {
		cy.get(locators.filterLanguage).click()
		cy.get(locators.radioListItem).then((e) => {
			cy.get(locators.radioListItem).eq(Math.floor(Math.random()*(e.length-1)+1)).click()
			cy.get(locators.inputSearch).click()
		})
	}

	// Click on a randomly selected Date range from the corresponding dropdown
	pickRandomDate() {
		cy.get(locators.filterPublicationDate).click()
		cy.get(locators.filterListItem).then((e) => { 
			cy.get(locators.filterListItem).eq(Math.floor(Math.random()*e.length)).click()
			cy.get(locators.inputSearch).click()
		})
	}

	// Click on a randomly selected Topic from the corresponding dropdown
	pickRandomTopic() {
		cy.get(locators.filterTopic).click()
		cy.get(locators.filterListItem).then((e) => { 
			cy.get(locators.filterListItem).eq(Math.floor(Math.random()*e.length)).click()
			cy.get(locators.inputSearch).click()
		})
	}

	// Click on a randomly selected Publisher from the corresponding dropdown
	pickRandomPublisher() {
		cy.get(locators.filterPublisher).click()
		cy.get(locators.filterListItem).then((e) => { 
			cy.get(locators.filterListItem).eq(Math.floor(Math.random()*e.length)).click()
			cy.get(locators.inputSearch).click()
		})
	}

	// Click on a randomly selected Author from the corresponding dropdown
	pickRandomAuthor() {
		cy.get(locators.filterAuthor).click()
		cy.get(locators.filterListItem).then((e) => { 
			cy.get(locators.filterListItem).eq(Math.floor(Math.random()*e.length)).click()
			cy.get(locators.inputSearch).click()
		})
	}

}