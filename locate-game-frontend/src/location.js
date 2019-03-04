
// const addButton = () => {
//     const button = document.createElement('button')
//     button.innerText = "show my location"
//     document.body.append(button)

//     button.addEventListener('click', () => {
        
//     })
// }

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
       .then(json => addLocationToState(json.results[5].formatted_address))
}

const addLocationToState = (location) => {
    state.location = location
    locationEl.innerText = `Your current location is ${state.location}`
}
 

// const init = () => {
//     // addButton()
//     // getLocation()
// }



