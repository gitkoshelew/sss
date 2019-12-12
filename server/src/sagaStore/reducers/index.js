import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import authReducer from './authReducer/index';
import adminsReducer from './adminsReducer';
import currentUserReducer from './currentUserReducer';
import contactFormReducer from './contactFormReducer';
import reviewsReducer from './reviewsReducer';
import ringsSliderReducer from './ringsSliderReducer';

export default combineReducers({
  users: usersReducer,
  currentUser: currentUserReducer,
  auth: authReducer,
  admins: adminsReducer,
  contactForm: contactFormReducer,
  reviews: reviewsReducer,
  ringsSlider: ringsSliderReducer,
});
