const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const blogSchema = new Schema({
  id: { type: String, required: true, unique: true },
  author: { type: String },
  title: { type: String, required: true },
  content: [
    {
      type: { type: String, required: true },
      value: { type: String },
      alt: { type: String },
      title: { type: String },
      level: { type: Number || String },
    },
  ],
  text: [String],
  image: { type: String },
  date: { type: Date },
});

const blog = model('blogShema', blogSchema);

module.exports = blog;
