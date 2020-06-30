const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const blogSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    author: { type: String },
    title: { type: String, required: true, trim: true },
    content: [
      {
        type: { type: String, required: true },
        value: { type: String },
        alt: { type: String, trim: true },
        title: { type: String, trim: true },
        level: { type: Number || String },
      },
    ],
    text: [String],
    image: { type: String },
    date: { type: Date },
  },
  { timestamps: true }
);

const blog = model('blogShema', blogSchema);

module.exports = blog;
