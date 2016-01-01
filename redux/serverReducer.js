import {SAVE_SUCCESS, SAVE_ERROR, LOAD_SUCCESS, LOAD_ERROR} from './actions'

let initialState = {}

export const server = (state = initialState, action) => {

  // if (action == undefined) return state

  switch (action.type) {

    case SAVE_SUCCESS:
      return Object.assign({}, state, {
        status: 1
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
          status: 2,
          error: action.error
      }

    default:
      return state
  }
}
