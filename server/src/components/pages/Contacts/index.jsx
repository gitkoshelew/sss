import React from 'react';
import './style.scss';

function Contacts() {
  return (
    <section className="contact">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="contact__heading">Vitali Bazylchik</h1>
            <p className="contact__information">E-mail: vbazylchik94@gmail.com</p>
            <p className="contact__information">Tel: +375293940201</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default {
  component: Contacts,
};
