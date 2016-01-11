import React from 'react';
import {connect} from 'react-redux'

import {toggleEdit, saveText, toggleParagraphType, saveHintTags} from '../redux/actions'

import {DisplayBoxContainer} from './DisplayBox'
import {EditBoxContainer} from './EditBox'

import { ItemTypes } from './ItemTypes';
import { DropTarget } from 'react-dnd';

let PropTypes = React.PropTypes;

const paragraphTarget = {
  drop(props, monitor) {
  	//drop logic. get item from the dragged hint (which will be just the text as an object).
  	//then map it to an array (should really be just a string...) 
  	//then concat the existing hint tags from the paragraph with the new proposed array and save them. (should really push a string.)
  	let hints = monitor.getItem()
  	let extraHint = Object.keys(hints).map(function (key) {return hints[key]});
    props.dispatch(saveHintTags(props.index, props.paragraph.hintTags.concat(extraHint)))
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

export const ParagraphBox = React.createClass({

	propTypes: {
	  isOver: PropTypes.bool.isRequired
	},

	render() {
		let connectDropTarget = this.props.connectDropTarget;
		let isOver = this.props.isOver;

		return connectDropTarget(
			<div>
				{!this.props.paragraph.isEditing
					? <DisplayBoxContainer
						ref={(ref)=>{this.displayBox=ref}}
						badText={this.props.paragraph.badText}
						improvedText={this.props.paragraph.improvedText}
						hintTags={this.props.paragraph.hintTags}
						isBadText={this.props.paragraph.isBadText}
						index={this.props.index}
						onClickHandler={() => {
							this.props.dispatch(toggleEdit(this.props.index))
						}}
						
						onChangeBadTypeHandler={() => {
							if(this.props.paragraph.isBadText)
							{this.props.dispatch(toggleParagraphType(this.props.index)); 
							this.displayBox.setState({ showModal: false, typeBad: this.props.paragraph.isBadText })
							} 
							
						}}
						onChangeImprovedTypeHandler={() => {
							if(!this.props.paragraph.isBadText)
							{this.props.dispatch(toggleParagraphType(this.props.index)); 
							this.displayBox.setState({ showModal: false, typeBad: this.props.paragraph.isBadText })
							} 
							
						}}
					/>
					: <EditBoxContainer
						hintTags={this.props.paragraph.hintTags}
						badText={this.props.paragraph.badText}
						improvedText={this.props.paragraph.improvedText}
						isBadText={this.props.paragraph.isBadText}
						index={this.props.index}
					/>}
				<br/>
			</div>
		);
	}
})

const DropParagraphBox = DropTarget(ItemTypes.HINT, paragraphTarget, collect)(ParagraphBox);

export const ParagraphBoxContainer = connect()(DropParagraphBox)
