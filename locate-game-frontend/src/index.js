const findLocationDiv = document.querySelector('.find-location')

const heading = document.createElement('h1')
heading.innerHTML = 'LOCATION TEST'
findLocationDiv.prepend(heading)



document.addEventListener('DOMContentLoaded', () => { init() })


const addButton = () => {
    const button = document.createElement('button')
    button.innerText = "show my location"
    findLocationDiv.append(button)

    button.addEventListener('click', () => {
        getLocation()
    })
}

const getLocation = () => {
    navigator.geolocation.getCurrentPosition(showLocation);

}

const showLocation = (position) => {
    const latlong = `${position.coords.latitude},${position.coords.longitude}`
    getAddressFromApi(latlong)
}

const getAddressFromApi = (coords) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords}&key=AIzaSyAz2usdpA-kqhzeMH1MGwc-ZtmM28sQo30`)
      .then(resp => resp.json())
       .then(json => addLocationToPage(json.results[5].formatted_address))
}


const addLocationToPage = (location) => {
   const p = document.createElement('p')
    p.innerText = `Your current location is: ${location}`
    findLocationDiv.append(p)
}


const init = () => {
    addButton()
}


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

if(window.DeviceorientationEvent){

  console.log('Device orientation is supported ')

  window.addEventListener('deviceorientation', function(event) {
    let alpha = event.alpha
    let beta = event.beta
    let gamma = event.gamma
     point.style.transform = `rotate(${alpha}deg)`
  });

} else {
  console.log('device orientation is NOT supported')
}
