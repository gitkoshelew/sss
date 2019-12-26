import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import FirstPageTestImage from '../../../assets/images/FirstPageTestImage.svg';
import Button from '../../atoms/Button';

function TestIntro() {
  return (
    <section className="test-intro">
      <div className="container">
        <div className="row align-items-lg-end">
          <div className="col-12">
            <h4 className="test-intro__heading">
              Пройди онлайн тест и узнай, какое кольцо выбрать
            </h4>
          </div>
          <div className="col-12 col-sm-9 col-md-6">
            <p className="test-intro__text">
              Кто ты: Гендальф, Фродо, Сэм, Арагорн, Леголас, Боромир?
            </p>
            <p className="test-intro__text">
              Многие читали «Хоббита», многие, да не все. Поэтому в нашей книге не обойтись без
              основных сведений об этом замечательном народе, да заодно уж надо напомнить и о самом
              Приключении.
            </p>
          </div>
          <div className="col-md-6 d-none d-md-block">
            <img src={FirstPageTestImage} alt="test_image" className="test-intro__image" />
          </div>
          <div className="col-12">
            <div className="test-intro__button-wrapper">
              <Link to="/test">
                <Button section="test-intro" text="Начать тест" modificator="darkblue" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default {
  component: TestIntro,
};
