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
    doingMarkerClick: false,
    mapState: {
      style: {
              width: "100%",
              height: "100%"
            },
      center: {
              lat: 53.7124,
              lng: -2.098
            },
      zoom: 15,
      bounds: {
        north: 53.721651,
        south: 53.703454,
        west: -2.112836,
        east: -2.081693
      }

    }
  }


  componentDidMount(){
    this.setInitialState()
  }

  setInitialState(){

    const google = this.props.google,
          tags = this.getUniqueTags(places)

    const placeUrls = places.map((place) => ('//api.foursquare.com/v2/venues/'+place.id+'?v=20190101&client_id=S125UCJJPAM2KA0S5GWSEKDJ2NBVRCJ2DKAFLUY1CCE3TXIL&client_secret=O2EZI5LSWXNBUU3SXDRWQ5FTDCFL1NX1QFEY3CXUJ15NLQHY'))

    Promise.all(placeUrls.map( url =>
      fetch(url)
        .then(res => { if(!res.ok){ throw Error(res.status+": No foursquare data found for "+res.url)} return res})
        .then(res => { return res.json() })
        .then((data) => (data.response))
        .catch((e) => { console.log(e)})
    )).then(venues => {
      for(let venue of venues){
        if(venue){
          for(let place of places){
            if(place.id === venue.venue.id) {
              place.frSqData = venue.venue
            }
          }
        }
      }
      for(let place of places){
        place.icon = {
          url: place.icon,
          size: new google.maps.Size(60,60),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(30,60),
          scaledSize: new google.maps.Size(55,55)
        }
      }
      return places
    }).then((places => {
      this.setState({
        places: places,
        showingPlaces: places,
        availableFilters: tags
      })

    }))



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

    const { showingPlaces, availableFilters, activeFilter, infoState, doingMarkerClick, mapState} = this.state,
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
            <footer>
              <p>Additional location data and images served by <a href="https://foursquare.com/developers/apps">FourSquare</a>.</p>
            </footer>
          </section>
          <PlaceMap google={google} places={showingPlaces} onMarkerClick={this.updateInfoState} infoState={infoState} spoofClick={doingMarkerClick} mapState={mapState}/>

      </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBUy5nSuV8dwh44xoOh7oSZZQP3NTPgS7E'
})(App)
