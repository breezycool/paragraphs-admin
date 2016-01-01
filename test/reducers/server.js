import {expect} from 'chai'
import {server} from '../../redux/serverReducer'
import {createStore} from 'redux'
import * as types from '../../redux/actions.js'

import {newParagraph} from '../../redux/paragraphsReducer'

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

  // SIAMO QUI!!!
  it('handles LOAD_SUCCESS', () => {
    let fakeState = {
      paragraphs: [ newParagraph(1, "badText", "improvedText", []) ],
      hints: []
    }
    const loadSuccess = () => {
      return {
        type: types.LOAD_SUCCESS,
        state: fakeState
      }
    }
    store.dispatch(loadSuccess())
    let state = store.getState()
    expect(state).to.contain  ({loggedIn: true})
  })

  it('handles LOAD_ERROR', () => {
    const loadError = () => {
      return {
        type: types.LOAD_ERROR,
        error: 'this is a loading error'
      }
    }
    store.dispatch(loadError())
    let state = store.getState()
    expect(state).to.contain({error: 'this is a loading error'})
  })


})
