import React, { Component } from 'react'
import { GoogleApiWrapper } from 'google-maps-react'
import PlaceMap from './PlaceMap'
import PlaceList from './PlaceList'
import myPlaces from './placeData'
import './App.css'


class App extends Component {

  state = {
    places: myPlaces,
    showingPlaces: myPlaces,
    filter: 'none'
  }

  componentDidMount() {
    /*fetch('https://api.foursquare.com/v2/venues/search?client_id=S125UCJJPAM2KA0S5GWSEKDJ2NBVRCJ2DKAFLUY1CCE3TXIL&client_secret=O2EZI5LSWXNBUU3SXDRWQ5FTDCFL1NX1QFEY3CXUJ15NLQHY&v=20180323&ll=53.705291,-2.099171&intent=browse&radius=50000&limit=50')
      .then(result => result.json())
      .then(data => data.response.venues)
      .catch(() => {
        console.log("api request failed")
      })
      .then((data)=>{
        this.setState({places: data})
        console.log(this.state.places)
      })*/
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

    const {places, showingPlaces, filter} = this.state,
          tags = this.getUniqueTags(places)

    return (
      <div className="App">
        <header className="app-header">
          <h1>Welcome to My Neighbourhood</h1>
        </header>
        <PlaceList places={this.state.showingPlaces} onChangeFilter={this.changeFilter} tags={tags} filter={filter}/>
        <PlaceMap google={this.props.google} places={this.state.showingPlaces}/>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBUy5nSuV8dwh44xoOh7oSZZQP3NTPgS7E'
})(App)
