const mapDiv = document.getElementById('orientate-map')


// orientation map
function initMap() {
  const lat = state.userLat
  const long = state.userLong


console.log(lat, long);
  // sets new map on page, set to zoom 6 over the UK
  let map = new google.maps.Map(document.getElementById('orientate-map'), {
    zoom: 16,
    center: {lat: lat , lng: long},
    mapTypeId: 'terrain'
  });

  mapDiv.append(map);
}
