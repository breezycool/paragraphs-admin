import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-overlays/lib/Modal';
import {connect} from 'react-redux'
import {saveToServer} from '../redux/actions'

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

const ServerControls = React.createClass({

	getDefaultProps() {
		return {
			error: "",
			status: 0
		}
	},

	getInitialState() {
	  return { showModal: false, showPendingModal:false, showResultModal: false };
	},

	closeSendModal() {
	  this.setState({ showModal: false });
	},

	cancelPendingModal() {
	  this.setState({ showPendingModal: false, showResultModal: true });
	},

	closeResultModal() {
	  this.setState({ showResultModal: false });
	},

	openSendModal() {
	  this.setState({ showModal: true });
	},
	onClickSend() {
		this.props.dispatch(saveToServer());
		this.setState({ showModal: false, showPendingModal: true, showResultModal: true});
	},
	//componentDidMount

	render() {
		//this.props.
		return (
			<div style={{textAlign: 'center'}}>
				<button className="btn btn-success" onClick={this.openSendModal}>Send Paragraphs to App</button>
				<Modal  aria-labelledby='modal-label'
				        style={modalStyle}
				        backdropStyle={backdropStyle}
				        show={this.state.showModal}
				        onHide={this.closeSendModal}>
				<div style={dialogStyle()} >
				  <h4 style={{fontWeight: 'bold'}} id='modal-label'>Wait!</h4>
				  <p>Are you sure you want to push changes to the App?</p>
				  <Button style={{margin: '0.2em'}} bsStyle="primary" onClick={this.onClickSend}>Yes</Button>
				  <Button style={{margin: '0.2em'}} bsStyle="default" onClick={this.closeSendModal}>No</Button>
				</div>

				</Modal>
				<Modal  aria-labelledby='modal-label'
				        style={modalStyle}
				        backdropStyle={backdropStyle}
				        show={this.props.status===0 && this.state.showPendingModal}>
				<div style={dialogStyle()}>
					<div>
					  <p>Making changes...</p>
					   <div className="spinner">
					     <div className="double-bounce1"></div>
					     <div className="double-bounce2"></div>
					   </div>
					</div>
				  <Button style={{margin: '0.2em'}} bsStyle="default" onClick={this.cancelPendingModal}>Cancel</Button>
				</div>
				</Modal>

				<Modal  aria-labelledby='modal-label'
				        style={modalStyle}
				        backdropStyle={backdropStyle}
				        show={this.props.status!==0 && this.state.showResultModal}
				        onHide={this.closeResultModal}>
				<div style={dialogStyle()}>
				 {this.props.error===""
				  ?<p>Changes made successfully.</p>
				  :<p>Sorry, changes were unsuccessful. Error: {this.props.error}</p>}
				  <Button style={{margin: '0.2em'}} bsStyle="primary" onClick={this.closeResultModal}>Okay</Button>
				</div>
				</Modal>
			</div>
		)
	}
})

const mapStateToProps = (state) => {
  return {
    error: state.server.error,
    status: state.server.status
  }
}

export const ServerControlsContainer = connect(mapStateToProps)(ServerControls)
