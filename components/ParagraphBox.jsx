import React from 'react';
import {connect} from 'react-redux'

import {removeParagraph, toggleEdit, saveText, toggleParagraphType} from '../redux/actions'

import {DisplayBox} from './DisplayBox'
import {EditBoxContainer} from './EditBox'



export const ParagraphBox = React.createClass({

	render() {
		return (
			<div>
				{!this.props.paragraph.isEditing
					? <DisplayBox
						ref={(ref)=>{this.displayBox=ref}}
						text={this.props.paragraph.text}
						hintTags={this.props.paragraph.hintTags}
						onClickHandler={() => {
							this.props.dispatch(toggleEdit(this.props.index))
						}}
						onClickRemoveHandler={() => {
							this.props.dispatch(removeParagraph(this.props.index))
							this.displayBox.setState({ showModal: false });
						}}
						onChangeTypeHandler={() => {
							this.props.dispatch(toggleParagraphType(this.props.index))
							this.displayBox.setState({ showModal: false, typeBad: this.props.paragraph.isBadText })
						}}
					/>
					: <EditBoxContainer
						hintTags={this.props.paragraph.hintTags}
						text={this.props.paragraph.text}
						index={this.props.index}
					/>}
				<br/>
			</div>
		);
	}
})

export const ParagraphBoxContainer = connect()(ParagraphBox)

