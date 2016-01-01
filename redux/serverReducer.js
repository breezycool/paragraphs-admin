import {SAVE_SUCCESS, SAVE_ERROR} from './actions'

let initialState = {}

export const server = (state = initialState, action) => {
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

    default:
      return state;
  }
}
