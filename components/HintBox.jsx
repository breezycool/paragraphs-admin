import React from 'react';
import {connect} from 'react-redux'

import {toggleHintEdit} from '../redux/actions'

import {DisplayHintBoxContainer} from './DisplayHintBox'
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
					? <DisplayHintBoxContainer
						ref={(ref)=>{this.displayHintBox=ref}}
						text={this.props.hint.text}
						onClickHandler={() => {
							this.props.dispatch(toggleHintEdit(this.props.index))
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
