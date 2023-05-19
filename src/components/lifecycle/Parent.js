import React, { Component } from 'react'
import Children from './Children'

class Parent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: 'React'
		}
		console.log('Parent constructor')
	}

	static getDerivedStateFromProps(props, state) {
		console.log('Parent getDerivedStateFromProps')
		return null
	}

	componentDidMount() {
		console.log('Parent componentDidMount')
	}

	shouldComponentUpdate() {
		console.log('Parent shouldComponentUpdate')
		return true
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		console.log('Parent getSnapshotBeforeUpdate')
        return null
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log('Parent componentDidUpdate')
	}

	changeState = () => {
		this.setState({
			name: 'World'
		})
	}

	render() {
		console.log('Parent render')
		return (
			<div>
				<button onClick={this.changeState}>Change state</button>
                {this.state.name}
				<Children />
			</div>
		)
	}
}

export default Parent
