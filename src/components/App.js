import React, {Component} from 'react';
import LocationList from './LocationList';

class App extends Component {
    constructor(props) {
        super(props);
        
        // retain object instance when used in the function
        this.initMap = this.initMap.bind(this);
        this.openInfoWindow = this.openInfoWindow.bind(this);
        this.closeInfoWindow = this.closeInfoWindow.bind(this);      
        
        this.state = {
            'alllocations': [
                {
                    'name': "K & K Soul Food",
                    'type': "Restaurant",
                    'latitude': 33.773410,
                    'longitude': -84.416150,
                    'streetAddress': "Lalarpura Road, Gandhi Path"
                },
                {
                    'name': "Hankook Taqueria",
                    'type': "Restaurant",
                    'latitude': 33.811490,
                    'longitude': -84.431670,
                    'streetAddress': "Plot No. 11/12, Vivek Vihar"
                },
                {
                    'name': "Milk & Honey",
                    'type': "Restaurant",
                    'latitude': 33.748997,
                    'longitude': -84.387985,
                    'streetAddress': "Plot No. 11/12, Vivek Vihar"
                },
                {
                    'name': "Mary Mac's",
                    'type': "Restaurant",
                    'latitude': 33.772860,
                    'longitude': -84.379880,
                    'streetAddress': "Plot No. 11/12, Vivek Vihar"
                },
                {
                    'name': "A- Town Wings",
                    'type': "Restaurant",
                    'latitude': 33.772861,
                    'longitude': -84.379883,
                    'streetAddress': "Plot No. 11/12, Vivek Vihar"
                },
                {
                    'name': "Happy Wings",
                    'type': "Restaurant",
                    'latitude': 33.777950,
                    'longitude': -84.477820,
                    'streetAddress': "18, Gautam Marg, Vaishali Nagar"
                }
            ],
            'map': '',
            'infowindow': '',
            'prevmarker': ''
        };

    }

    componentWillMount() {
        window.initMap = this.initMap;
        loadMapJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyBmkGEvVaQO-LY3KQlRBwOKDcrSAszFWNk&callback=initMap')
    }

    /**
     * Initialise the map once the google map script is loaded
     */
    initMap() {
        let self = this;
        let mapview = document.getElementById('map');
        mapview.style.height = window.innerHeight + "px";
        let InfoWindow = new window.google.maps.InfoWindow({});
        let map = new window.google.maps.Map(mapview, {
            center: {lat: 33.748997, lng: -84.387985},
            zoom: 12,
            mapTypeControl: false
        });
        
        window.google.maps.event.addListener(InfoWindow, 'closeclick', function () {
            self.closeInfoWindow();
        });

        this.setState({
            'map': map,
            'infowindow': InfoWindow
        });

        window.google.maps.event.addDomListener(window, "resize", 
        );

        window.google.maps.event.addListener(map, 'click', function () {
            self.closeInfoWindow();
        });

        let alllocations = [];
        this.state.alllocations.forEach(function (location) {
            let longname = location.name + ' - ' + location.type;
            let marker = new window.google.maps.Marker({
                position: new window.google.maps.LatLng(location.latitude, location.longitude),
                animation: window.google.maps.Animation.DROP,
                map: map
            });

            marker.addListener('click', function () {
                self.openInfoWindow(marker);
            });

            location.longname = longname;
            location.marker = marker;
            location.display = true;
            alllocations.push(location);
        });
        this.setState({
            'alllocations': alllocations
        });
    }

    /**
     * Open the infowindow for the marker
     * @param {object} location marker
     */
    openInfoWindow(marker) {
        this.closeInfoWindow();
        this.state.infowindow.open(this.state.map, marker);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        this.setState({
            'prevmarker': marker
        });
        this.state.infowindow.setContent('Loading Data...');
        this.state.map.setCenter(marker.getPosition());
        this.state.map.panBy(0, -200);
        this.getMarkerInfo(marker);
    }

    /**
     * Retrive the location data from the foursquare api for the marker and display it in the infowindow
     * @param {object} location marker
     */
    getMarkerInfo(marker) {
        var self = this;
        var clientId = "OOFGEXEFBTWLWNQRGT3BMS1DWEUBC1NGKXU2FWVMAN2P5OZN";
        var clientSecret = "MX34M2MHYUGWNIEQLQMM4XDWQYDHJW035YI330CBSJGN41ES";
        var url = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20130815&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";
        
        fetch(url)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        self.state.infowindow.setContent("Sorry data can't be loaded");
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                      var results = data.response.venues[0];
         var place = `<h2>${results.name}</h2>`;
         var street = `<h3>${results.location.formattedAddress[0]}</h3>`;
         var readMore =
           '<a href="https://foursquare.com/v/' +
           results.id +
           '" target="_blank">More information you will find on <b>Foursquare</b></a>';
         self.state.infowindow.setContent(place + street + readMore);
       });
     })
     .catch(function(err) {
       self.state.infowindow.setContent("Error");
     });
 }

    /**
     * Close the infowindow for the marker
     * @param {object} location marker
     */
    closeInfoWindow() {
        if (this.state.prevmarker) {
            this.state.prevmarker.setAnimation(null);
        }
        this.setState({
            'prevmarker': ''
        });
        this.state.infowindow.close();
    }

    /**
     * Render function of App
     */
    render() {
        return (
            <div>
                <LocationList key="100" alllocations={this.state.alllocations} openInfoWindow={this.openInfoWindow}
                              closeInfoWindow={this.closeInfoWindow}/>
                <div id="map"></div>
            </div>
        );
    }
}

function loadMapJS(url) {
let index  = window.document.getElementsByTagName("script")[0]
let script = window.document.createElement("script")
script.src = url
script.async = true
script.defer = true
index.parentNode.insertBefore(script, index)
}

export default App;
