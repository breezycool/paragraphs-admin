import {TOGGLE_EDIT, TOGGLE_PARAGRAPH_TYPE, SAVE_TEXT, ADD_PARAGRAPH,
	REMOVE_PARAGRAPH, SAVE_HINT_TAGS, HARD_DELETE_HINT, SAVE_HINT_TEXT, LOAD_SUCCESS} from './actions'

import {indexOf, pull} from 'lodash-node'

/* paragraph reducer */
export const newParagraph = (id, badText, improvedText, hints) => {
	return {
		id: id,
		isEditing: false,
		badText: badText,
		improvedText: improvedText,
		hintTags: hints
	}
}

const paragraph = (state = {}, action) => {
	switch(action.type) {
	case TOGGLE_EDIT:
		return Object.assign({}, state, {
			isEditing: !state.isEditing
		})
	case TOGGLE_PARAGRAPH_TYPE:
		return Object.assign({}, state, {
			isBadText: !state.isBadText
		})
	case SAVE_TEXT:
		if (state.isBadText) {
			return Object.assign({}, state, {
				badText: action.text
			})
		} else {
			return Object.assign({}, state, {
				improvedText: action.text
			})
		}
	default:
		return state
	}
}

// dummy data; set to an empty list for realz
const initialState = []

export const paragraphs = (state = [], action) => {

	// if (action == undefined) return state

	let newState = state.slice()

	switch(action.type) {

	case LOAD_SUCCESS:
		return action.state.paragraphs

	case ADD_PARAGRAPH:
		newState.push(newParagraph(state.length, 'bad Text', 'improved Text', []))
		return newState

	case TOGGLE_EDIT:
		newState[action.id] = paragraph(state[action.id], action)
		return newState

	case TOGGLE_PARAGRAPH_TYPE:
		newState[action.id] = paragraph(state[action.id], action)
		return newState

	case SAVE_TEXT:
		newState[action.id] = paragraph(state[action.id], action)
		return newState

	case REMOVE_PARAGRAPH:
		newState.splice(action.id, 1)
		return newState

	case SAVE_HINT_TAGS:
		newState[action.id].hintTags = action.hints
		return newState

	case HARD_DELETE_HINT:
		state.forEach((p, ind) => {
			let tags = p.hintTags
			// if hint to delete is in tags
			let tagIndex = indexOf(tags, action.hint)
			if (tagIndex != -1) {
				// remove from tags in newState
				newState[ind].hintTags.splice(tagIndex, 1)
			}
		})
		return newState

	case SAVE_HINT_TEXT:
		state.forEach((p, ind) => {
			p.hintTags.forEach((t, innerIndex) => {
				if (t == action.oldText) {
					newState[ind].hintTags[innerIndex] = action.text
				}
			})
		})
		return newState

	default:
		return state

	}
}
