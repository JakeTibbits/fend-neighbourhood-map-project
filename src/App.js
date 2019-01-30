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
    filter: 'none',
    mapState: {

    }
  }


  componentDidMount(){
    this.setInitialState()
  }

  setInitialState(){
    const google = this.props.google,
          placesWithIcons = places.map((place) => {
            place.icon = {
              url: place.icon,
              size: new google.maps.Size(60,60),
              origin: new google.maps.Point(0,0),
              anchor: new google.maps.Point(30,60),
              scaledSize: new google.maps.Size(55,55)
            }
          })
    this.setState({
      places,
      showingPlaces: places
    })
  }

  updateMapState = (mapState) => {
    console.log(mapState)
    this.setState({mapState})
  }


  changeFilter = (filter) => {
    this.setState({filter})
    if(filter === 'none'){
      this.setState((state) => ({
        showingPlaces: state.places
      }))
    } else {
      this.setState((state) => ({
        showingPlaces: state.places.filter((place) => place.tags.indexOf(filter) >= 0)
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

    const { places, showingPlaces, filter, activePlace, activeMarker, showInfoWindow } = this.state,
          { google } = this.props,
          tags = this.getUniqueTags(places)

    return (
      <div className="App">
        <header className="app-header">
          <h1>Welcome to My Neighbourhood</h1>
        </header>
        <div className="places-container">
          <section className="list-container">
            <header>
              <h2>Check out my favourite places:</h2>
              <PlaceFilter tags={tags} filter={filter} onChangeFilter={this.changeFilter}/>
            </header>
            <PlaceList places={showingPlaces} onChangeSelectedPlace={this.updateMapState} mapState={this.state.mapState}/>
          </section>
          <PlaceMap google={google} places={showingPlaces} onChangeSelectedPlace={this.updateMapState} mapState={this.state.mapState}/>
        </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBUy5nSuV8dwh44xoOh7oSZZQP3NTPgS7E'
})(App)
