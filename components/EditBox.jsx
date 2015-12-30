import React from 'react';
import TagSelect from './TagSelect.jsx'

var textareaStyle = {
	minHeight: "200px"
}

const EditBox = React.createClass({
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
					style={textareaStyle}
				/>
				<div>
					<TagSelect hintTags={this.props.hintTags} hints={this.props.hints}/>
				</div>
				<div>
					<button 
						className="btn btn-success glyphicon glyphicon-floppy-disk"
						onClick={this.props.onClickHandler}
					> Save</button>
				</div>

			</div>
		);
	}
})

export default EditBox