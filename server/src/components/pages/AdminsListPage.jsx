import React, { Component } from 'react';
import { connect } from 'react-redux';
import requireAuth from '../hocs/requireAuth';
import { adminsFetch } from '../../sagaStore/actions';
import { fetchAdmins as fetchAdminsSaga } from '../../sagaStore/sagas/admins';

class AdminsListPage extends Component {
  componentDidMount() {
    const { dispatchAdminsFetch } = this.props;
    dispatchAdminsFetch();
  }

  renderAdmins() {
    const {
      admins: { data, errors },
    } = this.props;

    if (errors.length) {
      return errors.map((error, idx) => <li key={idx}>{error}</li>);
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
  component: connect(mapStateToProps, { dispatchAdminsFetch: adminsFetch })(
    requireAuth(AdminsListPage)
  ),
  loadGeneratorData: fetchAdminsSaga,
};
