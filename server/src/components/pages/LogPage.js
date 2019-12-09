import React, { Component } from 'react';
import { connect } from 'react-redux';
import requireAuth from '../hocs/requireAuth';
// import { fetchLog } from '../../thunkStore/actions';  //use thunkStore
import { fetchLogIn, fetchAuthRegister, logFromChange } from '../../sagaStore/actions'; //use sagaStore

class LogPage extends Component {

  onFieldChange=(e)=>{
    this.props.logFromChange({
      name: e.target.name,
      value: e.target.value
    })
  }

  onLogin=(e)=>{
    e.preventDefault();
    this.props.fetchLogIn();
  }

  onRegister=(e)=>{
    e.preventDefault();
    this.props.fetchAuthRegister();
  }

  render() {
    const {email, password} = this.props;
    return (
      <form onSubmit={e=>e.preventDefault}>
        <input type='text' name='email' value={email} onChange={this.onFieldChange}/>
        <input type='password' name='password' value={password} onChange={this.onFieldChange}/>
        <button onClick={this.onLogin}>Login</button>
        <button onClick={this.onRegister}>Register</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { 
    password: state.logForm.password,
    email: state.logForm.email
  };
}

export default {
  component: connect(mapStateToProps, { fetchLogIn, fetchAuthRegister, logFromChange })(LogPage)
};