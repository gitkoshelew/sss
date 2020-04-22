import React, { useEffect, useState } from 'react';
import styles from './style.scss';
import env from '../../../../../config/env';

const SinglePost = ({
  match: {
    params: { id },
  }, // const id = match.params.id
}) => {
  // const {params} = match; = const params = match.params;
  // const {id} = params; = const id = params.id

  const [blogSingleArticle, setBlogSingleArticle] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:${env.apiPort}/blog/${id}`)
      .then(res => res.json())
      .then(res => {
        setBlogSingleArticle(res.singleArticle);
      });
  }, []);
  return blogSingleArticle ? <div>{blogSingleArticle.title}</div> : <div>Загрузка</div>;
};

export default { component: SinglePost };
