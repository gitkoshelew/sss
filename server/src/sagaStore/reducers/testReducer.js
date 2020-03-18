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

const calcPercents = (value, all) => Math.round((value / all) * 100);
const createResultObj = () => ({
  missedAnswersAmount: 0,
  correctAnswerAmount: 0,
  wrongAnswerAmount: 0,
  allAnswers: 0,
});
const calcFinalResult = result => {
  const keys = Object.keys(result);
  return keys.reduce((acc, key) => {
    const value = result[key];
    if (key === 'all') {
      Object.keys(value).forEach(answerKey => {
        acc[answerKey] = value[answerKey];
      });
    } else {
      Object.keys(value).forEach(answerKey => {
        if (answerKey !== 'allAnswers') {
          const answerWithoutAmount = answerKey.slice(1, -6);
          const firstChar = answerKey.slice(0, 1).toUpperCase();
          const rightKey = `${key}${firstChar}${answerWithoutAmount}`;
          acc[`${rightKey}Percentage`] = calcPercents(value[answerKey], value.allAnswers);
        }
      });
    }
    return acc;
  }, {});
};

const calculateResults = tests => {
  const results = {
    all: {
      missedAnswersAmount: 0,
      correctAnswerAmount: 0,
      wrongAnswerAmount: 0,
    },
    cmn: createResultObj(),
    als: createResultObj(),
    ccn: createResultObj(),
    ctn: createResultObj(),
    rgy: createResultObj(),
    lgc: createResultObj(),
    spl: createResultObj(),
  };
  let levelGeneral;
  tests.forEach(test => {
    const { answers, knowledgeType } = test;
    if (test.valid) {
      results.all.correctAnswerAmount += 1;
      results[knowledgeType].correctAnswerAmount += 1;
    } else if (answers.some(answer => answer.checked)) {
      results.all.wrongAnswerAmount += 1;
      results[knowledgeType].wrongAnswerAmount += 1;
    } else {
      results.all.missedAnswersAmount += 1;
      results[knowledgeType].missedAnswersAmount += 1;
    }
    results[knowledgeType].allAnswers += 1;
  });
  switch (true) {
    case results.all.correctAnswerAmount <= 13: {
      levelGeneral = 'low';
      break;
    }
    case results.all.correctAnswerAmount <= 18: {
      levelGeneral = 'belowAverage';
      break;
    }
    case results.all.correctAnswerAmount <= 24: {
      levelGeneral = 'average';
      break;
    }
    case results.all.correctAnswerAmount <= 29: {
      levelGeneral = 'aboveAverage';
      break;
    }
    case results.all.correctAnswerAmount >= 30: {
      levelGeneral = 'high';
      break;
    }
  }
  const finalResult = calcFinalResult(results);
  return {
    ...finalResult,
    levelGeneral,
  };
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
