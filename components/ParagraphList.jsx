import React from 'react';
import {connect} from 'react-redux'

import {toggleEdit, saveText, addParagraph} from '../redux/actions'

import {ParagraphBoxContainer} from './ParagraphBox'

export const ParagraphList = React.createClass({

	render() {
		return (
			<div>
			{Object.keys(this.props.paragraphs).map((index) => {

				return <ParagraphBoxContainer
					key={index}
					index={parseInt(index)}
					paragraph={this.props.paragraphs[index].paragraph}
				/>
			})}
			<button className="btn btn-sm btn-info glyphicon glyphicon-plus"
                    onClick={()=>{
                    	this.props.dispatch(addParagraph())
                    }}
                    > Add Paragraph </button>
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