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
	  return { showModal: false, typeBad:true };
	},

	closeDeleteAlert() {
	  this.setState({ showModal: false });
	},

	openDeleteAlert() {
	  this.setState({ showModal: true });
	},
	getClassNameB1() {
		return this.props.isBadText? "btn btn-default active":"btn btn-default";
	},
	getClassNameB2() {
		return this.props.isBadText? "btn btn-default":"btn btn-default active";
	},
	onClickRemoveHandler() {
		this.setState({ showModal: false });
		this.props.actions.resetStatus()
		this.props.actions.resetError()
		this.props.actions.deleteParagraph(this.props.index);
	},
	onClickPushHandler() {
		this.props.actions.resetStatus()
		this.props.actions.resetError()
		this.props.actions.pushParagraph(this.props.index);
	},
	render() { //
		let hintTags = this.props.hintTags
		let hintTagsArr = [];
		for (let i = 0; i < hintTags.length; i++) {
			 hintTagsArr.push(<HintTag key={i} text={hintTags[i]}/>);
			};
		return (
			<div>
				<div className="btn-group">
				  <button style={{fontWeight: 'bold'}} className={this.getClassNameB1()} onClick={this.props.onChangeImprovedTypeHandler}>
				    Bad Text
				  </button>
				  <button style={{fontWeight: 'bold'}} className={this.getClassNameB2()} onClick={this.props.onChangeBadTypeHandler}>
				    Improved Text
				  </button>
				</div>
				<div onClick={this.props.onClickHandler}>
					{this.props.isBadText? this.props.badText : this.props.improvedText}
				</div>
				<hr style={{marginTop: '5px', marginBottom: '5px'}}/>
				<div>
					<span style={{fontWeight: 'bold'}}> Hints: </span>
					{hintTagsArr.length===0?
					 <span style={{color: 'grey'}} className="btn btn-xs"> No hints to display.</span>
					: hintTagsArr }
				</div>
				<div>
					<span style={{margin: '0.2em', paddingRight: '1em'}}>
					<button style={{margin: '0.2em'}}
						className="btn btn-primary btn-sm"
						onClick={this.props.onClickHandler}
					> Edit <span className="glyphicon glyphicon-pencil"></span></button>
					<button style={{margin: '0.2em'}} className="btn btn-danger btn-sm"
						onClick={this.openDeleteAlert}
					> Delete <span className="glyphicon glyphicon-trash"></span></button>
					{!this.props.isPushed?
						<button style={{margin: '0.2em', fontWeight: 'bold'}} className="btn btn-success btn-sm"
							onClick={this.onClickPushHandler}
						> Push paragraph to app <span className="glyphicon glyphicon-hand-up"></span></button>
						:<button style={{margin: '0.2em', fontWeight: 'bold'}} className="btn btn-success btn-sm active"
						> Paragraph is pushed <span className="glyphicon glyphicon-thumbs-up"></span></button>
					}
					</span>
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
				  <Button style={{margin: '0.2em'}} bsStyle="primary" onClick={this.onClickRemoveHandler}>Yes</Button>
				  <Button style={{margin: '0.2em'}} bsStyle="default" onClick={this.closeDeleteAlert}>No</Button>
				</div>
				</Modal>
			</div>
		);
	}

})
