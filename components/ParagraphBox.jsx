import React from 'react';
import {connect} from 'react-redux'

import {toggleEdit, saveText} from '../redux/actions'

import {DisplayBox} from './DisplayBox'
import {EditBox} from './EditBox'

export const ParagraphBox = React.createClass({
	render() {
		return (
			<div>
				{!this.props.editing
					? <DisplayBox
						text={this.props.text}
						onClickHandler={() => {
							this.props.dispatch(toggleEdit(this.props.id))
						}}
					/>
					: <EditBox 
						text={this.props.text}
						ref={(ref) => this.editBox = ref}
						onClickHandler={() => {
							this.props.dispatch(saveText(this.editBox.state.text, this.props.id))
							this.props.dispatch(toggleEdit(this.props.id))
						}}
					/>}
			</div>	
		);
	}
})

export const ParagraphBoxContainer = connect()(ParagraphBox)