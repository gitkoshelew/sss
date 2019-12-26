import { REVIEWS_INPUT_CHANGE, REVIEWS_SEND_FORM } from './constants';

export const reviewsChangeInputAction = payload => ({
  type: REVIEWS_INPUT_CHANGE,
  payload,
});

export const reviewsSendFormAction = () => ({
  type: REVIEWS_SEND_FORM,
});
