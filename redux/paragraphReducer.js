import { TOGGLE_EDIT, SAVE_TEXT } from './actions'

const initialState = {
	isEditing: false,
	text: "Type some text here..."
}

export const paragraphs = (state = initialState, action) => {
	switch(action.type) {
	case TOGGLE_EDIT:
		return Object.assign({}, state, {
			isEditing: !state.isEditing
		})
	case SAVE_TEXT:
		return Object.assign({}, state, {
			text: action.text
		})
	default:
		return state
	}
}