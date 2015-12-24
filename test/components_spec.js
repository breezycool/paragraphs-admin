import React from 'react/addons';
import {expect} from 'chai';
import {EditBox} from '../components/EditBox';

const {renderIntoDocument, findRenderedDOMComponentWithTag}
  = React.addons.TestUtils;

describe('EditBox', () => {
	it('should display a save button', () => {
		const component = renderIntoDocument(
			<EditBox />
		)
		const button = findRenderedDOMComponentWithTag(component, 'button')
		console.log(button)
		expect(button).to.equal(false)
	})
})