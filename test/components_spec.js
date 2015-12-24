import React from 'react/addons';
import {expect} from 'chai';
import {EditBox} from '../components/EditBox';
import {ItemBox} from '../components/ItemBox';

const {renderIntoDocument, Simulate}
  = React.addons.TestUtils;

describe('EditBox', () => {
	it('should render into document', () => {
		const component = renderIntoDocument(
			EditBox()
		)
		expect(component.children).to.not.equal(null)
	})
})

describe('ItemBox', () => {
	it('should render EditBox on edit button click', () => {
		const component = renderIntoDocument(
			ItemBox()
		)
		expect(component.children).to.not.equal(null)
	})
})