import React from 'react';
import {connect} from 'react-redux'

import {addHints} from '../redux/actions'

import {HintBoxContainer} from './HintBox.jsx'

export const HintList = React.createClass({
	render() {
		return (
			<div className="col-md-6 text-center">
			<h3> Hints </h3>
				{Object.keys(this.props.hints).map((index) => {
					return <HintBoxContainer
						key={index}
						index={index}
						hint={this.props.hints[index]}
					/>
				})}
	       <hr />
			</div>
		)
	}
})

const mapStateToProps = (state) => {
	return {
		hints: state.hints
	}
}

export const HintListContainer = connect(mapStateToProps)(HintList)
