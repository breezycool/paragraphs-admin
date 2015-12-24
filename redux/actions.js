export const TOGGLE_EDIT = 'TOGGLE_EDIT'

export const toggleEdit = (isEditing) => {
	return {
		type: TOGGLE_EDIT,
		payload: isEditing
	}
}