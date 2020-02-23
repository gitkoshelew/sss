import React from 'react';
import styles from './style.module.scss';

function Checkbox({ section, text, modificator, clickHandler, checked }) {
  return (
    <label className={styles.label}>
      <input
        type="checkbox"
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

export default Checkbox;
