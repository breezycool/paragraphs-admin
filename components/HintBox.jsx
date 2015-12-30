import React from 'react';
import {connect} from 'react-redux'

import {toggleHintEdit, saveHintText, removeHint} from '../redux/actions'

import DisplayBox from './DisplayBox'
import EditBox from './EditBox'

export const HintBox = React.createClass({
	render() {
		return (
			<div>
				{!this.props.hint.isEditing
					? <DisplayBox
						text={this.props.hint.text}
						onClickHandler={() => {
							this.props.dispatch(toggleHintEdit(this.props.index))
						}}
						onClickRemoveHandler={() => {
							this.props.dispatch(removeHint(this.props.index))
						}}
					/>
					: <EditBox
							text={this.props.hint.text}
							ref={(ref) => this.editBox = ref}
							onClickHandler={() => {
								this.props.dispatch(saveHintText(this.editBox.state.text, this.props.index))
								this.props.dispatch(toggleHintEdit(this.props.index))
							}}
					/>
				}
				<br />
			</div>
		)
	}
})

export const HintBoxContainer = connect()(HintBox)