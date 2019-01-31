import React, { Component } from 'react'

class PlaceInfo extends Component {

  render(){

    const { place } = this.props,
          imageStyle = {maxWidth: '300px'}

    let placeImg
    //if place has its own image locally
    if(place.img){
      placeImg = <img src={place.img} alt={place.name} style={imageStyle}/>
    }
    // else if place has foursquare image available
    else if(place.frSq && place.frSq.bestPhoto){

      const {prefix, suffix} = place.frSq.bestPhoto,
            imgUrl = prefix+"cap300"+suffix

      placeImg = <img src={imgUrl} alt={place.name + " by "+place.frSq.bestPhoto.source.name} style={imageStyle}/>
    }
    //else if place has no image
    else {
      placeImg = <p className="missing-image">No Images Found</p>
    }


    //if place has foursquare data available
    if(place.frSq){
      let address
      if(place.frSq.location.address){ address = <p><strong>Address: </strong>{place.frSq.location.address}</p> }
      return(
        <div className="placeInfo">
          {placeImg}
          <h3>{place.frSq.name}</h3>
          <p>{place.description}</p>
          {address}

        </div>

      )

    }
    //if no foursquare data available
    else {
      return(
        <div className="placeInfo">

          {placeImg}

          <h3>{place.name}</h3>
          <p>{place.description}</p>

        </div>

      )
    }


  }
}

export default PlaceInfo
