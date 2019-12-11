import React from 'react';
import './style.scss';
import Arrow from '../../atoms/Arrow';
import ProductCard from '../../molecules/ProductCard';
import { connect } from 'react-redux';
import {
  sliderLeftArrowAction,
  sliderRightArrowAction,
  circleSliderAction,
} from '../../sagaStore/actions';

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
    this.timeOut = setTimeout(() => {
      this.props.rightArrowClickHandler();
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
    } = this.props;
    const modClass = modificator ? `slider_${modificator}` : '';

    return (
      <div className={`${section}__slider slider ${modClass}`}>
        <div className="slider__arrow">
          <Arrow section="rings" modificator="left" clickHandler={leftArrowClickHandler} />
        </div>

        <div className="slider__slides">
          {slides.map((el, i) => {
            const order =
              i === this.props.activeSlide
                ? 'slide__second'
                : i === this.props.prevSlide
                ? 'slide__first'
                : i === this.props.nextSlide
                ? 'slide__third'
                : '';

            const slideClass =
              i === this.props.activeSlide
                ? 'slide__active d-none d-sm-block'
                : i === this.props.prevSlide
                ? 'slide__prev'
                : i === this.props.nextSlide
                ? 'slide__next d-none d-md-block'
                : '';

            return (
              <div className={`slider__slide ${slideClass} ${order}`} key={el.id}>
                <ProductCard
                  section="rings"
                  heading={el.heading}
                  price={el.price}
                  id={el.id}
                  imgUrl={el.img}
                />
              </div>
            );
          })}
        </div>

        <div className="slider__arrow">
          <Arrow section="rings" modificator="right" clickHandler={rightArrowClickHandler} />
        </div>

        <div className="slider__circles  d-none d-md-flex">
          {slides.map((el, i) => {
            const activeCircle = i === this.props.prevSlide ? 'circle__active' : '';
            const activeInsideCircle = i === this.props.prevSlide ? 'inside-circle__active' : '';
            return (
              <div
                className={`slider__circle ${activeCircle}`}
                key={i}
                onClick={() => circleClickHandler(i)}
              >
                <div className={`slider__inside-circle ${activeInsideCircle}`}></div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const SliderConnect = connect(
  state => ({
    ...state.slider,
  }),

  dispatch => ({
    rightArrowClickHandler() {
      dispatch(sliderRightArrowAction());
    },
    leftArrowClickHandler() {
      dispatch(sliderLeftArrowAction());
    },
    circleClickHandler(i) {
      dispatch(circleSliderAction(i));
    },
  })
)(Slider);

export default SliderConnect;
