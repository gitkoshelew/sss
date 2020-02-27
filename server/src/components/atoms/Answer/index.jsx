import React from 'react';
import styles from './style.module.scss';

function Answer({ changeHandler }) {
  return (
    <label className={styles.labeled}>
      Ответ:
      <input type="text" placeholder="..." className={styles.answer} onChange={changeHandler} />
    </label>
  );
}

export default Answer;
