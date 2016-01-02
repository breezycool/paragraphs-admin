import thunk from 'redux-thunk'

/* paragraphs reducer */
/* ****************** */
export const TOGGLE_EDIT = 'TOGGLE_EDIT'
export const TOGGLE_PARAGRAPH_TYPE = 'TOGGLE_PARAGRAPH_TYPE'
export const SAVE_TEXT = 'SAVE_TEXT'
export const ADD_PARAGRAPH = 'ADD_PARAGRAPH'
export const REMOVE_PARAGRAPH = 'REMOVE_PARAGRAPH'
export const SAVE_HINT_TAGS = 'SAVE_HINT_TAGS'

export const toggleEdit = (id) => {
	return {
		type: TOGGLE_EDIT,
		id: id
	}
}

export const toggleParagraphType = (id) => {
	return {
		type: TOGGLE_PARAGRAPH_TYPE,
		id
	}
}

export const saveText = (text, id) => {
	return { // improvedText
		type: SAVE_TEXT,
		text: text,
		id: id
	}
}

// NOTE: probably don't actually want zombie nouns
export const addParagraph = () => {
	return {
		type: ADD_PARAGRAPH
	}
}

export const removeParagraph = (id) => {
	return {
		type: REMOVE_PARAGRAPH,
		id: id
	}
}

export const saveHintTags = (id, hints) => {
	// filter duplicates in hint sent to reducer
	function onlyUnique(value, index, self) {
		return self.indexOf(value) === index;
	}

	return {
		type: SAVE_HINT_TAGS,
		id: id, // of current paragraph
		hints: hints.filter(onlyUnique) // expect array of strings
	}
}


/* hints reducer */
/* ************* */
export const ADD_HINTS = 'ADD_HINTS'
export const TOGGLE_HINT_EDIT = 'TOGGLE_HINT_EDIT'

export const addHints = (hints) => {

	function onlyUnique(value, index, self) {
		return self.indexOf(value) === index;
	}

	return {
		type: ADD_HINTS,
		hints: hints.filter(onlyUnique)
	}
}

export const toggleHintEdit = (id) => {
	return {
		type: TOGGLE_HINT_EDIT,
		id: id
	}
}

/* hints and paragraphs together */
/* ***************************** */
export const HARD_DELETE_HINT = 'HARD_DELETE_HINT'
export const SAVE_HINT_TEXT = 'SAVE_HINT_TEXT'

export const hardDeleteHint = (hint) => {
	return {
		type: HARD_DELETE_HINT,
		hint: hint
	}
}

export const saveHintText = (oldText, text, id) => {
	return {
		type: SAVE_HINT_TEXT,
		text,
		oldText,
		id
	}
}



/* server reducer */
/* ************* */
export const SAVE_SUCCESS = 'SAVE_SUCCESS'
export const SAVE_ERROR = 'SAVE_ERROR'
export const LOAD_SUCCESS = 'LOAD_SUCCESS'
export const LOAD_ERROR = 'LOAD_ERROR'

import {getStateFromParse, postStateToParse, loginToParse} from './parseHTTP'

export const login = (username, password) => {
	return ((dispatch) => {
		loginToParse(username, password).then(
			success => dispatch(loadFromServer()),
			error   => dispatch({type: LOAD_ERROR, error: error})
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

export const saveRequest = () => {
	// thunk syntax
	return ((dispatch, getState) => {
		let state = getState()
		postStateToParse(state).then(
			saved => dispatch({type: SAVE_SUCCESS}),
			error => dispatch({type: SAVE_ERROR, error: error})
		)
	})
}
