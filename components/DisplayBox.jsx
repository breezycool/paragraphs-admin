import React from 'react';

export const DisplayBox = React.createClass({

	getDefaultProps() {
		return {
			backgroundColor: "#fff",
			height: "100%",
			width: "45%",
			margin: "8px"
		}
	},

	render() {
		return (
			<div>
				<div onClick={this.props.onClickHandler}>
					{this.props.text}
				</div>
				<hr/>
				<div>
				{this.props.hintTags}
				</div>
				<div>
					<button style={{margin: '0.2em'}}
						className="btn btn-primary glyphicon glyphicon-pencil"
						onClick={this.props.onClickHandler}
					/>
					<button style={{margin: '0.2em'}} className="btn btn-danger glyphicon glyphicon-trash"
						onClick={this.props.onClickRemoveHandler}
					/>
				</div>

			</div>
		);
	}
})

export default DisplayBox
