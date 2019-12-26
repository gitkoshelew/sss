import React from 'react';
import './style.scss';

function Button({ text, section, clickHandler, modificator, disabled }) {
  const customClass = modificator ? `button_${modificator}` : '';
  return (
    <button
      className={`${section}__button button ${customClass}`}
      onClick={clickHandler}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
