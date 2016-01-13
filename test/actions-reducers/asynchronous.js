import {expect} from 'chai'

import { paragraphs } from '../../redux/paragraphsReducer'
import { hints } from '../../redux/hintsReducer'

import mockStore from '../mocks/store'
import * as actions from '../../redux/actions'

describe('asynchronous ACs', () => {

	it('login', () => {
		const expectedActions = [
			{ type: actions.LOGIN_SUCCESS }
		]

		const initialState = {}

		const store = mockStore(initialState, expectedActions)
		return store.dispatch(actions.login('username', 'password'))
	})

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

	it('saveNewParagraph', () => {
		const expectedActions = [
			{ type: actions.ADD_PARAGRAPH }
		]

		const initialState = {
			paragraphs: []
		}

		const store = mockStore(initialState, expectedActions)
		return store.dispatch(actions.saveNewParagraph('new bad', 'new improved', []))
	})

	describe('saveParagraph', () => {
		it('flushes newly saved paragraph to state', () => {
			const expectedActions = [
				{ type:  actions.SAVE_PARAGRAPH_TEXT },
				{ type:  actions.SAVE_PARAGRAPH_TEXT },
				{ type:  actions.SAVE_HINT_TAGS },
				{ type:  actions.ADD_HINTS },
			]

			const initialState = {
				paragraphs: paragraphs(undefined, actions.addParagraph(0, 'bad text', 'improved text', [])),
				hints: []
			}

			const store = mockStore(initialState, expectedActions)
			return store.dispatch(actions.saveParagraph(0, 'badText', 'improvedText', []))
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

	it('saveNewHint', () => {
		const expectedActions = [
			{ type: actions.UPDATE_HINTS }
		]

		const initialState = {
			hints: []
		}

		const store = mockStore(initialState, expectedActions)
		return store.dispatch(actions.saveNewHint('new hint'))
	})

	it('deleteHint', () => {

		throw new Error('not yet implemented')
	})
})