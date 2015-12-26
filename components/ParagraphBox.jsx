import React from 'react';
import {connect} from 'react-redux'

import {toggleEdit, saveText, removeParagraph} from '../redux/actions'

import {DisplayBox} from './DisplayBox'
import {EditBox} from './EditBox'

export const ParagraphBox = React.createClass({
	render() {
		console.log(this.props.paragraph)
		return (
			<div>
				{!this.props.paragraph.isEditing
					? <DisplayBox
						text={this.props.paragraph.text}
						onClickHandler={() => {
							this.props.dispatch(toggleEdit(this.props.index))
						}}
						onClickRemoveHandler={() => {
							this.props.dispatch(removeParagraph(this.props.index))
						}}
					/>
					: <EditBox 
						text={this.props.paragraph.text}
						ref={(ref) => this.editBox = ref}
						onClickHandler={() => {
							console.log(this.props.index)
							this.props.dispatch(saveText(this.editBox.state.text, this.props.index))
							this.props.dispatch(toggleEdit(this.props.index))
						}}
					/>}
			</div>	
		);
	}
})

export const ParagraphBoxContainer = connect()(ParagraphBox)