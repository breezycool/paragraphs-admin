/* Backend Factory
*  NOTE: all methods return promises.
*/
import Promise from 'bluebird'
import Parse from 'parse/node'

let Hint = Parse.Object.extend('Hint')
let WebParagraph = Parse.Object.extend('WebParagraph')
let DeviceParagraph = Parse.Object.extend('DeviceParagraph')

var allParagraphs = new Parse.Query(WebParagraph)
var allDeviceParagraphs = new Parse.Query(DeviceParagraph)
var allHints = new Parse.Query(Hint)

//helper functions! these are used inside the backend class only, so I seperated them from the class.
//also calling this.func inside another func doesn't work for some reason...
//maybe this is dumb but it works well and I think it is clear enough.

const deleteDeviceParagraph = (pid) => {
	return new Promise((resolve, reject) => {
		allDeviceParagraphs.equalTo("pid", pid);
		allDeviceParagraphs.find({
		  success: function(dp) {
		    for (var i = 0; i < dp.length; i++) {
		         var object = dp[i];
		         resolve(object.destroy({}));
		       }
		  },
		  error: function(error) {
		    reject(error)
		  }
		});
	})
	/* end of promise */
}

const setWebParagraphPushed = (id) => {
	return new Promise((resolve, reject) => {
		allParagraphs.get(id, {
		  success: function(pParse) {
		    // The object was retrieved successfully.
		    resolve(
		    	pParse.save({
					isPushed: true
					})
		    	)
		  },
		  error: function(object, error) {
		    // The object was not retrieved successfully.
		    // error is a Parse.Error with an error code and description.
		    reject(error)
		  }
		})
	})
}

const updateDeviceParagraph = (p, badText, improvedText, hintTags) => {
	return new Promise((resolve, reject) => {

		allDeviceParagraphs.equalTo("pid", p.id);
		allDeviceParagraphs.find({
		  success: function(dp) {
		    for (var i = 0; i < dp.length; i++) {
		         var object = dp[i];
		         resolve(object.save({
						badText: badText,
						improvedText: improvedText,
						hintTags: hintTags
						}));
		       }
		  },
		  error: function(error) {
		    reject(error)
		  }
		});
	})
}

const sendPushNotification = (preview) => {
	return new Promise((resolve, reject) => {
		var query = new Parse.Query(Parse.Installation);

		Parse.Cloud.run("sendPushParagraph", { message:"quantity1"}).then(function(result) {
		    // make sure the set the enail sent flag on the object
		}, function(error) {
		    // error
		    console.log(error)
		});
	})
}

export default class Backend {

	constructor() {
		/* DAN'S PARSE CREDS */
		// Parse.initialize(
		// 	"m8EbyLxgYzVkpaNHxh0ogbJGxmS3uIeVR0bgRQ00",
		// 	"A6PibBkhqENC4CJ6hZm9N6kF6Y0yntUEV5oXHmdV"
		// )
		/* LACHIE'S PARSE CREDS */
		Parse.initialize(
		  "JTzeb9lwh9OMmMGLCjoidN8dSQPMp2Tjsqum74xe",
		  "E63eAFbKAaIAnWidg1HpHt50Xc2ALikXUIzscoI6"
		);

	}

	newWebParagraph(badText, improvedText, hintTags) {
		let newParagraph = new WebParagraph();

		return new Promise((resolve, reject) => {

			newParagraph.save({
			badText: badText,
			improvedText: improvedText,
			hintTags: hintTags
			}).then(function(newParagraph) {
				resolve({id: newParagraph.id,
						 badText: newParagraph.get('badText'),
						 improvedText: newParagraph.get('improvedText'),
						 hintTags: newParagraph.get('hintTags')})
			}, function(error) {
			    reject(error)
			});
		})
	}

	newDeviceParagraph(id, badText, improvedText, hintTags) {
		let newDParagraph = new DeviceParagraph();

		return new Promise((resolve, reject) => {

			newDParagraph.save({
			pid: id,
			badText: badText,
			improvedText: improvedText,
			hintTags: hintTags
			}).then(function(newDParagraph) {
				sendPushNotification(badText)
				resolve(setWebParagraphPushed(id))
			}, function(error) {
			    reject(error)
			});
		})
	}



	updateWebParagraph(p, badText, improvedText, hintTags) {
		return new Promise((resolve, reject) => {

			allParagraphs.get(p.id, {
			  success: function(pParse) {
			    // The object was retrieved successfully.
			    //if paragraph is pushed update relevant device paragraph
			    if(pParse.get("isPushed"))
			    	{updateDeviceParagraph(p, badText, improvedText, hintTags)}

			    resolve(
			    	pParse.save({
						badText: badText,
						improvedText: improvedText,
						hintTags: hintTags
						})
			    	)
			  },
			  error: function(object, error) {
			    // The object was not retrieved successfully.
			    // error is a Parse.Error with an error code and description.
			    reject(error)
			  }
			})
		})
	}

	deleteParagraph(id) {
		return new Promise((resolve, reject) => {
			allParagraphs.get(id, {
			  success: function(p) {
			    // The object was retrieved successfully.
			    if(p.get('isPushed'))
			    //also delete device paragraph if webParagraph is pushed. matches to appropriate paragraph with pid.
			    {deleteDeviceParagraph(id)}
			    resolve(p.destroy({}));
			  },
			  error: function(object, error) {
			    // The object was not retrieved successfully.
			    // error is a Parse.Error with an error code and description.
			    reject(error)
			  }
			})
		})
		/* end of promise */
	}

	newHint(text) {
		return new Promise((resolve, reject) => {

			let newHint = new Hint();

			// resolves with hint object appropriate for state
			let hint = {
				text: text
			}
			newHint.save(hint).then(function() {
				resolve({text: text})
			}, function(error) {
			    reject(error)
			});
		})
	}

	updateHint(h, text) {
		return new Promise((resolve, reject) => {

			allHints.get(h.id, {
			  success: function(hParse) {
			    // The object was retrieved successfully.
			    resolve(
			    	hParse.save({
						text: text
						})
			    	)
			  },
			  error: function(object, error) {
			    // The object was not retrieved successfully.
			    // error is a Parse.Error with an error code and description.

			    reject(error)
			  }
			})
		})
	}

	deleteHint(h) {
		return new Promise((resolve, reject) => {

			allHints.get(h.id, {
			  success: function(h) {
			    // The object was retrieved successfully.
			    resolve(h.destroy({}));
			  },
			  error: function(object, error) {
			    // The object was not retrieved successfully.
			    // error is a Parse.Error with an error code and description.
			    reject(error)
			  }
			})
		})
	}
	/* getStateFromParse */
	/* ******************************************** */
	getStateFromParse() {

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

	        let hintTags = p.get('hintTags')

	        return {
	          id: p.id,
	          badText: p.get('badText'),
	          improvedText: p.get('improvedText'),
	          isBadText: true,
	          isEditing: false,
	          hintTags: hintTags,
	          isPushed: p.get('isPushed')
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

	// NOTE: catch for Promises doesn't work.
	login(username, password) {
		return new Promise((resolve, reject) => {
		  Parse.User.logIn(username, password).then(
		    success => {
			return this.getStateFromParse()
		    },
		    error => reject(error.message)
		  ).then(state => {
		  	resolve(state)
		  })
		})
	}



}