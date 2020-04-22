const { Router } = require('express');
const requirePassport = require('../../middlewares/requirePassport');
const requireToken = require('../../middlewares/requireToken');
const router = Router();
const articles = require('./mockarticles.json');

const Blog = require('../../models/Blog');

router.get('/', async (req, res) => {
  try {
    console.log(articles);
    const blog = articles;
    // const blog = await Blog.find({});

    // if (!blog) {
    //   return res.status(400).json({
    //     message: `no blog now`,
    //   });
    // }

    const mapBlog = blog.map(({ id, title, text, date }) => ({
      id,
      title,
      text,
      date,
    }));

    res.json({ blog: mapBlog, message: 'Статьи' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'went wrong try again' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const singleArticle = articles.find((element, index) => {
      if (element.id === req.params.id) {
        return element;
      }
    });
    if (!singleArticle) {
      res.status(404).json({ error: 'Статья не найдена' });
    }
    res.json({ singleArticle, message: 'Одна запись' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'went wrong try again' });
  }
});

module.exports = router;
