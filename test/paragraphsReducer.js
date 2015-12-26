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
		expect(state.paragraphs.length).to.equal(1)
		expect(state.paragraphs[0].paragraph).to.contain({isEditing: true})		
	})

	it('handles SAVE_TEXT action', () => {
		paragraphStore.dispatch(saveText('new text', 0))
		let state = paragraphStore.getState()
		expect(state.paragraphs.length).to.equal(1)
		expect(state.paragraphs[0].paragraph.text).to.equal('new text')
	})

	it('handles ADD_PARAGRAPH action', () => {
		paragraphStore.dispatch(addParagraph())
		let state = paragraphStore.getState()
		expect(state.paragraphs.length).to.equal(2)
	})

	it('handles REMOVE_PARAGRAPH action', () => {
		paragraphStore.dispatch(addParagraph())
		paragraphStore.dispatch(removeParagraph(1))
		let state = paragraphStore.getState()
		expect(state.paragraphs.length).to.equal(1)
	})
})