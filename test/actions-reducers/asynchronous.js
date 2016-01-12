import {expect} from 'chai'

import { paragraphs } from '../../redux/paragraphsReducer'
import { hints } from '../../redux/hintsReducer'
import {dispatch, getState} from 'redux'
import mockStore from '../mocks/store'
import * as actions from '../../redux/actions'

describe('asynchronous ACs', () => {

	it('pushParagraph', () => {
		const expectedActions = [
			{ type: actions.SET_PARAGRAPH_PUSHED }
		]

		const initialState = {
			paragraphs: paragraphs(undefined, actions.addParagraph(0, 'bad text', 'improved text', []))
		}

		const store = mockStore(initialState, expectedActions)
		return store.dispatch(actions.pushParagraph(0))
	})

	describe('saveParagraph', () => {

		it('works with an existing paragraph', () => {
			const expectedActions = [
				{ type:  actions.SAVE_PARAGRAPH_TEXT },
				{ type:  actions.SAVE_PARAGRAPH_TEXT },
				{ type:  actions.SAVE_HINT_TAGS },
				{ type:  actions.ADD_HINTS },
			]

			const initialState = {
				paragraphs: paragraphs(undefined, actions.addParagraph(0, 'bad text', 'improved text', []))
			}

			const store = mockStore(initialState, expectedActions)
			return store.dispatch(actions.saveParagraph(0, 'badText', 'improvedText', []))
		})

		it('works with a non-exisiting paragraph', () => {
			const expectedActions = [
				{ type:  actions.ADD_PARAGRAPH },
				{ type:  actions.SAVE_PARAGRAPH_TEXT },
				{ type:  actions.SAVE_PARAGRAPH_TEXT },
				{ type:  actions.SAVE_HINT_TAGS },
				{ type:  actions.ADD_HINTS },
			]

			const initialState = {
				paragraphs: paragraphs(undefined, actions.addParagraph(0, 'bad text', 'improved text', []))
			}

			const store = mockStore(initialState, expectedActions)
			return store.dispatch(actions.saveParagraph(1, 'badText', 'improvedText', []))
		})
	})

	describe('deleteParagraph', () => {

		it('works with an existing paragraph in backend', () => {
			const expectedActions = [
				{ type:  actions.REMOVE_PARAGRAPH }
			]

			const initialState = {
				paragraphs: paragraphs(undefined, actions.addParagraph('PARSE_ID', 'bad text', 'improved text', []))
			}

			const store = mockStore(initialState, expectedActions)
			return store.dispatch(actions.deleteParagraph(0))
		})

		it('works with an existing paragraph not in backend', () => {
			const expectedActions = [
				{ type:  actions.REMOVE_PARAGRAPH }
			]

			const initialState = {
				// paragraphs that do not have a string as an ID have not yet been sent to parse
				paragraphs: paragraphs(undefined, actions.addParagraph(0, 'bad text', 'improved text', []))
			}

			const store = mockStore(initialState, expectedActions)
			return store.dispatch(actions.deleteParagraph(0))
		})

		it('flushes error if paragraph doesn\'t exist in state', () => {
			const expectedActions = [
				{ type: actions.SERVER_ERROR }
			]

			const initialState = {
				paragraphs: paragraphs(undefined, actions.addParagraph(0, 'bad text', 'improved text', []))
			}

			const store = mockStore(initialState, expectedActions)
			return store.dispatch(actions.deleteParagraph(1))
		})

	})

	describe('deleteHint', () => {

		it('works with an existing hint in backend', () => {
			const expectedActions = [
				{ type: actions.REMOVE_HINT }
			]

			const initialState = {
				paragraphs: paragraphs(undefined, actions.addParagraph(0, 'bad text', 'improved text', [])),
				hints: hints(undefined, actions.addHints(['Hint 1', 'Hint 2']))
			}

			// TODO: some freaky bug here with Promises and mockState...
			const store = mockStore(initialState, expectedActions)
			return store.dispatch(actions.deleteHint(0))
		})
	})
})