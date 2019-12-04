import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { fetchUsers } from '../../thunkStore/actions'; //use thunkStore
import { fetchUsers } from '../../sagaStore/actions'; //use sagaStore
import { fetchUsers as fetchUsersSaga } from '../../sagaStore/sagas'; //use sagaStore
import { Helmet } from 'react-helmet';

class UsersList extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsers() {
    return this.props.users.map(user => {
      return <li key={user.id}>{user.name}</li>;
    });
  }

  head() {
    return (
      <Helmet>
        <title>{`${this.props.users.length} Users Loaded`}</title>
        <meta property="og:title" content="Users App" />
      </Helmet>
    );
  }

  render() {
    return (
      <div>
        {this.head()}
        Here's a big list of users:
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

export default {
  // loadData: (store) => store.dispatch(fetchUsers()) //use thunkStore
  component: connect(mapStateToProps, { fetchUsers })(UsersList),
  loadGeneratorData: fetchUsersSaga //use sagaStore
};
