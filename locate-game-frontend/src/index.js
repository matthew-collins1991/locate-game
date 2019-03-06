document.addEventListener('DOMContentLoaded', () => {
  init()
})



if (window.location.href.includes('ngrok'))

{ BASEURL = 'https://1dec02ea.ngrok.io/api/v1'

} else {
  BASEURL = 'http://localhost:3000/api/v1'
}

const USERSURL =  BASEURL + '/users'
const REGIONURL = BASEURL + '/regions'


const findLocationDiv = document.querySelector('.find-location')


let timerCount;
let countDown;
let timerSeconds = 11;
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
const countInDiv = document.querySelector('.count-in-timer')
const readyBtnEL = document.querySelector('#ready-btn')

// =============================================================================

// on page load


const setTarget = (randomNum, state) =>{
  let round_index = state.round-1
  let currentRegion = allRegions[0][round_index]
  state.target = currentRegion.cities[randomNum]
  targetNameEl.innerText = `Find: ${state.target.name}`
}

// =============================================================================


// on-click functionality in HTML changes which DIV is visible to the user.
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
    countInDiv.id = 'is_visible'
    gameplayDiv.id = 'is_hidden'
    scoreboardDiv.id = 'is_hidden'
    currentDiv = 'count-in'
    countInTimer()
    break;

    case "count-in":
    countInDiv.id = 'is_hidden'
    gameplayDiv.id = 'is_visible'
    currentDiv = 'gameplay'
    //gameStartCountdown(3)

    break;

    case "gameplay":
    gameplayDiv.id = 'is_hidden'
    scoreboardDiv.id = 'is_visible'
    countInDiv.id = 'is_hidden'
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


const getTargetBearingFirstRound = () => {

  readyBtnEL.addEventListener('click', () => {
    getTargetBearing()
  })

}

const addEventListerToSignUpForm = () => {

signUpFormEl.addEventListener('submit', (event) => {
    event.preventDefault()
    addUserToApi(event.target.name.value, event.target.username.value)

    state.currentUser = event.target.name.value
    loggedIn = !loggedIn

    if (loggedIn) { signUpDiv.style.display = 'none' }

    showWelcome()
    addPointerToPage()
    bearingEventListener()

})
}

const addLocationToPage = (location) => {
   const p = document.createElement('p')
    p.innerText = `${location}`
    findLocationDiv.append(p)
}

const showWelcome = () => {
    getLocation()
    currentDiv = "sign-up"
    visibilityFunction()

    // if (!loggedIn) { signUpDiv.style.display = 'none' }

    welcomeEl.innerText = `Welcome ${state.currentUser}`
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

    // gameStartCountdown(3)
    // gameStartTimer.id = 'is_visible'

    let roundScore = 35

    ++state.round


    state.score = state.score+roundScore
  currentRoundEl.innerText = `Round: ${state.round}`
  currentScoreEl.innerText = `Score: ${state.score}`
  targetNameEl.innerText = `Find: ${state.target.name}`
  currentDiv = "orientate"
  visibilityFunction()
  getTargetBearing()

  let index = randValue()
  setTarget(index, state)
  
  

} else{
visibilityFunction()

}
})

// =============================================================================

//==============================================================================
// TIMERS
function timer(seconds){
// clear any existing timers
  clearInterval(timerCount)
  const now = Date.now()
  const then = now + seconds * 1000;
  displayTimeLeft(seconds)

  timerCount = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now())/ 1000)

// check if it should stop

    if(secondsLeft <= 0) {
      clearInterval(timerCount)
    }
// display it
    // timerDisplay.id = 'is_visible'
    displayTimeLeft(secondsLeft)
  },1000)

}


function displayTimeLeft(seconds){
  const minutes = Math.floor(seconds/60)
  const remainderSeconds = seconds % 60
  const display = `${minutes < 10 ? '0': ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
  // if (display === '0')
  timerDisplay.textContent = display
}


// function count into each round

const countInTimer = () => {
  if(state.round < 5){
    countInDiv.innerHTML = ''
    let counter = 3;
    let gameCountIn = setInterval(function(){
      if (counter === 0) {
        countInDiv.innerHTML = `
        <h1>GO!</h1>
        `
        timer(timerSeconds)
        --counter
      } else if (counter === -1){
        currentDiv = "count-in"
        visibilityFunction()
        clearInterval(gameCountIn);
      } else{
        countInDiv.innerHTML = `
        <h1>${counter}</h1>
        `
        --counter
      }

    }, 1000);
  } else{
    currentDiv = "gameplay"
    visibilityFunction()
  }
}


// =============================================================================

const addPointerToPage = () => {
    const point = document.createElement('img')
    point.className = 'compass-point'
    const pointerSection = document.querySelector('.pointer-section')

    point.src = 'image/compass.svg'
    point.height = 150;
    point.width = 150;

    pointerSection.appendChild(point)

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


// callback function for bearing event listener
    const  deviceOrientationListener = (event) =>  {
      let alpha = event.alpha;
      state.userBearing = Math.floor(360 - alpha);
    }


//function to add and remove window event listener and log bearing

const bearingEventListener = () => {
window.addEventListener("deviceorientation", deviceOrientationListener)


  buttonEl = document.createElement('button')
  gameplayDiv.append(buttonEl)
  buttonEl.innerText = 'SET BEARING'


  buttonEl.addEventListener('click', () => {
    window.removeEventListener("deviceorientation", deviceOrientationListener);

    let bearingTestEl = document.createElement('h1')
    bearingTestEl.innerText = `Score for this round is ${state.targetBearing - state.userBearing}`
    document.body.prepend(bearingTestEl)
})
}

const init = () => {
    addEventListerToSignUpForm()
    getRegions().then(storeRegions)
    getTargetBearingFirstRound()
}


