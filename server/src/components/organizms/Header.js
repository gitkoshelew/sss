import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.svg';
import play from '../../assets/images/play-button.svg';
import share from '../../assets/images/share.svg';
import env from '../../../config/env';
import { fetchLogOut } from '../../sagaStore/actions'; //use sagaStore


import './style.less';

const Header = ({ auth, fetchLogOut }) => {
  const authButton = auth ? (
    <a href={env.apiLogoutUrl}>Logout</a>
  ) : (
    <a href={env.apiLoginUrl}>Login</a>
  );

  const logButton = auth ? 
  <button onClick={fetchLogOut}>OUT</button> :
    <Link to="/log">IN</Link> 

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

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { fetchLogOut })(Header);
