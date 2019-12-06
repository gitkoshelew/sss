import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default ChildComponent => {
  class RequireAuth extends Component {
    render() {
      const { auth, admins } = this.props
      switch (auth) {
        case false:
          return <Redirect to="/" />;
        case null:
          return <div>
            Loading...
            { admins.errors.map((error, idx) => <p key={idx}>{ error }</p>) }
          </div>;
        default:
          return <ChildComponent {...this.props} />;
      }
    }
  }

  function mapStateToProps({ auth, admins }) {
    return { auth, admins };
  }

  return connect(mapStateToProps)(RequireAuth);
};
