import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';

function Logo({ modificator }) {
  const customClass = modificator ? `logo_${modificator}` : '';

  return <Link to="/" className={`${styles.logo} ${customClass}`} />;
}

export default Logo;
