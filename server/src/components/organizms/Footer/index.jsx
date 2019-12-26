import React from 'react';
import './style.scss';
import Nav from '../../molecules/Nav';

const footerLinks = [
  {
    href: '/privacy_policy',
    text: 'Privacy policy',
  },
  {
    href: '/contacts',
    text: 'Контакт',
  },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Nav section="footer" links={footerLinks} />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
