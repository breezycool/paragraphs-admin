import {expect} from 'chai'

import {reducer} from '../redux/reducer'
import {createStore} from 'redux'

describe('main reducer', () => {

	it('has an initial state', () => {
		let store = createStore(reducer)

		expect(store.getState()).to.not.equal(null)
	})

	
})