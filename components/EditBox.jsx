import React from 'react';
import TagSelect from './TagSelect.jsx'
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-overlays/lib/Modal';

let textareaStyle = {
	minHeight: "200px"
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

export const EditBox = React.createClass({
	getInitialState() { 
		let initText = this.props.isBadText? this.props.badText : this.props.improvedText
		return {
			text: initText,
			showLengthModal: false
		}
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
	onClickHandler(){
		//in the onclick (save button) check if any of the proposed hint tags are longer than
		//100 chars. if so, give an alert. otherwise, save the hint tags and switch to display.
		//also adds any new hints added to the hint list on the right.
		let hintTagArr = this.tagSelect.state.selected.map((each)=>{return each.name})
		let lengthModal=false
		
		for(let i in hintTagArr) {		
		    if (hintTagArr[i].length>100) {
		        lengthModal=true;
		        break;
		    }
		}
		if(lengthModal)
		{
		this.openLengthAlert()
		}
		else
		{
		this.props.actions.saveText(this.state.text, this.props.index)
		this.props.actions.toggleEdit(this.props.index)
		//save hint tags associated with paragraph

		this.props.actions.saveHintTags(this.props.index, hintTagArr)
		//add any new hints to the hint list on the right.
		this.props.actions.addHints(this.tagSelect.state.selected.map((each)=>{return each.name}))
		}
	},
	render() {
		let paragraphType = this.props.isBadText? "Bad Text" : "Improved Text";
		return (
			<div>
				<div style={{fontWeight: 'bold'}}>
					{paragraphType}
				</div>
				<textarea
					defaultValue={this.state.text}
					onChange={this.handleChange}
					style={textareaStyle}
				/>
				<div>
					<TagSelect ref={(ref)=>{this.tagSelect=ref}} hintTags={this.props.hintTags} />
				</div>
				<div>
					<button
						className="btn btn-success glyphicon glyphicon-floppy-disk"
						onClick={this.onClickHandler}
					></button>
				</div>
				<Modal  aria-labelledby='modal-label'
				        style={modalStyle}
				        backdropStyle={backdropStyle}
				        show={this.state.showLengthModal}
				        onHide={this.closeLengthAlert}>
				<div style={dialogStyle()} >
				  <p align='center'>Hints cannot be more than 100 characters.</p>
				  <Button style={{margin: '0.2em'}} bsStyle="primary" onClick={this.closeLengthAlert}>Okay</Button>
				</div>
				</Modal>

			</div>
		);
	}
})

