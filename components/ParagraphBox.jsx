import React from 'react';
import {connect} from 'react-redux'

import {removeParagraph, toggleEdit, saveText, toggleParagraphType} from '../redux/actions'

import {DisplayBoxContainer} from './DisplayBox'
import {EditBoxContainer} from './EditBox'



export const ParagraphBox = React.createClass({
	render() {
		return (
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
						onClickRemoveHandler={() => {
							this.props.dispatch(removeParagraph(this.props.index))
							this.displayBox.setState({ showModal: false });
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

export const ParagraphBoxContainer = connect()(ParagraphBox)
