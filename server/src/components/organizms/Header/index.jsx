import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import env from '../../../../config/env';
import './style.scss';
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
}) {
  const headerLinks = [
    {
      href: '/users',
      text: 'Users',
    },
    {
      href: '/admins',
      text: 'Admin',
    },
    {
      href: '/abou',
      text: 'О наc',
    },
    {
      href: '/test_intro',
      text: 'Тест',
    },
    {
      href: '/rings',
      text: 'Кольца',
    },
    {
      href: '/reviews',
      text: 'Отзывы',
    },
    {
      href: '/contact_us',
      text: 'Обратная связь',
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
    <header className="header">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-2">
            <Logo section="header" />
          </div>
          <div className={cn('col-12', 'col-md-10')}>
            <Nav
              section="header"
              modificator={isHeaderNavOpen ? 'open' : 'close'}
              links={headerLinks}
              socLog={socLog}
              logStrategy={logStrategy}
              isUserLoged={isUserLoged}
            />
            <Button
              text={headerButtonText}
              section="header"
              modificator={isHeaderNavOpen ? 'open' : 'close'}
              clickHandler={headerNavOpenHandler}
            />
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
)(Header);
