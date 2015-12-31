import {expect} from 'chai'
import {parse} from '../redux/parseReducer'
import {createStore} from 'redux'

import {saveToParse} from '../redux/actions'

describe('parse reducer', () => {

  let store
  beforeEach(() => {
    store = createStore(parse)
  })

  it('handles a default action with undefined state', () => {
    let action = {type: 'default'}
    store.dispatch(action)
  })

  it('handles SAVE_TO_PARSE', () => {
    let state = store.getState()
    store.dispatch(saveToParse())
    
  })

})
