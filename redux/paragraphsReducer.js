import {
	TOGGLE_PARAGRAPH_EDIT,
	TOGGLE_PARAGRAPH_TEXT_TYPE,
	SET_PARAGRAPH_PUSHED,
	UPDATE_PARAGRAPH_TEXT,
	ADD_PARAGRAPH,
	REMOVE_PARAGRAPH,
	UPDATE_HINT_TAGS,
	UPDATE_HINT_TEXT,
	LOAD_SUCCESS
} from './actions'

import {indexOf, pull} from 'lodash-node'

// helper function; initializes a new paragraph to be added to the state.
const newParagraph = (id, badText, improvedText, hintTags) => {
	return {
		id: id,
		isEditing: false,
		isPushed: false,
		isBadText: true,
		badText: badText,
		improvedText: improvedText,
		hintTags: hintTags
	}
}

/* paragraph reducer */

const paragraph = (state = {}, action) => {
	switch(action.type) {
	case TOGGLE_PARAGRAPH_EDIT:
		return Object.assign({}, state, {
			isEditing: !state.isEditing
		})
	case TOGGLE_PARAGRAPH_TEXT_TYPE:
		return Object.assign({}, state, {
			isBadText: !state.isBadText
		})
	case SET_PARAGRAPH_PUSHED:
		return Object.assign({}, state, {
			isPushed: true
		})
	case UPDATE_PARAGRAPH_TEXT:
		if (action.textType == 'badText') {
			return Object.assign({}, state, {
				badText: action.text
			})
		} else { // if action.textType === 'improvedText'
			return Object.assign({}, state, {
				improvedText: action.text
			})
		}
	default:
		return state
	}
}

const initialState = []

export const paragraphs = (state = initialState, action) => {

	// if (action == undefined) return state

	let newState = state.slice()

	switch(action.type) {

	case LOAD_SUCCESS:
		return action.state.paragraphs

	case TOGGLE_PARAGRAPH_EDIT:
		newState[action.index] = paragraph(state[action.index], action)
		return newState

	case TOGGLE_PARAGRAPH_TEXT_TYPE:
		newState[action.index] = paragraph(state[action.index], action)
		return newState

	case SET_PARAGRAPH_PUSHED:
		newState[action.index] = paragraph(state[action.index], action)

	case ADD_PARAGRAPH:
		newState.push(newParagraph(action.id, action.badText, action.improvedText, action.hintTags))
		return newState

	case UPDATE_PARAGRAPH_TEXT:
		newState[action.index] = paragraph(state[action.index], action)
		return newState

	case REMOVE_PARAGRAPH:
		newState.splice(action.index, 1)
		return newState

	case UPDATE_HINT_TAGS:
		newState[action.paragraphIndex].hintTags = action.hintTags
		return newState

	// case UPDATE_HINT_TEXT:
	// 	state.forEach((p, ind) => {
	// 		p.hintTags.forEach((t, innerIndex) => {
	// 			if (t == action.oldText) {
	// 				newState[ind].hintTags[innerIndex] = action.text
	// 			}
	// 		})
	// 	})
	// 	return newState

	default:
		return state

	}
}
