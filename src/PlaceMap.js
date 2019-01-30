import React, { Component } from 'react'
import { Map, Marker, InfoWindow } from 'google-maps-react'
import Place from './Place'


class PlaceMap extends Component {

  state = {
    activeMarker: null,
    selectedPlace: {},
    showingInfoWindow: false
  }

  componentDidMount(){
    let infoState = this.props.infoState
    this.setState({
      activeMarker: infoState.activeMarker,
      selectedPlace: infoState.selectedPlace,
      showingInfoWindow: infoState.showingInfoWindow
    })
  }

  handleMarkerClick = (props, marker, e) => {
    this.props.onMarkerClick({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
    this.setState({
      activeMarker: this.props.infoState.activeMarker,
      selectedPlace: this.props.infoState.selectedPlace,
      showingInfoWindow: this.props.infoState.showingInfoWindow
    })
  }

  handleMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.props.onMarkerClick({
        selectedPlace: {},
        activeMarker: {},
        activeButton: {},
        showingInfoWindow: false
      })
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
            lat: 53.7124,
            lng: -2.098
          },
          {places, google} = this.props,
          {showingInfoWindow, activeMarker, selectedPlace} = this.state


    return (
      <section className="map-container">
        <Map
          google={google}
          zoom={15}
          style={style}
          initialCenter={center}
          onClick={this.handleMapClick}
          disableDefaultUI={true}
          zoomControl={false}
          gestureHandling='none'
          mapType='rtoadmap'
        >
          {places.length && (
            places.map((place) => {
              return (
                <Marker
                  placeId={place.id}
                  key={place.id}
                  onClick={this.handleMarkerClick}
                  name={place.name}
                  position={place.position}
                  description={place.description}
                  icon={place.icon}
                />
              )
            })
          )}

          <InfoWindow
            marker={activeMarker}
            visible={showingInfoWindow}>
            <div>
                <h3>{selectedPlace.name}</h3>
                <p>{selectedPlace.description}</p>

              </div>
          </InfoWindow>
        </Map>

      </section>
    )
  }
}

export default PlaceMap
