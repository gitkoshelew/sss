import {
  TEST_END,
  TEST_CHECK,
  TEST_NUMBER_DECREMENT,
  TEST_NUMBER_INCREMENT,
  TEST_ANSWER_VALIDATION,
} from './constants';

export const testIncrementAction = () => ({
  type: TEST_NUMBER_INCREMENT,
});

export const testDecrementAction = () => ({
  type: TEST_NUMBER_DECREMENT,
});

export const testEndAction = () => ({
  type: TEST_END,
});

export const testCheckAction = payload => ({
  type: TEST_CHECK,
  payload,
});

export const testValidationAction = payload => ({
  type: TEST_ANSWER_VALIDATION,
  payload,
});
