const { Router } = require('express');
const requirePassport = require('../../middlewares/requirePassport');
const requireToken = require('../../middlewares/requireToken');
const router = Router();

const Blog = require('../../models/Blog');

router.get('/', async (req, res) => {
  try {
    const limit = Number(req.query.limit);
    const page = Number(req.query.page);

    if (req.query.offset) {
      const offset = Number(req.query.offset);
      const blog = await Blog.find({}).skip(offset).limit(limit).sort({ id: -1 });
      const count = await Blog.count({});

      const mapBlog = blog.map(({ id, title, text, date }) => ({
        id,
        title,
        text,
        date,
      }));

      res.json({ blog: mapBlog, count, message: 'Бесконечный скрол' });
    } else {
      const blog = await Blog.find({})
        .skip(limit * (page - 1))
        .limit(limit)
        .sort({ id: -1 });
      const count = await Blog.count({});

      const mapBlog = blog.map(({ id, title, text, date }) => ({
        id,
        title,
        text,
        date,
      }));

      res.json({ blog: mapBlog, count, message: 'Статьи' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'went wrong try again' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const singleArticle = await Blog.findOne({ id: req.params.id });

    if (!singleArticle) {
      res.status(404).json({ error: 'Статья не найдена' });
    }
    res.json({ singleArticle, message: 'Одна запись' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'went wrong try again' });
  }
});

router.post('/add-post', async (req, res) => {
  try {
    console.log(req.body);
    const { title, text, content, author, id } = req.body;

    const checkUrl = await Blog.findOne({ id: id });

    if (checkUrl) {
      res.status(404).json({ message: 'Статья с таким ID уже существует.' });
      return;
    }

    const newArticle = new Blog({
      title,
      text,
      content,
      author: author || 'dkosheleu',
      date: new Date(),
      id,
    });
    await newArticle.save();
    res.json({ newArticle, message: 'Запись успешно создана!' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'went wrong try again' });
  }
});

router.put('/edit', async (req, res) => {
  const article = req.body;
  try {
    const answer = await Blog.replaceOne({ id: article.id }, article);
    if (!answer.nModified) {
      res.status(404).json({ error: 'Не получилось сохранить' });
    }
    res.json({ singleArticle: article, message: 'Запись успешно сохранена' });
  } catch (e) {
    res.status(500).json({ error: 'went wrong try again' });
  }
});

module.exports = router;
