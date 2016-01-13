/* Mock Backend Factory
*  always use this Backend for testing.
*  NOTE: all methods return promises.
*/
import Promise from 'bluebird'

export default class Backend {

	updateDeviceParagraph(p) {
		return new Promise((resolve, reject) => {
			resolve(p)
		})
	}

	updateWebParagraph(p) {
		return new Promise((resolve, reject) => {
			resolve(p)
		})
	}

	deleteParagraph(p) {
		return new Promise((resolve, reject) => {
			resolve(p)
		})
	}

	updateHint(h) {
		return new Promise((resolve, reject) => {
			resolve(h)
		})
	}

	deleteHint(h) {
		return new Promise((resolve, reject) => {
			// TODO: parse
			resolve(h)
		})
	}

}