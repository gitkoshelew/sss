import React from 'react';
import './style.scss';

export default ({ section, modificator, clickHandler }) => {
  const modClass = modificator ? `arrow_${modificator}` : '';
  return (
    <div className={`${section}__arrow arrow ${modClass}`} onClick={clickHandler} role="button" />
  );
};

// const Hello = () => <div>Hello</div>
// export { Hello }
