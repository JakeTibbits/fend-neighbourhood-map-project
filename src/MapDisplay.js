import React, { Component } from 'react'
import { Map, Marker, InfoWindow } from 'google-maps-react'



class MapContainer extends Component {

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
            lat: 53.721443,
            lng: -2.098358
          },
          places = this.props.places

    return (
      <div className="map-container">
        <Map google={this.props.google} zoom={13} style={style} initialCenter={center} onClick={this.onMapClicked} type="satellite">
          {places.length && (
            places.map((place) => (
              <Marker key={place.id} onClick={this.onMarkerClick}
                    name={place.name} position={place.position} description={place.description}/>
            ))
          )}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
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

export default MapContainer
