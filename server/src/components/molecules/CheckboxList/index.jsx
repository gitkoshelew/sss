import React from 'react';
import './style.scss';
import Checkbox from '../../atoms/Checkbox';

function CheckboxList({ checksList, section, clickHandler, onClick }) {
  return (
    <ul className={`${section}__checklist checklist`}>
      {checksList.map((el, i) => {
        return (
          <li className={`${section}__checklist-item checklist-item`} key={el.id}>
            <Checkbox
              text={el.text}
              section={section}
              modificator=""
              clickHandler={() => clickHandler(i)}
              onClick={onClick}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default CheckboxList;
