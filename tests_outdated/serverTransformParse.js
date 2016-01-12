import {expect} from 'chai'

import * as parse from '../redux/parseHTTP'
import * as types from '../redux/actions'
import {configureStore} from '../redux/store'

describe('methods to load state to and from parse', () => {

  let liveTests = false

  let store
  beforeEach(() => {
    store = configureStore()
  })

  it('loads state from parse', (done) => {
    if (!liveTests) return done()
    parse.getStateFromParse().then((state) => {
      store.dispatch({type: types.LOAD_SUCCESS, state: state})
      done()
    })
  })

  it('logs in', (done) => {
    if (!liveTests) return done()
    store.dispatch(types.login('username', 'password'))
  })

})
