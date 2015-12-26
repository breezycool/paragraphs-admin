import {expect} from 'chai'

import {configureStore} from '../redux/store'
import {addHint} from '../redux/actions'

let hintsStore
describe('hints reducer', () => {

	beforeEach(() => {
		hintsStore = configureStore()
	})

	it('includes the hints reducer', () => {
		let state = hintsStore.getState()
		expect(state).to.be.instanceOf(Object)
		expect(state).to.include.keys(['hints'])
	})

	it('handles ADD_HINT action', () => {
		let state = hintsStore.getState()
		expect(state.hints).to.have.length(1)
		hintsStore.dispatch(addHint())
		state = hintsStore.getState()
		expect(state.hints).to.have.length(2)
	})
 
})