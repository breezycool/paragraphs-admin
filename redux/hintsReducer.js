import {ADD_HINTS, SAVE_HINT_TEXT, TOGGLE_HINT_EDIT, REMOVE_HINT} from './actions'

/* hint reducer */
const newHint = (id, text) => {
	return {
		id: id,
		isEditing: false,
		text: text,
		paragraphs:[]
	}
}

const hint = (state = newHint(0), action) => {
	switch(action.type) {
		case TOGGLE_HINT_EDIT:
			return Object.assign({}, state, {
				isEditing: !state.isEditing
			})

		default:
			return state
	}
}

const initialState = [
	// newHint(0)
]

export const hints = (state = initialState, action) => {
	let newState = state.slice()
	switch(action.type) {
	case ADD_HINTS:
		action.hints.forEach((hintText, index) => {
			var alreadyExists = false
			// NOTE: nested loops, but shouldn't matter with no. of hints in practice.
			state.map((hint) => {
				if (hint.text == hintText) alreadyExists = true
			})
			if (!alreadyExists) {
				newState.push(newHint(state.length + index, hintText))
			}
		})
		return newState

	case TOGGLE_HINT_EDIT:
		newState[action.id] = hint(state[action.id], action)
		return newState

	case SAVE_HINT_TEXT:
		newState[action.id].text = action.text
		return newState

	case REMOVE_HINT:
		newState.splice(action.id, 1)
		return newState

	default:
		return state
	}
}
