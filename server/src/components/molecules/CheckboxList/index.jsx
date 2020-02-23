import React from 'react';
import styles from './style.module.scss';
import Checkbox from '../../atoms/Checkbox';

function CheckboxList({ checksList: { answers }, section, clickHandler }) {
  return (
    <ul className={styles.checklist}>
      {answers.map(({ text, id, checked }, idx) => {
        return (
          <li className={styles.item} key={id}>
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
