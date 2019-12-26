import React from 'react';
import Travolta from '../../../assets/images/Travolta.gif';
import './style.scss';

function FourOhFour() {
  return (
    <section className="error">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="error__wrapper">
              <h1 className="error__heading">Error: 404.</h1>
              <div className="error__img">
                <img src={Travolta} alt="travolta" width="400px" height="400px;" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default {
  component: FourOhFour,
};
