document.addEventListener('DOMContentLoaded', () => {
  init()

})

if (window.location.href.includes('ngrok'))

{
  BASEURL = 'https://c42d24db.ngrok.io/api/v1'

} else {
  BASEURL = 'http://localhost:3000/api/v1'
}

const USERSURL =  BASEURL + '/users'
const REGIONURL = BASEURL + '/regions'
const GAMESURL = BASEURL + '/games'


const findLocationDiv = document.querySelector('.find-location')


let timerCount;
let countDown;
let timerSeconds = 10;
let currentDiv = "sign-up"
let loggedIn = false
let allRegions = []
let allScores = []
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
// const welcomeEl = document.querySelector('#welcome')
const locationEl = document.querySelector('#current-location')
const targetNameEl = document.querySelector("#target-name")
const counterCont = document.querySelector(".counter-container")
const countInDiv = document.querySelector('.count-in-timer')
const readyBtnEL = document.querySelector('#ready-btn')
const timerDisplay = document.querySelector('.display_time_left')
const gameplayBtnEl = document.querySelector('#gameplay-btn')
const finalScoreEl = document.querySelector('#final-score')
const title = document.querySelector('.header-bar')
const logo = document.querySelector('.logo-cont')
const restartBtnEl = document.querySelector('#restart-btn')
const loadingDiv = document.querySelector('.loading')
const scoreboardBodyEl = document.querySelector('.scoreboard-body')


// =============================================================================



const setTarget = (randomNum, state) =>{
  let round_index = state.round-1
  let currentRegion = allRegions[0][round_index]
  state.target = currentRegion.cities[randomNum]
  targetNameEl.innerText = `Find: ${state.target.name}`
}

// ========================VISBILITY FUNCTIONS=================================


