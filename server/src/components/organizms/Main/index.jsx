import { Link } from 'react-router-dom';
import React from 'react';
import './style.scss';
import Button from '../../atoms/Button';

function Main() {
  return (
    <main className="main">
      <div className="container">
        <div className="row">
          <div className="col col-sm-8 col-md-6">
            <h2 className="main__header">ВЛАСТЕЛИН КОЛЕЦ БРАТСТВО КОЛЬЦА</h2>
            <p className="main__text">
              &laquo;Фродо жив!&raquo; - объявили всему миру надписи на стенах нью-йоркской
              &laquo;подземки&raquo;, и миллионы почитателей Дж.Р.Р. Толкиена восторженно подхватили
              призыв.
            </p>
            <Link to="/rings">
              <Button text="выбрать кольцо >" section="main" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
