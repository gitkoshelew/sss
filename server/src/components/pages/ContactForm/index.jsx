import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.scss';
import Button from '../../atoms/Button';
import { contactsChangeInputAction } from '../../../sagaStore/actions';

class ContactForm extends Component {
  onSubmitHandler = e => {
    e.preventDefault();
  };

  render() {
    const { onChangeHandler, disabled, name, email, phone, message } = this.props;

    return (
      <section className="contact-us">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4 className="contact-us__heading">
                Наш консультант обработает твой вопрос и пришлет результат по e-mail
              </h4>
            </div>
            <div className="col-12">
              <form className="contact-us__form" onSubmit={this.onSubmitHandler}>
                <input
                  className="contact-us__input"
                  onChange={onChangeHandler}
                  type="text"
                  name="name"
                  value={name}
                />
                <input
                  className="contact-us__input"
                  onChange={onChangeHandler}
                  type="email"
                  name="email"
                  value={email}
                />
                <input
                  className="contact-us__input"
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={onChangeHandler}
                />
                <textarea
                  className="contact-us__area"
                  name="message"
                  value={message}
                  onChange={onChangeHandler}
                />
                <Button section="form" text="Отправить" modificator="white" disability={disabled} />
              </form>
            </div>
            <div className="col-12">
              <div className="contact-us__agreement">
                Нажимая на кнопку, Вы даете свое согласие на обработку персональных данных
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const ContactFormConnect = connect(
  ({ contactForm }) => ({ ...contactForm }),
  dispatch => ({
    onChangeHandler(event) {
      const {
        target: { name, value },
      } = event;

      dispatch(contactsChangeInputAction({ name, value }));
    },
  })
)(ContactForm);

export default {
  component: ContactFormConnect,
};