// on-click functionality in HTML changes which DIV is visible to the user.
function visibilityFunction() {

  switch (currentDiv) {

    case "sign-up":
    signUpDiv.id = 'is_hidden'
    loading()
    loadingDiv.id = 'is_visible'
    title.id = 'is_hidden'
    logo.id ='is_hidden'
    currentDiv = 'loading'
    break;

    case "loading":
      loadingDiv.id = 'is_hidden'
      orientateDiv.id = 'is_visible'
      currentDiv = 'orientate'
    break;

    case "orientate":
    orientateDiv.id = 'is_hidden'
    counterCont.id = 'is_visible'
    gameplayDiv.id = 'is_hidden'
    scoreboardDiv.id = 'is_hidden'
    currentDiv = 'count-in'
    countInTimer()
    break;

    case "count-in":
    // title.id = 'is_hidden'

    counterCont.id = 'is_hidden'
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


  // ===========================================================================


const getTargetBearingFirstRound = () => {
  readyBtnEL.addEventListener('click', () => {
    setTarget(randValue(), state)
    getTargetBearing()
    console.log(state.targetBearing)
    console.log(state.target)
  })

}

// ====================SIGN IN FORM=============================================

document.querySelector('#sign-up-link').addEventListener('click', () => document.querySelector('#sign-up-submit').click())


const addEventListerToSignUpForm = () => {
signUpFormEl.addEventListener('submit', (event) => {
    event.preventDefault()

    addUserToApi(event.target.name.value, event.target.username.value)
     .then(user => state.userId = user.id)


    state.currentUser = event.target.name.value
    state.currentUsername = event.target.username.value
    loggedIn = !loggedIn

    if (loggedIn) { signUpDiv.style.display = 'none' }

    showWelcome()
    addPointerToPage()
    addBearingEventListener()

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
    // welcomeEl.innerText = `Welcome ${state.currentUser}`
}

// =============================LOADING PAGE====================================


const loading = () => {

  let counter = 3;
  let phrase = "Loading"

    loadingDiv.innerHTML = `<h3>${phrase}...</h3>`

    let gameCountIn = setInterval(function(){
      if (counter === 3) {
        loadingDiv.innerHTML = `
        <h3>${phrase}</h3>
        `
        --counter
      } else if (counter === 2){
        loadingDiv.innerHTML = `
        <h3>${phrase}.</h3>
        `
        --counter
      } else if (counter === 1){
        loadingDiv.innerHTML = `
        <h3>${phrase}..</h3>
        `
        --counter
      } else{
        clearInterval(gameCountIn);
        loading()
      }
    }, 1000);
  }




// =============================================================================

// Gameplay Round functionality
const currentRoundEl = document.querySelector('#round')
const currentScoreEl = document.querySelector('#score')
const gameplayBtn = document.querySelector("#gameplay-btn")


// get a random number between 0 and 4 to select city from
const randValue = () => {
  return Math.floor(Math.random() * 5);
}


const calculateDegreeDifference =  (bearing, heading) =>  {
  return Math.abs(((((bearing - heading) % 360) + 540) % 360) - 180)
}



  gameplayBtn.addEventListener("click", () => {

    // console.log(state.target)
    // console.log(state.targetBearing)
    // nextRound()
    removeBearingEventListener()
console.log(state.target)
console.log(state.targetBearing)
  })

  const nextRound = () => {

    let roundScore = Math.floor(calculateDegreeDifference(state.targetBearing, state.userBearing))
    console.log(`this round: ${roundScore}`)

    state.score = state.score+roundScore
    console.log(`total score: ${state.score}`)

    if (state.round < 5){

      ++state.round
      let index = randValue()

      setTarget(index, state)
      getTargetBearing()
      roundScore = 0


      addBearingEventListener()


  currentRoundEl.innerText = `Round: ${state.round}`
  currentScoreEl.innerText = `Score: ${state.score}`
  targetNameEl.innerText = `Find: ${state.target.name}`
  currentDiv = "orientate"
  visibilityFunction()


  } else{
    state.round = 1
    addScoreToLocalScores()
    sortScore()
    displayScoreboard()
    currentDiv = "gameplay"
    visibilityFunction()
    currentRoundEl.innerText = `Round: 1`
    currentScoreEl.innerText = `Score: 0`
    finalScoreEl.innerText = `Your score: ${state.score}`
    addGameToApi(state.userId, state.score)
  }
}


const addScoreToLocalScores = () => {
  const newScore = [state.currentUsername, state.score]
  allScores.push(newScore)
}




//==============================================================================
// // TIMERS
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
  // const display = `${seconds}:${remainderMilli}`
   const display = `${minutes < 10 ? '0': ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
   if (display === '00:00'){
     timerDisplay.textContent = display
    // console.log('DONE!!')
     // vibrate & end of round and change round 2
      nextRound()
        console.log(state.target)
        console.log(state.targetBearing)

   }else {
     timerDisplay.textContent = display
   }
};


// function count into each round

const countInTimer = () => {
  if(state.round <= 5){
    countInDiv.innerHTML = ''
    let counter = 1;
    let gameCountIn = setInterval(function(){
      if (counter === 0) {
        countInDiv.innerHTML = `
        <h1>GO!</h1>
        `

        --counter
      } else if (counter === -1){
        currentDiv = "count-in"
        visibilityFunction()
        clearInterval(gameCountIn);
        timer(timerSeconds)
      } else{
        countInDiv.innerHTML = `
        <h1>${counter}</h1>
        `
        --counter
      }

    }, 1000);
  } else{
    clearInterval(gameCountIn)
    currentDiv = "gameplay"
    visibilityFunction()
  }
}


// =============================================================================

const addPointerToPage = () => {

     const compass = document.querySelector('.compass')
      const circle = document.querySelector('#svg_1')

    window.addEventListener('deviceorientation', function (event) {
          let alpha = event.alpha
          let beta = event.beta
          let gamma = event.gamma
          circle.style.transform = `rotate(${alpha}deg)`
      });

}

// let testHeadingEl = document.createElement('h1')


// callback function for bearing event listener
const deviceOrientationListener = (event) => {
  var alpha = event.alpha;

  if (typeof event.webkitCompassHeading !== "undefined") {
    alpha = event.webkitCompassHeading;
    state.userBearing = alpha
  }
  else {
    state.userBearing = 360 - alpha;
  }

  // testHeadingEl.innerHTML = `TEST HEADING ${Math.floor(state.userBearing)}`

  headingEl = document.querySelector('#orient-heading')

  state.userBearing < 1 ? headingEl.innerHTML = `N` : headingEl.innerHTML = `${Math.floor(state.userBearing)}&deg`

  document.body.prepend(testHeadingEl)
  document.body.prepend(testTargetEl)
  // state.userBearing = Math.floor(360 - alpha);
}


//function to add and remove window event listener and log bearing

// callback function to make sure the score is always positive
const makeScorePositive = (i) => {
  return Math.sqrt(Math.pow(i, 2))
}

const addBearingEventListener = () => {
  if (window.DeviceOrientationAbsoluteEvent) {
    window.addEventListener("DeviceOrientationAbsoluteEvent", deviceOrientationListener);
  }
  else if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", deviceOrientationListener);
  }
  else {
    alert("Sorry, try again on a compatible mobile device!");
  }
}


const removeBearingEventListener = () => {
  if (window.DeviceOrientationAbsoluteEvent) {
    window.removeEventListener("DeviceOrientationAbsoluteEvent", deviceOrientationListener);
  }
  else if (window.DeviceOrientationEvent) {
    window.removeEventListener("deviceorientation", deviceOrientationListener);
  }
}

// ===============================SCOREBOARD FUNCTIONS===============================================

// SCOREBOARD FUNCTIONS

restartBtnEl.addEventListener('click', () => {
  state.round = 1
  state.score = 0
  let randomNum = randValue()
  setTarget(randomNum, state)
  currentDiv = 'orientate'
  visibilityFunction()
})

const sortScore = () => allScores.sort((a, b) => a[1] - b[1])

const displayScoreboard = () =>{
  scoreboardBodyEl.innerHTML = ''
  for (var i = 0; i < 3; i++) {
    const tableRow = document.createElement('tr')
    tableRow.innerHTML = `
    <td>${allScores[i][0]}</td>
    <td>${allScores[i][1]}</td>
    `
    scoreboardBodyEl.append(tableRow)
  }
}


// =============================================================================

const init = () => {
    addEventListerToSignUpForm()
    getRegions().then(storeRegions)
    getUsers().then(renderScores)
     getTargetBearingFirstRound()
}
