import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';
import FirstPageTestImage from '../../../assets/images/FirstPageTestImage.svg';
import Button from '../../atoms/Button';

function TestIntro() {
  return (
    <section className={styles.intro}>
      <div className="container">
        <div className="row align-items-lg-center">
          <div className="col-12">
            <h4 className={styles.heading}>
              Данный опрос поможет нам максимально подстроить под тебя процесс обучения
            </h4>
          </div>
          <div className="col-12 col-sm-9 col-md-6">
            <p className={styles.text}>На прохождение теста дается 15 минут</p>
          </div>
          <div className="col-md-6 d-none d-md-block">
            <img src={FirstPageTestImage} alt="test_image" className={styles.image} />
          </div>
          <div className="col-12">
            <div className={styles.button_wrapper}>
              <Link to="/test">
                <Button isCTA text="начать тест" />
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
