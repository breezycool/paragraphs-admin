import {expect} from 'chai'

import {store} from '../redux/store'
import {TOGGLE_EDIT, toggleEdit} from '../redux/actions'

describe('store functionality', () => {

	it('has the right initial state', () => {
		expect(store.getState()).to.not.equal(null)
		expect(store.getState().isEditing).to.equal(false)
	})

	it('handles the TOGGLE_EDIT action', () => {
		store.dispatch(toggleEdit(true))
		console.log(store.getState())
		expect(store.getState().isEditing).to.equal(true)
	})
 
})