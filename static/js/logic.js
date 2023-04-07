let newYorkCoords = [40.73, -74.0059];
let mapZoomLevel = 12;

// Create the createMap function.
function createMap(bikeStations) {

  // Create the tile layer that will be the background of our map.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  // Create a baseMaps object to hold the lightmap layer.
  let baseMaps = {
    "Street Map": street
  };

  // Create an overlayMaps object to hold the bikeStations layer.
  let overlayMaps = {
    "Bike Stations": bikeStations
  };

  // Create the map object with options.
  let myMap = L.map("map-id", {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    layers: [street, bikeStations]
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);


}


// Create the createMarkers function.
function createMarkers(response){

  // Pull the "stations" property from response.data.
  let station = response.data.stations;

  // Initialize an array to hold the bike markers.
  let bike_mark = [];

  // Loop through the stations array.
  for (i = 0; i < (station.length - 1); i++) {
    // For each station, create a marker, and bind a popup with the station's name.
    let marker = L.marker([station[i].lat, station[i].lon], {
      draggable: false,
      title: station[i].name,
    }).bindPopup(`<h2>${station[i].name}</h2> <br> <h2> Capacity: ${station[i].capacity}</h2>`);
    // Add the marker to the bikeMarkers array.
    bike_mark.push(marker);
  }
  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  createMap(L.layerGroup(bike_mark));

}

  

// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
let queryURL = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json";
d3.json(queryURL).then(function (data) {
  console.log(data)
  createMarkers(data)
});
