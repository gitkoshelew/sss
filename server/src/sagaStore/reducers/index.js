import { combineReducers } from 'redux';
import headerReducer from './headerReducer';
import usersReducer from './usersReducer';
import authReducer from './authReducer/index';
import adminsReducer from './adminsReducer';
import contactFormReducer from './contactFormReducer';
import reviewsReducer from './reviewsReducer';
import ringsSliderReducer from './ringsSliderReducer';
import testReducer from './testReducer';
import loadersReducer from './loadersReducer';

export default combineReducers({
  header: headerReducer,
  users: usersReducer,
  auth: authReducer,
  admins: adminsReducer,
  contactForm: contactFormReducer,
  reviews: reviewsReducer,
  ringsSlider: ringsSliderReducer,
  test: testReducer,
  loaders: loadersReducer,
});
