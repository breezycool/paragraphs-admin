import { TOGGLE_EDIT } from './actions'

const initialState = {
	isEditing: false
}

export const reducer = (state = initialState, action) => {
	switch(action.type) {
	case TOGGLE_EDIT:
		return {
				isEditing: action.payload
		}
	default:
		return state
	}
}

