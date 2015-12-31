import {TRANSFORM_STATE_TO_SERVER, TRANSFORM_STATE_FROM_SERVER} from './actions'
import Promise from 'bluebird'

import {transformStateToServer, transformStateFromServer} from './parseServer'

let initialState = []

export const server = (state = initialState, action) => {
  switch (action.type) {

    // NOTE: these are asynchronous promises
    case TRANSFORM_STATE_TO_SERVER:
      transformStateFromServer(state).then(
        [(newState) => { return newState }],
        [(error) => {    return state    }] //TODO: add error to state
      )

    case TRANSFORM_STATE_FROM_SERVER:
      transformStateFromServer(state).then(
        [(newState) => { return newState }],
        [(error) => {    return state    }] //TODO: add error to state
      )

    default:
      return state;
  }
}
