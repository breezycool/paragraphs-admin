require("./node_modules/bootstrap/dist/css/bootstrap.min.css")
import React from 'react';
import ReactDOM from 'react-dom';

/* REDUX */
import {Provider} from 'react-redux'
import {configureStore} from './redux/store'

import DevTools from './redux/devtools'
import {ParagraphListContainer} from './components/ParagraphList'
import {HintListContainer} from './components/HintList'
import {ServerControlsContainer} from './components/ServerControls'

import {connect} from 'react-redux'

import {LoginFormContainer} from './components/LoginForm'

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


/* create container as stateless function to indicate pure component */
export const App = React.createClass ({
	render() {
		return (
			<div>
			{!this.props.loggedIn?
			<div>
				<LoginFormContainer />
			</div>
			:	<div>
					<div>
						<ServerControlsContainer />
					</div>
					<span>
						<ParagraphListContainer />
					</span>
					<span>
						<HintListContainer />
					</span>
				</div>}
			<DevTools />
			</div>
		);
	}
})

const mapStateToProps = (state) => {
	return {
		loggedIn: state.server.loggedIn
	}
}

let DragApp = DragDropContext(HTML5Backend)(App);

export const AppContainer = connect(mapStateToProps)(DragApp)

ReactDOM.render(
	<Provider store={configureStore()}>
		<AppContainer/>
	</Provider>,
	document.querySelector("#app")
);

//dsfsfd