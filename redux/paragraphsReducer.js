import {paragraph} from './paragraphReducer'
import {TOGGLE_EDIT, SAVE_TEXT} from './actions'

const defaultAction = {type: "default"}
const initialState = [
	{id: 0, paragraph: paragraph(undefined, defaultAction)},
	{id: 1, paragraph: paragraph(undefined, defaultAction)},
	{id: 2, paragraph: paragraph(undefined, defaultAction)},
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
		console.log(newState)
		return newState
	case SAVE_TEXT:
		newState = state.slice()
		newState[action.id] = {
			id: parseInt(action.id),
			paragraph: paragraph(state[action.id].paragraph, action)
		} 
		console.log(newState)
		return newState
	default:
		console.log("default action: ")
		console.log(action)
		return state
	}
}

// paragraph(state[action.id].paragraph, action)
// state[action.id].paragraph