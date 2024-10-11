let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector('#user-answer')
let submitButton = document.querySelector('#submit-answer')
let resultTextElement = document.querySelector('#result')
let playAgainButton = document.querySelector('#play-again') // button that adds new country name
                                                                            // clears user answer and result

// finish the script to challenge the user about their knowledge of capital cities.
// An array country names and two-letter country codes is provided in the countries.js file. 
// Your browser treats all JavaScript files included with script elements as one big file,
// organized in the order of the script tags. So the countriesAndCodes array from countries.js
// is available to this script.

// when the page loads, select an element at random from the countriesAndCodes array
// display the country's name in the randomCountryElement
console.log(countriesAndCodes)  // You don't need to log countriesAndCodes - just proving it is available

// initializing global variables
let randomNum = ''
let countryName = ''
let abbreviation = ''

// when the webpage is loaded the playGame function is called

getNewCountry()

// this function gets a random number between 0 and the length of countriesAndCodes
// to be able to determine a random index (country name) to display
function getRandomNumber() {
    return Math.floor(Math.random() * countriesAndCodes.length)
}

function getRandomCountry(randomNum) {
      // get the country name using the random number as an index
    return countriesAndCodes[randomNum].name

}

function getCountryAbbreviation(randomNum) {
     // get countries two letter abbreviation
    return countriesAndCodes[randomNum]['alpha-2']
}

// this function clears the current global variable country name, number, and abbreviation
function clearCountry() {
    randomNum = null
    countryName = null
    abbreviation = null
}

// add a click event handler to the submitButton.  When the user clicks the button,
//  * read the text from the userAnswerElement 
//  * Use fetch() to make a call to the World Bank API with the two-letter country code (from countriesAndCodes, example 'CN' or 'AF')
//  * Verify no errors were encountered in the API call. If an error occurs, display an alert message. 
//  * If the API call was successful, extract the capital city from the World Bank API response.
//  * Compare the actual capital city to the user's answer. 
//      You can decide how correct you require the user to be. At the minimum, the user's answer should be the same
//      as the World Bank data - make the comparison case insensitive.
//      If you want to be more flexible, include and use a string similarity library such as https://github.com/hiddentao/fast-levenshtein 
//  * Finally, display an appropriate message in the resultTextElement to tell the user if they are right or wrong. 
//      For example 'Correct! The capital of Germany is Berlin' or 'Wrong - the capital of Germany is not G, it is Berlin'

// for when the check answer button is clicked
submitButton.addEventListener('click', function() {
    let url = `https://api.worldbank.org/v2/country/${abbreviation}?format=json` // url with the 2 letter abbrev country
    let userAnswer = userAnswerElement.value  // gets whatever user entered and adds to userAnswer variable

    if (userAnswer === '') {
        // if user didn't enter anything let them know to enter a capital
        alert(`Enter the capital city for ${countryName}`)

    } else {
        // call world bank api
        fetch(url).then(res => res.json()).then((capital) => {
            console.log(capital)

            // get the capital city of the appropriate country that was in url
            let getCountryCapital = capital[1][0]['capitalCity']
            console.log(getCountryCapital)

            // lower case both whatever user entered and the right capital name
            // if they're both identical tell user they were correct
            if (userAnswer.toLowerCase().trim() === getCountryCapital.toLowerCase()) {
                resultTextElement.innerHTML = `Correct! The capital of ${countryName} is ${getCountryCapital}.`
                // if capitals don't match tell user they were incorrect
            } else {
                resultTextElement.innerHTML = `Incorrect, The capital of ${countryName} is ${getCountryCapital}.`
            }
            // catch any errors if the world bank API cant be accessed
        }).catch(() => {
            alert('Error: Unable to access World Bank')
        })
    }
})

function getNewCountry() {
    // everytime the function is called, clear the result paragraph and user input
    resultTextElement.innerHTML = ''
    userAnswerElement.value = ''

    // new country information is now assigned to these global variables
    randomNum = getRandomNumber() // random number for random country index
    countryName = getRandomCountry(randomNum)  // get country name using random num
    abbreviation = getCountryAbbreviation(randomNum) // get country abbreviation using random num

    randomCountryElement.innerHTML = countryName // display country name to webpage
}

// finally, connect the play again button. Clear the user's answer, select a new random country,
// display the country's name, handle the user's guess. If you didn't use functions in the code you've 
// already written, you should refactor your code to use functions to avoid writing very similar code twice. 

// when the play again button is clicked
playAgainButton.addEventListener('click', function() {
    clearCountry() // clear the global variables
    getNewCountry()  // get a new country

})
