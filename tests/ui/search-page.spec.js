/// <reference types="cypress" />

// Import search page object to trigger filter actions
import { SeachPage } from "../../objects/search-page"
// Import locators dictionary to keep them in one place and change safely
import locators from '../../support/search-page-locators.js';

context('Search page random filters', () => {

	const searchPage = new SeachPage()

  beforeEach(() => {

		// Intercept the two xhr calls used to return results to search page
		// Create @aliases so we can wait for them to return data and avoid flakiness
		cy.intercept('POST', /BOOKS.query/).as('query') 
		cy.intercept('POST', /indexes...queries/).as('queries')
		searchPage.navigate()
		cy.wait(['@query'], ['@queries'])
		
  })

	it('Should filter books by random Language', () => {

		// Call search page object method to select a random language from dropdown
		searchPage.pickRandomLanguage();
		// Wait for both XHR calls to return
		cy.wait(['@query'],['@queries'],2000)

		// Assert url param is added to match the selected language
		var selectedLanguage
		cy.get(locators.filterLanguage).then(($div) => {
			// Get the language value from filter dropdown element
		  selectedLanguage = $div.val()
			cy.url().then(($url) => {
				// Expect language value is added at the url
				expect($url).to.include(selectedLanguage)
			})

		//Assert a randomly chosen result is publised in the selected language
		cy.get(locators.bookGridCard).then((e) => {
			// Pick a random number up to the number of visible results
			var randomCard = Math.floor(Math.random()*e.length)
			// Click on the selected element
			cy.get(e).eq(randomCard).click()
			// Assert that selected language is displayed on the book page
			cy.get(locators.bookPageLanguage).should('contain', selectedLanguage)
		})

	})

})

	it('Should filter books by random date range', () => {

		// Call search page object method to select a random date range
		searchPage.pickRandomDate();
		cy.wait(['@query'],['@queries'],1500)

		// Get selected year range from url params
		var yearFrom, yearTo
		cy.url().then(($url) => {
			const urlParams = new URLSearchParams($url);
			// Read start year of the date range from url
			yearFrom = urlParams.get("publicationDate").substr(5,4)
			// Read end year of the date range from url
			yearTo = urlParams.get("publicationDate").substr(13,4)			
		})

		// Verify that 3 randomly chosen books are publised within the selected date range
		cy.get(locators.bookCardYear).then((e) => {
			var randomCard
			// Use cypress bundled lodash library to repeat test case multiple times
			Cypress._.times(3, (k) => {
				// Pick a random number up to results length
				randomCard = Math.floor(Math.random()*e.length)
				// Read publication year fromm result
				cy.get(e).eq(randomCard).invoke('text').then(parseFloat)
				// Compare to lower limit
				.should('be.at.least', parseFloat(yearFrom))
				// Compare to upper limit
				.and('be.at.most', parseFloat(yearTo))
			})

		})

	})

	it('Should filter books by Topic', () => {

		searchPage.pickRandomTopic();
		cy.wait(['@query'],1500)

		// Veriy topic selection by url params
		var selectedTopic
		cy.get(locators.filterTopic).then(($div) => {
			selectedTopic = $div.text()
			cy.url().then( ($url) => {
				expect($url).to.include(encodeURIComponent(selectedTopic))
			})
		})

		// Verify language selection by random result
		cy.get(locators.bookGridCard).then((e) => {
			var randomCard = Math.floor(Math.random()*e.length)
			cy.get(e).eq(randomCard).click()
			cy.get('[id="main"]').should('contain', selectedTopic)	
		})
	})

	it('Should filter books by random Author', () => {

		searchPage.pickRandomAuthor();
		cy.wait(['@query'],['@queries'],1500)

		// Get selected selected author name from url params
		var selectedAuthor
		cy.url().then(($url) => {
			const urlParams = new URLSearchParams($url)
			selectedAuthor = urlParams.get("author")
		})
		
		// Verify author selection by random result
		cy.get(locators.bookGridCard).then((e) => {
			// Click on a randomly selected result
			cy.get(locators.bookGridCard).eq(Math.floor(Math.random()*e.length)).click()
			// Assert author name is visible on book page
			cy.get('[id="main"]').should('contain', selectedAuthor)
		})

	})

	it('Should show user icon at search page after login', () => {
		
		// Exixcute cypress login command 
		cy.login()
		// Navigate to search page
		searchPage.navigate()
		// Assert user icon is visible
		cy.get(locators.userIcon).should('be.visible');

	})

})