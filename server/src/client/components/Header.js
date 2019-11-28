import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.svg';
import play from '../../assets/images/play-button.svg';
import './style.less';

const Header = ({ auth }) => {
  const authButton = auth ? (
    <a href="/api/logout">Logout</a>
  ) : (
    <a href="/api/auth/google">Login</a>
  );

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">
          Reacsdd 
        </Link>
        <img src={logo} className="App-logo" alt="logo" />
        <img src={play} className="App-logo" alt="logo" />
        <ul className="right">
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/admins">Admins</Link>
          </li>
          <li>
            <Link to="/admins">Adddd</Link>
          </li>
          <li>{authButton}</li>
        </ul>
      </div>
    </nav>
  );
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
