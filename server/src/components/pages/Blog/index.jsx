import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { debounce } from 'debounce';
import styles from './style.module.scss';
import { blogFetch, blogChangePostsLimit } from '../../../sagaStore/actions';

const Blog = ({
  blogArticles,
  blogFetchAction,
  blogChangePostsLimitAction,
  match: {
    params: { pageNumber },
  },
  history,
  limit,
  counter,
  loader,
}) => {
  const [isPaginated, setIsPaginated] = useState(true);
  const [pageArray, setPageArray] = useState([]);

  useEffect(() => {
    blogFetchAction(pageNumber || 1);
  }, [pageNumber, isPaginated]);

  useEffect(() => {
    const debounceFetchArticles = debounce(() => {
      if (!loader && document.body.offsetHeight - 100 < window.innerHeight + window.pageYOffset) {
        blogFetchAction(1, true);
      }
    }, 200);

    if (!isPaginated) {
      window.addEventListener('scroll', debounceFetchArticles);
    }
    return () => window.removeEventListener('scroll', debounceFetchArticles);
  }, [isPaginated]);

  useEffect(() => {
    setPageArray(Array(Math.ceil(counter / limit)).fill(null));
  }, [counter, limit]);

  const changePostsLimit = useCallback(
    e => {
      const newLimit = e.target.value;

      if (newLimit == 0) {
        setIsPaginated(false);
        return;
      }

      if (!isPaginated) {
        setIsPaginated(true);
      }

      const difference = newLimit / limit;
      const newPageNumber = pageNumber ? Math.round(pageNumber / difference) : 1;
      blogChangePostsLimitAction(newLimit);

      if (newPageNumber == 1) return;

      history.push(`/blog/page=${newPageNumber}`);
    },
    [setIsPaginated, limit, isPaginated]
  );

  console.log(pageArray);

  return (
    <div className="container">
      <div className={styles.addPostButton}>
        <Link to="/blog/add-post">Сделать пост</Link>
      </div>
      <div className="row">
        <div className="col-8">
          <div className={styles.postPerPageWrapper}>
            <select onChange={changePostsLimit}>
              <option className={styles.changePostCount} value={4}>
                по 4
              </option>
              <option className={styles.changePostCount} value={8}>
                по 8
              </option>
              <option className={styles.changePostCount} value={0}>
                для петушар
              </option>
            </select>
          </div>

          {blogArticles
            ? blogArticles.map((element, index) => {
                let preview = '';
                const firstPartOfText = element.text[0];
                if (!firstPartOfText) {
                  preview = '...';
                } else {
                  preview = firstPartOfText.slice(0, 140);
                }
                return (
                  <div className={styles.singlePost}>
                    <div className={styles.singlePostHeader}>
                      <Link to={`/blog/${element.id}`} className={styles.singlePostTitle}>
                        {element.title}
                      </Link>
                      <div className={styles.singlePostDate}>{element.date}</div>
                    </div>
                    <div className={styles.singlePostText}>{preview}</div>
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
      {isPaginated && (
        <div className={styles.pagination}>
          {pageArray.map((element, index) => {
            if (index === 0) {
              return <Link to="/blog/">1</Link>;
            }
            return <Link to={`/blog/page=${index + 1}`}>{index + 1}</Link>;
          })}
        </div>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    blogArticles: state.blog.data,
    counter: state.blog.count,
    limit: state.blog.limit,
    loader: state.loaders.loaderMain,
  };
}

const actionCreators = {
  blogFetchAction: blogFetch,
  blogChangePostsLimitAction: blogChangePostsLimit,
};

export default {
  component: connect(mapStateToProps, actionCreators)(Blog),
};
