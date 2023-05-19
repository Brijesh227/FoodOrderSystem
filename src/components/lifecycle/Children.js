import React, { Component } from 'react'

class Children extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: 'React'
    }
    console.log('Children constructor')
  }

  static getDerivedStateFromProps(props, state) {
    console.log('Children getDerivedStateFromProps')
    return null
  }

  componentDidMount() {
    console.log('Children componentDidMount')
  }

  shouldComponentUpdate() {
    console.log('Children shouldComponentUpdate')
		return true
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('Children getSnapshotBeforeUpdate')
    return null
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log('Children componentDidUpdate')
	}

  render() {
    console.log('Children render')
    return (
      <div>
        Children
      </div>
    )
  }
}

export default Children
