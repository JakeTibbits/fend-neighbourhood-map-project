import React, { Component } from 'react'

class PlaceList extends Component {

  handleClick = (li, place, isActive) => {
    if(li.className === "active"){
      const newProps = {
        selectedPlace: {},
        activeMarker: {},
        activeButton: {},
        showingInfoWindow: false
      }
      this.props.onActivePlaceClick(newProps)
    } else {
      this.props.onInactivePlaceClick(place)
    }
  }

  render() {

    const { places, infoState } = this.props,
          activeID = (infoState.selectedPlace ? infoState.selectedPlace.placeId : '')

    return (
        <ul className="places-list">
          {places.length && (
            places.map((place, index) =>{
              let activeClass = (activeID === place.id ? "active" : "")
              return (
              <li
                key={place.id}
                style={{backgroundImage: `url(${place.icon.url})`}}
                onClick={(e) => this.handleClick(e.target, place)}
                onKeyPress={(e) => this.handleClick(e.target, place)}
                className={activeClass}
                tabIndex="0"
                role="button"
                aria-label={`Go to ${place.name}`}
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
