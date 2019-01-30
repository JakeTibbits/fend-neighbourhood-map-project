import React, { Component } from 'react'

class Place extends Component {
  render() {
    const {id, name, position, description} = this.props
    return (
      <li>
        <h4>{name}</h4>
      </li>
    )
  }
}

export default Place
