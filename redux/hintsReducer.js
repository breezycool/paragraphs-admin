import {ADD_HINT} from './actions'

/* hint reducer */
const newHint = () => {
	return {
		id: 0,
		text: 'new hint',
		paragraphs:[]
	}
}

const initialState = [newHint()]

export const hints = (state = initialState, action) => {
	let newState = []
	switch(action.type) {
	case ADD_HINT:
		newState = state.slice()
		newState.push({
			id: state.length,
			text: "new hint",
			paragraphs: []
		})
		return newState
	default:
		return state
	}
}