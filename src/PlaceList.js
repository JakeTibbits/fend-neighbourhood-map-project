import React, { Component } from 'react'

class PlaceList extends Component {

  handleClick = (li, place, isActive) => {
    let newProps = {}

    if(li.className === "active"){
      newProps.selectedPlace = {}
      newProps.activeMarker = {}
      newProps.activeButton = {}
      newProps.showingInfoWindow = false
    }

    this.props.onPlaceClick({
      selectedPlace: newProps.selectedPlace,
      activeMarker: newProps.activeMarker,
      showingInfoWindow: newProps.showingInfoWindow,
      activeButton: newProps.activeButton
    })


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
