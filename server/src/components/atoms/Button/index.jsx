import React from 'react';
import styles from './style.module.scss';

function Button({ text, clickHandler, modificator, disabled }) {
  return (
    <button className={styles.button} onClick={clickHandler} disabled={disabled}>
      {text}
    </button>
  );
}

export default Button;
