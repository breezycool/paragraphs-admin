import React from 'react';
import {HintBox} from './HintBox.jsx'

export const HintList = React.createClass({
	render() {
		return (
			<div className="col-md-6 text-center">
			<h3 style={{padding: '10px 5px', borderBottom: '1px solid #D8CFCF'}}> Hints </h3>
				{Object.keys(this.props.hints).map((index) => {
					return <HintBox
						key={index}
						index={index}
						hint={this.props.hints[index]}
						actions={this.props.actions}
					/>
				})}
	       <hr />
			</div>
		)
	}
})

