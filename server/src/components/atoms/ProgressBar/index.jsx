import React from 'react';
import './style.scss';

function ProgressBar({ section, ind, fullInd }) {
  const width = ((ind + 1) / fullInd) * 100;
  return (
    <div className={`${section}__progress-bar progress-bar`}>
      <div className={`${section}__empty-bar empty-bar`}>
        <div className={`${section}__full-bar full-bar`} style={{ width: `${width}%` }} />
      </div>
      <p className={`${section}__progress-text progress-text`}>
        {`${ind + 1} вопросов из ${fullInd}`}
      </p>
    </div>
  );
}

export default ProgressBar;
