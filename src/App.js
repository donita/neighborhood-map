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
    near:"Sydney",
    v: "20182507"
  }
axios.get(endPoint + new URLSearchParams(parameters))
.then(response => {
  console.log(response)
})
.catch(error => {
  console.log("ERROR!! " + error)
})
}


  initMap = () => {

    // Create A Map
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    })


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