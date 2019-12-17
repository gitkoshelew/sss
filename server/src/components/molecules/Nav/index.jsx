import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

function Nav({ links, section, logStrategy, socLog, isUserLoged }) {
  return (
    <nav className={`${section}__nav nav`}>
      <ul className={`${section}__nav-list nav-list`}>
        {links.map(({ href, text }, i) => (
          <li className={`${section}__nav-link nav-link`} key={i}>
            <Link to={href} className={`${section}__nav-anchor nav-anchor`}>
              {text}
            </Link>
          </li>
        ))}
        {logStrategy && (
          <li className={`${section}__nav-link nav-link`}>
            {isUserLoged ? (
              <button
                type="button"
                className={`${section}__nav-anchor nav-anchor`}
                onClick={logStrategy.login.handler}
              >
                {logStrategy.logout.text}
              </button>
            ) : (
              <Link to={logStrategy.login.href} className={`${section}__nav-anchor nav-anchor`}>
                {logStrategy.login.text}
              </Link>
            )}
          </li>
        )}
        {socLog && (
          <li className={`${section}__nav-link nav-link`}>
            {isUserLoged ? (
              <a href={socLog.logout.href} className={`${section}__nav-anchor nav-anchor`}>
                {socLog.logout.text}
              </a>
            ) : (
              <a href={socLog.login.href} className={`${section}__nav-anchor nav-anchor`}>
                {socLog.login.text}
              </a>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
