require("./node_modules/bootstrap/dist/css/bootstrap.min.css")
import React from 'react';
import ReactDOM from 'react-dom';

import {ItemBox} from './components/ItemBox'
import {EditBox} from './components/EditBox'


/* create container as stateless function to indicate pure component */ 
export const App = () => {
	return (
		<div>
			<div>
				{	
					ItemBox()
				}
			</div>
			<br />
			<div>
				{
					EditBox()
				}
			</div>
		</div>
	);
}

ReactDOM.render(<App/>, document.querySelector("#app"));
