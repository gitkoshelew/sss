import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';

function Nav({ links, logStrategy, socLog, isUserLoged, isHome }) {
  return (
    <nav className={`${styles.nav}`}>
      <ul className={`${styles.nav_list}`}>
        {links.map(({ href, text }, i) => (
          <li className={`${styles.nav_link}`} key={i}>
            <Link
              to={href}
              className={`${styles.nav_anchor} ${isHome ? styles.nav_anchor__dark : ''}`}
            >
              {text}
            </Link>
          </li>
        ))}
        {/* {logStrategy && (
          <li className={`${styles...}`}>
            {isUserLoged ? (
              <button
                type="button"
                className={`${styles...} ${
                  isHome ? styles... : ''
                }`}
                onClick={logStrategy.login.handler}
              >
                {logStrategy.logout.text}
              </button>
            ) : (
              <Link
                to={logStrategy.login.href}
                className={`${styles...} ${
                  isHome ? styles... : ''
                }`}
              >
                {logStrategy.login.text}
              </Link>
            )}
          </li>
        )} */}
        {/* {socLog && (
          <li className={`${styles...}`}>
            {isUserLoged ? (
              <a
                href={socLog.logout.href}
                className={`${styles...} ${
                  isHome ? styles... : ''
                }`}
              >
                {socLog.logout.text}
              </a>
            ) : (
              <a
                href={socLog.login.href}
                className={`${styles...} ${
                  isHome ? styles... : ''
                }`}
              >
                {socLog.login.text}
              </a>
            )}
          </li>
        )} */}
      </ul>
    </nav>
  );
}

export default Nav;
