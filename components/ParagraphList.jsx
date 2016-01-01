import React from 'react';
import {connect} from 'react-redux'

import {toggleEdit, saveText, addParagraph} from '../redux/actions'

import {ParagraphBoxContainer} from './ParagraphBox'

export const ParagraphList = React.createClass({
	render() {
		return (
			<div className="col-md-6 text-center">
				<h3> Paragraphs </h3>
				{Object.keys(this.props.paragraphs).map((index) => {
					return <ParagraphBoxContainer
						key={index}
						index={index}
						paragraph={this.props.paragraphs[index]}
					/>
				})}
				<button
					className="btn btn-sm btn-info glyphicon glyphicon-plus"
					onClick={()=>{
						this.props.dispatch(addParagraph())
					}}
				 > </button>
				 <hr />
			</div>
		)
	}
})

const mapStateToProps = (state) => {
	return {
		paragraphs: state.paragraphs
	}
}

export const ParagraphListContainer = connect(mapStateToProps)(ParagraphList)
