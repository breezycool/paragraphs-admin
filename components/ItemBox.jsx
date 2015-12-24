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
	  	{ this.props.isEditing ? showing : ""}
	  	</div>
	  );
	}
}

const mapStateToProps = (state) => {
	return {
		isEditing: state.isEditing
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: () => {
			dispatch(toggleEdit(false))
		}
	}
}

export const ItemBoxContainer = connect(mapStateToProps, mapDispatchToProps)(ItemBox)