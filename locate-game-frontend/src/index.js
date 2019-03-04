const heading = document.createElement('h1')
heading.innerHTML = 'LOCATION TEST'
document.body.prepend(heading)

const addButton = () => {
    const button = document.createElement('button')
    button.innerText = "show my location"
    document.body.append(button)

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
    document.body.append(p)
}
 

const init = () => {
    addButton()
}

init()