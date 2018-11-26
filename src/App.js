import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

class App extends Component {
  state = {
    venues: []
  }

  componentDidMount() {
    this.getVenues()
  }

  loadMap = () => {
    mapScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDqrfGNgjKre3b3yV0ClFxQuFhGMEZVLZs&callback=initMap");
    window.initMap = this.initMap
  }

  // Foursquare endpoint and Venue data
  getVenues = () => {
    const fsEndPoint = "https://api.foursquare.com/v2/venues/explore?"
    const params = {
      client_id: "ABVZJGS1CLKO2LTF4JQR1GUWSTPNMGYUMOO4TZZ5FKH4POBS",
      client_secret: "W5ID34W151DL1SB4AWEIXKGENWODC5H215EF4Q0SCLPINGEV",
      query: "food",
      near: "Packwood",
      v: "20182507"
    }
  
    axios.get(fsEndPoint + new URLSearchParams(params))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.loadMap())
      })
      .catch(error => {
        console.log("ERROR!! " + error)
      })
  }

  // Initialize Map with Markers and Info Windows
  initMap = () => {
    const styles = [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#242f3e"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#746855"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#242f3e"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#263c3f"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#6b9a76"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#38414e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#212a37"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9ca5b3"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#746855"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#1f2835"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#f3d19c"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#2f3948"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#17263c"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#515c6d"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#17263c"
          }
        ]
      }
    ];
    // Create map
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 46.607266, lng: -121.6706437},
      styles: styles,
      zoom: 15
    })

    // Create info window for markers
    let infoWindow = new window.google.maps.InfoWindow()

    // Show markers
    this.state.venues.map(newVenue => {
      let venueName = `${newVenue.venue.name}`

      let marker = new window.google.maps.Marker({
        position: {lat: newVenue.venue.location.lat , lng: newVenue.venue.location.lng},
        map: map,
        title: newVenue.venue.name,
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
        },
        animation: window.google.maps.Animation.DROP
      })

      marker.addListener('click', function() {
        infoWindow.setContent(venueName)
        infoWindow.open(map, marker)
      })
    })
  }

  render() {
    return (
      <div className="App">
        <div id="map"></div>
      </div>
    );
  }
}

// Load async mapScript
function mapScript(url) {
  let index = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");

  script.src = url;
  script.async = true;
  script.defer = true;

  index.parentNode.insertBefore(script, index);
}

export default App;
