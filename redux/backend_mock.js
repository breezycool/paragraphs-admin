/* Mock Backend Factory
*  always use this Backend for testing.
*  NOTE: all methods return promises.
*/
import Promise from 'bluebird'

export default class Backend {

	/* LOGIN FUNCTIONS */

	login(username, password) {
		return new Promise((resolve, reject) => {
			// TODO: parse
			resolve({
				paragraphs: [],
				hints: []
			})
		})
	}


	/* UPDATE FUNCTIONS */

	newWebParagraph(badText, improvedText, hintTags) {
		return new Promise((resolve, reject) => {
			console.log('NEW_WEB_PARAGRAPH')
			let date = new Date()
			let paragraph = {
				id: String(date.getTime()), // pseudo-id
				badText: badText,
				improvedText: improvedText,
				hintTags: hintTags
			}
			resolve(paragraph)
		})
	}

	updateDeviceParagraph(p) {
		return new Promise((resolve, reject) => {
			console.log('UPDATE_DEVICE_PARAGRAPH')
			resolve(p)
		})
	}

	updateWebParagraph(p) {
		return new Promise((resolve, reject) => {
			console.log('UPDATE_WEB_PARAGRAPH')
			resolve(p)
		})
	}

	deleteParagraph(p) {
		return new Promise((resolve, reject) => {
			console.log('DELETE_PARAGRAPH')
			resolve(p)
		})
	}

	newHint(text) {
		return new Promise((resolve, reject) => {
			console.log('NEW_HINT')

			// resolves with hint object appropriate for state
			let hint = {
				text: text
			}
			resolve(hint)
		})
	}

	updateHint(h) {
		return new Promise((resolve, reject) => {
			console.log('UPDATE_HINT')
			resolve(h)
		})
	}

	deleteHint(h) {
		return new Promise((resolve, reject) => {
			console.log('DELETE_HINT')
			resolve(h)
		})
	}

}