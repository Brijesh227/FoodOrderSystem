import React, { Component } from 'react'
import Grandchild from './Grandchild'

class Child extends Component {
  render() {
    return (
      <div>
        <Grandchild />
      </div>
    )
  }
}

export default Child