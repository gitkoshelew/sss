import React, { useState } from 'react';
import Swiper from 'react-id-swiper';
import prev from '../../../assets/images/arrow-prev.svg';
import next from '../../../assets/images/arrow-next.svg';
import ProductCard from '../../molecules/ProductCard';
import styles from './style.module.scss';

const CoursesSlider = ({ slides }) => {
  const [swiper, updateSwiper] = useState(null);
  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };
  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };
  const params = {
    slidesPerView: 3,
    spaceBetween: 60,
  };
  return (
    <div className={styles.wrapper}>
      <img src={prev} className={styles.arrow} onClick={goPrev} />
      <Swiper {...params} getSwiper={updateSwiper}>
        {slides.map((el, i) => {
          const { id, heading, price, img } = el;
          return (
            <div key={id} className={styles.slide}>
              <ProductCard heading={heading} price={price} id={id} imgUrl={img} />
            </div>
          );
        })}
      </Swiper>
      <img src={next} className={styles.arrow} onClick={goNext} />
    </div>
  );
};
export default CoursesSlider;
