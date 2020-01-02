import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cn from 'classnames';
import env from '../../../../config/env';
import styles from './style.module.scss';
import Nav from '../../molecules/Nav';
import Button from '../../atoms/Button';
import Logo from '../../atoms/Logo';
import { headerNavOpenAction, authFetchLogOut } from '../../../sagaStore/actions';

function Header({
  isHeaderNavOpen,
  headerButtonText,
  isUserLoged,
  dispatchAuthFetchLogOut,
  headerNavOpenHandler,
  isHome,
}) {
  const headerLinks = [
    // {
    //   href: '/users',
    //   text: 'Users',
    // },
    // {
    //   href: '/admins',
    //   text: 'Admin',
    // },
    {
      href: '/about',
      text: 'о наc',
    },
    // {
    //   href: '/test',
    //   text: 'тест',
    // },
    {
      href: '/rings',
      text: 'кольца',
    },
    {
      href: '/blog',
      text: 'блог',
    },
    // {
    //   href: '/feedback',
    //   text: 'отзывы',
    // },
    {
      href: '/contacts',
      text: 'контакты',
    },
  ];

  const socLog = {
    login: {
      href: env.apiLoginGoogleUrl,
      text: 'Login',
    },
    logout: {
      href: env.apiLogoutGoogleUrl,
      text: 'Logout',
    },
  };

  const logStrategy = {
    login: {
      href: '/log',
      text: 'IN',
    },
    logout: {
      handler: dispatchAuthFetchLogOut,
      text: 'OUT',
    },
  };

  return (
    <header className={`${styles.header} ${isHome ? styles.header_transparent : ''}`}>
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-2">
            <Logo section="header" isHome={isHome} />
          </div>
          <div className={cn('col-12', 'col-md-10')}>
            <Nav
              section="header"
              modificator={isHeaderNavOpen ? 'open' : 'close'}
              links={headerLinks}
              socLog={socLog}
              logStrategy={logStrategy}
              isUserLoged={isUserLoged}
              isHome={isHome}
            />
            {/* <Button
              text={headerButtonText}
              section="header"
              modificator={isHeaderNavOpen ? 'open' : 'close'}
              clickHandler={headerNavOpenHandler}
            /> */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default connect(
  ({
    header,
    auth: {
      data: { value },
    },
  }) => ({
    ...header,
    isUserLoged: value,
  }),

  dispatch => ({
    headerNavOpenHandler() {
      dispatch(headerNavOpenAction());
    },
    dispatchAuthFetchLogOut: authFetchLogOut,
  })
)(withRouter(Header));
