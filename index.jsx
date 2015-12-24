require("./node_modules/bootstrap/dist/css/bootstrap.min.css")
import React from 'react';
import ReactDOM from 'react-dom';

/* REDUX */
import {Provider} from 'react-redux'
import {store} from './redux/store'

import {ItemBoxContainer} from './components/ItemBox'
import {EditBoxContainer} from './components/EditBox'


/* create container as stateless function to indicate pure component */ 
export class App extends React.Component {
	render() {
		return (
			<div>
				<div>
					<ItemBoxContainer />
				</div>
				<br />
				<div>
					<EditBoxContainer />
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.querySelector("#app")
);
