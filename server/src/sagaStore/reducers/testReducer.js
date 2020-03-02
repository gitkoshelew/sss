import {
  TEST_END,
  TEST_CHECK,
  TEST_NUMBER_DECREMENT,
  TEST_NUMBER_INCREMENT,
  TEST_ANSWER_VALIDATION,
  TEST_INPUT_CHANGE,
} from '../actions/constants';

import checkList from '../../data/test.json';

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
  testItems,
  result: null,
};

const testReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TEST_NUMBER_INCREMENT: {
      const nextTestNumber =
        state.testNumber < state.testItems.length - 1 ? state.testNumber + 1 : state.testNumber;
      return {
        ...state,
        inputValue: '',
        testNumber: nextTestNumber,
        nextButtonText:
          state.testNumber < state.testItems.length - 2 ? 'далее >' : 'завершить тест',
      };
    }
    case TEST_NUMBER_DECREMENT:
      return {
        ...state,
        testNumber: state.testNumber > 0 ? state.testNumber - 1 : state.testNumber,
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
      return {
        ...state,
        testItems: newTestItems,
      };
    }
    case TEST_ANSWER_VALIDATION:
      return {
        ...state,
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
    case TEST_END:
      return {
        ...state,
        result: state.testItems.reduce(
          (acc, test) => {
            const validAnswers = test.answers.reduce((validAcc, { correct, checked }) => {
              if (correct === checked) return validAcc + 1;
              return validAcc;
            }, 0);
            return {
              valid: acc.valid + validAnswers,
              questions: acc.questions + test.answers.length,
            };
          },
          { valid: 0, questions: 0 }
        ),
      };
    case TEST_INPUT_CHANGE: {
      const inputValue = payload.target.value;
      return {
        ...state,
        inputValue,
        testItems: testItems.map((test, idx) => {
          if (state.testNumber !== idx) {
            return test;
          }
          return {
            ...test,
            givenAnswer: inputValue,
          };
        }),
      };
    }
    default:
      return state;
  }
};

export default testReducer;
