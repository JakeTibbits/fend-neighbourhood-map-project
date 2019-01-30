import React, { Component } from 'react'

class PlaceTab extends Component {
  render(){
    return (
      <li>{ this.props.name }</li>
    )
  }
}

class PlaceList extends Component {
  state = {
    activeMarker: null,
    selectedPlace: {},
    showingInfoWindow: false
  }


  handleListClick = (props, marker, e) => {
    this.props.onChangeSelectedPlace({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
    this.setState({
      activeMarker: this.props.mapState.activeMarker,
      selectedPlace: this.props.mapState.selectedPlace,
      showingInfoWindow: this.props.mapState.showingInfoWindow
    })
  }

  render() {

    const { places, filter, tags } = this.props

    return (
        <ul className="places-list">
          {places.length && (
            places.map((place, index) => {

              return (
              <PlaceTab
                key={place.id}
                onClick={this.handleListClick}
                name={place.name}
                position={place.position}
                description={place.description}
                icon={place.icon}
              />
              )
            })
          )}

        </ul>
    )
  }
}

export default PlaceList
