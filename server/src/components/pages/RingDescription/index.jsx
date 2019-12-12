import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.scss';
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
import Light from '../../../assets/images/maps/light.jpg';
import Standart from '../../../assets/images/maps/standart.jpg';
import Advanced from '../../../assets/images/maps/advanced.jpg';
import RingsArray from '../Rings/rings.json';

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
  const mapsImg = [Light, Standart, Advanced];

  const requiredRing = RingsArray.find(el => el.id === id);
  const adventureType = ['Light', 'Standart', 'Advanced'];

  return (
    <section className="ring-description">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-12 order-1">
            <h4 className="ring-description__heading">ПУТЕШЕСТВИЕ В МОРДОР</h4>
          </div>
          <div className="col-12 col-md-6 col-lg-5 order-3 order-md-2">
            <p className="ring-description__text">
              Это кольцо рассчитано на тех, кто хочет пойти в мордор. Начальные навыки не
              обязательны.
            </p>
            <h4 className="ring-description__small-heading">Программа похода:</h4>
            <p className="ring-description__text">
              - Три - эльфийским владыкам в подзвездный предел;
            </p>
            <p className="ring-description__text">
              - Семь - для гномов царящих в подгорном просторе;
            </p>
            <p className="ring-description__text">- Девять - смертным, чей выведен срок и удел;</p>
            <p className="ring-description__text">- И Одно - Властелину на черном престоле.</p>
            <p className="ring-description__text">- В Мордоре, где вековечная тьма:</p>
            <p className="ring-description__text">- Чтобы всех отыскать, воедино созвать</p>
            <p className="ring-description__text">- И единою черною волей сковать</p>
            <p className="ring-description__text">- В Мордоре, где вековечная тьма.</p>
          </div>
          <div className="col-12 col-md-6 col-lg-5 order-2 order-md-3 align-self-center">
            <p className="ring-description__image-wrapper">
              <img
                className="ring-description__ring-image"
                src={ringsImg[requiredRing.img]}
                alt={requiredRing.heading}
              />
            </p>
          </div>
          <div className="col-12 col-md-4 order-4">
            <h4 className="ring-description__small-heading">Участник братства:</h4>
          </div>
          <div className="col-7 col-md-5 order-5">
            <h5 className="ring-description__character-name">{requiredRing.name}</h5>
            <p className="ring-description__character-experience">{requiredRing.experience}</p>
            <p className="ring-description__character-information">
              Lorem ipsum dolor sit amet, id sit option prompta moderatius, eos sint placerat in,
              dolorem pericula neglegentur cu has.
            </p>
          </div>
          <div className="col-5 col-md-3 order-6">
            <p className="ring-description__image-wrapper">
              <img
                className="ring-description__character-image"
                src={charactersImg[requiredRing.character]}
                alt={requiredRing.name}
              />
            </p>
          </div>
          <div className="col-12 order-7">
            <h4 className="ring-description__heading">Выбери формат путешествия:</h4>
          </div>
          <div className="col-12 order-8">
            <ul className="ring-description__adventure-list">
              {adventureType.map((el, i) => {
                const activeItem = i === active ? 'ring-description__adventure-item_active' : null;
                return (
                  <li
                    className={`ring-description__adventure-item ${activeItem}`}
                    key={i}
                    onClick={() => onClickHandler(i)}
                  >
                    {el}
                  </li>
                );
              })}
            </ul>
            <div className="ring-description__adventure-img-wrapper">
              <img
                className="ring-description__adventure-image ring-description__adventure-image_active"
                src={mapsImg[active]}
                alt={adventureType[active]}
              />
            </div>
          </div>
          <div className="col-12 order-9">
            <div className="ring-description__button-wrapper">
              <Link to="/rings">
                <Button section="ring-description" text="< Все кольца" modificator="bg-white" />
              </Link>

              <Link to="/">
                <Button section="ring-description" text="Записаться >" modificator="darkblue" />
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
