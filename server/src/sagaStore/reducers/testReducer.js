import {
  TEST_END,
  TEST_CHECK,
  TEST_NUMBER_DECREMENT,
  TEST_NUMBER_INCREMENT,
  TEST_ANSWER_VALIDATION,
  TEST_INPUT_CHANGE,
  TEST_TIME_OVER,
} from '../actions/constants';

import checkList from '../../data/test.json';
import calculateResults from './testResultCalculation';

const testItems = checkList.map(test => {
  return {
    ...test,
    answers: test.answers.map(answer => ({ ...answer, checked: false })),
    valid: false,
  };
});

const initialState = {
  testNumber: 0,
  nextButtonText: 'далее >',
  // nextDisabled: true,
  testItems,
  result: null,
  timeIsOver: false,
  timer: 900000,
};

const testReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TEST_NUMBER_INCREMENT: {
      const nextTestNumber =
        state.testNumber < state.testItems.length - 1 ? state.testNumber + 1 : state.testNumber;
      // const nextDisabled = !state.testItems[nextTestNumber].answers.some(({ checked }) => checked);
      return {
        ...state,
        inputValue: '',
        testNumber: nextTestNumber,
        // nextDisabled,
        nextButtonText:
          state.testNumber < state.testItems.length - 2 ? 'далее >' : 'завершить тест',
      };
    }
    case TEST_NUMBER_DECREMENT:
      return {
        ...state,
        testNumber: state.testNumber > 0 ? state.testNumber - 1 : state.testNumber,
        // nextButtonText: state.testNumber < state.testItems.length ? 'далее >' : 'завершить тест',
        // nextDisabled: false,
      };
    case TEST_CHECK: {
      const newTestItems = state.testItems.map((test, idx) => {
        if (state.testNumber !== idx) {
          return test;
        }
        return {
          ...test,
          answers: test.answers.map((answer, answerIndex) => {
            if (answerIndex !== payload.index) {
              return {
                ...answer,
                checked: test.haveSomeCorrectAnswers ? answer.checked : false,
              };
            }
            return {
              ...answer,
              checked: !answer.checked,
            };
          }),
        };
      });
      // const nextDisabled = !newTestItems[state.testNumber].answers.some(({ checked }) => checked);
      return {
        ...state,
        testItems: newTestItems,
        // nextDisabled,
      };
    }
    case TEST_ANSWER_VALIDATION:
      return {
        ...state,
        // disabled: !state.disabled ? false : !state.disabled,
        testItems: state.testItems.map((test, idx) => {
          if (idx === state.testNumber) {
            const { answers } = test;
            const valid = answers.every(({ correct, checked }) => {
              if (test.givenAnswer) {
                const changedAnswer = test.givenAnswer
                  .split('')
                  .map(symbol => (symbol === '.' ? ',' : symbol))
                  .join('');
                return correct === changedAnswer.toLowerCase();
              }
              return correct === checked;
            });
            return {
              ...test,
              valid,
            };
          }
          return test;
        }),
      };
    case TEST_END: {
      console.log(calculateResults(state.testItems));
      return {
        ...state,
      };
      // return {
      //   ...state,
      //   result: state.testItems.reduce(
      //     (acc, test) => {
      //       const validAnswers = test.answers.reduce((validAcc, { correct, checked }) => {
      //         if (correct === checked) return validAcc + 1;
      //         return validAcc;
      //       }, 0);
      //       return {
      //         valid: acc.valid + validAnswers,
      //         questions: acc.questions + test.answers.length,
      //       };
      //     },
      //     { valid: 0, questions: 0 }
      //   ),
      //   nextDisabled: true,
      // };
    }
    case TEST_INPUT_CHANGE: {
      payload.persist();
      const inputValue = payload.target.value;
      // const nextDisabled = !inputValue;
      return {
        ...state,
        // nextDisabled,
        inputValue,
        testItems: state.testItems.map((test, idx) => {
          if (state.testNumber === idx) {
            const { answers } = test;
            return {
              ...test,
              givenAnswer: inputValue,
              answers: answers.map(answer => ({
                ...answer,
                checked: !!inputValue,
              })),
            };
          }
          return { ...test };
        }),
      };
    }
    case TEST_TIME_OVER:
      return {
        ...state,
        timeIsOver: true,
      };
    default:
      return state;
  }
};

export default testReducer;
