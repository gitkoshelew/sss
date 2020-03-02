import React from 'react';
import styles from './style.module.scss';
import preloader from '../../../assets/images/icons/ballTriangle.svg';

export default function loader({ modificator }) {
  const customClass = modificator ? `loader_${modificator}` : '';

  return (
    <div className={`${styles.loader} ${customClass}`}>
      <img className={styles.loader_img} src={preloader} alt="preloader" />
    </div>
  );
}
