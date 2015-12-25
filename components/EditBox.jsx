import React from 'react';

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
		return (
			<div>
				<textarea name="edit" id="edit" cols="30" rows="10"
									defaultValue={this.props.text}
									onChange={this.handleChange}
				/>
				<div>
					<button 
						className="btn btn-secondary glyphicon glyphicon-trash"
						onClick={this.props.onClickHandler}
					>Save</button>
				</div>
			</div>
		);
	}
})