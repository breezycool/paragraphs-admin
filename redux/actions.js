export const TOGGLE_EDIT = 'TOGGLE_EDIT'
export const SAVE_TEXT = 'SAVE_TEXT'

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