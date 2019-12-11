import React from 'react';
import { connect } from 'react-redux';
import { authFetchLogIn, authFetchRegister, authFormChange } from '../../sagaStore/actions';

const AuthPage = ({
  email,
  password,
  dispatchAuthFormChange,
  dispatchAuthFetchLogIn,
  dispatchAuthFetchRegister,
}) => {
  const onFieldChange = e => {
    dispatchAuthFormChange({
      name: e.target.name,
      value: e.target.value,
    });
  };

  const onLogin = e => {
    e.preventDefault();
    dispatchAuthFetchLogIn();
  };

  const onRegister = e => {
    e.preventDefault();
    dispatchAuthFetchRegister();
  };

  return (
    <form onSubmit={e => e.preventDefault}>
      <input type="text" name="email" value={email} onChange={onFieldChange} />
      <input type="password" name="password" value={password} onChange={onFieldChange} />
      <button type="submit" onClick={onLogin}>
        Login
      </button>
      <button type="submit" onClick={onRegister}>
        Register
      </button>
    </form>
  );
};

function mapStateToProps(state) {
  return {
    password: state.logForm.password,
    email: state.logForm.email,
  };
}

function mapDispatchToProps() {
  return {
    dispatchAuthFetchLogIn: authFetchLogIn,
    dispatchAuthFetchRegister: authFetchRegister,
    dispatchAuthFormChange: authFormChange,
  };
}

export default {
  component: connect(mapStateToProps, mapDispatchToProps)(AuthPage),
};
