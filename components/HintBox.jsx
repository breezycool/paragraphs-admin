import React from 'react';
import {connect} from 'react-redux'

import {toggleHintEdit, hardDeleteHint} from '../redux/actions'

import DisplayHintBox from './DisplayHintBox'
import {EditHintBoxContainer} from './EditHintBox'

import {ItemTypes} from './ItemTypes'
import { DragSource } from 'react-dnd';

var PropTypes = React.PropTypes;

const hintSource = {
  beginDrag(props) {
    return {text: props.hint.text};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export const HintBox = React.createClass({

	propTypes: {
	    connectDragSource: PropTypes.func.isRequired,
	    isDragging: PropTypes.bool.isRequired
	  },

	getInitialState() {
		return {
			text: this.props.hint.text	
		}
	},

	render() {
		var connectDragSource = this.props.connectDragSource;
		var isDragging = this.props.isDragging;
		return connectDragSource(
			<div style={{cursor: "pointer", opacity: isDragging ? 0.5 : 1}}>
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

let DragHintBox = DragSource(ItemTypes.HINT, hintSource, collect)(HintBox);

export const HintBoxContainer = connect()(DragHintBox)
