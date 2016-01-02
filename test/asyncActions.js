import {expect} from 'chai'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'

import {server} from '../redux/serverReducer'
import * as actions from '../redux/actions'

const middlewares = [ thunk ]
const mockStore = configureStore(middlewares)

describe('async actions', () => {

  // afterEach(() => {
  //   nock.cleanAll()
  // })
  //
  // it('dispatches SAVE_SUCCESS after valid save', (done) => {
  //   nock('http://example.com/') //TODO: set up this nock to intercept Parse
  //     .get('/todos')
  //     .reply(200, { success: 'here be some state' })
  //
  //   const expectedActions = [
  //     { type: actions.SAVE_SUCCESS }
  //   ]
  //
  //   const store = mockStore({state: 'someInitialState'}, expectedActions, done);
  //   store.dispatch(actions.saveRequest());
  // })

  // it('dispatches SAVE_ERROR with error after invalid save', (done) => {
  //   nock('http://example.com/') //TODO: set up this nock to intercept Parse, might need to do some funky things....
  //     .get('/todos')
  //     .reply(200, { success: 'here be some state' })
  //
  //   const expectedActions = [
  //     { type: actions.SAVE_SUCCESS } //NOTE: change to SAVE_ERROR when there is actually something to intercept
  //   ]
  //
  //   const store = mockStore({state:'someInitialState'}, expectedActions, done);
  //   store.dispatch(actions.saveRequest());
  // })

})
