require("./node_modules/bootstrap/dist/css/bootstrap.min.css")
import React from 'react';
import ReactDOM from 'react-dom';
import {Map} from 'immutable';

/* REDUX */
import {Provider} from 'react-redux'
import {configureStore} from './redux/store'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import DevTools from './redux/devtools'
import * as allActions from './redux/actions'

//components
import {ParagraphList} from './components/ParagraphList'
import {HintList} from './components/HintList'
import {LoginForm} from './components/LoginForm'

//dragndrop
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const actions = [allActions];

/* create container as stateless function to indicate pure component */
export const App = React.createClass ({
	render() {
		return (
			<div>
			{!this.props.server.loggedIn?
			<div>
				<LoginForm actions={this.props.actions} error={this.props.server.serverError} />
			</div>
			:	<div>
					<div>
						{ /* need to write general error, this.props.server.serverError */ }
					</div>
					<span>
						<ParagraphList actions={this.props.actions} paragraphs={this.props.paragraphs} />
					</span>
					<span>
						<HintList actions={this.props.actions} hints={this.props.hints}/>
					</span>
				</div>}
			<DevTools />
			</div>
		);
	}
})

function mapStateToProps(state) {
  return {
      ...state
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
          .merge(...actions)
          .filter(value => typeof value === 'function')
          .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

const DragApp = DragDropContext(HTML5Backend)(App);

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(DragApp)

ReactDOM.render(
	<Provider store={configureStore()}>
		<AppContainer/>
	</Provider>,
	document.querySelector("#app")
);

//dsfsfd