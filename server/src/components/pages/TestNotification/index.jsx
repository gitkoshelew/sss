import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';
import FirstPageTestImage from '../../../assets/images/FirstPageTestImage.svg';
import Button from '../../atoms/Button';

function TestNotification({ timeIsOver }) {
  return (
    <section className={styles.intro}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            {timeIsOver && (
              <h4 className={styles.heading}>
                Время теста истекло. Спасибо за ответы! <br />
                Наш консультант обработает твои ответы и пришлет результат по e-mail.
              </h4>
            )}
            {!timeIsOver && (
              <h4 className={styles.heading}>
                Спасибо за ответы! <br />
                Наш консультант обработает твои ответы и пришлет результат по e-mail.
              </h4>
            )}
          </div>
          <div className="col-md-6 d-none d-md-block">
            <img src={FirstPageTestImage} alt="test_image" className={styles.image} />
          </div>
          <div className="col-12">
            <div className={styles.button_wrapper}>
              <Link to="/">
                <Button text="На главную" />
              </Link>
              <Link to="/rings">
                <Button isCTA text="К каталогу" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const TestConnect = connect(({ test }) => ({
  ...test,
}))(TestNotification);

export default {
  component: TestConnect,
};
