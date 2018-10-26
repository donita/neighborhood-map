import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  
  initMap = () => {
        const map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
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


/*
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
   async defer></script>
   
   */

function loadingScript(url) {
  let index = window.document.getElementByTagName("script")[0]
  let script = window.document.createElement("script")
  script.src = url
  script.async =  true
  script.defer =  true
  index.parentNode.insertBefore(script,index)
  
}





export default App;
