import React from 'react';
import {connect} from 'react-redux'
import {login} from '../redux/actions'

const LoginForm = React.createClass({
  login() {
    this.props.dispatch(login("",""))
  },
  render() {
    return (
        <div style={{margin: '0 auto', width: '250px' }}>     
          <input type='text' placeholder='Username' />
          <input type='password' placeholder="Password"/>
          <hr/>
          <div>
        	<button onClick={this.login} className="btn btn-primary">Log In</button>  
          </div>   
      </div>
    );
  }
})

export const LoginFormContainer = connect()(LoginForm)

