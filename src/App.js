import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount() {
   this.renderMap()
 }
  
renderMap = () => {
  loadScript("https://maps.googleapis.com/maps/api/js?AIzaSyBmkGEvVaQO-LY3KQlRBwOKDcrSAszFWNk&callback=initMap")
   window.initMap = this.initMap
}
  
      function initMap() {
           var map = new google.maps.Map(document.getElementById('map'), {
             zoom: 8,
             center: {lat: -34.397, lng: 150.644}
           });
  

      render() {
       return (
         <main>
           <div id="map"></div>
         </main>
       )
     }
   }



function loadScript(url) {
  var index = document.window.getElementByTagName("script")[0]
  var script = document.window.createElement("script")
  script.src = url
  script.async =  true
  script.defer =  true
  index.parentNode.insertBefore(script, index)
  
}





export default App;
