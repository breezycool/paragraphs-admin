import React from 'react';
import {connect} from 'react-redux'
import {toggleEdit} from '../redux/actions'

export class ItemBox extends React.Component {
	render() {
		let showing = (
			<div>
				<div>
					Paragraph text.
				</div>	
				<div>
					<button
						className="btn btn-primary glyphicon glyphicon-pencil"
						onClick={this.props.onClick}
					>Edit</button>
					<button className="btn btn-danger glyphicon glyphicon-trash">Remove</button>
				</div>
			</div>
		);
		return (
	  	<div>
	  	{ this.props.visible ? showing : ""}
	  	</div>
	  );
	}
}

const mapStateToProps = (state) => {
	return {
		visible: !state.isEditing
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onClick: () => {
			dispatch(toggleEdit())
		}
	}
}

export const ItemBoxContainer = connect(mapStateToProps, mapDispatchToProps)(ItemBox)