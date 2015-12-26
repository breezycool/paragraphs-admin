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
		expect(state.hints).to.have.length(1)
		hintsStore.dispatch(addHint())
		state = hintsStore.getState()
		expect(state.hints).to.have.length(2)
	})

	it('handles TOGGLE_HINT_EDIT action', () => {
		hintsStore.dispatch(toggleHintEdit(0))
		let state = hintsStore.getState()
		expect(state.hints[0]).to.contain({isEditing: true})
	})

	it('handles SAVE_HINT_TEXT action', () => {
		hintsStore.dispatch(saveHintText('changing this text', 0))
		let state = hintsStore.getState()
		expect(state.hints).to.have.length(1)
		expect(state.hints[0]).to.contain({text: 'changing this text'})
	})

	it('handles REMOVE_HINT action', () => {
		hintsStore.dispatch(removeHint())
		let state = hintsStore.getState()
		expect(state.hints).to.have.length(0)
	})
 
})