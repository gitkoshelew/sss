import React from 'react';
import styles from './style.module.scss';
import Anchor from '../../atoms/Anchor';

const HomePage = () => {
  return (
    <section>
      <div className="container">
        <div className={`row d-flex align-items-center ${styles.hero}`}>
          <div className="col-6">
            <h1 className={styles.mainHeading}>Властелин колец братство кольца</h1>
            <p className={styles.intro}>
              «Фродо жив!» - объявили всему миру надписи на стенах нью-йоркской «подземки», и
              миллионы почитателей творчества Дж. Р. Р. Толкиена восторженно подхватили призыв.{' '}
            </p>
            <Anchor address="/rings" text="Выбрать кольцо" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default {
  component: HomePage,
};
