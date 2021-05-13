Feature: Searching for books from the search bar input
	As user who needs to search for books 
	either as a visitor or an authorized user
	I want to enter text into the search bar input
	So I can search by title, author, ISBN, topic or reading list

	Acceptance Criteria
	* Results are update while I type in characters
	* Only books related to my search text are shown in results
	* Books, topic, reading lists and publishers statistics are update to match results
	* Page navigation is available for btowising long lists of results
	
	Scenario: Searching from search bar by title
		Given the browser is at Perlego search page
		When I enter "<title>" into the search bar
		Then books related to "<title>" are shown on the search page

		Examples: title
      | amazon      |
      | javascript  |
      | python      |

	Scenario: Searching from search bar by author
		Given the browser is at Perlego search page
		When I enter "<author>" into the search bar
		Then books written by or related to "<author>" are shown on the search page
    And the following related results are shown

		Examples: author
      | Dr. Joseph Murphy   |
      | Rebecca Solnit      |
      | Paula Martín        |
      |  Antonio Lozano     |

	Scenario: Searching from search bar by ISBN
		Given the browser is at Perlego search page
		When I enter "9781292374017" into the search bar
		Then only the book with IBAN "9781292374017" is shown on the search results

	Scenario: Discover by Topic tab
		Given the browser is at Perlego search page
		When I enter "Programming Games" into the search bar
		Then book with "Programming Games" is shown on the search results

	Scenario: Discover by Reading Lists tab
		Given the browser is at Perlego search page
		When I enter "machine learning" into the search bar
		Then book belonging in the "machine learning" reading list

	Scenario: Discover by Publishers tab
		Given the browser is at Perlego search page
		When I enter "Columbia University Press" into the search bar
		Then book published by "Columbia University Press" are shown in search results



Feature: Book filters

	Scenario: Filter books by language 
		Given Books tab on search page is selected
		When I click on a random language from the language dropdown 
		Then books only at the selected language are shown in search results

	Scenario: Filter books by publication date 
		Given Books tab on search page is selected
		When I click on a random date range from the publication date dropdown 
		Then books only at the selected language are shown in search results

	Scenario: Filter books by topic 
		Given Books tab on search page is selected
		When I click on a random topic from the topic dropdown 
		Then books only at the selected language are shown in search results

	Scenario: Filter books by publisher 
		Given Books tab on search page is selected
		When I click on a random publisher from the publisher dropdown 
		Then books only at the selected language are shown in search results

	Scenario: Filter books by author 
		Given Books tab on search page is selected
		When I click on a random author from the author dropdown 
		Then books only at the selected language are shown in search results

	Scenario: Filter books by format 
		Given Books tab on search page is selected
		When I click on a random format from the format dropdown 
		Then books only at the selected language are shown in search results



Feature: Logged in versus Visitor Menu

	Scenario: Options available to autorized user (loggen-in)
		Given the users has an Perlego account and logs in
		When I visit search page
		Then I see Discover, My Library and User Icon to the top right menu

	Scenario: Options available to visitor (loggen-out)
		Given the users does not have a Perlego account and I am a visitor
		When I visit search page
		Then I see Mission, Discover, Pricing, Login and Start Free Trial at the top right menu