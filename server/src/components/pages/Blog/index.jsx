import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import style from './style.module.scss';
import getAxiosApi from '../../../api';
import env from '../../../../../config/env';

const Blog = () => {
  const [blogArticles, setBlogArticles] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:${env.portWP}/api/blog`)
      .then(res => res.json())
      .then(res => setBlogArticles(res.blog));
  }, []);

  return (
    <div>
      {blogArticles
        ? blogArticles.map((element, index) => {
            return <div>{element.title}</div>;
          })
        : 'нет записей'}
    </div>
  );
};

export default { component: Blog };
