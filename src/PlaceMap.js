import React, { Component } from 'react'
import { Map, Marker, InfoWindow } from 'google-maps-react'
import PlaceInfo from './PlaceInfo'


export class MyMarker extends Marker{
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

  //set state and show infoWindow on marker click
  handleMarkerClick = (props, marker, e) => {
    this.props.onMarkerClick({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      activeButton: {}
    })

  }

  //close infoWindow when clicking outside the window
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

    const { places, google, spoofClick } = this.props,
          { style, zoom, center, bounds } = this.props.mapState,
          { showingInfoWindow, activeMarker, selectedPlace } = this.props.infoState,

          llBounds = new google.maps.LatLngBounds()
          llBounds.extend({lat: bounds.north, lng: bounds.west})
          llBounds.extend({lat: bounds.south, lng: bounds.east})

    return (
      <section className="map-container">
      <h2 className="sr-only">Neighbourhood Map</h2>
        <Map
          google={google}
          zoom={zoom}
          style={style}
          initialCenter={center}
          onClick={this.handleMapClick}
          disableDefaultUI={true}
          zoomControl={true}
          bounds={llBounds}
          mapType='roadmap'
          tabIndex="-1"
          onLoad={()=>{console.log('load')}}
        >
          {places.length && (
            places.map((place) => {
              return (
                <MyMarker
                  spoof={(spoofClick === place.id)}
                  frSq={place.frSqData}
                  img={place.img}
                  placeId={place.id}
                  key={place.id}
                  onClick={this.handleMarkerClick}
                  onKeyPress={this.handleMarkerClick}
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
            visible={showingInfoWindow}
          >
            <PlaceInfo place={selectedPlace} />
          </InfoWindow>
        </Map>

      </section>
    )
  }
}

export default PlaceMap
