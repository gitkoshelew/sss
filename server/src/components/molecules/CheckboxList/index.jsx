import React from 'react';
import './style.scss';
import Checkbox from '../../atoms/Checkbox';

function CheckboxList({ checksList: { answers }, section, clickHandler }) {
  return (
    <ul className={`${section}__checklist checklist`}>
      {answers.map(({ text, id, checked }, idx) => {
        return (
          <li className={`${section}__checklist-item checklist-item`} key={id}>
            <Checkbox
              checked={checked}
              text={text}
              section={section}
              modificator=""
              clickHandler={() => clickHandler(idx)}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default CheckboxList;
