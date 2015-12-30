import {expect} from 'chai'

import {configureStore} from '../redux/store'
import {toggleEdit, saveText, addParagraph, removeParagraph, saveHintTags} from '../redux/actions'

let paragraphStore
describe('paragraphs reducer', () => {

	beforeEach(() => {
		paragraphStore = configureStore()
	})

	it('includes the paragraphs reducer', () => {
		let state = paragraphStore.getState()
		expect(state).to.be.instanceOf(Object)
		expect(state).to.include.keys(['paragraphs'])
	})


	it('handles TOGGLE_EDIT action', () => {
		paragraphStore.dispatch(toggleEdit(0))
		let state = paragraphStore.getState()
		expect(state.paragraphs[0]).to.contain({isEditing: true})
	})

	it('handles SAVE_TEXT action', () => {
		let state = paragraphStore.getState()
		let originalLength = state.paragraphs.length
		paragraphStore.dispatch(saveText('new text', 0))
		state = paragraphStore.getState()
		expect(state.paragraphs.length).to.equal(originalLength)
		expect(state.paragraphs[0].text).to.equal('new text')
	})

	it('handles ADD_PARAGRAPH action', () => {
		let state = paragraphStore.getState()
		let originalLength = state.paragraphs.length
		paragraphStore.dispatch(addParagraph())
		state = paragraphStore.getState()
		expect(state.paragraphs.length).to.equal(originalLength + 1)
	})

	it('handles REMOVE_PARAGRAPH action', () => {
		let state = paragraphStore.getState()
		let originalLength = state.paragraphs.length
		paragraphStore.dispatch(addParagraph())
		paragraphStore.dispatch(removeParagraph(1))
		state = paragraphStore.getState()
		expect(state.paragraphs.length).to.equal(originalLength)
	})

	describe('handles SAVE_HINT_TAGS action', () => {
		it('works with one hint', () => {
			let state = paragraphStore.getState()
			let originalLength = state.hints.length

			paragraphStore.dispatch(addParagraph())
			let paragraphId = state.paragraphs.length // due to 0 indexing
			let hintToSave = ['newly added hint']
			paragraphStore.dispatch(saveHintTags(paragraphId, hintToSave))

			state = paragraphStore.getState()
			let hintTags = state.paragraphs[paragraphId].hintTags
			expect(hintTags[hintTags.length - 1]).to.contain({
				text:'newly added hint'
			})
		})

		it('works with 100 hints', () => {
			let state = paragraphStore.getState()
			let originalLength = state.hints.length

			paragraphStore.dispatch(addParagraph())
			let paragraphId = state.paragraphs.length // due to 0 indexing
			let hintsToSave = []
			for (var i = 0; i < 100; i++) {
				hintsToSave.push('hint '+i)
			}
			paragraphStore.dispatch(saveHintTags(paragraphId, hintsToSave))

			state = paragraphStore.getState()
			let hintTags = state.paragraphs[paragraphId].hintTags
			expect(hintTags.length).to.be.above(100)
			hintTags.map((hint, index) => {
				if (index == 0) return // TODO: make test applicable for all starting data
				expect(hint).to.contain({text: 'hint '+(index-1)})
			})
		})
	})
})
