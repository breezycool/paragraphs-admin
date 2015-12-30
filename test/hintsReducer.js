import {expect} from 'chai'

import {configureStore} from '../redux/store'
import {addHints, toggleHintEdit, saveHintText, removeHint, saveHintTags} from '../redux/actions'

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
	describe('handles ADD_HINTS action', () => {
		it('works with one new hint', () => {
			let state = hintsStore.getState()
			let originalLength = state.hints.length
			hintsStore.dispatch(addHints(['one new hint']))
			state = hintsStore.getState()
			expect(state.hints).to.have.length(originalLength + 1)
			// originalLength index is where the new hint is due to 0 indexing
			expect(state.hints[originalLength]).to.contain({text: 'one new hint'})
		})

		it('works with 3 new hints', () => {
			let state = hintsStore.getState()
			let originalLength = state.hints.length

			let hintsToAdd = ['hint 1', 'hint 2', 'hint 3']

			hintsStore.dispatch(addHints(hintsToAdd))

			state = hintsStore.getState()

			expect(state.hints).to.have.length(originalLength + hintsToAdd.length)
			for (var i = 0; i < hintsToAdd.length; i++) {
				expect(state.hints[originalLength + i]).to.contain({text: hintsToAdd[i]})
			}
		})

		it('works with 100 new hints', () => {
			let state = hintsStore.getState()
			let originalLength = state.hints.length

			// add 100 hints
			let hintsToAdd = []
			for (var i = 0; i < 100; i++) {
				hintsToAdd.push('hint '+i)
			}

			hintsStore.dispatch(addHints(hintsToAdd))

			state = hintsStore.getState()

			expect(state.hints).to.have.length(originalLength + hintsToAdd.length)
			for (var i = 0; i < hintsToAdd.length; i++) {
				expect(state.hints[originalLength + i]).to.contain({text: hintsToAdd[i]})
			}
		})

		it('should not add duplicate hints', () => {


			let state = hintsStore.getState()
			let originalLength = state.hints.length
			hintsStore.dispatch(addHints(['hint 1']))
			state = hintsStore.getState()
			expect(state.hints).to.have.length(originalLength+1)
			let hintsToAdd = ['hint 1', 'hint 1', 'hint 3']
			hintsStore.dispatch(addHints(hintsToAdd))
			state = hintsStore.getState()
			expect(state.hints).to.have.length(originalLength+2)
		})

	})
	


	it('handles TOGGLE_HINT_EDIT action', () => {
		hintsStore.dispatch(toggleHintEdit(0))
		let state = hintsStore.getState()
		expect(state.hints[0]).to.contain({isEditing: true})
	})

	it('handles SAVE_HINT_TEXT action', () => {
		let state = hintsStore.getState()
		let originalLength = state.hints.length
		hintsStore.dispatch(addHints(['initial hint']))
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