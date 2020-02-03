import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';

export default ({ heading, price, id, imgUrl }) => {
  return (
    <div className={styles.card}>
      <div className={styles.img__wrapper}>
        <img className={styles.img} src={imgUrl} alt="course" />
      </div>
      <div className={styles.content}>
        <h4 className={styles.heading}>{heading}</h4>
        <div className={styles.footer}>
          <p className={styles.price}>{`от ${price} у.е.`}</p>
          <Link to={`/ring/${id}`} className={styles.link}>
            подробнее &gt;
          </Link>
        </div>
      </div>
    </div>
  );
};
