import {ADD_HINTS, SAVE_HINT_TEXT, TOGGLE_HINT_EDIT, HARD_DELETE_HINT} from './actions'

/* hint reducer */
const newHint = (id, text) => {
	return {
		id: id,
		isEditing: false,
		text: text
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
	// newHint(0,"Zombie Nouns")
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

	case HARD_DELETE_HINT:
		//TODO: improve this logic
		let ind
		newState.forEach((p, index) => {
			if (p.text == action.hint) ind = index
		})
		newState.splice(ind,1)
		return newState

	default:
		return state
	}
}
