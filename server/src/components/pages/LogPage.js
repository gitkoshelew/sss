import React, { Component } from 'react';
import { connect } from 'react-redux';
import requireAuth from '../hocs/requireAuth';
// import { fetchLog } from '../../thunkStore/actions';  //use thunkStore
import { fetchLog, logFromChange } from '../../sagaStore/actions'; //use sagaStore

class LogPage extends Component {

  onFieldChange=(e)=>{
    this.props.logFromChange({
      name: e.target.name,
      value: e.target.value
    })
  }

  onSubmit=(e)=>{
    e.preventDefault();
    this.props.fetchLog(this.props.fetchLog);
  }

  render() {
    const {email, password} = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <input type='text' name='email' value={email} onChange={this.onFieldChange}/>
        <input type='password' name='password' value={password} onChange={this.onFieldChange}/>
        <button type='submit'>submit</button>
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
  component: connect(mapStateToProps, { fetchLog, logFromChange })(LogPage)
};