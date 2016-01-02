import React from 'react';
import {connect} from 'react-redux'
import {login} from '../redux/actions'

const LoginForm = React.createClass({
  getInitialState() {
    return {
      username: "",
      password: ""
    }
  },
  login() {
    this.props.dispatch(login(this.state.username,this.state.password))
  },
  handleUChange(e) {
    this.setState({username: e.target.value})
  },
  handlePChange(e) {
    this.setState({password: e.target.value})
  },
  onEnter(e) {
    if(e.keyCode == 13){
      this.login() //13 is enter
    }
  },
  render() {
    return (
        <div style={{margin: '0 auto', width: '250px' }}>
          <input onChange={this.handleUChange} onKeyDown={this.onEnter} type='text' placeholder='Username' />
          <input onChange={this.handlePChange} onKeyDown={this.onEnter} type='password' placeholder="Password"/>
          <hr/>
            {this.props.error? <div className="alert alert-danger"> {this.props.error} </div> : <div></div>}
          <div>
        	<button onClick={this.login} className="btn btn-primary">Log In</button>
          </div>
      </div>
    );
  }
})

const mapStateToProps = (state) => {
  return {
    error: state.server.error
  }
}

export const LoginFormContainer = connect(mapStateToProps)(LoginForm)
