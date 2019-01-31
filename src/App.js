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
    //get data from our placeData.json and append returned data from API
    this.setInitialState()
  }

  setInitialState(){

    const google = this.props.google,
          tags = this.getUniqueTags(places),
          placesToMap = places.filter((place)=>{
            if(place.id === "myHouse"){
              return false
            }
            return true
          })

    //Map an array of urls to make requests to FourSquare API
    const placeUrls = placesToMap.map((place) => ('//api.foursquare.com/v2/venues/'+place.id+'?v=20190101&client_id=S125UCJJPAM2KA0S5GWSEKDJ2NBVRCJ2DKAFLUY1CCE3TXIL&client_secret=JBBEO14GYPAZTADO3W42SFPRKLKWHAWAYJZL0MBGAHYCR5OE'))
    //fetch all of the urls
    Promise.all(placeUrls.map( url =>
      fetch(url)
        .then(res => { if(!res.ok){ throw Error(res.status); } return res})
        .then(res => { return res.json() })
        .then((data) => (data.response))
        .catch((e) => {
          if (e == 'Error: 429'){ this.setState({apiMaxed: true}); console.log(e+": Your App has exceeded the maximum allowed calls to FourSquareAPI, please try again later")}
          else if(e == 'Error: 400'){ this.setState({apiDead: true}); console.log(e+": FourSquare API is unreachable at this time, please try again later")}
      })
    )).then(venues => {
      //store returned venue data in a property
      for(let venue of venues){
        if(venue){
          for(let place of places){
            if(place.id === venue.venue.id) {
              place.frSqData = venue.venue
            }
          }
        }
      }
      //convert icon image uri to google maps Icon object
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

  //Spoof a click on the relevant map marker when a list item is clicked
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

  //get an array of unique tags to be used as filters
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

    const { showingPlaces, availableFilters, activeFilter, infoState, doingMarkerClick, mapState, apiMaxed} = this.state,
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
              <p>Map functionality provided by <a href="https://developers.google.com/maps/documentation/javascript/tutorial">GoogleMaps Javascript API</a></p>
              <p>Additional location data and images <a href="https://foursquare.com/developers/apps">powered by FourSquare</a>.</p>
              { apiMaxed &&(
                <p className="api-error"><strong>API Maxed Out: </strong>Please be aware that additional data and images from FourSquare are currently unavailable as the app has exceeded the free daily call allowance. Please try again later.</p>
              )}

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
