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
import Title from './components/Title'

//dragndrop
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

//actions are array for mapDispatchToProps
const actions = [allActions];

/* create container as stateless function to indicate pure component */
export const App = React.createClass ({
	resetError() {
		this.props.actions.resetStatus(); this.props.actions.resetError()
	},
	render() {
		return (
			<div>
				<Title/>
			{!this.props.server.loggedIn?
			<div>
				<LoginForm actions={this.props.actions} error={this.props.server.serverError} />
			</div>
			:	<div>
					{this.props.server.serverError? <div className="alert alert-danger">
					<a className="close" onClick={this.resetError} ariaLabel="close">&times;</a>
					<span className="glyphicon glyphicon-exclamation-sign"></span> 
					&nbsp;Something went wrong, sorry. Check your internet connection. <span style={{fontWeight: "bold"}}> 
					&nbsp;&nbsp;&nbsp;&nbsp;
					Error:&nbsp;&nbsp;</span> <i>{this.props.server.serverError.message}</i> </div>: <div></div>}
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