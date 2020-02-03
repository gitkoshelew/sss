import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';
import CoursesSlider from '../../organizms/CoursesSlider';
import MainRing from '../../../assets/images/rings/main-ring.jpg';
import SecondRing from '../../../assets/images/rings/ring2.jpg';
import ThirdRing from '../../../assets/images/rings/ring3.jpg';
import FourthRing from '../../../assets/images/rings/ring4.jpg';
import FifthRing from '../../../assets/images/rings/ring5.jpg';
import SixthRing from '../../../assets/images/rings/ring6.jpg';
import Button from '../../atoms/Button';

function Rings() {
  const slides = [
    {
      heading: 'Кольцо всевластия',
      price: 100,
      id: 'main_ring',
      img: MainRing,
    },
    {
      heading: 'Кольцо людей',
      price: 40,
      id: 'people_ring',
      img: SecondRing,
    },
    {
      heading: 'Кольцо гномов',
      price: 50,
      id: 'gnome_ring',
      img: ThirdRing,
    },
    {
      heading: 'Кольцо эльфов',
      price: 60,
      id: 'elf_ring',
      img: FourthRing,
    },
    {
      heading: 'Кольцо смелости',
      price: 20,
      id: 'courage_ring',
      img: FifthRing,
    },
    {
      heading: 'Кольцо хитрости',
      price: 30,
      id: 'cunning_ring',
      img: SixthRing,
    },
  ];
  return (
    <section className={styles.courses}>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12">
            <h1 className={styles.heading}>Каталог курсов</h1>
          </div>
        </div>
        <div className="row d-flex justify-content-around">
          <div className="col-12">
            <CoursesSlider slides={slides} />
          </div>
        </div>
        <div className={`row ${styles.totest}`}>
          <div className="col-12 col-md-8">
            <h4 className={styles.question}>
              Не знаешь, какое кольцо выбрать? Пройди тест и узнай!
            </h4>
          </div>
          <div className="col-12 col-md-4 align-self-center">
            <div className="rings__button-wrapper">
              <Link to="/test_intro">
                <Button section="rings" text="Начать тест" modificator="darkblue" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default {
  component: Rings,
};
