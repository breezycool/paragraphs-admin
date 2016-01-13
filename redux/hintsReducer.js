import {
	UPDATE_HINTS,
	UPDATE_HINT_TEXT,
	TOGGLE_HINT_EDIT,
	REMOVE_HINT,
	LOGIN_SUCCESS
} from './actions'

/* hint reducer */
const newHint = (id, text) => {
	return {
		id: id,
		isEditing: false,
		text: text
	}
}

const hint = (state = newHint(0,'new hint'), action) => {
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
]

export const hints = (state = initialState, action) => {
	let newState = state.slice()

	switch(action.type) {

	case LOGIN_SUCCESS:
		return action.state.hints

	case UPDATE_HINTS:
		action.hintTags.forEach((hintText, index) => {

			var alreadyExists = false
			state.map((hint) => {
				if (hint.text == hintText) alreadyExists = true
			})
			if (!alreadyExists) {
				newState.push(newHint(state.length + index, hintText))
			}
		})
		return newState

	case TOGGLE_HINT_EDIT:
		newState[action.index] = hint(state[action.index], action)
		return newState

	case UPDATE_HINT_TEXT:
		newState[action.index].text = action.text
		return newState

	case REMOVE_HINT:
		newState.splice(action.index,1)
		return newState

	default:
		return state
	}
}
