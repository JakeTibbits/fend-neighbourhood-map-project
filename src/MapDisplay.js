import React, { Component } from 'react'
import { Map, Marker } from 'google-maps-react'



class MapContainer extends Component {



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
        </Map>
      </div>
    )
  }
}

export default MapContainer
