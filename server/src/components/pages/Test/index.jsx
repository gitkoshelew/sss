import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';
import OptionsList from '../../molecules/OptionsList';
import Countdown from '../../atoms/Countdown';
import ProgressBar from '../../atoms/ProgressBar';
import QuestionTable from '../../atoms/QuestionTable';
import Answer from '../../atoms/Answer';
import Button from '../../atoms/Button';
import checkList from '../../../data/test.json';
import {
  testIncrementAction,
  testDecrementAction,
  testEndAction,
  testValidationAction,
  testCheckAction,
} from '../../../sagaStore/actions';
import rings from '../../../data/courses.json';
import testquestion17 from '../../../assets/images/test/17.svg';
import testquestion29 from '../../../assets/images/test/29.svg';
import testquestion32 from '../../../assets/images/test/32.svg';
import testquestion49 from '../../../assets/images/test/49.svg';

const Test = ({
  testNumber,
  nextDisabled,
  result,
  nextButtonText,
  testItems,
  nextTestHandler,
  previousTestHandler,
  checkboxHandler,
  endTestHandler,
  validationHandler,
}) => {
  const buttonHandler = testNumber === testItems.length - 1 ? endTestHandler : nextTestHandler;
  const renderRingText = testResult => {
    const resultDiff = (testResult.valid / testResult.questions) * 10;
    if (resultDiff === 10) {
      return <Link to={`/ring/${rings[0].id}`}>{rings[0].heading}</Link>;
    }
    if (resultDiff >= 8) {
      return <Link to={`/ring/${rings[3].id}`}>{rings[3].heading}</Link>;
    }
    if (resultDiff >= 6) {
      return <Link to={`/ring/${rings[2].id}`}>{rings[2].heading}</Link>;
    }
    if (resultDiff >= 4) {
      return <Link to={`/ring/${rings[1].id}`}>{rings[1].heading}</Link>;
    }
    if (resultDiff >= 3) {
      return <Link to={`/ring/${rings[5].id}`}>{rings[5].heading}</Link>;
    }
    if (resultDiff < 3) {
      return <Link to={`/ring/${rings[4].id}`}>{rings[4].heading}</Link>;
    }
    return null;
  };
  const defineImg = path => {
    switch (path) {
      case 'testquestion17':
        return testquestion17;
      case 'testquestion29':
        return testquestion29;
      case 'testquestion32':
        return testquestion32;
      case 'testquestion49':
        return testquestion49;
      default:
        return 0;
    }
  };
  const path = defineImg(testItems[testNumber].imagePath);
  return (
    <section>
      <div className="container">
        <div className="row justify-content-around">
          <div className="col-12 col-md-6">
            <Countdown />
          </div>
          <div className="col-12 col-md-6">
            <ProgressBar section="test" ind={testNumber} fullInd={checkList.length} />
          </div>
        </div>
        <div className="row">
          <div className={`col-12 col-lg-10 ${styles.ask}`}>{testItems[testNumber].question}</div>
          <div className={`col-12 col-md-6 ${styles.options}`}>
            {!testItems[testNumber].isOpenQuestion && (
              <OptionsList
                section="test"
                checksList={testItems[testNumber]}
                clickHandler={checkboxHandler}
              />
            )}
            {testItems[testNumber].doesContainTable && (
              <QuestionTable tableItems={testItems[testNumber].markup} />
            )}
            {testItems[testNumber].doesContainImage && (
              <div>
                <img src={path} alt="question image" className={styles.picture} />
              </div>
            )}
          </div>
        </div>
        <div className="row justify-content-between align-items-center">
          {testItems[testNumber].isOpenQuestion && <Answer />}
          <Button isCTA text={nextButtonText} clickHandler={buttonHandler} />
        </div>
      </div>
    </section>
  );
};

const TestConnect = connect(
  ({ test }) => ({
    ...test,
  }),
  dispatch => ({
    nextTestHandler() {
      dispatch(testIncrementAction());
    },
    previousTestHandler() {
      dispatch(testDecrementAction());
    },
    checkboxHandler(index) {
      dispatch(testCheckAction({ index }));
    },
    validationHandler(index) {
      dispatch(testValidationAction({ index }));
    },
    endTestHandler() {
      dispatch(testEndAction());
    },
  })
)(Test);

export default {
  component: TestConnect,
};
