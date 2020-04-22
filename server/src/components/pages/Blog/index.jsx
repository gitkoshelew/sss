import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';
import { blogFetch } from '../../../sagaStore/actions';

const Blog = ({ blogArticles, blogFetchAction }) => {
  useEffect(() => {
    blogFetchAction();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          {blogArticles
            ? blogArticles.map((element, index) => {
                const firstPartOfText = element.text[0];
                const preview = firstPartOfText.slice(0, 140);
                return (
                  <div className={styles.singlePost}>
                    <div className={styles.singlePostHeader}>
                      <Link to={`/blog/${element.id}`} className={styles.singlePostTitle}>
                        {element.title}
                      </Link>
                      <div className={styles.singlePostDate}>{element.date}</div>
                    </div>
                    <div className={styles.singlePostText}>{preview}...</div>
                    <div className={styles.singlePostContinueReading}>
                      <Link to={`/blog/${element.id}`} className={styles.link}>
                        Читать далее &gt;
                      </Link>
                    </div>
                  </div>
                );
              })
            : 'нет записей'}
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    blogArticles: state.blog.data,
  };
}

const actionCreators = {
  blogFetchAction: blogFetch,
};

export default {
  component: connect(mapStateToProps, actionCreators)(Blog),
};
