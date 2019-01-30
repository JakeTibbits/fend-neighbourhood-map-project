import React, { Component } from 'react'
import { GoogleApiWrapper } from 'google-maps-react'
import PlaceMap from './PlaceMap'
import PlaceList from './PlaceList'
import PlaceFilter from './PlaceFilter'
import places from './placeData'
import './App.css'


class App extends Component {

  state = {
    places: [],
    showingPlaces: [],
    availableFilters: [],
    activeFilter: 'none',
    infoState: {
      selectedPlace: {},
      activeMarker: {},
      activeButton: {},
      showingInfoWindow: false
    },
    doingMarkerClick: false
  }


  componentDidMount(){
    this.setInitialState()
  }

  setInitialState(){
    const google = this.props.google,
          tags = this.getUniqueTags(places)

    for(let place of places){
      place.icon = {
        url: place.icon,
        size: new google.maps.Size(60,60),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(30,60),
        scaledSize: new google.maps.Size(55,55)
      }
    }      
    this.setState({
      places,
      showingPlaces: places,
      availableFilters: tags
    })
  }

  updateInfoState = (newInfoState) => {
    this.setState({ infoState: newInfoState, doingMarkerClick: false })
  }

  doMarkerClick = (place) => {
    this.setState({doingMarkerClick: place.id})
  }


  changeFilter = (activeFilter) => {
    this.setState({activeFilter})
    if(activeFilter === 'none'){
      this.setState((state) => ({
        showingPlaces: state.places
      }))
    } else {
      this.setState((state) => ({
        showingPlaces: state.places.filter((place) => place.tags.indexOf(activeFilter) >= 0)
      }))
    }
  }

  getUniqueTags = (places) => {
    const allArrays = places.map((place) => (place.tags))
    let allTags = []
    for(let tagArray of allArrays){
      allTags = allTags.concat(tagArray)
    }
    let uniqueTags = Array.from(new Set(allTags))
    return uniqueTags
  }


  render() {


    const { showingPlaces, availableFilters, activeFilter, infoState, doingMarkerClick} = this.state,
          { google } = this.props

    return (
      <div className="App">
        <header className="app-header">
          <h1>Welcome to My Neighbourhood</h1>
        </header>
        <div className="places-container">
          <section className="list-container">
            <header>
              <h2>Check out my favourite places:</h2>
              <PlaceFilter tags={availableFilters} filter={activeFilter} onChangeFilter={this.changeFilter}/>
            </header>
            <PlaceList places={showingPlaces} onActivePlaceClick={this.updateInfoState} onInactivePlaceClick={this.doMarkerClick} infoState={infoState} />
          </section>
          <PlaceMap google={google} places={showingPlaces} onMarkerClick={this.updateInfoState} infoState={infoState} spoofClick={doingMarkerClick}/>
        </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBUy5nSuV8dwh44xoOh7oSZZQP3NTPgS7E'
})(App)
