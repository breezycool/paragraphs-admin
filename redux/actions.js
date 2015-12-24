export const TOGGLE_EDIT = 'TOGGLE_EDIT'
export const SAVE_TEXT = 'SAVE_TEXT'

export const toggleEdit = () => {
	return {
		type: TOGGLE_EDIT
	}
}

export const saveText = (text) => {
	return {
		type: SAVE_TEXT,
		text: text
	}
}