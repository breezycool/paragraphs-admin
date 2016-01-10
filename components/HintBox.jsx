import React from 'react';
import {connect} from 'react-redux'

import {toggleHintEdit, hardDeleteHint} from '../redux/actions'

import DragDisplayHintBox from './DisplayHintBox'
import {EditHintBoxContainer} from './EditHintBox'


export const HintBox = React.createClass({

	getInitialState() {
		return {
			text: this.props.hint.text	
		}
	},

	render() {
		return (
			<div>
				{!this.props.hint.isEditing
					? <DragDisplayHintBox
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
					: <EditHintBoxContainer
							text={this.props.hint.text}
							index={this.props.index}
					/>
				}
				<br />
			</div>
		)
	}
})

export const HintBoxContainer = connect()(HintBox)
