import React from 'react';
import styles from './style.module.scss';

function Button({ isCTA, text, clickHandler, disabled }) {
  return (
    <button
      className={`${styles.button}  ${isCTA ? styles.cta : ''}`}
      onClick={clickHandler}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
