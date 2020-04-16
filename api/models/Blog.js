const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const blogSchema = new Schema({
  id: { type: String, required: true, unique: true },
  author: { type: String },
  title: { type: String, required: true },
  text: [{ type: String }],
  image: { type: String },
  date: {type: Date}
});

const blog = model('blogShema', blogSchema);

module.exports = blog;
