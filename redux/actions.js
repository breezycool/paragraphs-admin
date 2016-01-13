
import thunk from 'redux-thunk'
import Promise from 'bluebird'
import Backend from './backend_mock'

let theBackend = new Backend()

/* synchronous actions */
/* *************************** */

export const TOGGLE_PARAGRAPH_EDIT = 'TOGGLE_PARAGRAPH_EDIT'
export const toggleParagraphEdit = (index) => {
	return {
		type: TOGGLE_PARAGRAPH_EDIT,
		index
	}
}

export const TOGGLE_PARAGRAPH_TEXT_TYPE = 'TOGGLE_PARAGRAPH_TEXT_TYPE'
export const toggleParagraphTextType = (index) => {
	return {
		type: TOGGLE_PARAGRAPH_TEXT_TYPE,
		index
	}
}

export const SET_PARAGRAPH_PUSHED = 'SET_PARAGRAPH_PUSHED'
export const setParagraphPushed = (index) => {
	return {
		type: SET_PARAGRAPH_PUSHED,
		index
	}
}

export const UPDATE_PARAGRAPH_TEXT = 'UPDATE_PARAGRAPH_TEXT'
export const updateParagraphText = (text, index, textType) => {
	return({
		type: UPDATE_PARAGRAPH_TEXT,
		text: text,
		index: index,
		textType: textType
	})
}

export const UPDATE_HINT_TAGS = 'UPDATE_HINT_TAGS'
export const updateHintTags = (paragraphIndex, hintTags) => {

	function onlyUnique(value, index, self) {
		return self.indexOf(value) === index;
	}

	return {
		type: UPDATE_HINT_TAGS,
		paragraphIndex: paragraphIndex, // of current paragraph
		hintTags: hintTags.filter(onlyUnique) // expect array of strings
	}
}

export const ADD_PARAGRAPH = 'ADD_PARAGRAPH'
export const addParagraph = (id, badText, improvedText, hintTags) => {
	return({
		type: ADD_PARAGRAPH,
		id,
		badText,
		improvedText,
		hintTags
	})
}

export const REMOVE_PARAGRAPH = 'REMOVE_PARAGRAPH'
export const removeParagraph = (index) => {
	return ({
		type: REMOVE_PARAGRAPH,
		index
	})
}

export const TOGGLE_HINT_EDIT = 'TOGGLE_HINT_EDIT'
export const toggleHintEdit = (index) => {
	return {
		type: TOGGLE_HINT_EDIT,
		index
	}
}

export const UPDATE_HINT_TEXT = 'UPDATE_HINT_TEXT'
export const updateHintText = (oldText, text, index) => {
	return {
		type: UPDATE_HINT_TEXT,
		oldText,
		text,
		index
	}
}

export const UPDATE_HINTS = 'UPDATE_HINTS'
export const updateHints = (hintTags) => {

	// remove duplicates in array
	function onlyUnique(value, index, self) {
		return self.indexOf(value) === index;
	}

	return {
		type: UPDATE_HINTS,
		hintTags: hintTags.filter(onlyUnique)
	}
}

export const REMOVE_HINT = 'REMOVE_HINT'
export const removeHint = (index) => {
	return ({
		type: REMOVE_HINT,
		index: parseInt(index)
	})
}

/* *************************** */

/* error actions */
/* *************************** */
export const SERVER_SUCCESS = 'SERVER_SUCCESS'
export const serverSuccess = () => {
	return {
		type: SERVER_SUCCESS
	}
}

export const SERVER_ERROR = 'SERVER_ERROR'
export const serverError = (error) => {
	return {
		type: SERVER_ERROR,
		error
	}
}
/* *************************** */

/* asynchronous actions HOPEFULLY UNNECESSARY ACTIONS, ALL TRAFFIC THROUGH saveParagraph. */
/* *************************** */

// export const saveParagraphText = (text, index, textType) => {
// 	return ((dispatch, getState) => {
// 		let state = getState()
// 		let p = state.paragraphs[index]

// 		let badText
// 		let improvedText
// 		if (textType == 'badText') {
// 			badText = text
// 			improvedText = p.improvedText
// 		} else { // textType == 'improvedText'
// 			badText = p.badText
// 			improvedText = text
// 		}

// 		saveParagraph(index, badText, improvedText, p.hintTags)
// 		.then(success => {
// 			updateParagraphText(text, index, textType)
// 		}).catch((error) => {
// 			dispatch(serverError(error))
// 		})
// 	})
// }

// export const saveHintTags = (paragraphIndex, hintTags) => {
// 	return ((dispatch, getState) => {
// 		dispatch(updateHintTags(paragraphIndex, hintTags))
// 	})
// }

// export const saveHintText = (oldText, text, index) => {
// 	// TODO: update to include saveParagraph
// 	// TODO: update to pass error:
// 	// 			if a hint text already exists in current state (not including this hint)
// 	return (dispatch, getState) => {
// 		dispatch(updateHintText(oldText, text, index))
// 	}
// }

