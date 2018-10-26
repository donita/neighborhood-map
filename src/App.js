/*
https://maps.googleapis.com/maps/api/js?key=AIzaSyBmkGEvVaQO-LY3KQlRBwOKDcrSAszFWNk&callback=initMap
*/

/*
ID: OOFGEXEFBTWLWNQRGT3BMS1DWEUBC1NGKXU2FWVMAN2P5OZN
Secret: MX34M2MHYUGWNIEQLQMM4XDWQYDHJW035YI330CBSJGN41ES
*/

import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

class App extends Component {
  
  state = {
    venues: []
  }
  

  componentDidMount() {
    this.getVenues()
    this.renderMap()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBmkGEvVaQO-LY3KQlRBwOKDcrSAszFWNk&callback=initMap")
    window.initMap = this.initMap
  }

getVenues = () => {
  const endPoint = "https://api.foursquare.com/v2/venues/explore?"
  const parameters = {
    client_id: "OOFGEXEFBTWLWNQRGT3BMS1DWEUBC1NGKXU2FWVMAN2P5OZN",
    client_secret: "MX34M2MHYUGWNIEQLQMM4XDWQYDHJW035YI330CBSJGN41ES",
    query: "food",
    near:"Inglewood",
    v: "20182507"
  }
axios.get(endPoint + new URLSearchParams(parameters))
.then(response => {
  this.setState({ 
    venues: response.data.response.groups[0].items 
  })
})
.catch(error => {
  console.log("ERROR!! " + error)
})
}


  initMap = () => {
    // Create A Map
var map = new window.google.maps.Map(document.getElementById('map'), {zoom: 8});
var geocoder = new window.google.maps.Geocoder; 
        geocoder.geocode({'address': 'Inglewood'}, function(results, status) {
          if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            new window.google.maps.Marker({
              map: map,
              position: results[0].geometry.location
            });
          } else {
            window.alert('Geocode was not successful for the following reason: ' +
                status);
          }
        });

  }

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    )
  }
}

function loadScript(url) {
  var index  = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;