import React from 'react';

const LoginForm = React.createClass({
  render() {
    return (
        <div style={{margin: '0 auto', width: '250px' }}>     
          <input type='text' placeholder='Username' />
          <input type='password' placeholder="Password"/>
          <hr/>
          <div>
        	<button className="btn btn-primary">Log In</button>  
          </div>   
      </div>
    );
  }
})

export default LoginForm

