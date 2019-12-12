import React from 'react';
import './style.scss';
import powerRing from '../../../assets/images/powerRing.jpg';

function About() {
  return (
    <section className="about">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <h4 className="about__heading">О нашей компании</h4>
            <p className="about__text">
              Lorem ipsum dolor sit amet, id sit option prompta moderatius, eos sint placerat in,
              dolorem pericula neglegentur cu has.
            </p>
            <p className="about__text">
              Lorem ipsum dolor sit amet, id sit option prompta moderatius, eos sint placerat in,
              dolorem pericula neglegentur cu has.
            </p>
            <p className="about__text">
              Lorem ipsum dolor sit amet, id sit option prompta moderatius, eos sint placerat in,
              dolorem pericula neglegentur cu has.
            </p>
          </div>
          <div className="d-none d-md-block col-md-6">
            <img className="about__image" src={powerRing} alt="ring" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default {
  component: About,
};
