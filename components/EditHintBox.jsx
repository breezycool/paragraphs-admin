import React from 'react';
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


export const EditHintBox = React.createClass({
	getInitialState() {
		return {
			text: this.props.text,
			showModal: false,
			showLengthModal: false
		}
	},
	closeAlert() {
	  this.setState({ showModal: false });
	},

	openAlert() {
	  this.setState({ showModal: true });
	},
	closeLengthAlert() {
	  this.setState({ showLengthModal: false });
	},

	openLengthAlert() {
	  this.setState({ showLengthModal: true });
	},

	handleChange(e) {
		this.setState({text: e.target.value})
	},
	onClickHandler() {

		//check if what we are trying to save already exists in the hints. give an alert if so.
		//let hintTextArray = this.props.hints.map(h => h.text);
		if(this.state.text.length>100)
		{
		this.openLengthAlert()
		}
		//this checks if hint already exists in the array. this is going to be done in the redux actions so that
		//this editbox doesnt need to know what all the hints are (state.hints).

		// else if(hintTextArray.indexOf(this.state.text) === -1 || hintTextArray[this.props.index] === this.state.text)
		// {
		this.props.actions.saveHint(this.props.index, this.state.text);
		this.props.actions.toggleHintEdit(this.props.index)
		// }
		// else{
		// this.openAlert()
		// }
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
						onClick={this.onClickHandler}
					> Save</button>
				</div>
				<Modal  aria-labelledby='modal-label'
				        style={modalStyle}
				        backdropStyle={backdropStyle}
				        show={this.state.showModal}
				        onHide={this.closeAlert}>
				<div style={dialogStyle()} >
				  <p align='center'>A hint with that name already exists.</p>
				  <Button style={{margin: '0.2em'}} bsStyle="primary" onClick={this.closeAlert}>Okay</Button>
				</div>
				</Modal>
				<Modal  aria-labelledby='modal-label'
				        style={modalStyle}
				        backdropStyle={backdropStyle}
				        show={this.state.showLengthModal}
				        onHide={this.closeLengthAlert}>
				<div style={dialogStyle()} >
				  <p align='center'>Hints cannot be more than 100 characters. (Yours is {this.state.text.length})</p>
				  <Button style={{margin: '0.2em'}} bsStyle="primary" onClick={this.closeLengthAlert}>Okay</Button>
				</div>
				</Modal>
			</div>
		);
	}
})
