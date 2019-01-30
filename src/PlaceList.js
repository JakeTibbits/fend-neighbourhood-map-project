import React, { Component } from 'react'
import Place from './Place'


class PlaceList extends Component {

  handleFilterChange = (e) => {
    this.props.onChangeFilter(e.target.value)
  }

  render() {

    const { places, filter, tags } = this.props

    return (
      <section className="list-container">
        <h2>Check out my favourite places:</h2>
        <select value={(filter ? filter : "none")} onChange={this.handleFilterChange}>
          <option vlaue="none">No Filter</option>
          {
            tags && (
              tags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))
            )
          }
        </select>
        <ul className="places-list">
          {places.length && (
            places.map((place) => {
              return (
                <Place key={place.id} name={place.name} position={place.position} description={place.description} />
              )
            })
          )}

        </ul>
      </section>
    )
  }
}

export default PlaceList
