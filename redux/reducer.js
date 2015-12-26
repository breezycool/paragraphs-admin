import { combineReducers } from 'redux'
import {paragraphs} from './paragraphReducer'
import {other} from './otherReducer'

export const reducer = combineReducers({
  other,
	paragraphs
})	