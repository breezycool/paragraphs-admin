import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-overlays/lib/Modal';

import {ItemTypes} from './ItemTypes'
import { DragSource } from 'react-dnd';


const PropTypes = React.PropTypes;

const hintSource = {
  beginDrag(props) {
    return {text: props.text};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}


const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0, bottom: 0, left: 0, right: 0
};

const backdropStyle = {
  position: 'fixed',
   zIndex: 1040,
   top: 0, bottom: 0, left: 0, right: 0,
  zIndex: 'auto',
  backgroundColor: '#000',
  opacity: 0.5
};

const dialogStyle = function() {
  let top = 50;
  let left = 50;

  return {
    position: 'absolute',
    width: 400,
    top: top + '%', left: left + '%',
    transform: `translate(-${top}%, -${left}%)`,
    border: '1px solid #e5e5e5',
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    padding: 20,
    textAlign: 'center'
  };
};


export const DisplayHintBox = React.createClass({

	propTypes: {
	    connectDragSource: PropTypes.func.isRequired,
	    isDragging: PropTypes.bool.isRequired
	  },

	getDefaultProps() {
		return {
			backgroundColor: "#FFF",
			height: "100%",
			width: "45%",
			margin: "8px"
		}
	},
	getInitialState() {
	  return { showModal: false };
	},

	closeDeleteAlert() {
	  this.setState({ showModal: false });
	},

	openDeleteAlert() {
	  this.setState({ showModal: true });
	},
	onClickRemoveHandler() {
		this.setState({ showModal: false });
		this.props.actions.deleteHint(this.props.index)
	},

	render() {
		let connectDragSource = this.props.connectDragSource;
		let isDragging = this.props.isDragging;

		return connectDragSource(
			<div style={{cursor: "pointer", opacity: isDragging ? 0.5 : 1}}>
				<span onClick={this.props.onClickHandler}>
					{this.props.text}
				</span>
				<span>
				<span style={{margin: '0.2em', paddingRight: '0.08em'}}>
					<button style={{margin: '0em'}}
						className="btn btn-primary glyphicon glyphicon-pencil"
						onClick={this.props.onClickHandler}
					> </button>
				</span>
					<button style={{margin: '0em'}} className="btn btn-danger glyphicon glyphicon-trash"
						onClick={this.openDeleteAlert}
					> </button>
				</span>
				<hr style={{marginTop: '5px', marginBottom: '5px', borderColor: '#D8CFCF'}}/>
				<Modal  aria-labelledby='modal-label'
				        style={modalStyle}
				        backdropStyle={backdropStyle}
				        show={this.state.showModal}
				        onHide={this.closeDeleteAlert}>
				<div style={dialogStyle()} >
				  <h4 style={{fontWeight: 'bold'}} id='modal-label'>Wait!</h4>
				  <p>Are you sure you want to delete this hint? All matching hint tags associated with paragraphs will also be deleted.</p>
				  <Button style={{margin: '0.2em'}} bsStyle="primary" onClick={this.onClickRemoveHandler}>Yes</Button>
				  <Button style={{margin: '0.2em'}} bsStyle="default" onClick={this.closeDeleteAlert}>No</Button>
				</div>
				</Modal>
			</div>
		);
	}
})

export const DragDisplayHintBox = DragSource(ItemTypes.HINT, hintSource, collect)(DisplayHintBox);



