import {
	SERVER_SUCCESS,
	SERVER_ERROR,
	SAVE_SUCCESS,
	SAVE_ERROR,
	LOAD_SUCCESS,
	LOAD_ERROR,
	RESET_STATUS} from './actions'

let initialState = {
	status: 0,
	loggedIn: false,
	error: null
}

export const server = (state = initialState, action) => {

	// if (action == undefined) return state

	switch (action.type) {

		case SERVER_SUCCESS:
			return Object.assign({}, state, {
				status: 1,
				error: null
			})

		case SERVER_ERROR:
			return Object.assign({}, state, {
				status: 2,
				error: action.error
			})

		case SAVE_SUCCESS:
			return Object.assign({}, state, {
				status: 1,
				error: null
			})

		case SAVE_ERROR:
		return Object.assign({}, state, {
			status: 2,
			error: action.error
		})

		case LOAD_SUCCESS:
			return {
				loggedIn: true
			}

		case LOAD_ERROR:
			return {
				error: action.error
			}

		case RESET_STATUS:
			return Object.assign({}, state, {
				status: 0
			})

		default:
			return state
	}
}
