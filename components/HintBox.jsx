import React from 'react';
import {DragDisplayHintBox} from './DisplayHintBox'
import {EditHintBox} from './EditHintBox'


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
							this.props.actions.toggleHintEdit(this.props.index)
						}}
						actions={this.props.actions}
					/>
					: <EditHintBox
							text={this.props.hint.text}
							index={this.props.index}
							actions={this.props.actions}
					/>
				}
				<br />
			</div>
		)
	}
})

