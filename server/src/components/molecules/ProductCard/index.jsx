import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

export default ({ section, heading, modificator, price, id, imgUrl }) => {
  const modClass = modificator ? `card_${modificator}` : '';
  return (
    <div className={`card ${section}__card ${modClass}`}>
      <div className="card__img-wrapper">
        <img className="card__img" src={imgUrl} alt="imaga" />
      </div>
      <div className="card__content">
        <h4 className="card__heading">{heading}</h4>
        <div className="card__footer">
          <p className="card__price">{`от ${price} у.е.`}</p>
          <Link to={`/ringdescription/${id}`} className="card__link">
            Подробнее &gt;
          </Link>
        </div>
      </div>
    </div>
  );
};
