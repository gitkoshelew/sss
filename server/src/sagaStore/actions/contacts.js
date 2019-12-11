import {
  CONTACTS_ADVENTURE_ITEM,
  CONTACTS_COMMENT,
  CONTACTS_INPUT_BLUR,
  CONTACTS_INPUT_CHANGE,
  CONTACTS_INPUT_FOCUS,
  CONTACTS_SEND,
} from './constants';

export const contactsChangeInputAction = i => ({
  type: CONTACTS_INPUT_CHANGE,
  elem: i,
});

export const constactsFocusInputAction = i => ({
  type: CONTACTS_INPUT_FOCUS,
  elem: i,
});

export const constactsBlurInputAction = i => ({
  type: CONTACTS_INPUT_BLUR,
  elem: i,
});

export const constactsCommentAction = () => ({
  type: CONTACTS_COMMENT,
});

export const contactsAdventureItemAction = i => ({
  type: CONTACTS_ADVENTURE_ITEM,
  item: i,
});

export const constctsSendFormAction = () => ({
  type: CONTACTS_SEND,
});
