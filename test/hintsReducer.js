import {expect} from 'chai'

import {configureStore} from '../redux/store'
import {addHint, toggleHintEdit, saveHintText, removeHint} from '../redux/actions'

let hintsStore
describe('hints reducer', () => {

	beforeEach(() => {
		hintsStore = configureStore()
	})

	it('includes the hints reducer', () => {
		let state = hintsStore.getState()
		expect(state).to.be.instanceOf(Object)
		expect(state).to.include.keys(['hints'])
	})

	it('handles ADD_HINT action', () => {
		let state = hintsStore.getState()
		let originalLength = state.hints.length
		hintsStore.dispatch(addHint())
		state = hintsStore.getState()
		expect(state.hints).to.have.length(originalLength + 1)
	})

	it('handles TOGGLE_HINT_EDIT action', () => {
		hintsStore.dispatch(toggleHintEdit(0))
		let state = hintsStore.getState()
		expect(state.hints[0]).to.contain({isEditing: true})
	})

	it('handles SAVE_HINT_TEXT action', () => {
		let state = hintsStore.getState()
		let originalLength = state.hints.length
		hintsStore.dispatch(addHint())
		hintsStore.dispatch(saveHintText('changing this text', 0))
		state = hintsStore.getState()
		expect(state.hints).to.have.length(originalLength + 1)
		expect(state.hints[originalLength]).to.contain({text: 'changing this text'})
	})

	it('handles REMOVE_HINT action', () => {
		hintsStore.dispatch(removeHint())
		let state = hintsStore.getState()
		expect(state.hints).to.have.length(0)
	})
 
})