import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import env from '../../../../../config/env';
import {
  blogFetchSingle,
  blogSingleTextChange,
  blogSingleIsEditable,
} from '../../../sagaStore/actions';
import styles from './style.scss';

const SinglePost = ({
  actionBlogFetchSingle,
  actionBlogSingleTextChange,
  actionBlogSingleIsEditable,
  blogSingleArticle,
  contentEditable,
  match: {
    params: { id },
  }, // const id = match.params.id
}) => {
  // const {params} = match; = const params = match.params;
  // const {id} = params; = const id = params.id

  const clickHandler = () => {
    if (contentEditable) {
      localStorage.setItem('content', JSON.stringify(blogSingleArticle));
    }
    actionBlogSingleIsEditable();
  };

  const onchange = e => {
    const newBlogArticle = { name: e.target.name, value: e.target.value };
    actionBlogSingleTextChange(newBlogArticle);
  };

  useEffect(() => {
    const content = localStorage.getItem('content');

    if (content && JSON.parse(content).id == id) {
      const article = JSON.parse(content);
      const newText = { name: 'text', value: article.text };
      const newTitle = { name: 'title', value: article.title };
      actionBlogSingleTextChange(newText);
      actionBlogSingleTextChange(newTitle);
      return;
    }
    actionBlogFetchSingle(id);
  }, []);

  return blogSingleArticle ? (
    <div className="single-page-blog col-10">
      <a href="http://localhost:8041/blog" className="single-page-blog__breadcrumbs">
        К списку статей
      </a>
      <button onClick={clickHandler} id="edit-single-post" className="single-page-blog__button">
        {contentEditable ? 'Save changes' : 'Edit'}
      </button>
      <div className="single-page-blog__header col-12">
        <h1 className={`${contentEditable ? 'd-none' : ''}  single-page-blog__header__title`}>
          {blogSingleArticle.title}
        </h1>
        <input
          name="title"
          value={blogSingleArticle.title}
          className={contentEditable ? '' : 'd-none'}
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
        className={contentEditable ? '' : 'd-none'}
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
  };
}

const actionCreators = {
  actionBlogFetchSingle: blogFetchSingle,
  actionBlogSingleTextChange: blogSingleTextChange,
  actionBlogSingleIsEditable: blogSingleIsEditable,
};

export default {
  component: connect(mapStateToProps, actionCreators)(SinglePost),
};
