import React from 'react';
import './style.scss';
import Nav from '../../molecules/Nav';
import Button from '../../atoms/Button';
import Logo from '../../atoms/Logo';
import { connect } from 'react-redux';
import { headerNavOpenAction } from '../../sagaStore/actions';

function Header(props) {
  const { isHeaderNavOpen, headerNavOpenHandler, headerButtonText } = props;
  const width = window.innerWidth < 768 ? true : false;
  const headerLinks = [
    {
      href: '/about',
      text: 'О нас',
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
  return (
    <header className="header">
      {width && (
        <Button
          text={headerButtonText}
          section="header"
          modificator="darkblue"
          clickHandler={headerNavOpenHandler}
        />
      )}
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-2">
            <Logo section="header" />
          </div>
          <div className="col-8">
            {width ? (
              isHeaderNavOpen && <Nav section="header" links={headerLinks} />
            ) : (
              <Nav section="header" links={headerLinks} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

const HeaderConnect = connect(
  state => ({
    ...state.header,
  }),

  dispatch => ({
    headerNavOpenHandler() {
      dispatch(headerNavOpenAction());
    },
  })
)(Header);

export default HeaderConnect;
