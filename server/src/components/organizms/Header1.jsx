import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.svg';
import play from '../../assets/images/play-button.svg';
import share from '../../assets/images/share.svg';
import env from '../../../config/env';
import { authFetchLogOut } from '../../sagaStore/actions';

import './style.less';

const Header = ({ data: { value }, dispatchAuthFetchLogOut }) => {
  const authButton = value ? (
    <a href={env.apiLogoutGoogleUrl}>Logout</a>
  ) : (
    <a href={env.apiLoginGoogleUrl}>Login</a>
  );

  const logButton = value ? (
    <button type="button" onClick={dispatchAuthFetchLogOut}>
      OUT
    </button>
  ) : (
    <Link to="/log">IN</Link>
  );

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">
          Reasdd
        </Link>
        <img src={logo} className="App-logo" alt="logo" />
        <img src={play} className="App-logo" alt="logo" />
        <img src={share} className="App-logo" alt="logo" />
        <ul className="right">
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/admins">Admins</Link>
          </li>
          <li>{logButton}</li>
          <li>{authButton}</li>
        </ul>
      </div>
    </nav>
  );
};

function mapStateToProps({ auth: { data } }) {
  return { data };
}

export default connect(mapStateToProps, { dispatchAuthFetchLogOut: authFetchLogOut })(Header);
