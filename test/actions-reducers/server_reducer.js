import {expect} from 'chai'

import {server} from '../../redux/serverReducer'
import * as actionTypes from '../../redux/actions'

describe('server error ACs', () => {

	let initialState
	beforeEach(() => {
		const action = {
			type: 'dummy'
		}
		initialState = server(undefined, action)
	})

	it('serverSuccess', () => {
		let next = server(initialState, actionTypes.serverSuccess())

		expect(next.status).to.equal(1)
	})

	it('serverError', () => {
		let next = server(initialState, actionTypes.serverError('specific error message'))

		expect(next.status).to.equal(2)
		expect(next.error).to.equal('specific error message')
	})
})
