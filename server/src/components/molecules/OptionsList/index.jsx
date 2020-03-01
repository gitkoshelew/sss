import React from 'react';
import styles from './style.module.scss';
import Option from '../../atoms/Option';

function OptionsList({ checksList: { haveSomeCorrectAnswers, answers }, section, clickHandler }) {
  return (
    <ul className={styles.checklist}>
      {answers.map(({ text, id, checked }, idx) => {
        const type = haveSomeCorrectAnswers ? 'checkbox' : 'radio';
        return (
          <li className={styles.item} key={id}>
            <Option
              type={type}
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
