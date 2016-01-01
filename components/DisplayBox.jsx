import React from 'react';
import HintTag from './HintTag.jsx'
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-overlays/lib/Modal';

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

export const DisplayBox = React.createClass({

	getDefaultProps() {
		return {
			backgroundColor: "#fff",
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

	render() { //
		let hintTagsArr = [];
		for (let i = 0; i < this.props.hintTags.length; i++) {
		  hintTagsArr.push(<HintTag text={this.props.hintTags[i]}/>);
		};
		return (
			<div>
				<div onClick={this.props.onClickHandler}>
					{this.props.text}
				</div>
				<hr style={{marginTop: '5px', marginBottom: '5px'}}/>
				<div>
					<span style={{fontWeight: 'bold'}}> Hints: </span>
					{hintTagsArr.length===0
					? <span style={{color: 'grey'}} className="btn btn-secondary btn-xs"> No hints to display.</span>
					: hintTagsArr }
				</div>
				<div>
					<span style={{margin: '0.2em', paddingRight: '1em'}}>
					<button style={{margin: '0.2em'}}
						className="btn btn-primary glyphicon glyphicon-pencil"
						onClick={this.props.onClickHandler}
					/>
					</span>
					<button style={{margin: '0.2em'}} className="btn btn-danger glyphicon glyphicon-trash"
						onClick={this.openDeleteAlert}
					/>
				</div>
				<hr style={{marginTop: '5px', marginBottom: '5px', borderColor: '#D8CFCF'}}/>
				<Modal  aria-labelledby='modal-label'
				        style={modalStyle}
				        backdropStyle={backdropStyle}
				        show={this.state.showModal}
				        onHide={this.closeDeleteAlert}>
				<div style={dialogStyle()} >
				  <h4 style={{fontWeight: 'bold'}} id='modal-label'>Wait!</h4>
				  <p align='center'>Are you sure you want to delete this paragraph?</p>
				  <Button style={{margin: '0.2em'}} bsStyle="primary" onClick={this.props.onClickRemoveHandler}>Yes</Button>
				  <Button style={{margin: '0.2em'}} bsStyle="default" onClick={this.closeDeleteAlert}>No</Button>
				</div>
				</Modal>
			</div>
		);
	}
})



// <Modal show={this.state.showModal} onHide={this.closeDeleteAlert}>
// 					<Modal.Header closeButton>
// 					    <Modal.Title>Wait</Modal.Title>
// 					</Modal.Header>
// 					<Modal.Body>
// 						<p>Are you sure you want to delete this paragraph?</p>
// 					</Modal.Body>
// 					<Modal.Footer>
// 					    <Button onClick={this.closeDeleteAlert}>Cancel</Button>
// 					</Modal.Footer>
// 				</Modal>
// <Button onClick={this.props.dispatch(removeParagraph(this.props.index))}>Yes</Button>
