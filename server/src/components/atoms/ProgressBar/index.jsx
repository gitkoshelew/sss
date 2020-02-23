import React from 'react';
import styles from './style.module.scss';

function ProgressBar({ section, ind, fullInd }) {
  const width = ((ind + 1) / fullInd) * 100;
  return (
    <div>
      <div className={styles.empty}>
        <div className={styles.full} style={{ width: `${width}%` }} />
      </div>
      <p className={styles.text}>{`${ind + 1} вопросов из ${fullInd}`}</p>
    </div>
  );
}

export default ProgressBar;
