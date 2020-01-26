import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';

function Anchor({ text, address }) {
  return (
    <Link to={address} className={`${styles.anchor} ${styles.anchor_dark}`}>
      {text}
    </Link>
  );
}

export default Anchor;
