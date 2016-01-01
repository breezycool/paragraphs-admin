import {TOGGLE_EDIT, TOGGLE_PARAGRAPH_TYPE, SAVE_TEXT, ADD_PARAGRAPH,
	REMOVE_PARAGRAPH, SAVE_HINT_TAGS, HARD_DELETE_HINT, SAVE_HINT_TEXT} from './actions'

import {indexOf, pull} from 'lodash-node'

/* paragraph reducer */
const newParagraph = (id, badText, improvedText, hints) => {
	return {
		id: id,
		isEditing: false,
		badText: badText,
		improvedText: improvedText,
		hintTags: hints
	}
}

const paragraph = (state = {}, action) => {
	switch(action.type) {
	case TOGGLE_EDIT:
		return Object.assign({}, state, {
			isEditing: !state.isEditing
		})
	case TOGGLE_PARAGRAPH_TYPE:
		return Object.assign({}, state, {
			isBadText: !state.isBadText
		})
	case SAVE_TEXT:
		if (state.isBadText) {
			return Object.assign({}, state, {
				badText: action.text
			})
		} else {
			return Object.assign({}, state, {
				improvedText: action.text
			})
		}
	default:
		return state
	}
}

const defaultAction = {type: ""};

// dummy data; set to an empty list for realz
const initialState = [
	// {id: 0, isEditing: false, isBadText: true, badText: "my study of history is falling apart. i haven’t concerned myself with it since i was kicked out of st johns for sleeping in the library. i haven’t been able to bring myself to be concerned with it through the web. i spend most of my day looking through this screen, trying to find something worthwhile, and looking for history online seems distracted from what history is supposed to stand for; a referential tomb, for authority of thought and practice.", improvedText: "this is improved text!!!!", hintTags: []},
	// {id: 1, isEditing: false, isBadText: true, badText: "in where i find myself financially, i ought not to buy history books. i visited the vatican museums with coworkers earler today, and was inadvertently reprimanded by our boss and tour guide for prioritising atmospheric humour atop of the legitimate study of authoritative art. i think i have faith in the cards i played; but this could well be because i don’t know as much about art as my coworkers. reductive humour may be my ego’s appeal to inferior knowledge. with the piece of mind i have of theirs, it is hard to be persuaded by inanimate statues, no matter how naturalised are their opposite limbs. how can coffee with deceptive me be less dynamic than a ruptured torso?", improvedText: "this is improved text!!!!", hintTags: []},
	// {id: 2, isEditing: false, isBadText: true, badText: "my study of history is falling apart. i have taken to re-reading chapters, and meditating in a moving bathroom to avoid the train’s ticket officer. i am reading about a new immobile model-view-controller approach, renovating the design of large-scale applications by reconceptualising dom insertions, deletes and updates as a complete re-rendering of the application state. as far as i can tell, this has nothing to do with the expansion of civilisation in southern asia. the perspective from which we as the reader know that jon snow must be some sort of metamorph, to inhabit ghost’s habits as he sleeps, and yet cannot know that his brother brandon is still alive, in the coat and fur of his own direwolf, also cannot be said to be history. the monuments in the vatican museum are the closest that i have come to studying history, but i laughed and longed for food through most of that walking.", improvedText: "this is improved text!!!!", hintTags: []}
]

export const paragraphs = (state = [], action) => {
	let newState = state.slice()

	switch(action.type) {

	case ADD_PARAGRAPH:
		newState.push(newParagraph(state.length, 'bad Text', 'improved Text', []))
		return newState

	case TOGGLE_EDIT:
		newState[action.id] = paragraph(state[action.id], action)
		return newState

	case TOGGLE_PARAGRAPH_TYPE:
		newState[action.id] = paragraph(state[action.id], action)
		return newState

	case SAVE_TEXT:
		newState[action.id] = paragraph(state[action.id], action)
		return newState

	case REMOVE_PARAGRAPH:
		newState.splice(action.id, 1)
		return newState

	case SAVE_HINT_TAGS:
		newState[action.id].hintTags = action.hints
		return newState

	case HARD_DELETE_HINT:
		state.forEach((p, ind) => {
			let tags = p.hintTags
			// if hint to delete is in tags
			let tagIndex = indexOf(tags, action.hint)
			if (tagIndex != -1) {
				// remove from tags in newState
				newState[ind].hintTags.splice(tagIndex, 1)
			}
		})
		return newState

	case SAVE_HINT_TEXT:
		state.forEach((p, ind) => {
			p.hintTags.forEach((t, innerIndex) => {
				if (t == action.oldText) {
					newState[ind].hintTags[innerIndex] = action.text
				}
			})
		})

		return newState

	default:
		return state

	}
}
