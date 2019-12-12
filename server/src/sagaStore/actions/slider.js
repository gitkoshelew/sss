import { SLIDER_CHANGE, SLIDER_PREV, SLIDER_NEXT } from './constants';

export const sliderRightAction = () => ({
  type: SLIDER_NEXT,
});

export const sliderLeftAction = () => ({
  type: SLIDER_PREV,
});

export const sliderCircleAction = payload => ({
  type: SLIDER_CHANGE,
  payload,
});
