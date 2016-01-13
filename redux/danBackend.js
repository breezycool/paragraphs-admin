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
		  Parse.User.logIn(username, password).then(
		    success => {
		     return getStateFromParse()
		    }
		  ).then(state => resolve(state))
		  .catch(error => reject(error))
		})
	}

	/* getStateFromParse */
	/* ******************************************** */
	getStateFromParse() => {
	  var allParagraphs = new Parse.Query(Paragraph)
	  var allHints = new Parse.Query(Hint)

	  return new Promise((resolve, reject) => {

	    let server = {}

	    allHints.find().then((serverHints) => {
	      server.hints = serverHints
	      return allParagraphs.find()

	    }).then((serverParagraphs) => {
	      server.paragraphs = serverParagraphs
	      return server

	    }).then((success) => {
	      // transform hints
	      let hints = server.hints.map(h => {
	        return {
	          id: h.id,
	          text: h.get('text'),
	          isEditing: false
	        }
	      })
	      // transform paragraphs
	      let paragraphs = server.paragraphs.map(p => {

	        let hintTags = p.get('hints')
	        if (hintTags[0] != null) {
	          console.log(hintTags)
	          hintTags.map(hintId => {
	            let releventHint = hints.filter(h => (h.id == hintId))[0] // there should always only be one
	            console.log(relevantHint)
	            return releventHint.text
	          })
	        }
	        else {
	          hintTags = []
	        }

	        return {
	          id: p.id,
	          badText: p.get('badText'),
	          improvedText: p.get('improvedText'),
	          isBadText: p.get('isBadText'),
	          isEditing: false,
	          hintTags: hintTags
	        }
	      })
	      // transform to state
	      let state = {
	        hints: hints,
	        paragraphs: paragraphs
	      }
	      resolve(state)
	    }, (error) => {
	      // error
	      resolve( "ERROR: "+error)
	    })
	  })

	}
	/* ******************************************** */

}