import { combineReducers } from 'redux'
import {paragraphs} from './paragraphsReducer'
import {hints} from './hintsReducer'
import {server} from './serverReducer'

export const reducer = combineReducers({
	hints,
	paragraphs,
	server
})
