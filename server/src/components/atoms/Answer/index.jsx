import React from 'react';
import styles from './style.module.scss';

function Answer({ clickHandler }) {
  return (
    <label className={styles.labeled}>
      Ответ:
      <input type="text" placeholder="..." className={styles.answer} onChange={clickHandler} />
    </label>
  );
}

export default Answer;
