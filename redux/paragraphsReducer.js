import {TOGGLE_EDIT, SAVE_TEXT, ADD_PARAGRAPH, REMOVE_PARAGRAPH} from './actions'

/* paragraph reducer */
const paragraphInitialState = {
	isEditing: false,
	text: "Type some text here..."
}

const paragraph = (state = paragraphInitialState, action) => {
	switch(action.type) {
	case TOGGLE_EDIT:
		return Object.assign({}, state, {
			isEditing: !state.isEditing
		})
	case SAVE_TEXT:
		return Object.assign({}, state, {
			text: action.text
		})
	default:
		return state
	}
}

const defaultAction = {type: "default"}
// dummy data; set to an empty list for realz
const initialState = [
	{id: 0, paragraph: paragraph({isEditing: false,text: "my study of history is falling apart. i haven’t concerned myself with it since i was kicked out of st johns for sleeping in the library. i haven’t been able to bring myself to be concerned with it through the web. i spend most of my day looking through this screen, trying to find something worthwhile, and looking for history online seems distracted from what history is supposed to stand for; a referential tomb, for authority of thought and practice."}, defaultAction)},
	{id: 1, paragraph: paragraph({isEditing: false,text: "in where i find myself financially, i ought not to buy history books. i visited the vatican museums with coworkers earler today, and was inadvertently reprimanded by our boss and tour guide for prioritising atmospheric humour atop of the legitimate study of authoritative art. i think i have faith in the cards i played; but this could well be because i don’t know as much about art as my coworkers. reductive humour may be my ego’s appeal to inferior knowledge. with the piece of mind i have of theirs, it is hard to be persuaded by inanimate statues, no matter how naturalised are their opposite limbs. how can coffee with deceptive me be less dynamic than a ruptured torso?"}, defaultAction)},
	{id: 2, paragraph: paragraph({isEditing: false,text: "my study of history is falling apart. i have taken to re-reading chapters, and meditating in a moving bathroom to avoid the train’s ticket officer. i am reading about a new immobile model-view-controller approach, renovating the design of large-scale applications by reconceptualising dom insertions, deletes and updates as a complete re-rendering of the application state. as far as i can tell, this has nothing to do with the expansion of civilisation in southern asia. the perspective from which we as the reader know that jon snow must be some sort of metamorph, to inhabit ghost’s habits as he sleeps, and yet cannot know that his brother brandon is still alive, in the coat and fur of his own direwolf, also cannot be said to be history. the monuments in the vatican museum are the closest that i have come to studying history, but i laughed and longed for food through most of that walking."}, defaultAction)},

]

export const paragraphs = (state = initialState, action) => {
	let newState = []
	switch(action.type) {
	case TOGGLE_EDIT:
		newState = state.slice()
		newState[action.id] = {
			id: parseInt(action.id),
			paragraph: paragraph(state[action.id].paragraph, action)
		} 
		return newState

	case SAVE_TEXT:
		newState = state.slice()
		newState[action.id] = {
			id: parseInt(action.id),
			paragraph: paragraph(state[action.id].paragraph, action)
		} 
		return newState

	case ADD_PARAGRAPH:
		newState = state.slice()
		newState.push({
			id: state.length,
			paragraph: paragraph(undefined, defaultAction)
		}) 
		return newState

	case REMOVE_PARAGRAPH:
		newState = state.slice()
		newState.splice(action.id, 1) 
		return newState

	default:
		return state
	}
}

// paragraph(state[action.id].paragraph, action)
// state[action.id].paragraph