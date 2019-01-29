import React, { Component } from 'react'
import { Map, Marker, InfoWindow } from 'google-maps-react'


class Place extends Component {
  render() {
    const {id, name, position, description} = this.props
    return (
      <li>
        <h4>{name}</h4>
      </li>
    )
  }
}
class ListContainer extends Component {

  render() {

    const places = this.props.places

    return (
      <div className="list-container">
        <ul className="places-list">

          {places.length && (
            places.map((place) => {
              //const position = {lat: place.location.lat, lng: place.location.lng}
              return (
                <Place key={place.id} name={place.name} position={place.position} description={place.description} />
              )
            })
          )}

        </ul>
      </div>
    )
  }
}

export default ListContainer
