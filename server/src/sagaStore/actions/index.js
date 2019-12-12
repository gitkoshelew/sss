export {
  authFormChange,
  authFetchLogIn,
  authFetchLogOut,
  authFetchRegister,
  authRegisterFail,
  authSuccess,
  authFail,
} from './auth';

export { adminsFetch, adminsSuccess, adminsFail } from './admins';

export { currentUserFetch, currentUserSuccess, currentUserFail } from './currentUser';

export { usersFetch, usersSuccess, usersFail } from './users';

export {
  contactsChangeInputAction,
  constactsFocusInputAction,
  constactsBlurInputAction,
  constactsCommentAction,
  contactsAdventureItemAction,
  constctsSendFormAction,
} from './contacts';

export { reviewsChangeInputAction, reviewsSendFormAction } from './reviews';

export { headerNavOpenAction } from './nav';

export { sliderRightAction, sliderLeftAction, sliderCircleAction } from './slider';

export { testIncrement, testDecrement, testEnd, testAnsverValidation } from './test';
