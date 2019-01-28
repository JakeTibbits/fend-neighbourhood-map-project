import React, { Component } from 'react'
import { Map } from 'google-maps-react'



class MapContainer extends Component {

  render() {
    const style = {
            width: "100%",
            height: "100%"
          },
          center = {
            lat: 53.721443,
            lng: -2.098358
          }

    return (
      <div className="map-container">
        <Map google={this.props.google} zoom={14} style={style} initialCenter={center}/>
      </div>
    )
  }
}

export default MapContainer
