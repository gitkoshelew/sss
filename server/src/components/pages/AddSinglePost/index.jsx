import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import {
  newPostInutChange,
  createNewPost,
  createPostChangeStatus,
  createPostAddBlock,
  createPostSelectBlock,
  createPostDeleteBlock,
  createPostChangeBlock,
} from '../../../sagaStore/actions';
import styles from './style.scss';

const AddSinglePost = ({
  actionNewPostInutChange,
  actionCreateNewPost,
  actionCreatePostChangeStatus,
  actionCreatePostAddBlock,
  actionCreatePostSelectBlock,
  actionCreatePostDeleteBlock,
  actionCreatePostChangeBlock,
  newPost,
  title,
  content,
  status,
  message,
  id,
  select,
  // image,
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

  const getNewPostData = (e, index) => {
    if (e.target.name == 'id' && e.target.value !== '') {
      const lowerCaseOldUrl = e.target.value.toLowerCase();
      const newUrl = translit(lowerCaseOldUrl);
      actionNewPostInutChange(e.target.name, newUrl, index);
    } else {
      actionNewPostInutChange(e.target.name, e.target.value, index);
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

  const addBlockButton = () => {
    actionCreatePostAddBlock();
  };

  const selectOnChangeHandler = (e, index) => {
    actionCreatePostChangeBlock(e.target.value, index);
  };

  const selectOnCreateHandler = e => {
    actionCreatePostSelectBlock(e.target.value);
  };

  const selectOnDeleteHandler = index => {
    actionCreatePostDeleteBlock(index);
  };
  return (
    <div className="wrap">
      <div className="add-post-page col-10 ma">
        <h1 className="add-post-page__title">Создать пост</h1>
        <div className="add-post-page__form">
          <div className="add-content" onClick={addBlockButton}>
            {select ? 'Закрыть' : 'Добавить'}
          </div>
          {select && (
            <select onChange={selectOnCreateHandler}>
              <option value="h">Заголовок</option>
              <option value="text">Текст</option>
              <option value="image">Картинку</option>
              <option value="link">Ссылку</option>
            </select>
          )}
          <div className="add-post-page__text">
            {content.map((element, index) => {
              if (element.type == 'title') {
                return (
                  <div className={styles.add_item}>
                    <input
                      type="text"
                      name="id"
                      onChange={e => getNewPostData(e, index)}
                      value={element.id}
                      placeholder="URL записи"
                    />
                    <input
                      type="text"
                      name="value"
                      onChange={e => getNewPostData(e, index)}
                      onBlur={translateTitleHandler}
                      value={element.title}
                      placeholder="Введите название записи"
                    />
                  </div>
                );
              }

              if (element.type == 'h') {
                return (
                  <div className={styles.add_item}>
                    <h2>Заголовок</h2>
                    <input
                      type="text"
                      name="value"
                      value={element.value}
                      placeholder="Текст Заголовка"
                      onChange={e => getNewPostData(e, index)}
                    />
                    <label>
                      <h2>Выберите уровень заголовка</h2>
                      <select
                        name="level"
                        value={element.level}
                        onChange={e => getNewPostData(e, index)}
                      >
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                      </select>
                    </label>
                    <select onChange={e => selectOnChangeHandler(e, index)}>
                      <option value="h">Заголовок</option>
                      <option value="text">Текст</option>
                      <option value="image">Картинку</option>
                      <option value="link">Ссылку</option>
                    </select>
                    <button className={styles.item_delete}>X</button>
                  </div>
                );
              }

              if (element.type == 'text') {
                return (
                  <div className={styles.add_item}>
                    <h2>Текст</h2>
                    <textarea
                      name="text"
                      onChange={e => getNewPostData(e, index)}
                      value={element.value}
                      placeholder="Введите текст"
                    />
                    <select onChange={e => selectOnChangeHandler(e, index)}>
                      <option value="h">Заголовок</option>
                      <option value="text">Текст</option>
                      <option value="image">Картинку</option>
                      <option value="link">Ссылку</option>
                    </select>
                    <button className={styles.item_delete}>X</button>
                  </div>
                );
              }
              if (element.type == 'image') {
                return (
                  <div className={styles.add_item}>
                    <h2>Картинка</h2>
                    <label className={styles.add_image_button}>
                      Добавить изображение
                      <input
                        style={{ visibility: 'hidden' }}
                        type="file"
                        name="value"
                        value={element.value}
                        accept=".jpg, .jpeg, .png, .webp"
                        onChange={e => getNewPostData(e, index)}
                      />
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={element.title}
                      placeholder="Добавить title"
                      onChange={e => getNewPostData(e, index)}
                    />
                    <input
                      type="text"
                      name="alt"
                      value={element.alt}
                      placeholder="Добавить ALT картинки"
                      onChange={e => getNewPostData(e, index)}
                    />
                    <img src={element.value} title={element.title} alt={element.alt} />
                    <select onChange={e => selectOnChangeHandler(e, index)}>
                      <option value="h">Заголовок</option>
                      <option value="text">Текст</option>
                      <option value="image">Картинку</option>
                      <option value="link">Ссылку</option>
                    </select>
                    <button className={styles.item_delete}>X</button>
                  </div>
                );
              }

              return (
                <div className={styles.add_item}>
                  <h2>Ссылка</h2>
                  <input
                    type="text"
                    name="value"
                    value={element.value}
                    placeholder="Добавить текст ссылки"
                    onChange={e => getNewPostData(e, index)}
                  />
                  <input
                    type="text"
                    name="href"
                    value={element.href}
                    placeholder="Добавить ссылку"
                    onChange={e => getNewPostData(e, index)}
                  />
                  <select onChange={e => selectOnChangeHandler(e, index)}>
                    <option value="h">Заголовок</option>
                    <option value="text">Текст</option>
                    <option value="image">Картинку</option>
                    <option value="link">Ссылку</option>
                  </select>
                  <button className={styles.item_delete}>X</button>
                </div>
              );
            })}
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
    content: state.newPost.data,
    id: state.newPost.data.id,
    status: state.newPost.status,
    message: state.newPost.message,
    select: state.newPost.select,
  };
}

const actionCreators = {
  actionNewPostInutChange: newPostInutChange,
  actionCreateNewPost: createNewPost,
  actionCreatePostChangeStatus: createPostChangeStatus,
  actionCreatePostAddBlock: createPostAddBlock,
  actionCreatePostSelectBlock: createPostSelectBlock,
  actionCreatePostDeleteBlock: createPostDeleteBlock,
  actionCreatePostChangeBlock: createPostChangeBlock,
};

export default {
  component: connect(mapStateToProps, actionCreators)(AddSinglePost),
};
