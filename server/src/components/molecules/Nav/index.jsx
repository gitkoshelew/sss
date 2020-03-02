import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';

function Nav({ links, logStrategy, socLog, isUserLoged }) {
  return (
    <nav className={`${styles.nav}`}>
      <ul className={`${styles.nav_list}`}>
        {links.map(({ href, text }, i) => (
          <li className={`${styles.nav_link}`} key={i}>
            <Link to={href} className={styles.nav_anchor}>
              {text}
            </Link>
          </li>
        ))}
        {logStrategy && (
          <li className={`${styles.nav_link}`}>
            {isUserLoged ? (
              <button
                type="button"
                className={`${styles.nav_anchor}`}
                onClick={logStrategy.login.handler}
              >
                {logStrategy.logout.text}
              </button>
            ) : (
              <Link to={logStrategy.login.href} className={`${styles.nav_anchor}`}>
                {logStrategy.login.text}
              </Link>
            )}
          </li>
        )}
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
