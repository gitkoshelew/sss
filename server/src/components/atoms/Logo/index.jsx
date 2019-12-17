import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

function Logo({ section, modificator }) {
  const customClass = modificator ? `logo_${modificator}` : '';

  return <Link to="/" className={`${section}__logo logo ${customClass}`} />;
}

export default Logo;
