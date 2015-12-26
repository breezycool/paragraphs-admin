import {TOGGLE_EDIT, SAVE_TEXT, ADD_PARAGRAPH, REMOVE_PARAGRAPH} from './actions'

/* paragraph reducer */
const paragraphInitialState = {
	isEditing: false,
	text: "Type some text here..."
}

const paragraph = (state = paragraphInitialState, action) => {
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

const defaultAction = {type: "default"}
const initialState = [
	{id: 0, paragraph: paragraph(undefined, defaultAction)}
]

export const paragraphs = (state = initialState, action) => {
	let newState = []
	switch(action.type) {
	case TOGGLE_EDIT:
		newState = state.slice()
		newState[action.id] = {
			id: parseInt(action.id),
			paragraph: paragraph(state[action.id].paragraph, action)
		} 
		return newState

	case SAVE_TEXT:
		newState = state.slice()
		newState[action.id] = {
			id: parseInt(action.id),
			paragraph: paragraph(state[action.id].paragraph, action)
		} 
		return newState

	case ADD_PARAGRAPH:
		newState = state.slice()
		newState.push({
			id: state.length,
			paragraph: paragraph(undefined, defaultAction)
		}) 
		return newState

	case REMOVE_PARAGRAPH:
		newState = state.slice()
		newState.splice(action.id, 1) 
		return newState

	default:
		return state
	}
}

// paragraph(state[action.id].paragraph, action)
// state[action.id].paragraph