import { SLIDER_CIRCLE, SLIDER_LEFT, SLIDER_RIGHT } from './constants';

export const sliderRightAction = () => ({
  type: SLIDER_RIGHT,
});

export const sliderLeftAction = () => ({
  type: SLIDER_LEFT,
});

export const circleSliderAction = i => ({
  type: SLIDER_CIRCLE,
  index: i,
});
