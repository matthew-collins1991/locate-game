const USERSURL =  'http://localhost:3000/api/v1/users'
const BASEURL =  'http://localhost:3000/api/v1'
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
