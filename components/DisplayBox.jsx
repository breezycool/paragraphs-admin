import React from 'react';

export const DisplayBox = React.createClass({
	render() {
		return (
			<div>
				<div>
					{this.props.text}
				</div>	
				<div>
					<button
						className="btn btn-primary glyphicon glyphicon-pencil"
						onClick={this.props.onClickHandler}
					>Edit</button>
					<button className="btn btn-danger glyphicon glyphicon-trash">Remove</button>
				</div>	
			</div>
		);
	}
})
