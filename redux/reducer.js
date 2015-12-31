import { combineReducers } from 'redux'
import {paragraphs} from './paragraphsReducer'
import {hints} from './hintsReducer'

export const reducer = combineReducers({
	hints,
	paragraphs
})
