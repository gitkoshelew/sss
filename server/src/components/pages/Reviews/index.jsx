import React, { Component } from 'react';
import './style.scss';
import Button from '../../atoms/Button';
import { connect } from 'react-redux';
import {
  changeInputAction,
  commentButtonAction,
  focusInputAction,
  blurInputAction,
} from '../../sagaStore/actions';

class Reviews extends Component {
  render() {
    const {
      onChangeHandler,
      name,
      text,
      addCommentHandler,
      onFocusHandler,
      onBlurHandler,
      disabled,
      comments,
    } = this.props;
    console.log(comments);
    return (
      <section className="reviews">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4 className="reviews__heading">Оставьте Ваш отзыв</h4>
            </div>
            <div className="col-12"></div>
            <div className="col-12">
              <form className="reviews__form" onSubmit={this.onSubmitHandler}>
                <label className="reviews__label">
                  <span className="reviews__label-text">Ваше имя:</span>
                  <input
                    onChange={onChangeHandler}
                    onFocus={onFocusHandler}
                    type="text"
                    name="name"
                    value={name}
                    className="reviews__input"
                  />
                </label>
                <label className="reviews__label">
                  <textarea
                    onChange={onChangeHandler}
                    onFocus={onFocusHandler}
                    name="text"
                    value={text}
                    className="reviews__area"
                    onBlur={onBlurHandler}
                  />
                  <Button
                    section="reviews"
                    text="&#10148;"
                    clickHandler={addCommentHandler}
                    modificator="darkblue"
                    disability={disabled}
                  />
                </label>
              </form>
            </div>
            <div className="col-12">
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

const ReviewsConnect = connect(
  state => ({
    ...state.reviews,
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
    addCommentHandler(i) {
      dispatch(commentButtonAction(i));
    },
  })
)(Reviews);

export default ReviewsConnect;
