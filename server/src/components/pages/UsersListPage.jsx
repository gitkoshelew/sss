import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { usersFetch, usersSuccess } from '../../sagaStore/actions';
import { fetchUsers as fetchUsersSaga } from '../../sagaStore/sagas/users';

class UsersList extends Component {
  componentDidMount() {
    const { dispatchUsersFetch } = this.props;
    dispatchUsersFetch();
  }

  componentWillUnmount() {
    const { dispatchUsersSuccess } = this.props;
    dispatchUsersSuccess([]);
  }

  head() {
    const { users } = this.props;
    return (
      <Helmet>
        <title>{`${users.length} Users Loaded`}</title>
        <meta property="og:title" content="Users App" />
      </Helmet>
    );
  }

  renderUsers() {
    const { users } = this.props;
    return users.map(user => {
      return <li key={user.id}>{user.name}</li>;
    });
  }

  render() {
    return (
      <div>
        {this.head()}
        Here&#39;s a big list of users:
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users.data };
}

export default {
  component: connect(mapStateToProps, {
    dispatchUsersFetch: usersFetch,
    dispatchUsersSuccess: usersSuccess,
  })(UsersList),
  loadGeneratorData: fetchUsersSaga,
};
