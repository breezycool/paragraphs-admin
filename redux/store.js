import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { reducer } from './reducer'
import DevTools from './devtools'

const createFinalStore = compose(
	applyMiddleware(thunk),
	DevTools.instrument()
)(createStore)

export function configureStore(initialState) {
  const store = createFinalStore(reducer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  // if (module.hot) {
  //   module.hot.accept('../reducers', () =>
  //     store.replaceReducer(require('../reducers')/*.default if you use Babel 6+ */)
  //   );
  // }

  return store;
}
