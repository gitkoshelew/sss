import React from 'react';
import { connect } from 'react-redux';
import './style.scss';
import Arrow from '../../atoms/Arrow';
import ProductCard from '../../molecules/ProductCard';
import {
  sliderLeftAction,
  sliderRightAction,
  sliderCircleAction,
} from '../../../sagaStore/actions';

class Slider extends React.Component {
  constructor() {
    super();
    this.timeOut = null;
  }

  componentDidMount() {
    this.timeOfHandler();
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeOut);
  }

  timeOfHandler = () => {
    const { rightArrowClickHandler } = this.props;
    this.timeOut = setTimeout(() => {
      rightArrowClickHandler();
      this.timeOfHandler();
    }, 5000);
  };

  render() {
    const {
      section,
      slides,
      modificator,
      circleClickHandler,
      rightArrowClickHandler,
      leftArrowClickHandler,
      activeSlide,
      prevSlide,
      nextSlide,
    } = this.props;
    const modClass = modificator ? `slider_${modificator}` : '';

    return (
      <div className={`${section}__slider slider ${modClass}`}>
        <div className="slider__arrow">
          <Arrow section="rings" modificator="left" clickHandler={leftArrowClickHandler} />
        </div>

        <div className="slider__slides">
          {slides.map((el, i) => {
            const { id, heading, price, img } = el;

            return (
              <div
                className={`slider__slide  
                ${i === activeSlide ? 'slide__active d-none d-sm-block' : ' '}
                ${i === prevSlide ? 'slide__prev' : ' '} 
                ${i === nextSlide ? 'slide__next d-none d-md-block' : ' '}  
                ${i === activeSlide ? 'slide__second' : ' '}
                ${i === prevSlide ? 'slide__first' : ' '}
                ${i === nextSlide ? 'slide__third' : ' '}`}
                key={id}
              >
                <ProductCard section="rings" heading={heading} price={price} id={id} imgUrl={img} />
              </div>
            );
          })}
        </div>

        <div className="slider__arrow">
          <Arrow section="rings" modificator="right" clickHandler={rightArrowClickHandler} />
        </div>

        <div className="slider__circles  d-none d-md-flex">
          {slides.map((el, i) => {
            return (
              <div
                className={`slider__circle ${prevSlide ? 'circle__active' : ''}`}
                key={i}
                onClick={() => circleClickHandler(i)}
              >
                <div
                  className={`slider__inside-circle ${prevSlide ? 'inside-circle__active' : ''}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const SliderConnect = connect(
  ({ ringsSlider }) => ({
    ...ringsSlider,
  }),

  dispatch => ({
    rightArrowClickHandler() {
      dispatch(sliderRightAction());
    },
    leftArrowClickHandler() {
      dispatch(sliderLeftAction());
    },
    circleClickHandler(i) {
      dispatch(sliderCircleAction({ index: i }));
    },
  })
)(Slider);

export default SliderConnect;
