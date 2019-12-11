import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default ChildComponent => {
  const RequireAuth = ({ auth: { data }, ...spread }) => {
    switch (data) {
      case false:
      case null:
        return <Redirect to="/" />;
      default:
        return <ChildComponent {...spread} />;
    }
  };

  function mapStateToProps({ auth }) {
    return { auth };
  }

  return connect(mapStateToProps)(RequireAuth);
};
