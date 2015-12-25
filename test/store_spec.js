import {expect} from 'chai'

import {store} from '../redux/store'
import {toggleEdit, saveText} from '../redux/actions'

describe('store functionality', () => {

	it('has the right initial state', () => {
		expect(store.getState()).to.not.equal(null)
		expect(store.getState().isEditing).to.equal(false)
		expect(store.getState().text).to.equal("Type some text here...")
	})

	it('handles the TOGGLE_EDIT action', () => {
		store.dispatch(toggleEdit())
		expect(store.getState()).to.contain({isEditing: true})

		store.dispatch(toggleEdit())
		expect(store.getState()).to.contain({isEditing: false})
	})

	it('handles the SAVE_TEXT action', () => {
		store.dispatch(saveText('save this text'))
		expect(store.getState()).to.contain({text: 'save this text'})

		store.dispatch(saveText('change it'))
		expect(store.getState()).to.contain({text: 'change it'})
	})
 
})