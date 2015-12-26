import { combineReducers } from 'redux'
import {paragraphs} from './paragraphsReducer'
import {other} from './otherReducer'

export const reducer = combineReducers({
  other,
	paragraphs
})	