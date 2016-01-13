/* Backend Factory
*  NOTE: all methods return promises.
*/
import Promise from 'bluebird'
import Parse from 'parse/node'

export default class Backend {

	constructor() {
		Parse.initialize(
			"tkaxaYALkFGuXoLebRyjGU6zxTV7Yswz7Y04zWG1",
			"KVCwYVJhND1pfaE1lu8tT1Pe3MStpeqHyaevzttj"
		)
		let Hint = Parse.Object.extend('Hint')
		let WebParagraph = Parse.Object.extend('WebParagraph')
		let DeviceParagraph = Parse.Object.extend('DeviceParagraph')
	}

	updateDeviceParagraph(p) {
		return new Promise((resolve, reject) => {
			// TODO: parse
			resolve(p)
		})
	}

	updateWebParagraph(p) {
		return new Promise((resolve, reject) => {
			// TODO: parse
			resolve(p)
		})
	}

	deleteParagraph(p) {
		return new Promise((resolve, reject) => {

			let webParagraph = new WebParagraph()
			webParagraph.set('id', id)

			webParagraph.destroy().then(() => {
				return new DeviceParagraph()
			}).then((deviceParagraph) => {
				deviceParagraph.set('id', id)

				if (p.isPushed) return deviceParagraph.destroy()
				else { return p }
			}).then((destroyedParagraph) => {
				resolve(destroyedParagraph)
			}).catch(
				error => reject(error)
			)

		})
		/* end of promise */
	}

	deleteHint(h) {
		return new Promise((resolve, reject) => {
			// TODO: parse
			resolve(h)
		})
	}

	login(username, password) => {
		return new Promise((resolve, reject) => {
			// TODO: parse
			resolve(username)
		})
	}

}