import React, { Component } from 'react'

class PlaceFilter extends Component {

  handleFilterChange = (e) => {
    this.props.onChangeFilter(e.target.value)
  }

  render(){

    const { filter, tags } = this.props

    return (
        <form className="placeFilter">
          <label htmlFor="filterPlaces" className="sr-only">Filter places by tag:</label>
          <select name="filterPlaces" value={(filter ? filter : "none")} onChange={this.handleFilterChange}>
            <option value="none">Filter Places</option>
            {
              tags && (
                tags.map((tag) => (
                  <option key={tag} value={tag}>{tag}</option>
                ))
              )
            }
          </select>
        </form>

    )
  }
}

export default PlaceFilter
