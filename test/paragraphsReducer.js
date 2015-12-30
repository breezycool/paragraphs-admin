import {expect} from 'chai'

import {configureStore} from '../redux/store'
import {toggleEdit, saveText, addParagraph, removeParagraph} from '../redux/actions'

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

	// it('handles SAVE_HINT_TAGS', () => {
		
	// })
})