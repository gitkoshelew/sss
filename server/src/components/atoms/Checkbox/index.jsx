import React from 'react';
import './style.scss';

function Checkbox({ section, text, modificator, clickHandler, checked }) {
  return (
    <label className={`${section}__label label`}>
      <input
        type="checkbox"
        checked={checked}
        className={`${section}__checkbox checkbox checkbox_${modificator}`}
        name={section}
        onClick={clickHandler}
      />
      <div role="button" />
      <span className={`${section}__label-text label-text`}>{text}</span>
    </label>
  );
}

export default Checkbox;
