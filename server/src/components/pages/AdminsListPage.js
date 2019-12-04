import React, { Component } from 'react';
import { connect } from 'react-redux';
import requireAuth from '../hocs/requireAuth';
// import { fetchAdmins } from '../../thunkStore/actions';  //use thunkStore
import { fetchAdmins } from '../../sagaStore/actions'; //use sagaStore
import { fetchAdmins as fetchAdminsSaga } from '../../sagaStore/sagas'; //use sagaStore

class AdminsListPage extends Component {
  componentDidMount() {
    this.props.fetchAdmins();
  }

  renderAdmins() {
    const {data, errors} = this.props.admins;
    if (errors.length){
      return errors.map((error, idx)=> {
        <li key={idx}>{error}</li>;
      })
    }
    return data.map(admin => {
      return <li key={admin.id}>{admin.name}</li>;
    });
  }

  render() {
    return (
      <div>
        <h3>Protected list of admins</h3>
        <ul>{this.renderAdmins()}</ul>
      </div>
    );
  }
}

function mapStateToProps({ admins }) {
  return { admins };
}

export default {
  component: connect(mapStateToProps, { fetchAdmins })(
    requireAuth(AdminsListPage)
  ),
  // loadData: ({ dispatch }) => dispatch(fetchAdmins()), //use thunkStore
  loadGeneratorData: fetchAdminsSaga, // use sagaStore
};
