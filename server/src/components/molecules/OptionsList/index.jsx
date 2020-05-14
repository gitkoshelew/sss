import React from 'react';
import styles from './style.module.scss';
import Option from '../../atoms/Option';

function OptionsList({ checksList: { answers }, section, clickHandler }) {
  return (
    <ul className={styles.checklist}>
      {answers.map(({ text, id, checked }, idx) => {
        return (
          <li className={styles.item} key={id}>
            <Option
              type="radio"
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

export default OptionsList;
