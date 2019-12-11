import { SLIDER_CIRCLE, SLIDER_RIGHT, SLIDER_LEFT } from '../actions/constants';

export const slider = (state = {}, action) => {
  switch (action.type) {
    case SLIDER_RIGHT:
      return {
        ...state,
        prevSlide: state.prevSlide === 5 ? 0 : ++state.prevSlide,
        activeSlide: state.activeSlide === 5 ? 0 : ++state.activeSlide,
        nextSlide: state.nextSlide === 5 ? 0 : ++state.nextSlide,
      };
    case SLIDER_LEFT:
      return {
        ...state,
        prevSlide: state.prevSlide === 0 ? 5 : --state.prevSlide,
        activeSlide: state.activeSlide === 0 ? 5 : --state.activeSlide,
        nextSlide: state.nextSlide === 0 ? 5 : --state.nextSlide,
      };
    case SLIDER_CIRCLE:
      const ind = action.index;
      return {
        ...state,
        prevSlide: ind,
        activeSlide: ind === 5 ? 0 : ind + 1,
        nextSlide: ind >= 4 ? ind % 4 : ind + 2,
      };
    default:
      return state;
  }
};
