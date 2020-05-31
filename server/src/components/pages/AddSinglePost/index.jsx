import React, { useEffect, useState, useRef } from 'react';
import ReactQuill from 'react-quill';
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
import styles from './style.module.scss';
import cancel from '../../../assets/images/close.png';

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

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
      щ: 'sch',
      ъ: space,
      ы: 'y',
      ь: space,
      э: 'e',
      ю: 'u',
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

  const changeInputHandler = (name, value, index) => {
    if (name == 'id' && value !== '') {
      const lowerCaseOldUrl = value.toLowerCase();
      const newUrl = translit(lowerCaseOldUrl);
      actionNewPostInutChange(name, newUrl, index);
    } else {
      actionNewPostInutChange(name, value, index);
    }
  };

  const sendNewPost = () => {
    actionCreateNewPost();
  };

  const translateTitleHandler = () => {
    const englishTitle = translit(content[0].value.trim().toLowerCase());
    actionNewPostInutChange('id', englishTitle, 0);
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
    if (!e.target.value) return;
    actionCreatePostSelectBlock(e.target.value);
  };

  const selectOnDeleteHandler = index => {
    console.log('delete hui');
    actionCreatePostDeleteBlock(index);
  };

  const textSelectHanlder = e => {
    console.log(e);

    // let text = '';
    // if (window.getSelection) {
    //   text = window.getSelection();
    // }
    // console.log(text);
    // } else if (document.getSelection) {
    //   txt = document.getSelection();
    // } else if (document.selection) {
    //   txt = document.selection.createRange().text;
    // }
    // console.log(txt);
  };

  return (
    <div className={styles.add_post}>
      <div className={`${styles.add_post_page} col-10 ma`}>
        <h1 className={styles.add_post_page_title}>Создать пост</h1>
        <div className={styles.add_post_page_form}>
          <div className={styles.add_post_page_text}>
            {content.map((element, index) => {
              if (element.type == 'title') {
                return (
                  <div className={styles.add_item}>
                    <div className={styles.id_block}>
                      <div className={styles.id_site}>http://localhost/</div>
                      <input
                        className={styles.id_input_field}
                        type="text"
                        name="id"
                        onChange={e => changeInputHandler(e.target.name, e.target.value, index)}
                        value={element.id}
                        placeholder="ID записи"
                      />
                    </div>

                    <input
                      type="text"
                      name="value"
                      onChange={e => changeInputHandler(e.target.name, e.target.value, index)}
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
                      onChange={e => changeInputHandler(e.target.name, e.target.value, index)}
                    />
                    <label>
                      <h2>Выберите уровень заголовка</h2>
                      <select
                        name="level"
                        value={element.level}
                        onChange={e => changeInputHandler(e.target.name, e.target.value, index)}
                      >
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                      </select>
                    </label>
                    <div className={styles.changeBlock}>
                      <select onChange={e => selectOnChangeHandler(e, index)}>
                        <option value="h">Заголовок</option>
                        <option value="text">Текст</option>
                        <option value="image">Картинку</option>
                      </select>

                      <img
                        src={cancel}
                        className={styles.item_delete}
                        onClick={() => selectOnDeleteHandler(index)}
                      />
                    </div>
                  </div>
                );
              }

              if (element.type == 'text') {
                return (
                  <div className={styles.add_item}>
                    <h2>Текст</h2>

                    <ReactQuill
                      className={styles.inputField}
                      modules={modules}
                      formats={formats}
                      value={element.value}
                      onChange={value => changeInputHandler('value', value, index)}
                    />

                    <div className={styles.changeBlock}>
                      <select onChange={e => selectOnChangeHandler(e, index)}>
                        <option value="h">Заголовок</option>
                        <option value="text">Текст</option>
                        <option value="image">Картинку</option>
                      </select>
                      <img
                        src={cancel}
                        className={styles.item_delete}
                        onClick={() => selectOnDeleteHandler(index)}
                      />
                    </div>
                  </div>
                );
              }
              if (element.type == 'image') {
                return (
                  <div className={styles.add_item}>
                    <h2>Изображение</h2>
                    {
                      <ReactQuill
                        modules={{ toolbar: [['image']] }}
                        formats={['image']}
                        value={element.value}
                        onChange={value => changeInputHandler('value', value, index)}
                      />
                    }
                    <input
                      type="text"
                      name="title"
                      value={element.title}
                      placeholder="Добавить title"
                      onChange={e => changeInputHandler(e.target.name, e.target.value, index)}
                    />
                    <input
                      type="text"
                      name="alt"
                      value={element.alt}
                      placeholder="Добавить ALT картинки"
                      onChange={e => changeInputHandler(e.target.name, e.target.value, index)}
                    />
                    <div className={styles.changeBlock}>
                      <select onChange={e => selectOnChangeHandler(e, index)}>
                        <option value="h">Заголовок</option>
                        <option value="text">Текст</option>
                        <option value="image">Картинку</option>
                      </select>
                      <img
                        src={cancel}
                        className={styles.item_delete}
                        onClick={() => selectOnDeleteHandler(index)}
                      />
                    </div>
                  </div>
                );
              }

              return (
                <div className={styles.add_item}>
                  <h2>Текст</h2>

                  <ReactQuill
                    className={styles.inputField}
                    modules={modules}
                    formats={formats}
                    value={element.value}
                    onChange={value => changeInputHandler('value', value, index)}
                  />

                  <div className={styles.changeBlock}>
                    <select onChange={e => selectOnChangeHandler(e, index)}>
                      <option value="h">Заголовок</option>
                      <option value="text">Текст</option>
                      <option value="image">Картинку</option>
                    </select>
                    <img
                      src={cancel}
                      className={styles.item_delete}
                      onClick={() => selectOnDeleteHandler(index)}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.add_new_block} onClick={addBlockButton}>
            <span className={styles.plus}>+</span>
            <button className={styles.add_new_block_item} onClick={selectOnCreateHandler} value="h">
              Заголовок
            </button>
            <button
              className={styles.add_new_block_item}
              onClick={selectOnCreateHandler}
              value="text"
            >
              Текст
            </button>
            <button
              className={styles.add_new_block_item}
              onClick={selectOnCreateHandler}
              value="image"
            >
              Изображение
            </button>
          </div>

          <button
            className={styles.add_new_block_item}
            className={styles.create_post_button}
            onClick={sendNewPost}
          >
            Создать
          </button>
        </div>
      </div>
      {status && (
        <div
          className={`${styles.add_post_page_success} ${
            modalHidden ? `${styles.add_post_page_success_hidden}` : ''
          }`}
        >
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
