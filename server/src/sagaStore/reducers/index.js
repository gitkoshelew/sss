import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import authReducer from './authReducer/index';
import adminsReducer from './adminsReducer';
import currentUserReducer from './currentUserReducer';

export default combineReducers({
  users: usersReducer,
  currentUser: currentUserReducer,
  auth: authReducer,
  admins: adminsReducer,
});
