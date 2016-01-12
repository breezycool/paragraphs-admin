
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

// TODO: update to include saveParagraph
export const SAVE_PARAGRAPH_TEXT = 'SAVE_PARAGRAPH_TEXT'
export const saveParagraphText = (text, id, textType) => {
	return { // improvedText
		type: SAVE_PARAGRAPH_TEXT,
		text: text,
		id: id,
		textType: textType
	}
}

// TODO: update to include saveParagraph
export const SAVE_HINT_TAGS = 'SAVE_HINT_TAGS'
export const saveHintTags = (paragraphId, hintTags) => {

	// filter duplicates in hint sent to reducer
	function onlyUnique(value, index, self) {
		return self.indexOf(value) === index;
	}

	return {
		type: SAVE_HINT_TAGS,
		paragraphId: paragraphId, // of current paragraph
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

// TODO: update to include saveParagraph
export const SAVE_HINT_TEXT = 'SAVE_HINT_TEXT'
export const saveHintText = (oldText, text, id) => {
	return {
		type: SAVE_HINT_TEXT,
		oldText,
		text,
		id
	}
}

export const ADD_HINTS = 'ADD_HINTS'
export const addHints = (hintTags) => {

	// remove duplicates in array
	function onlyUnique(value, index, self) {
		return self.indexOf(value) === index;
	}

	// TODO: check whether hints exist in state, and add to Parse if they don't
	return {
		type: ADD_HINTS,
		hintTags: hintTags.filter(onlyUnique)
	}
}

export const REMOVE_HINT = 'REMOVE_HINT'
export const removeHint = (index) => {
	return ({
		type: REMOVE_HINT,
		index
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

/* asynchronous actions */
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
				dispatch([
					saveParagraphText(badText, paragraph.id, 'badText'),
					saveParagraphText(improvedText, paragraph.id, 'improvedText'),
					saveHintTags(paragraph.id, hintTags),
					addHints(hintTags),
				])

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
			saveParagraph(p.id, p.badText, p.improvedText, newHintTags)
				.catch(error => dispatch(serverError(error)))
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
