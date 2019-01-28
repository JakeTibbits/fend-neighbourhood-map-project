import React, { Component } from 'react'
import { GoogleApiWrapper } from 'google-maps-react'
import MapContainer from './MapDisplay'
import './App.css'
import places from './placeData'


class App extends Component {

  state = {
    places: places
  }

  render() {
    return (
      <div className="App">
        <MapContainer google={this.props.google} places={this.state.places}/>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBUy5nSuV8dwh44xoOh7oSZZQP3NTPgS7E'
})(App)
