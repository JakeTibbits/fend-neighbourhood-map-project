import React, { Component } from 'react'
import { Map, Marker, InfoWindow } from 'google-maps-react'


export class SpoofableMarker extends Marker{
  state = {
    clicked: false
  }

  componentDidUpdate(prevProps) {
    if (this.props.spoof !== prevProps.spoof){
      this.props.onClick( this.props, this.marker )
    }
  }

}


class PlaceMap extends Component {

  handleMarkerClick = (props, marker, e) => {
    this.props.onMarkerClick({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      activeButton: {}
    })
  }


  handleMapClick = (props) => {
    if (this.props.infoState.showingInfoWindow) {
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
  }


  render() {

    const style = {
            width: "100%",
            height: "100%"
          },
          center = {
            lat: 53.7124,
            lng: -2.098
          },
          {places, google, spoofClick} = this.props,
          {showingInfoWindow, activeMarker, selectedPlace} = this.props.infoState


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
          mapType='roadmap'
        >
          {places.length && (
            places.map((place) => {
              return (
                <SpoofableMarker
                  spoof={(spoofClick === place.id)}
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
