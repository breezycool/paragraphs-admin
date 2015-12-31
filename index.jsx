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



/* create container as stateless function to indicate pure component */
export class App extends React.Component {
	render() {
		return (
			<div>
				<div>
					<div>
						<ServerControlsContainer />
					</div>
					<span>
						<ParagraphListContainer />
					</span>
					<span>
						<HintListContainer />
					</span>
				</div>
				<DevTools />
			</div>
		);
	}
}

ReactDOM.render(
	<Provider store={configureStore()}>
		<App/>
	</Provider>,
	document.querySelector("#app")
);
