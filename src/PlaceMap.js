import React, { Component } from 'react'
import { Map, InfoWindow, Marker } from 'google-maps-react'


class PlaceMap extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };


  render() {

    const style = {
            width: "100%",
            height: "100%"
          },
          center = {
            lat: 53.707054,
            lng: -2.095305
          },
          {places, google} = this.props


    return (
      <div className="map-container">
        <Map google={google} zoom={15} style={style} initialCenter={center} onClick={this.onMapClicked} type="satellite">
          {places.length && (
            places.map((place) => {

              const icon = {
                url: place.icon,
                size: new google.maps.Size(60,60),
                origin: new google.maps.Point(0,0),
                anchor: new google.maps.Point(30,60),
                scaledSize: new google.maps.Size(55,55)
              }
              //console.log(markerIcon)
              return (
                <Marker
                  key={place.id}
                  onClick={this.onMarkerClick}
                  name={place.name}
                  position={place.position}
                  description={place.description}
                  icon={icon}
                />
              )
            })
          )}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h3>{this.state.selectedPlace.name}</h3>
              <p>{this.state.selectedPlace.description}</p>
            </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}

export default PlaceMap
