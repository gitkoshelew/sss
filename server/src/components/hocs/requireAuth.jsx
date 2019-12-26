import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default ChildComponent => {
  const RequireAuth = ({ data: { value }, ...spread }) => {
    switch (value) {
      case false:
      case null:
        return <Redirect to="/" />;
      default:
        return <ChildComponent {...spread} />;
    }
  };

  function mapStateToProps({ auth: { data } }) {
    return { data };
  }

  return connect(mapStateToProps)(RequireAuth);
};
