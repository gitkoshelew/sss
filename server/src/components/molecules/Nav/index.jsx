import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';

function Nav({ links, logStrategy, socLog, isUserLoged }) {
  const logStrategyExitHandler = useCallback(
    e => {
      console.log('click');
      e.preventDefault();
      logStrategy.logout.handler();
    },
    [logStrategy.logout.handler]
  );

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
              <a className={`${styles.nav_anchor}`} onClick={logStrategyExitHandler}>
                {logStrategy.logout.text}
              </a>
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
