const USERSURL =  'http://localhost:3000/api/v1/users'
const BASEURL =  'http://localhost:3000/api/v1'
const REGIONURL = 'http://localhost:3000/api/v1/regions'
const findLocationDiv = document.querySelector('.find-location')

const heading = document.createElement('h1')
heading.innerHTML = 'Degrees of Separation!'
findLocationDiv.prepend(heading)

let currentDiv = "login-page"
let loggedIn = false
let allRegions = []
let state = {
  round: 1,
  score: 0,
  target: []
}



// =============================================================================

const loginDiv = document.querySelector('.login-page')
const signUpDiv = document.querySelector('.sign-up')
const orientateDiv = document.querySelector('.orientate')
const gameplayDiv = document.querySelector('.gameplay')
const scoreboardDiv = document.querySelector('.scoreboard')
const signUpFormEl = document.querySelector('#signup_form')
const welcomeEl = document.querySelector('#welcome')
const locationEl = document.querySelector('#current-location')
const targetNameEl = document.querySelector("#target-name")


// =============================================================================

// on page load
document.addEventListener('DOMContentLoaded', () => {
    init()
})

<<<<<<< HEAD
=======
const setTarget = (index, state) =>{
  let round_index = state.round-1
  let currentRegion = allRegions[0][round_index]
  state.target = currentRegion.cities[index]
  targetNameEl.innerText = `Find: ${state.target.name}`
}

// =============================================================================


// on-click functionality in HTML changes which DIV is visible to the user.
>>>>>>> matt-branch
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
    console.log(state.coords, 'hello')
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

<<<<<<< HEAD

=======
>>>>>>> matt-branch
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
<<<<<<< HEAD
    
    getUserLocation()
=======
    getLocation()
    currentDiv = "sign-up"
    visibilityFunction()

    // if (!loggedIn) { signUpDiv.style.display = 'none' }

>>>>>>> matt-branch
    welcomeEl.innerText = `Welcome ${state.current_user}`
}

// =============================================================================

// Gameplay Round functionality
const currentRoundEl = document.querySelector('#round')
const currentScoreEl = document.querySelector('#score')



// get a random number between 0 and 4 to select city from
const randValue = () => {
  return Math.floor(Math.random() * 5);
}

const gameplayBtn = document.querySelector("#gameplay-btn")
gameplayBtn.addEventListener("click", ()=>{
  if (state.round < 5){
    // ADD SCORING HERE
    let roundScore = 35
    ++state.round
    state.score = state.score+roundScore
  currentRoundEl.innerText = `Round: ${state.round}`
  currentScoreEl.innerText = `Score: ${state.score}`
  targetNameEl.innerText = `Find: ${state.target.name}`
  let index = randValue()
  setTarget(index, state)
} else{
visibilityFunction()
}
})



// =============================================================================

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
    getRegions().then(storeRegions)
}
