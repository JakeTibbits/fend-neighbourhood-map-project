import React, { Component } from 'react'
import { GoogleApiWrapper } from 'google-maps-react'
import { MapContainer } from './Map'
import './App.css'


class App extends Component {
  render() {
    return (
      <div className="App">
        <MapContainer google={this.props.google}/>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBUy5nSuV8dwh44xoOh7oSZZQP3NTPgS7E'
})(App);
