import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.scss';
import Button from '../../atoms/Button';
import { reviewsChangeInputAction, reviewsSendFormAction } from '../../../sagaStore/actions';

class Reviews extends Component {
  onSubmitHandler = e => {
    e.preventDefault();
  };

  render() {
    const { onChangeHandler, addSendCommentHandler, name, text, disabled, comments } = this.props;

    return (
      <section className="reviews">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4 className="reviews__heading">Оставьте Ваш отзыв</h4>
            </div>
            <div className="col-12" />
            <div className="col-12">
              <form className="reviews__form" onSubmit={this.onSubmitHandler}>
                <label className="reviews__label">
                  <span className="reviews__label-text">Ваше имя:</span>
                  <input type="text" name="name" value={name} className="reviews__input" />
                </label>
                <label className="reviews__label">
                  <textarea
                    name="text"
                    value={text}
                    className="reviews__area"
                    onChange={onChangeHandler}
                  />
                  <Button
                    section="reviews"
                    text="&#10148;"
                    clickHandler={addSendCommentHandler}
                    modificator="darkblue"
                    disability={disabled}
                  />
                </label>
              </form>
            </div>
            {/* <div className="col-12">
              {comments.length > 0 || <p className="reviews__no-reviews">Пока нет отзывов.</p>}
              {comments.map((el, i) => {
                return (
                  <div className="reviews__comment" key={i}>
                    <p className="reviews__name">
                      {el.name} &#9998;
                      <span className="reviews__date">{el.date}</span>
                    </p>
                    <p className="reviews__text">{el.text}</p>
                  </div>
                );
              })}
            </div> */}
          </div>
        </div>
      </section>
    );
  }
}

const ReviewsConnect = connect(
  ({ reviews }) => ({
    ...reviews,
  }),
  dispatch => ({
    onChangeHandler(e) {
      const {
        target: { name, value },
      } = e;
      dispatch(reviewsChangeInputAction({ name, value }));
    },
    addSendCommentHandler() {
      dispatch(reviewsSendFormAction());
    },
  })
)(Reviews);

export default {
  component: ReviewsConnect,
};
