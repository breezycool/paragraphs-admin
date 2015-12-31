import thunk from 'redux-thunk'

/* paragraphs reducer */
/* ****************** */
export const TOGGLE_EDIT = 'TOGGLE_EDIT'
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

export const saveText = (text, id) => {
	return {
		type: SAVE_TEXT,
		text: text,
		id: id
	}
}

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
export const SAVE_HINT_TEXT = 'SAVE_HINT_TEXT'

export const addHints = (hints) => {
	return {
		type: ADD_HINTS,
		hints: hints
	}
}

export const toggleHintEdit = (id) => {
	return {
		type: TOGGLE_HINT_EDIT,
		id: id
	}
}

export const saveHintText = (text, id) => {
	return {
		type: SAVE_HINT_TEXT,
		text: text,
		id: id
	}
}

/* hints and paragraphs together */
/* ***************************** */
export const HARD_DELETE_HINT = 'HARD_DELETE_HINT'

export const hardDeleteHint = (hint) => {
	return {
		type: HARD_DELETE_HINT,
		hint: hint
	}
}



/* server reducer */
/* ************* */
export const SAVE_REQUEST = 'SAVE_REQUEST'
export const SAVE_SUCCESS = 'SAVE_SUCCESS'
export const SAVE_ERROR = 'SAVE_ERROR'

import {postStateToParse} from './parseHTTP'

export const saveRequest = () => {
	// thunk syntax
	return ((dispatch, getState) => {
		postStateToParse(getState()).then(
			saved => dispatch({type: SAVE_SUCCESS}),
			error => dispatch({type: SAVE_ERROR, error: error})
		)
	})
}
