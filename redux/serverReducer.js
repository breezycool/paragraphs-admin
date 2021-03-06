import {
	SERVER_SUCCESS,
	SERVER_ERROR,
	USER_ERROR,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	RESET_ERROR,
	RESET_STATUS
} from './actions'

let initialState = {
	status: 0,
	loggedIn: false,
	serverError: null,
	userError: null
}

export const server = (state = initialState, action) => {

	// if (action == undefined) return state

	switch (action.type) {

		case SERVER_SUCCESS:
			return Object.assign({}, state, {
				status: 1,
				serverError: null
			})

		case SERVER_ERROR:
			return Object.assign({}, state, {
				status: 2,
				serverError: action.error
			})

		case USER_ERROR:
			return  {
				...state,
				status: 2,
				userError: action.error
			}

		case LOGIN_SUCCESS:
			return {
				...state,
				loggedIn: true
			}

		case LOGIN_ERROR:
			return Object.assign({}, state, {
				status: 2,
				serverError: action.error
			})

		case RESET_STATUS:
			return Object.assign({}, state, {
				status: 0
			})

		case RESET_ERROR:
			return Object.assign({}, state, {
				serverError: null,
				userError: null
			})

		default:
			return state
	}
}
