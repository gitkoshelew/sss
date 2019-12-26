import { SLIDER_CHANGE, SLIDER_NEXT, SLIDER_PREV } from '../actions/constants';

const initialState = {
  prevSlide: 0,
  activeSlide: 1,
  nextSlide: 2,
};

const ringsSliderReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SLIDER_NEXT:
      return {
        ...state,
        prevSlide: state.prevSlide === 5 ? 0 : state.prevSlide + 1,
        activeSlide: state.activeSlide === 5 ? 0 : state.activeSlide + 1,
        nextSlide: state.nextSlide === 5 ? 0 : state.nextSlide + 1,
      };
    case SLIDER_PREV:
      return {
        ...state,
        prevSlide: state.prevSlide === 0 ? 5 : state.prevSlide - 1,
        activeSlide: state.activeSlide === 0 ? 5 : state.activeSlide - 1,
        nextSlide: state.nextSlide === 0 ? 5 : state.nextSlide - 1,
      };
    case SLIDER_CHANGE:
      return {
        ...state,
        prevSlide: payload.index,
        activeSlide: payload.index === 5 ? 0 : payload.index + 1,
        nextSlide: payload.index >= 4 ? payload.index % 4 : payload.index + 2,
      };
    default:
      return state;
  }
};

export default ringsSliderReducer;
