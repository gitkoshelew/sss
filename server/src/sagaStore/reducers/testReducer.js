import {
  TEST_END,
  TEST_CHECK,
  TEST_NUMBER_DECREMENT,
  TEST_NUMBER_INCREMENT,
  TEST_ANSWER_VALIDATION,
} from '../actions/constants';

import checkList from '../../data/tests.json';

const testItems = checkList.map(test => {
  return {
    ...test,
    answers: test.answers.map(answer => ({ ...answer, checked: false })),
    valid: false,
  };
});

const initialState = {
  testNumber: 1,
  nextButtonText: 'Далее >',
  nextDisabled: true,
  testItems,
  result: null,
  disabled: 1,
};

const testReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TEST_NUMBER_INCREMENT:
      return {
        ...state,
        testNumber:
          state.testNumber < state.testItems.length - 1 ? state.testNumber + 1 : state.testNumber,
        nextButtonText:
          state.testNumber < state.testItems.length - 1 ? 'Далее >' : 'Завершить тест',
        disabled: true,
      };
    case TEST_NUMBER_DECREMENT:
      return {
        ...state,
        testNumber: state.testNumber > 0 ? state.testNumber - 1 : state.testNumber,
        nextButtonText:
          state.testNumber < state.testItems.length - 1 ? 'Далее >' : 'Завершить тест',
        disabled: true,
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
              return answer;
            }
            return {
              ...answer,
              checked: !answer.checked,
            };
          }),
        };
      });
      const nextDisabled = state.testItems[state.testNumber].answers.some(({ checked }) => checked);
      return {
        ...state,
        testItems: newTestItems,
        nextDisabled,
      };
    }
    case TEST_ANSWER_VALIDATION:
      return {
        ...state,
        disabled: !state.disabled ? false : !state.disabled,
        testItems: state.testItems.map((test, idx) => {
          if (idx === state.testNumber) {
            const { answers } = test;
            const valid = answers.every(({ correct, checked }) => correct === checked);
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
        // result: state.answers.reduce((acc, elem) => {
        //   return elem.valid ? ++acc : acc;
        // }, 0)
        // result: state.answers.filter(el => el.valid === true).length,
        nextDisabled: true,
      };
    default:
      return state;
  }
};

export default testReducer;
