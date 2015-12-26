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
				<textarea
					defaultValue={this.props.text}
					onChange={this.handleChange}
				/>
				<div>
					<button 
						className="btn btn-success glyphicon glyphicon-floppy-disk"
						onClick={this.props.onClickHandler}
					>Save</button>
				</div>
			</div>
		);
	}
})