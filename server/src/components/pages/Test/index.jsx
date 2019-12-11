import React, { Component } from 'react';
import './style.scss';
import CheckboxList from '../../molecules/CheckboxList';
import ProgressBar from '../../atoms/ProgressBar';
import Testimage from '../../assets/Testimage.svg';
import checkList from './tests.json';
import Button from '../../atoms/Button';
import {
  incrementTestAction,
  decrementTestAction,
  checkboxAction,
  endTestAction,
} from '../../store/actions';
import { connect } from 'react-redux';
import questions from './questions.json';
import rings from '../Rings/rings.json';
import { Link } from 'react-router-dom';

class Test extends Component {
  render() {
    const questionsList = questions.map(el => {
      return (
        <h4 className="test__question" key={el.id}>
          {el.question}
        </h4>
      );
    });
    const {
      testNumber,
      nextButtonText,
      nextTestHandler,
      previousTestHandler,
      checkboxHandler,
      disabled,
      endTestHandler,
      result,
    } = this.props;
    const disabilityReturnButton = testNumber ? null : 'disabled';
    const buttonHandler = testNumber === questions.length - 1 ? endTestHandler : nextTestHandler;
    const resultRing =
      result === 10 ? (
        <Link to={`/rings/${rings[0].id}`}>{rings[0].heading}</Link>
      ) : result >= 8 ? (
        <Link to={`/rings/${rings[3].id}`}>{rings[3].heading}</Link>
      ) : result >= 6 ? (
        <Link to={`/rings/${rings[2].id}`}>{rings[2].heading}</Link>
      ) : result >= 4 ? (
        <Link to={`/rings/${rings[1].id}`}>{rings[1].heading}</Link>
      ) : result >= 3 ? (
        <Link to={`/rings/${rings[5].id}`}>{rings[5].heading}</Link>
      ) : result < 3 ? (
        <Link to={`/rings/${rings[4].id}`}>{rings[4].heading}</Link>
      ) : null;

    return (
      <section className="test">
        <div className="container">
          <div className="row justify-content-around">
            <div className="col-12 col-lg-10 order-1">{questionsList[testNumber]}</div>
            <div className="col-12 col-md-6 order-3 order-md-2">
              <CheckboxList
                section="test"
                checksList={checkList[testNumber]}
                clickHandler={checkboxHandler}
              />
              <Button
                section="test"
                text="< Назад"
                clickHandler={previousTestHandler}
                disability={disabilityReturnButton}
              />
              <Button
                section="test"
                text={nextButtonText}
                clickHandler={buttonHandler}
                modificator="next"
                disability={disabled}
              />
            </div>
            <div className="col-12 col-md-6 order-2 order-md-3">
              <ProgressBar section="test" ind={testNumber} fullInd={checkList.length} />
              <img src={Testimage} alt="test" className="test__image d-none d-md-block" />
            </div>
            {result ? (
              <div className="col-12 order-4">
                <p>Рекомендуем приобрести кольцо {resultRing}</p>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    );
  }
}

const TestConnect = connect(
  state => ({
    ...state.test,
  }),

  dispatch => ({
    nextTestHandler() {
      dispatch(incrementTestAction());
    },
    previousTestHandler() {
      dispatch(decrementTestAction());
    },
    checkboxHandler(i) {
      dispatch(checkboxAction(i));
    },
    endTestHandler() {
      dispatch(endTestAction());
    },
  })
)(Test);

export default TestConnect;
