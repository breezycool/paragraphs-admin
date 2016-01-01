import {SAVE_SUCCESS, SAVE_ERROR} from './actions'

let initialState = []

export const server = (state = initialState, action) => {
  switch (action.type) {

    case SAVE_SUCCESS:
      return state

    case SAVE_ERROR:
      let newState = state.splice()
      //TODO: insert messages from action.error
      return newState

    default:
      return state;
  }
}
