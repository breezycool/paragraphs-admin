import React from 'react';
import {connect} from 'react-redux'

import {toggleHintEdit, saveHintText, hardDeleteHint} from '../redux/actions'

import DisplayHintBox from './DisplayHintBox'
import EditHintBox from './EditHintBox'

export const HintBox = React.createClass({
	render() {

		return (
			<div>
				{!this.props.hint.isEditing
					? <DisplayHintBox
						ref={(ref)=>{this.displayHintBox=ref}}
						text={this.props.hint.text}
						onClickHandler={() => {
							this.props.dispatch(toggleHintEdit(this.props.index))
						}}
						onClickRemoveHandler={() => {
							this.props.dispatch(hardDeleteHint(this.props.hint.text))
							this.displayHintBox.setState({ showModal: false });
						}}
					/>
					: <EditHintBox
							text={this.props.hint.text}
							ref={(ref) => this.editBox = ref}
							onClickHandler={() => {
								this.props.dispatch(saveHintText(this.props.hint.text, this.editBox.state.text, this.props.index))
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
