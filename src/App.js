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
    this.renderMap()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBmkGEvVaQO-LY3KQlRBwOKDcrSAszFWNk&callback=initMap")
    window.initMap = this.initMap
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