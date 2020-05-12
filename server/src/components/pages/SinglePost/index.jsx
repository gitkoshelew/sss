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
import styles from './style.scss';

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
    <div className="single-page-blog col-10">
      <Link to="/blog" className="single-page-blog__breadcrumbs">
        К списку статей
      </Link>
      <button onClick={clickHandler} id="edit-single-post" className="single-page-blog__button">
        {contentEditable ? 'Preview' : 'Edit'}
      </button>
      <button
        onClick={putNewTextHandler}
        id="edit-single-post"
        className={`${!contentEditable ? 'd-none' : ''}  single-page-blog__button`}
      >
        Save
      </button>
      {/* <button>{articleDraft ? 'Было' : 'Стало'}</button> */}

      <div className="single-page-blog__header col-12">
        <h1 className={`${contentEditable ? 'd-none' : ''}  single-page-blog__header__title`}>
          {blogSingleArticle.title}
        </h1>
        <input
          name="title"
          value={blogSingleArticle.title}
          className={contentEditable ? 'single-page-blog__input-title' : 'd-none'}
          onChange={onchange}
        />
        <div className="single-page-blog__header__date">{blogSingleArticle.date}</div>
      </div>
      <div className={`${contentEditable ? 'd-none' : ''} single-page-blog__content`}>
        {blogSingleArticle.text}
      </div>
      <textarea
        name="text"
        value={blogSingleArticle.text}
        className={contentEditable ? 'single-page-blog__textarea' : 'd-none'}
        onChange={onchange}
      />
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
