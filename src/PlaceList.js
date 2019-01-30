import React, { Component } from 'react'

class PlaceList extends Component {
  state = {
    showingInfoWindow: false,
    selectedPlace: {},
    activeButton: {},
  }

  handleClick = (li, place, isActive) => {

  }

  render() {

    const { places, filter, tags, infoState } = this.props,
          activeID = (infoState.selectedPlace ? infoState.selectedPlace.placeId : '')

    return (
        <ul className="places-list">
          {places.length && (
            places.map((place, index) =>{
              let activeClass = (activeID === place.id ? "active" : "")

              return (
              <li
                key={place.id}
                onClick={(e) => this.handleClick(e.target, place)}
                className={activeClass}
              >
                {place.name}
              </li>
            )})
          )}

        </ul>
    )
  }
}

export default PlaceList
