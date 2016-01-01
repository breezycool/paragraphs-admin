import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-overlays/lib/Modal';
import {connect} from 'react-redux'

import {saveHintText, hardDeleteHint, toggleHintEdit} from '../redux/actions'

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


const EditHintBox = React.createClass({
	getInitialState() {
		return {
			text: this.props.text,
			showModal: false
		}
	},
	closeAlert() {
	  this.setState({ showModal: false });
	},

	openAlert() {
	  this.setState({ showModal: true });
	},

	handleChange(e) {
		this.setState({text: e.target.value})
	},
	onClickHandler() {

		//check if what we are trying to save already exists in the hints. give an alert if so.
		let hintTextArray = this.props.hints.map(h => h.text);
		if(hintTextArray.indexOf(this.state.text) === -1 || hintTextArray[this.props.index] === this.state.text)
		{
		this.props.dispatch(saveHintText(this.props.hints[this.props.index].text, this.state.text, this.props.index));
		this.props.dispatch(toggleHintEdit(this.props.index))
		}
		else{
		this.openAlert()
		}
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
				  <Button style={{margin: '0.2em'}} bsStyle="primary" onClick={this.closeAlert}>Okay, sorry.</Button>
				</div>
				</Modal>
			</div>
		);
	}
})

const mapStateToProps = (state) => {
	return {
		hints: state.hints
	}
}

export const EditHintBoxContainer = connect(mapStateToProps)(EditHintBox)
