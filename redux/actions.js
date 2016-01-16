
import thunk from 'redux-thunk'
import Promise from 'bluebird'
import Backend from './backend'

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

export const USER_ERROR = 'USER_ERROR'
export const userError = (error) => {
	return {
		type: USER_ERROR,
		error
	}
}

export const RESET_STATUS = 'RESET_STATUS'
export const resetStatus = () => {
	return {
		type: RESET_STATUS
	}
}

export const RESET_ERROR = 'RESET_ERROR'
export const resetError = () => {
	return {
		type: RESET_ERROR
	}
}

/* *************************** */

/* backend actions */
/* *************************** */

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const login = (username, password) => {
	return dispatch => {
		// loginToParse
		theBackend.login(username,password).then(state => {
			return dispatch({
				type: LOGIN_SUCCESS,
				state: state
			})
		}).catch(error => {
			return dispatch({
				type: LOGIN_ERROR,
				error: error
			})
		})
	}
}

export const pushParagraph = (index) => {
	return ((dispatch, getState) => {
		const state = getState()
		const p = state.paragraphs[index]

		theBackend.newDeviceParagraph(p.id, p.badText, p.improvedText, p.hintTags)
		.then(success => {
			dispatch(setParagraphPushed(index))
		}).catch(error => dispatch(serverError(error)))
	})
}

// export const pushParagraph = (index) => {
// 	return dispatch => {
// 		dispatch(setParagraphPushed())
// 	}
// }

// just save a new paragraph.
export const saveNewParagraph = (badText, improvedText, hintTags) => {
	return (dispatch => {
		theBackend.newWebParagraph(badText, improvedText, hintTags)
		.then(savedP => {
			dispatch(
				addParagraph(
					savedP.id,
					savedP.badText,
					savedP.improvedText,
					savedP.hintTags
				)
			)
		}).catch(error => dispatch(serverError(error)))
	})
}

// HELPER : return an array with hintTags listed in hintTags that
// are not already in state.
const getNewHintTags = (hintTags, state) => {
	let hintNamesInState = state.hints.map(h => h.text)
	return hintTags.filter(tag => {
		return hintNamesInState.indexOf(tag) == -1
	})
}

export const saveParagraph = (index, badText, improvedText, hintTags) => {
	return ((dispatch, getState) => {
		let state = getState()

		const p = state.paragraphs[index]

		// check for new hints in hintTags
		let newHintTags = getNewHintTags(hintTags, state)

		// save new Hints in Backend,
		// update WebParagraph,
		// update DeviceParagraph if pushed,
		// flush new state to app
		Promise.all(newHintTags.map((hintTag) => {
			// NOTE: need to curry this function bc redux-thunk
			// doesn't seem to be working properly.
			return dispatch(saveNewHint(hintTag))
		})).then(success => {
			return theBackend.updateWebParagraph(p, badText, improvedText, hintTags)
		}).then(paragraph => {
			dispatch([
				updateParagraphText(badText, index, 'badText'),
				updateParagraphText(improvedText, index, 'improvedText'),
				updateHintTags(parseInt(index), hintTags),
			])

			// NOTE: slightly convoluted logic here, but it works.
			if (paragraph.isPushed) {
				return theBackend.updateDeviceParagraph(paragraph).then(
					success => dispatch(serverSuccess()),
					error      => dispatch(serverError(error))
				)
			}
			else {
				return dispatch(serverSuccess())
			}
		})
		.catch(error => dispatch(serverError(error)))
	})
}

// just save a new hint.
export const saveNewHint = (text) => {
	return ((dispatch) => {
		theBackend.newHint(text).then(savedHint => {
			dispatch(updateHints([savedHint.text]))
		}).catch(error => dispatch(serverError(error)))
	})
}

// TODO: check that hint with same text doesn't already exist
// in state (excluding current hint).
export const saveHint  = (index, text) => {
	return ((dispatch, getState) => {
		let state = getState()
		const oldHintText = state.hints[index].text

		state.hints.forEach((h) => {
			if (h.text == text) dispatch(userError('hint already exists'))
		})

		// NOTE: need to update the state with this hint before
		// calling saveParagraph, so that saveParagraph does
		// not think there are any new hints to create.
		dispatch(updateHintText(oldHintText, text, index))

		state = getState()
		let hint = state.hints[index]

		// update Hint in Backend,
		// update each Paragraph with Hint as tag in Backend, flushing to state after each.
		theBackend.updateHint(hint, text).then(hint => {
			return Promise.all(state.paragraphs.map((p, pIndex) => {
				if (p.hintTags.includes(oldHintText)) {

					let modifiedHintTags = p.hintTags.map(tag => {
						return (tag == oldHintText) ? text : tag
					})

					// NOTE: this dispatches before saveSuccess....
					return dispatch([
						saveParagraph(pIndex, p.badText, p.improvedText, modifiedHintTags),
						dispatch(updateHintTags(pIndex, modifiedHintTags))
					])
				} else {
					return
				}
			}))
		}).catch(error => dispatch(serverError(error)))
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

		// save each Paragraph to Backend without Hint tag,
		// delete Hint from Backend,
		// flush changes to state.
		Promise.all(state.paragraphs.map((p, pIndex) => {
			if (p.hintTags.includes(hint.text)) {
				let newHintTags = p.hintTags.filter(ht => ht != hint.text)
				return dispatch(saveParagraph(pIndex, p.badText, p.improvedText, newHintTags))
			} else {
				return
			}
		})).then(success => {
			return theBackend.deleteHint(hint)
		}).then(success => {
			return dispatch(removeHint(index))
		}).catch(error => dispatch(serverError(error)))
	})
}

/* ************************* */

// import {
// 	getStateFromParse,
// 	postStateToParse,
// 	loginToParse,
// 	removeParagraphFromParse,
// 	removeHintFromParse
// } from './parseHTTP'



// export const login = (username, password) => {
// 	return ((dispatch) => {
// 		loginToParse(username, password).then(
// 			success => dispatch(loadFromServer()),
// 			error   => dispatch({type: LOGIN_ERROR, error: error.message})
// 		)
// 	})
// }

// export const loadFromServer = () => {
// 	return ((dispatch) => {
// 		return getStateFromParse().then(
// 			state => dispatch({type: LOGIN_SUCCESS, state: state}),
// 			error => dispatch({type: LOGIN_ERROR})
// 		)
// 	})
// }

// export const saveToServer = () => {
// 	// thunk syntax
// 	return ((dispatch, getState) => {
// 		let state = getState()
// 		postStateToParse(state).then(
// 			saved => dispatch({type: SAVE_SUCCESS}),
// 			error => dispatch({type: SAVE_ERROR, error: error})
// 		)
// 	})
// }
