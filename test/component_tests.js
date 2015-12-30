import {expect} from 'chai'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {EditBox} from '../../components/EditBox'
import ReactDOM from 'react-dom';

describe('EditBox', () => {

	it('gets hint tags from TagSelect', () => {
		var editbox = TestUtils.renderIntoDocument(
			<EditBox hintTags=""/>
		);
		expect(editbox.props.hintTags).to.equal('');
	})

	// it('has a validateEmail function that works correctly', () => {

	//     function validateEmail(email) 
	// 	{
	// 		var re = /\S+@\S+\.\S+/;
	// 		return re.test(email);
	// 	};

	// 	let dummyemail = 'asd@asd.asd';
	// 	let dummyemail2 = 'asd1@.1';
	// 	let dummyemail3 = 'justastring';

	// 	expect(validateEmail(dummyemail)).to.equal(true);
	// 	expect(validateEmail(dummyemail2)).to.equal(false);
	// 	expect(validateEmail(dummyemail3)).to.equal(false);

	// })

	// it('compares passwords appropriately', () => {

	// 	var register = TestUtils.renderIntoDocument(
	// 		<Register />
	// 	);

	// 	expect(register.state.password).to.equal('');

	// 	expect(register.state.password2).to.equal('');

	// 	register.setState({name:'thisnamehasfiveletters'});
	// 	register.setState({password:'12345'});
	// 	register.setState({password2:'12344'});
	// 	// Simulate a click 
	// 	TestUtils.Simulate.click(
	// 	  TestUtils.findRenderedDOMComponentWithTag(register, 'button')
	// 	);
	// 	expect(register.state.errorValidate).to.equal('Passwords must match.');

	// })

})