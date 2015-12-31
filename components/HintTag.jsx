import React from 'react';

const HintTag = React.createClass({
	render() {
		return (
			<button style={{margin: '0.1em'}} className="btn btn-warning btn-xs">{this.props.text}</button>
		)
	}
})

export default HintTag