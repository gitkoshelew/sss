import {
  TEST_END,
  TEST_NUMBER_DECREMENT,
  TEST_NUMBER_DECREMENT,
  TEST_ANSWER_VALIDATION,
} from './constants';

export const testIncrement = () => ({
  type: TEST_NUMBER_INCREMENT,
});

export const testDecrement = () => ({
  type: TEST_NUMBER_DECREMENT,
});

export const testEnd = () => ({
  type: TEST_END,
});

export const testAnsverValidation = i => ({
  type: TEST_ANSWER_VALIDATION,
  checkbox: i,
});
