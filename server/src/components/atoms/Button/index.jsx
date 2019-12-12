import React from 'react';
import './style.scss';

function Button({ text, section, clickHandler, modificator, disability }) {
  const customClass = modificator ? `button_${modificator}` : '';
  const disabled = disability ? 'disabled' : null;
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
