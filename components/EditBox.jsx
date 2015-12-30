import React from 'react';
import TagSelect from './TagSelect.jsx'
import {connect} from 'react-redux'

var textareaStyle = {
	minHeight: "200px"
}

export const EditBox = React.createClass({
	getInitialState() {
		return {
			text: this.props.text,

		}
	},
	handleChange(e) {
		this.setState({text: e.target.value})
	},
	onClickHandler(){
		this.props.dispatch(saveText(this.state.text, this.props.index))
		this.props.dispatch(toggleEdit(this.props.index))
		//save hint tags associated with paragraph
		this.props.dispatch(saveHintTags(this.tagSelectState.selected))
		//add any new hints to the hint list on the right.
		this.props.dispatch(addHints(this.tagSelectState.selected))
	},
	render() {
		return (
			<div>
				<textarea
					defaultValue={this.props.text}
					onChange={this.handleChange}
					style={textareaStyle}
				/>
				<div>
					<TagSelect ref={(ref)=>{this.tagSelectState=ref.state}} hintTags={this.props.hintTags} hints={this.props.hints}/>
				</div>
				<div>
					<button 
						className="btn btn-success glyphicon glyphicon-floppy-disk"
						onClick={this.onClickHandler}
					> Save</button>
				</div>

			</div>
		);
	}
})

export const EditBoxContainer = connect()(EditBox)