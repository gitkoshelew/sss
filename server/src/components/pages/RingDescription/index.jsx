import React, { Component } from 'react';
import './style.scss';
import Button from '../../atoms/Button';
import { connect } from 'react-redux';
import { adventureItemAction } from '../../sagaStore/actions';
import { Link } from 'react-router-dom';
import MainRing from '../../assets/rings/main-ring.jpg';
import SecondRing from '../../assets/rings/ring2.jpg';
import ThirdRing from '../../assets/rings/ring3.jpg';
import FourthRing from '../../assets/rings/ring4.jpg';
import FifthRing from '../../assets/rings/ring5.jpg';
import SixthRing from '../../assets/rings/ring6.jpg';
import Aragorn from '../../assets/characters/aragorn.jpg';
import Frodo from '../../assets/characters/frodo.jpg';
import Gimli from '../../assets/characters/gimli.jpg';
import Legolas from '../../assets/characters/legolas.jpg';
import Gendalf from '../../assets/characters/gendalf.jpg';
import Sam from '../../assets/characters/sam.jpg';
import Light from '../../assets/maps/light.jpg';
import Standart from '../../assets/maps/standart.jpg';
import Advanced from '../../assets/maps/advanced.jpg';
import RingsArray from '../Rings/rings.json';

class RingDescription extends Component {
  render() {
    const { active, onClickHandler } = this.props;
    const ringsImg = {
      MainRing: MainRing,
      SecondRing: SecondRing,
      ThirdRing: ThirdRing,
      FourthRing: FourthRing,
      FifthRing: FifthRing,
      SixthRing: SixthRing,
    };
    const charactersImg = {
      Aragorn: Aragorn,
      Frodo: Frodo,
      Gimli: Gimli,
      Legolas: Legolas,
      Gendalf: Gendalf,
      Sam: Sam,
    };
    const mapsImg = [Light, Standart, Advanced];
    const ringId = this.props.match.params.id;
    const requiredRing = RingsArray.find(el => el.id === ringId);
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
              <p className="ring-description__text">
                - Девять - смертным, чей выведен срок и удел;
              </p>
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
                  const activeItem =
                    i === active ? 'ring-description__adventure-item_active' : null;
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
  }
}

const RingDescriptionConnect = connect(
  state => ({
    ...state.ringDescription,
  }),
  dispatch => ({
    onClickHandler(i) {
      dispatch(adventureItemAction(i));
    },
  })
)(RingDescription);

export default RingDescriptionConnect;
