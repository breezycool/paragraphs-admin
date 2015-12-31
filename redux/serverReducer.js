import {SAVE_REQUEST, SAVE_SUCCESS, SAVE_ERROR} from './actions'

let initialState = []

export const server = (state = initialState, action) => {
  switch (action.type) {

    case SAVE_REQUEST:
      return state

    case SAVE_SUCCESS:
      return state

    case SAVE_ERROR:
      let newState = state.splice()
      //TODO: insert messages from action.error
      return newState

    // case TRANSFORM_STATE_TO_SERVER:
    //   transformStateFromServer(state).then(
    //     [(newState) => { return newState }],
    //     [(error) => {    return state    }]
    //   )
    //
    // case TRANSFORM_STATE_FROM_SERVER:
    //   transformStateFromServer(state).then(
    //     [(newState) => { return newState }],
    //     [(error) => {    return state    }]
    //   )

    default:
      return state;
  }
}
