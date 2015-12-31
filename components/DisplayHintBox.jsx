import React from 'react';


export const DisplayHintBox = React.createClass({

	getDefaultProps() {
		return {
			backgroundColor: "#FFF",
			height: "100%",
			width: "45%",
			margin: "8px"
		}
	},

	render() {
		return (
			<div>
				<span>
					{this.props.text}  
				</span>	
				<span>
					<button style={{margin: '0.2em'}}
						className="btn btn-primary glyphicon glyphicon-pencil"
						onClick={this.props.onClickHandler}
					> </button>
					<button style={{margin: '0.2em'}} className="btn btn-danger glyphicon glyphicon-trash"
						onClick={this.props.onClickRemoveHandler}
					> </button>
				</span>
				<hr style={{marginTop: '5px', marginBottom: '5px', borderColor: '#D8CFCF'}}/>
			</div>
		);
	}
})

export default DisplayHintBox
