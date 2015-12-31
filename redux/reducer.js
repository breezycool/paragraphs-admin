import { combineReducers } from 'redux'
import {paragraphs} from './paragraphsReducer'
import {hints} from './hintsReducer'

//new lone

export const reducer = combineReducers({
	hints,
	paragraphs
})	
