import React from 'react';
import './style.scss';

function Checkbox({ section, text, modificator, clickHandler }) {
  return (
    <label className={`${section}__label label`}>
      <input
        type="radio"
        className={`${section}__checkbox checkbox checkbox_${modificator}`}
        name={section}
        onClick={clickHandler}
      />
      <div onClick={clickHandler}></div>
      <span className={`${section}__label-text label-text`}>{text}</span>
    </label>
  );
}

export default Checkbox;
