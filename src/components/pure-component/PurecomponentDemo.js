import React from 'react';
import PureComp from './Purecomponent';
import RegComp from './Regularcomponent';

class PureComponentDemo extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			name: 'React'
		}
	}

	componentDidMount() {
		setInterval(() => {
			this.setState({
				name: 'World'
			})
		}, 1000)
	}

	render() {
		return (
			<div>
                <PureComp name={this.state.name} />
                <RegComp name={this.state.name}/>
			</div>
		)
	}
}

export default PureComponentDemo