const USERSURL =  'http://localhost:3000/api/v1/users'
const BASEURL =  'http://localhost:3000/api/v1'

let currentDiv = "login-page"

const loginDiv = document.querySelector('.login-page')
const signUpDiv = document.querySelector('.sign-up')
const orientateDiv = document.querySelector('.orientate')
const gameplayDiv = document.querySelector('.gameplay')
const scoreboardDiv = document.querySelector('.scoreboard')


function visibilityFunction() {

  switch (currentDiv) {

    case "login-page":
      loginDiv.id = 'is_hidden'
      orientateDiv.id = 'is_visible'
      currentDiv = 'orientate'
    break;

    case "sign-up":
    console.log("Hi Matt")
    break;

    case "orientate":
    orientateDiv.id = 'is_hidden'
    gameplayDiv.id = 'is_visible'
    currentDiv = 'gameplay'
    break;

    case "gameplay":
    gameplayDiv.id = 'is_hidden'
    scoreboardDiv.id = 'is_visible'
    currentDiv = 'scoreboard'
    break;

    case "scoreboard":
    scoreboardDiv.id = 'is_hidden'
    orientateDiv.id = 'is_visible'
    currentDiv = 'orientate'
    break;

    default:
    console.log("Hi person who I don't know!")
  };
}







//
const signUpFormEl = document.querySelector('#signup_form')
const signUpDiv = document.querySelector('.sign-up')
const welcomeEl = document.querySelector('#welcome') 
const locationEl = document.querySelector('#current-location') 

let loggedIn = false

let state = {}


document.addEventListener('DOMContentLoaded', () => {
    init()
})

const addEventListerToSignUpForm = () => {

signUpFormEl.addEventListener('submit', (event) => {
    event.preventDefault()
    addUserToApi(event.target.name.value, event.target.username.value)
    state.current_user = event.target.name.value
    loggedIn = !loggedIn

    if (loggedIn) { signUpDiv.style.display = 'none' }

    showWelcome()
    
})
}

const showWelcome = () => {
    getLocation()
    // if (!loggedIn) { signUpDiv.style.display = 'none' }

    welcomeEl.innerText = `Welcome ${state.current_user}`
}


const addUserToApi = (name, username) => {
    const options = {
        method: 'POST',
        headers: {
            'Accepts': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, username})
    }
    return fetch(USERSURL, options)
     .then(resp => resp.json())
}


const init = () => {
    // addButton()
    addEventListerToSignUpForm()
}
