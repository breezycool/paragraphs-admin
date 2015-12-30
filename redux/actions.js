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
	return {
		type: SAVE_HINT_TAGS,
		id: id,
		hints: hints // expect array
	}
}


/* hints reducer */
/* ************* */
export const ADD_HINTS = 'ADD_HINTS'
export const TOGGLE_HINT_EDIT = 'TOGGLE_HINT_EDIT'
export const SAVE_HINT_TEXT = 'SAVE_HINT_TEXT'
export const REMOVE_HINT = 'REMOVE_HINT'

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

export const removeHint = (id) => {
	return {
		type: REMOVE_HINT,
		id: id
	}
}