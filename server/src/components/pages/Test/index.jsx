import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.scss';
import CheckboxList from '../../molecules/CheckboxList';
import ProgressBar from '../../atoms/ProgressBar';
import Testimage from '../../../assets/images/Testimage.svg';
import checkList from './tests.json';
import Button from '../../atoms/Button';
import {
  testIncrement,
  testDecrement,
  testAnsverValidation,
  testEnd,
} from '../../../sagaStore/actions';
import questions from './questions.json';
import rings from '../Rings/rings.json';

const Test = ({
  testNumber,
  nextButtonText,
  nextTestHandler,
  previousTestHandler,
  checkboxHandler,
  disabled,
  endTestHandler,
  result,
}) => {
  const questionsList = questions.map(el => {
    return (
      <h4 className="test__question" key={el.id}>
        {el.question}
      </h4>
    );
  });

  const disabilityReturnButton = testNumber ? null : 'disabled';
  const buttonHandler = testNumber === questions.length - 1 ? endTestHandler : nextTestHandler;
  const renderRingText = testResult => {
    if (testResult === 10) {
      return <Link to={`/rings/${rings[0].id}`}>{rings[0].heading}</Link>;
    }
    if (testResult >= 8) {
      return <Link to={`/rings/${rings[3].id}`}>{rings[3].heading}</Link>;
    }
    if (testResult >= 6) {
      return <Link to={`/rings/${rings[2].id}`}>{rings[2].heading}</Link>;
    }
    if (testResult >= 4) {
      return <Link to={`/rings/${rings[1].id}`}>{rings[1].heading}</Link>;
    }
    if (testResult >= 3) {
      return <Link to={`/rings/${rings[5].id}`}>{rings[5].heading}</Link>;
    }
    if (testResult < 3) {
      return <Link to={`/rings/${rings[4].id}`}>{rings[4].heading}</Link>;
    }
    return null;
  };

  const resultRing = renderRingText(result);

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
              <p>
                Рекомендуем приобрести кольцо
                {resultRing}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

const TestConnect = connect(
  state => ({
    ...state.test,
  }),

  dispatch => ({
    nextTestHandler() {
      dispatch(testIncrement());
    },
    previousTestHandler() {
      dispatch(testDecrement());
    },
    checkboxHandler(i) {
      dispatch(testAnsverValidation(i));
    },
    endTestHandler() {
      dispatch(testEnd());
    },
  })
)(Test);

export default {
  component: TestConnect,
};
