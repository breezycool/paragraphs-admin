import React from 'react';
import {connect} from 'react-redux'
import {toggleEdit, saveText} from '../redux/actions'


export const EditBox = React.createClass({
	getInitialState() {
		return {
			text: this.props.text
		}
	},
	handleChange(e) {
		this.setState({text: e.target.value})
	},	
	render() {
		let showing = (
			<div>
				<textarea name="edit" id="edit" cols="30" rows="10"
									defaultValue={this.props.text}
									onChange={this.handleChange}
				/>
				<div>
					<button 
						className="btn btn-secondary glyphicon glyphicon-trash"
						onClick={() => {
							this.props.dispatch(saveText(this.state.text))
							this.props.dispatch(toggleEdit())
						}}
					>Save</button>
				</div>
			</div>
		);
		return (
			<div>
				{this.props.visible ? showing : ""}
			</div>	
		);
	}
})

const mapStateToProps = (state) => {
	return {
		visible: state.isEditing,
		text: state.text
	}
}

export const EditBoxContainer = connect(mapStateToProps)(EditBox)