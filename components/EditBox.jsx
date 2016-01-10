import React from 'react';
import TagSelect from './TagSelect.jsx'
import {connect} from 'react-redux'
import {saveText, toggleEdit, saveHintTags, addHints} from '../redux/actions'

let textareaStyle = {
	minHeight: "200px"
}

export const EditBox = React.createClass({
	getInitialState() {
		let initText = this.props.isBadText? this.props.badText : this.props.improvedText
		return {
			text: initText
		}
	},
	handleChange(e) {
		this.setState({text: e.target.value})
	},
	onClickHandler(){
		this.props.dispatch(saveText(this.state.text, this.props.index))
		this.props.dispatch(toggleEdit(this.props.index))
		//save hint tags associated with paragraph
		this.props.dispatch(saveHintTags(this.props.index, this.tagSelect.state.selected.map((each)=>{return each.name})))
		//add any new hints to the hint list on the right.
		this.props.dispatch(addHints(this.tagSelect.state.selected.map((each)=>{return each.name})))
	},
	render() {
		let paragraphType = this.props.isBadText? "Bad Text" : "Improved Text";
		return (
			<div>
				<div style={{fontWeight: 'bold'}}>
					{paragraphType}
				</div>
				<textarea
					defaultValue={this.state.text}
					onChange={this.handleChange}
					style={textareaStyle}
				/>
				<div>
					<TagSelect ref={(ref)=>{this.tagSelect=ref}} hintTags={this.props.hintTags} hints={this.props.hints}/>
				</div>
				<div>
					<button
						className="btn btn-success glyphicon glyphicon-floppy-disk"
						onClick={this.onClickHandler}
					></button>
				</div>

			</div>
		);
	}
})

const mapStateToProps = (state) => {
	return {
		hints: state.hints
	}
}


export const EditBoxContainer = connect(mapStateToProps)(EditBox)
