import React from 'react';

import {DisplayBox} from './DisplayBox'
import {EditBox} from './EditBox'

import { ItemTypes } from './ItemTypes';
import { DropTarget } from 'react-dnd';

let PropTypes = React.PropTypes;

const paragraphTarget = {
  drop(props, monitor) {
  	//drop logic. get item from the dragged hint (which will be just the text as an object).
  	//then map it to an array (should really be just a string...)
  	//then concat the existing hint tags from the paragraph with the new proposed array and save them. (should really push a string.)
  	let hints = monitor.getItem()
  	let extraHint = Object.keys(hints).map(function (key) {return hints[key]})
  	props.actions.resetStatus()
  	props.actions.resetError()
    props.actions.saveParagraph(
    	props.index,
    	props.paragraph.badText,
    	props.paragraph.improvedText,
    	props.paragraph.hintTags.concat(extraHint)
    )
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
					? <DisplayBox
						ref={(ref)=>{this.displayBox=ref}}
						badText={this.props.paragraph.badText}
						isPushed={this.props.paragraph.isPushed}
						improvedText={this.props.paragraph.improvedText}
						hintTags={this.props.paragraph.hintTags}
						isBadText={this.props.paragraph.isBadText}
						index={this.props.index}
						onClickHandler={() => {
							this.props.actions.resetStatus()
							this.props.actions.resetError()
							this.props.actions.toggleParagraphEdit(this.props.index)
						}}
						actions={this.props.actions}
						onChangeBadTypeHandler={() => {
							if(this.props.paragraph.isBadText)
							{
							this.props.actions.resetStatus()
							this.props.actions.resetError()
							this.props.actions.toggleParagraphTextType(this.props.index);
							this.displayBox.setState({ showModal: false, typeBad: this.props.paragraph.isBadText })
							}
						}}
						onChangeImprovedTypeHandler={() => {
							if(!this.props.paragraph.isBadText)
							{
							this.props.actions.resetStatus()
							this.props.actions.resetError()
							this.props.actions.toggleParagraphTextType(this.props.index);
							this.displayBox.setState({ showModal: false, typeBad: this.props.paragraph.isBadText })
							}
						}}
					/>
					: <EditBox
						hintTags={this.props.paragraph.hintTags}
						badText={this.props.paragraph.badText}
						improvedText={this.props.paragraph.improvedText}
						isBadText={this.props.paragraph.isBadText}
						index={this.props.index}
						actions={this.props.actions}
					/>}
				<br/>
			</div>
		);
	}
})

export const DropParagraphBox = DropTarget(ItemTypes.HINT, paragraphTarget, collect)(ParagraphBox);


