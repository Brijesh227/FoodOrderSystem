import React, { Component } from 'react'

class Input extends Component {

  constructor(props) {
    super(props)
    this.inputRef = React.createRef()
  }

  componentDidMount() {
    this.inputRef.current.focus()
  }


  render() {
    return (
      <input type="text" ref={this.inputRef}></input>
    )
  }
}

export default Input
