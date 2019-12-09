import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import adminsReducer from './adminsReducer';
import logFormReducer from './logFormReducer';
import currentUserReducer from './currentUserReducer';

export default combineReducers({
  users: usersReducer,
  currentUser: currentUserReducer,  
  auth: authReducer,
  admins: adminsReducer,
  logForm: logFormReducer
});
