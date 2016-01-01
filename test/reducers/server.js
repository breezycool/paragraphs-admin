import {expect} from 'chai'
import {server} from '../../redux/serverReducer'
import {createStore} from 'redux'
import * as types from '../../redux/actions.js'

describe('server reducer', () => {

  let store
  beforeEach(() => {
    store = createStore(server)
  })

  // no action creators, as always dispatched asynchronously

  it('handles SAVE_SUCCESS', () => {
    const saveSuccess = () => {
      return {
        type: types.SAVE_SUCCESS
      }
    }
    store.dispatch(saveSuccess())
    let state = store.getState()
    expect(state).to.contain({status: 1})
  })

  it('handles SAVE_ERROR', () => {
    const saveError = () => {
      return {
        type: types.SAVE_ERROR,
        error: "this is an error"
      }
    }
    store.dispatch(saveError())
    let state = store.getState()
    expect(state).to.contain({status: 2})
    expect(state).to.contain({error: 'this is an error'})
  })

})
