import React from 'react';
import {connect} from 'react-redux'

import {toggleEdit, saveText, removeParagraph} from '../redux/actions'

import DisplayBox from './DisplayBox'
import {EditBoxContainer} from './EditBox'

export const ParagraphBox = React.createClass({
	render() {
		return (
			<div>
				{!this.props.paragraph.isEditing
					? <DisplayBox
						text={this.props.paragraph.text}
						hintTags={this.props.paragraph.hintTags}
						onClickHandler={() => {
							this.props.dispatch(toggleEdit(this.props.index))
						}}
						onClickRemoveHandler={() => {
							this.props.dispatch(removeParagraph(this.props.index))
						}}
					/>
					: <EditBoxContainer
						hintTags={this.props.paragraph.hintTags}
						text={this.props.paragraph.text}
						index={this.props.index}
					/>}
					<br/>
			</div>	
		);
	}
})

export const ParagraphBoxContainer = connect()(ParagraphBox)