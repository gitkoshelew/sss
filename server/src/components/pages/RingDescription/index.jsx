import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';
import CourseFormats from '../../organizms/CourseFormats';
import Button from '../../atoms/Button';
import { contactsAdventureItemAction } from '../../../sagaStore/actions';
import MainRing from '../../../assets/images/rings/main-ring.jpg';
import SecondRing from '../../../assets/images/rings/ring2.jpg';
import ThirdRing from '../../../assets/images/rings/ring3.jpg';
import FourthRing from '../../../assets/images/rings/ring4.jpg';
import FifthRing from '../../../assets/images/rings/ring5.jpg';
import SixthRing from '../../../assets/images/rings/ring6.jpg';
import Aragorn from '../../../assets/images/characters/aragorn.jpg';
import Frodo from '../../../assets/images/characters/frodo.jpg';
import Gimli from '../../../assets/images/characters/gimli.jpg';
import Legolas from '../../../assets/images/characters/legolas.jpg';
import Gendalf from '../../../assets/images/characters/gendalf.jpg';
import Sam from '../../../assets/images/characters/sam.jpg';
import RingsArray from '../../../data/courses.json';

const RingDescription = ({
  active,
  onClickHandler,
  match: {
    params: { id },
  },
}) => {
  const ringsImg = {
    MainRing,
    SecondRing,
    ThirdRing,
    FourthRing,
    FifthRing,
    SixthRing,
  };
  const charactersImg = {
    Aragorn,
    Frodo,
    Gimli,
    Legolas,
    Gendalf,
    Sam,
  };

  const course = RingsArray.find(el => el.id === id);
  const {
    heading,
    brief,
    programPoints,
    price,
    img,
    name,
    experience,
    character,
    information,
    totalfreeFormat,
    lightFormat,
    standartFormat,
    advancedFormat,
    ninjaFormat,
    incubatorFormat,
  } = course;

  return (
    <section>
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-12">
            <h1 className={styles.page__heading}>{heading}</h1>
          </div>
          <div className="col-12 col-md-6 col-lg-5">
            <p className={styles.text}>{brief}</p>
            <h4 className={styles.small__heading}>Программа курса:</h4>
            <ul>
              {programPoints.map((item, i) => (
                <li key={i} className={styles.text}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg-5 align-self-center">
            <p className={styles.image__wrapper}>
              <img className={styles.ring__image} src={ringsImg[img]} alt={heading} />
            </p>
          </div>
          <div className="col-12 col-md-4">
            <h4 className={styles.small__heading}>Участник братства:</h4>
          </div>
          <div className="col-7 col-md-5">
            <h5 className={styles.character__name}>{name}</h5>
            <p className={styles.character__experience}>{experience}</p>
            <p className={styles.character__information}>{information}</p>
          </div>
          <div className="col-5 col-md-3">
            <p className={styles.image__wrapper}>
              <img className={styles.character__image} src={charactersImg[character]} alt={name} />
            </p>
          </div>
          <div className="col-12">
            <h4 className={styles.heading}>Выбери формат обучения:</h4>
          </div>
          <div className="col-12">
            <CourseFormats
              totalfreeFormat={totalfreeFormat}
              lightFormat={lightFormat}
              standartFormat={standartFormat}
              advancedFormat={advancedFormat}
              ninjaFormat={ninjaFormat}
              incubatorFormat={incubatorFormat}
            />
          </div>
          <div className="col-12">
            <div className={styles.button__wrapper}>
              <Link to="/rings">
                <Button text="< все курсы" />
              </Link>

              <Link
                to="/test_intro
              "
              >
                <Button isCTA text="записаться >" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const RingDescriptionConnect = connect(
  state => ({
    ...state.ringDescription,
  }),
  dispatch => ({
    onClickHandler(i) {
      dispatch(contactsAdventureItemAction(i));
    },
  })
)(RingDescription);

export default {
  component: RingDescriptionConnect,
};
