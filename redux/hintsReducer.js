import {ADD_HINT} from './actions'

/* hint reducer */
const newHint = (id) => {
	return {
		id: id,
		text: 'new hint',
		paragraphs:[]
	}
}

const initialState = [newHint(0)]

export const hints = (state = initialState, action) => {
	let newState = []
	switch(action.type) {
	case ADD_HINT:
		newState = state.slice()
		newState.push(newHint(state.length))
		return newState
	default:
		return state
	}
}