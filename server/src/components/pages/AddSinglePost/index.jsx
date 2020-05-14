import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import {
  newPostInutChange,
  createNewPost,
  createPostChangeStatus,
} from '../../../sagaStore/actions';
import styles from './style.scss';

const AddSinglePost = ({
  actionNewPostInutChange,
  actionCreateNewPost,
  actionCreatePostChangeStatus,
  newPost,
  title,
  text,
  status,
  message,
  id,
}) => {
  let timeOut = null;
  let modalClassTimeOut = null;

  const [modalHidden, setModalHidden] = useState(false);

  useEffect(() => {
    if (status) {
      timeOut = setTimeout(confirmModalHandler, 20000);
      modalClassTimeOut = setTimeout(() => setModalHidden(true), 10);
    }
    return () => {
      clearTimeout(timeOut);
      clearTimeout(modalClassTimeOut);
    };
  }, [status]);

  const translit = str => {
    const space = '-';
    let link = '';
    const transl = {
      а: 'a',
      б: 'b',
      в: 'v',
      г: 'g',
      д: 'd',
      е: 'e',
      ё: 'e',
      ж: 'zh',
      з: 'z',
      и: 'i',
      й: 'j',
      к: 'k',
      л: 'l',
      м: 'm',
      н: 'n',
      о: 'o',
      п: 'p',
      р: 'r',
      с: 's',
      т: 't',
      у: 'u',
      ф: 'f',
      х: 'h',
      ц: 'c',
      ч: 'ch',
      ш: 'sh',
      щ: 'sh',
      ъ: space,
      ы: 'y',
      ь: space,
      э: 'e',
      ю: 'yu',
      я: 'ya',
    };
    // if (str != '') {
    //   return str.toLowerCase();
    // }

    for (let i = 0; i < str.length; i += 1) {
      if (/[а-яё]/.test(str.charAt(i))) {
        // заменяем символы на русском
        link += transl[str.charAt(i)];
      } else if (/[a-z0-9]/.test(str.charAt(i))) {
        // символы на анг. оставляем как есть
        link += str.charAt(i);
      } else if (link.slice(-1) !== space) {
        link += space; // прочие символы заменяем на space
      }
    }
    return link;
  };

  const getNewPostData = e => {
    if (e.target.name == 'id' && e.target.value !== '') {
      const lowerCaseOldUrl = e.target.value.toLowerCase();
      const newUrl = translit(lowerCaseOldUrl);
      actionNewPostInutChange({
        name: e.target.name,
        value: newUrl,
      });
    } else {
      actionNewPostInutChange({
        name: e.target.name,
        value: e.target.value,
      });
    }
  };
  const sendNewPost = () => {
    actionCreateNewPost();
  };

  const translateTitleHandler = () => {
    const englishTitle = translit(title.trim().toLowerCase());
    actionNewPostInutChange({
      name: 'id',
      value: englishTitle,
    });
  };

  const confirmModalHandler = () => {
    if (status) {
      actionCreatePostChangeStatus(false);
      setModalHidden(false);
    }
  };

  return (
    <div className="wrap">
      <div className="add-post-page col-10 ma">
        <h1 className="add-post-page__title">Создать пост</h1>
        <div className="add-post-page__form">
          <div className="add-post-page__title">
            <input type="text" name="id" onChange={getNewPostData} value={id} />
            <input
              type="text"
              name="title"
              onChange={getNewPostData}
              onBlur={translateTitleHandler}
              value={title}
            />
          </div>
          <div className="add-post-page__text">
            <textarea name="text" onChange={getNewPostData} value={text} />
          </div>
          <button onClick={sendNewPost}>Создать</button>
        </div>
      </div>
      {status && (
        <div className={`add-post-page__post-success ${modalHidden ? ' hidden' : ''}`}>
          <div>
            <div>{message}</div>
            <div>
              <button onClick={confirmModalHandler}>Ок</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    newPost: state.newPost.data,
    title: state.newPost.data.title,
    text: state.newPost.data.text,
    id: state.newPost.data.id,
    status: state.newPost.status,
    message: state.newPost.message,
  };
}

const actionCreators = {
  actionNewPostInutChange: newPostInutChange,
  actionCreateNewPost: createNewPost,
  actionCreatePostChangeStatus: createPostChangeStatus,
};

export default {
  component: connect(mapStateToProps, actionCreators)(AddSinglePost),
};
