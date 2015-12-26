import React from 'react';
import {connect} from 'react-redux'

import {addHint} from '../redux/actions'

import {HintBoxContainer} from './HintBox.jsx'

export const HintList = React.createClass({
	render() {
		return (
			<div className="col-md-6">
				{Object.keys(this.props.hints).map((index) => {
					return <HintBoxContainer
						key={index}
						index={index}
						hint={this.props.hints[index]}
					/>
				})}
				<button
					className="btn btn-sm btn-info glyphicon glyphicon-plus"
	        onClick={()=>{
	        	this.props.dispatch(addHint())
	        }}
	       > Add Hint </button>
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