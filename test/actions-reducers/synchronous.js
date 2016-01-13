/*
* NOTE: this doesn't test using reducers, it tests using the store,
* 	  	  because I had already written the tests before reading
*		  through Snowflake's testing practices.
*/

import {expect} from 'chai'

import {configureStore} from '../../redux/store'
import * as actionTypes from '../../redux/actions'

describe('synchronous ACs', () => {

	let store

	beforeEach(() => {
		const paragraphsInitial = [
			{id: 0, isEditing: false, isBadText: true, isPushed: false, badText: "this is the bad text!", improvedText: "this is improved text!", hintTags: ['Hint 1', 'Hint 2']},
			{id: 1, isEditing: false, isBadText: true, isPushed: false, badText: "This Is The Bad Text!", improvedText: "This Is Improved Text!", hintTags: ['Hint 1']},
			{id: 2, isEditing: false, isBadText: true, isPushed: false, badText: "THIS IS THE BAD TEXT", improvedText: "THIS IS IMPROVED TEXT!", hintTags: []}
		]
		const hintsInitial = [
			{id: 0, isEditing: false, text: 'Hint 1'},
			{id: 1, isEditing: false, text: 'Hint 2'}
		]
		let initial = {
			paragraphs: paragraphsInitial,
			hints: hintsInitial
		}
		store = configureStore(initial)
	})

	it('toggleParagraphEdit', () => {
		let state = store.getState()
		state.paragraphs.forEach((p) => {
			expect(p.isEditing).to.equal(false)
		})

		store.dispatch(actionTypes.toggleParagraphEdit(1))

		state = store.getState()
		expect(state.paragraphs[1].isEditing).to.equal(true)
	})

	it('toggleParagraphTextType', () => {
		store.dispatch(actionTypes.toggleParagraphTextType(1))

		let state = store.getState()
		state.paragraphs.forEach((p, index) => {
			let expectedValue = (index == 1) ? false : true
			expect(p.isBadText).to.equal(expectedValue)
		})
	})

	it('setParagraphPushed', () => {
		store.dispatch(actionTypes.setParagraphPushed(1))

		let state = store.getState()
		state.paragraphs.forEach((p, index) => {
			let expectedValue = (index === 1) ? true : false
			expect(p.isPushed).to.equal(expectedValue)
		})
	})

	it('updateParagraphText', () => {
		store.dispatch(actionTypes.updateParagraphText('new text', 1, 'badText'))

		let state = store.getState()
		expect(state.paragraphs[1].badText).to.equal('new text')
	})

	describe('updateHintTags', () => {
		it('works with one hintTag', () => {
			store.dispatch(actionTypes.updateHintTags(0, ['Hint 1']))

			let state = store.getState()
			expect(state.paragraphs[0].hintTags.length).to.equal(1)
			expect(state.paragraphs[0].hintTags).to.contain('Hint 1')
		})

		it('works with multiple hintTags', () => {
			store.dispatch(actionTypes.updateHintTags(0, ['Hint 3', 'Hint 4']))

			let state = store.getState()
			expect(state.paragraphs[0].hintTags.length).to.equal(2)
			expect(state.paragraphs[0].hintTags).to.contain('Hint 3')
			expect(state.paragraphs[0].hintTags).to.contain('Hint 4')
		})
	})

	it('addParagraph', () => {
		//  NOTE: could probably do more comprehensive testing here.

		store = configureStore() // reset store to empty
		store.dispatch(actionTypes.addParagraph(undefined, 'new bad text', 'new improved text', []))

		let state = store.getState()
		expect(state.paragraphs.length).to.equal(1)

		store.dispatch(actionTypes.addParagraph(undefined, 'more bad text', 'more improved text', []))
		state = store.getState()
		expect(state.paragraphs.length).to.equal(2)
	})

	it('removeParagraph', () => {
		store.dispatch(actionTypes.removeParagraph(0))

		let state = store.getState()
		expect(state.paragraphs).to.have.length(2)
		expect(state.paragraphs[0]).to.not.contain({badText: 'this is the bad text!'})
	})

	it('toggleHintEdit', () => {
		store.dispatch(actionTypes.toggleHintEdit(0))

		let state = store.getState()
		state.hints.forEach((h, index) => {
			let expectedValue = (index === 0) ? true : false
			expect(h.isEditing).to.equal(expectedValue)
		})
	})

	describe('updateHintText', () => {
		it('updates hint text on right side', () => {
			store.dispatch(actionTypes.updateHintText('Hint 1', 'Adjusted Hint 1', 0))

			let state = store.getState()
			expect(state.hints[0].text).to.equal('Adjusted Hint 1')
		})

		// it('updates paragraphs that contain the hint', () => {
		// 	store.dispatch(actionTypes.updateHintText('Hint 1', 'Adjusted Hint 1', 0))

		// 	let state = store.getState()
		// 	expect(state.paragraphs[0].hintTags.length).to.equal(2)
		// 	expect(state.paragraphs[0].hintTags).to.contain('Adjusted Hint 1')
		// })
	})

	describe('updateHints', () => {
		it('works adding a simple hint', () => {
			let state = store.getState()
			let originalLength = state.hints.length
			store.dispatch(actionTypes.updateHints(['one new hint']))

			state = store.getState()
			expect(state.hints).to.have.length(originalLength + 1)
			// originalLength index is where the new hint is due to 0 indexing
			expect(state.hints[originalLength]).to.contain({text: 'one new hint'})
		})

		it('works with multiple hints', () => {
			store = configureStore() // reset store
			store.dispatch(actionTypes.updateHints(['one new hint', 'another new hint']))

			let state = store. getState()
			expect(state.hints).to.have.length(2)
			expect(state.hints[0].text).to.equal('one new hint')
			expect(state.hints[1].text).to.equal('another new hint')
		})

		it('doesn\'t add duplicate hints'	, () => {
			store = configureStore() // reset store
			store.dispatch(actionTypes.updateHints(['duplicate hint', 'duplicate hint']))

			let state = store.getState()
			expect(state.hints).to.have.length(1)
		})

		it('doesn\'t add pre-existing hints', () => {
			// 'Hint 1' and 'Hint 2' already exist in state
			store.dispatch(actionTypes.updateHints(['Hint 1', 'Hint 2']))

			let state = store.getState()
			expect(state.hints).to.have.length(2)

			// for good measure
			store.dispatch(actionTypes.updateHints(['Hint 1', 'Hint 2']))
			state = store.getState()
			expect(state.hints).to.have.length(2)
		})
	})

	describe('removeHint', () => {
		it('removes from hints in state',() => {
			store.dispatch(actionTypes.removeHint(0))

			let state = store.getState()
			expect(state.hints).to.have.length(1)
			expect(state.hints[0]).to.not.contain({text: 'Hint 1'})
		})

		// does not remove from paragraphs; this is done in 'deleteHint'
	})
})
