import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import env from '../../../../../config/env';
import {
  blogFetchSingle,
  blogSingleTextChange,
  blogSingleIsEditable,
  blogPutSingle,
} from '../../../sagaStore/actions';
import styles from './style.module.scss';

const SinglePost = ({
  actionBlogFetchSingle,
  actionBlogSingleTextChange,
  actionBlogSingleIsEditable,
  actionBlogPutSingle,
  blogSingleArticle,
  contentEditable,
  match: {
    params: { id },
  }, // const id = match.params.id
}) => {
  // const {params} = match; = const params = match.params;
  // const {id} = params; = const id = params.id
  const [articleDraft, setArticleDraft] = useState(false);

  const clickHandler = () => {
    if (contentEditable) {
      localStorage.setItem('content', JSON.stringify(blogSingleArticle));
    }
    actionBlogSingleIsEditable();
  };

  const putNewTextHandler = () => {
    localStorage.removeItem('content');
    actionBlogPutSingle(blogSingleArticle);
  };

  const onchange = e => {
    const newBlogArticleValue = { [e.target.name]: e.target.value };
    actionBlogSingleTextChange(newBlogArticleValue);
  };

  useEffect(() => {
    const content = localStorage.getItem('content');

    if (content && JSON.parse(content).id == id) {
      const article = JSON.parse(content);
      actionBlogSingleTextChange(article);
      return;
    }
    actionBlogFetchSingle(id);
  }, []);

  return blogSingleArticle ? (
    <div className={`${styles.single_page_blog} col-10`}>
      <Link to="/blog" className={styles.single_page_blog_breadcrumbs}>
        К списку статей
      </Link>
      <h1>{blogSingleArticle.title}</h1>
      {blogSingleArticle.text.map(element => {
        return <p>{element}</p>;
      })}

      {blogSingleArticle.content.map(element => {
        if (element.type == 'image') {
          console.log(element);
          const createMarkup = () => {
            return {
              __html: element.value
                .replace('<img ', `<img title="${element.title}" alt="${element.alt}"`)
                .replace('<p>', '')
                .replace('</p>', ''),
            };
          };

          return (
            <div
              className={`${styles.single_page_blog_content} ${element.className}`}
              dangerouslySetInnerHTML={createMarkup()}
            />
          );
        }

        if (element.type == 'text') {
          const createMarkup = () => {
            return {
              __html: element.value,
            };
          };

          return (
            <div
              className={styles.single_page_blog_content}
              dangerouslySetInnerHTML={createMarkup()}
            />
          );
        }

        if (element.type == 'h') {
          let Tag = null;

          switch (+element.level) {
            case 2:
              Tag = ({ children }) => <h2>{children}</h2>;
              break;
            case 3:
              Tag = ({ children }) => <h3>{children}</h3>;
              break;
            case 4:
              Tag = ({ children }) => <h4>{children}</h4>;
              break;
            case 5:
              Tag = ({ children }) => <h5>{children}</h5>;
              break;
            default:
              Tag = ({ children }) => <h6>{children}</h6>;
          }

          return <Tag text="Текст">{element.value}</Tag>;
        }

        return null;
      })}

      {/* <button onClick={clickHandler} id="edit-single-post" className="single_page_blog__button">
        {contentEditable ? 'Preview' : 'Edit'}
      </button>
      <button
        onClick={putNewTextHandler}
        id="edit-single-post"
        className={`${!contentEditable ? 'd-none' : ''}  single_page_blog__button`}
      >
        Save
      </button>
      <button>{articleDraft ? 'Было' : 'Стало'}</button>

      <div className="single_page_blog__header col-12">
        <h1 className={`${contentEditable ? 'd-none' : ''}  single_page_blog__header__title`}>
          {blogSingleArticle.title}
        </h1>
        <input
          name="title"
          value={blogSingleArticle.title}
          className={contentEditable ? 'single_page_blog__input-title' : 'd-none'}
          onChange={onchange}
        />
        <div className="single_page_blog__header__date">{blogSingleArticle.date}</div>
      </div>
      <div className={`${contentEditable ? 'd-none' : ''} single_page_blog__content`}>
        {blogSingleArticle.text}
      </div>
      <textarea
        name="text"
        value={blogSingleArticle.text}
        className={contentEditable ? 'single_page_blog__textarea' : 'd-none'}
        onChange={onchange}
      /> */}
    </div>
  ) : (
    <div>Загрузка</div>
  );
};

function mapStateToProps(state) {
  return {
    blogSingleArticle: state.blogSingle.data,
    contentEditable: state.blogSingle.editable,
    newPost: state.newPost.data,
    title: state.newPost.data.title,
    text: state.newPost.data.text,
  };
}

const actionCreators = {
  actionBlogFetchSingle: blogFetchSingle,
  actionBlogSingleTextChange: blogSingleTextChange,
  actionBlogSingleIsEditable: blogSingleIsEditable,
  actionBlogPutSingle: blogPutSingle,
};

export default {
  component: connect(mapStateToProps, actionCreators)(SinglePost),
};
