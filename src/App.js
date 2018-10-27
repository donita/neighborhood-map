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
      near: "Atlanta",
      v: "20182507"
    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.renderMap())
      })
      .catch(error => {
        console.log("ERROR!! " + error)
      })

  }

  initMap = () => {

    // Create A Map
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 33.748997, lng: -84.387985},
      zoom: 8
    })

    // Create An InfoWindow
    let infowindow = new window.google.maps.InfoWindow()

    // Display Dynamic Markers
    this.state.venues.map(myVenue => {

      let contentString = `${myVenue.venue.name}`

      // Create A Marker
      var marker = new window.google.maps.Marker({
        position: {lat: myVenue.venue.location.lat , lng: myVenue.venue.location.lng},
        map: map,
        title: myVenue.venue.name
      })

      // Click on A Marker!
      marker.addListener('click', function() {

        // Change the content
        infowindow.setContent(contentString)

        // Open An InfoWindow
        infowindow.open(map, marker)
      })

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