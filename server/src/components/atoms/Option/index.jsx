import React from 'react';
import styles from './style.module.scss';

function Option({ section, text, modificator, clickHandler, checked }) {
  return (
    <label className={styles.label}>
      <input
        type="radio"
        checked={checked}
        className={styles.checkbox}
        name={section}
        onChange={clickHandler}
      />
      <div role="button" />
      <span className={styles.label__text}>{text}</span>
    </label>
  );
}

export default Option;
