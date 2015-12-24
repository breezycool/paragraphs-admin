require("./node_modules/bootstrap/dist/css/bootstrap.min.css")
import React from 'react';
import ReactDOM from 'react-dom';

import {ItemBox} from './components/ItemBox'


/* create container as stateless function to indicate pure component */ 
export const App = () => {
	return (
    <div>
    	{ItemBox()}
    	<div>Happy days</div>
    </div>
	);
}

ReactDOM.render(<App/>, document.querySelector("#myApp"));
