import { createStore } from 'redux'
import { reducer } from './reducer'

let store = createStore(reducer)

// log the inital state
console.log(store.getState())



