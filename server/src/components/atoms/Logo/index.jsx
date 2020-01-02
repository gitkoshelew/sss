import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';

function Logo({ modificator, isHome }) {
  const customClass = modificator ? `logo_${modificator}` : '';

  return (
    <Link to="/" className={`${styles.logo} ${customClass} ${isHome ? styles.logo_dark : ''}`} />
  );
}

export default Logo;
