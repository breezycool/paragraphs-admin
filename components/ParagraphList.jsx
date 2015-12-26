import React from 'react';
import {connect} from 'react-redux'

import {toggleEdit, saveText} from '../redux/actions'

import {ParagraphBoxContainer} from './ParagraphBox'

export const ParagraphList = React.createClass({
	render() {
		return (
			<div>
			{Object.keys(this.props.paragraphs).map((index) => {
				return <ParagraphBoxContainer
					key={index}
					editing={this.props.paragraphs[index].editing}
					text={this.props.paragraphs[index].text}
				/>
			})}
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