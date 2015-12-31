import {SAVE_TO_PARSE} from './actions'

let initialState = []

export const parse = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TO_PARSE:
      // TODO: use Promises to test Parse saving
      return state

    default:
      return state;
  }
}
