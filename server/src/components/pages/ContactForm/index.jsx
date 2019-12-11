import React, { Component } from 'react';
import './style.scss';
import Button from '../../atoms/Button';
import { connect } from 'react-redux';
import { changeInputAction, focusInputAction, blurInputAction } from '../../store/actions';

class ContactForm extends Component {
  render() {
    const {
      onChangeHandler,
      onFocusHandler,
      onBlurHandler,
      disabled,
      name,
      email,
      phone,
      message,
    } = this.props;
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
                  onFocus={onFocusHandler}
                  onBlur={onBlurHandler}
                />
                <input
                  className="contact-us__input"
                  onChange={onChangeHandler}
                  type="email"
                  name="email"
                  value={email}
                  onFocus={onFocusHandler}
                  onBlur={onBlurHandler}
                />
                <input
                  className="contact-us__input"
                  onChange={onChangeHandler}
                  type="text"
                  name="phone"
                  value={phone}
                  onFocus={onFocusHandler}
                  onBlur={onBlurHandler}
                />
                <textarea
                  className="contact-us__area"
                  name="message"
                  value={message}
                  onChange={onChangeHandler}
                ></textarea>
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

  onSubmitHandler = e => {
    e.preventDefault();
  };
}

const ContactFormConnect = connect(
  state => ({
    ...state.contactForm,
  }),
  dispatch => ({
    onChangeHandler(i) {
      dispatch(changeInputAction(i));
    },
    onFocusHandler(i) {
      dispatch(focusInputAction(i));
    },
    onBlurHandler(i) {
      dispatch(blurInputAction(i));
    },
  })
)(ContactForm);

export default ContactFormConnect;