/* *************************** */

/* backend actions */
/* *************************** */
export const pushParagraph = (index) => {
	return ((dispatch, getState) => {
		const state = getState()
		const p = state.paragraphs[index]

		theBackend.updateDeviceParagraph(p).then(
			success => setParagraphPushed(index),
			error      => serverError(error)
		)
	})
}

export const saveParagraph = (index, badText, improvedText, hintTags) => {
	return ((dispatch, getState) => {
		let state = getState()

		// if paragraph doesn't exist, add it and update state
		// NOTE: this is a bit messy
		if (Object.keys(state.paragraphs).indexOf(String(index)) == -1) {
			dispatch(addParagraph(state.paragraphs.length, badText, improvedText, hintTags))
			state = getState()
		}

		const p = state.paragraphs[index]


		// NOTE: slightly convoluted logic here, but it works.
		theBackend.updateWebParagraph(p).then(
			paragraph => {

				const sendActions = () => {
					return [
						updateParagraphText(badText, index, 'badText'),
						updateParagraphText(improvedText, index, 'improvedText'),
						updateHintTags(parseInt(index), hintTags),
						updateHints(hintTags)
					]
				}

				dispatch(sendActions())

				if (paragraph.isPushed) {
					theBackend.updateDeviceParagraph(paragraph).then(
						success => dispatch(serverSuccess()),
						error      => dispatch(serverError(error))
					)
				}
				else {
					dispatch(serverSuccess())
				}
			}
		).catch(
			error => serverError(error)
		)
	})
}

export const saveHint  = (index, text) => {
	return ((dispatch, getState) => {
		let state = getState()
		let hint = state.hints[index]

		theBackend.updateHint(hint).then(
			hint => {

				const sendActions = () => {
					return [
						// SIAMO QUI: abstracting all of updateHints and updateHintTags to saveHint here.
					]
				}
			}
		)
	})
}

export const deleteParagraph = (index) => {
	return ((dispatch, getState) => {
		const state = getState()
		const p = state.paragraphs[index]

		// checking for hint in state
		if (p == undefined) {
			dispatch(serverError('You can\'t delete that hint--it doesn\'t exist...'))
			return
		}

		// ids that come from Backend are strings, new ids are integers.
		if (typeof p.id === 'string') {
			theBackend.deleteParagraph(p.id).then(
				success => {
					dispatch(removeParagraph(index))
				},
				// TODO: this save error is maybe not handled in UI
				error => {
					dispatch(serverError(error))
				}
			)
		} else {
			// NOTE: repeated code to eliminate need to abstract promise into another function
			dispatch(removeParagraph(index))
		}
	})
}

export const DELETE_HINT = 'DELETE_HINT'
export const deleteHint = (index) => {
	return ((dispatch, getState) => {

		let state = getState()
		let hint = state.hints[index]

		Promise.each(state.paragraphs, (p) => {
			let newHintTags = p.hintTags.filter(ht => ht != hint.text)
			dispatch(saveHintTags(p.id, newHintTags))
		}).then(success => {
			return theBackend.deleteHint(hint)
		}).then(success => {
			dispatch(removeHint(index))
			return getState()
		}).catch(error => {
			dispatch(serverError(error))
			throw new Error()
		})
	})
}

/* ************************* */


/* server reducer */
/* ************* */
export const SAVE_SUCCESS = 'SAVE_SUCCESS'
export const SAVE_ERROR = 'SAVE_ERROR'
export const LOAD_SUCCESS = 'LOAD_SUCCESS'
export const LOAD_ERROR = 'LOAD_ERROR'
export const RESET_STATUS = 'RESET_STATUS'
export const RESET_ERROR = 'RESET_ERROR'

export const resetStatus = () => {
	return {
		type: RESET_STATUS
	}
}

export const resetError = () => {
	return {
		type: RESET_ERROR
	}
}

import {
	getStateFromParse,
	postStateToParse,
	loginToParse,
	removeParagraphFromParse,
	removeHintFromParse
} from './parseHTTP'


export const login = (username, password) => {
	return ((dispatch) => {
		loginToParse(username, password).then(
			success => dispatch(loadFromServer()),
			error   => dispatch({type: LOAD_ERROR, error: error.message})
		)
	})
}

export const loadFromServer = () => {
	return ((dispatch) => {
		getStateFromParse().then(
			state => dispatch({type: LOAD_SUCCESS, state: state}),
			error => dispatch({type: LOAD_ERROR})
		)
	})
}

export const saveToServer = () => {
	// thunk syntax
	return ((dispatch, getState) => {
		let state = getState()
		postStateToParse(state).then(
			saved => dispatch({type: SAVE_SUCCESS}),
			error => dispatch({type: SAVE_ERROR, error: error})
		)
	})
}
