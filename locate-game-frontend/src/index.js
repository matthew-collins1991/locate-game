const USERSURL =  'http://localhost:3000/api/v1/users'
const BASEURL =  'http://localhost:3000/api/v1'
const findLocationDiv = document.querySelector('.find-location')

const heading = document.createElement('h1')
heading.innerHTML = 'Degrees of Separation!'
findLocationDiv.prepend(heading)

let currentDiv = "login-page"
let loggedIn = false
let state = {}


const loginDiv = document.querySelector('.login-page')
const signUpDiv = document.querySelector('.sign-up')
const orientateDiv = document.querySelector('.orientate')
const gameplayDiv = document.querySelector('.gameplay')
const scoreboardDiv = document.querySelector('.scoreboard')
const signUpFormEl = document.querySelector('#signup_form')
const welcomeEl = document.querySelector('#welcome')
const locationEl = document.querySelector('#current-location')

document.addEventListener('DOMContentLoaded', () => {
    init()
})

function visibilityFunction() {

  switch (currentDiv) {
    case "login-page":
      loginDiv.id = 'is_hidden'
      orientateDiv.id = 'is_visible'
      currentDiv = 'orientate'
    break;

    case "sign-up":
    signUpDiv.id = 'is_hidden'
    orientateDiv.id = 'is_visible'
    currentDiv = 'orientate'
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

document.addEventListener('click', event =>{
  if(event.target.id === "go-to-sign-up"){
    loginDiv.id = 'is_hidden'
    signUpDiv.id = 'is_visible'
    currentDiv = 'sign-up'
  }
})


const addEventListerToSignUpForm = () => {

signUpFormEl.addEventListener('submit', (event) => {
    event.preventDefault()
    addUserToApi(event.target.name.value, event.target.username.value)
      
    state.current_user = event.target.name.value
    loggedIn = !loggedIn

    if (loggedIn) { signUpDiv.style.display = 'none' }

    showWelcome()
    addPointerToPage()

})
}

const addLocationToPage = (location) => {
   const p = document.createElement('p')
    p.innerText = `${location}`
    findLocationDiv.append(p)
}

const showWelcome = () => {
    
    getUserLocation()
    welcomeEl.innerText = `Welcome ${state.current_user}`
}



const addPointerToPage = () => {
    const point = document.createElement('img')
    point.className = 'compass-point'
    const gameSection = document.querySelector('.game-section')

    point.src = 'image/compass.svg'
    point.height = 150;
    point.width = 150;

    gameSection.appendChild(point)

    // navigator.geolocation.watchPosition((data) => {
    // // point.style.transform = `rotate(${data.coords.heading}deg)`
    // console.log(data)
    // })

    // this should fire when signed in or new game clicked

    if (window.DeviceorientationEvent) {
        console.log('Device orientation is supported ')
        window.addEventListener('deviceorientation', function (event) {
            let alpha = event.alpha
            let beta = event.beta
            let gamma = event.gamma
            point.style.transform = `rotate(${alpha}deg)`
        });
    } else {
        console.log('device orientation is NOT supported')
    }
}






const init = () => {
    addEventListerToSignUpForm()
}
