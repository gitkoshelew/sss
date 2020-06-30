const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const adminSchema = new Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, required: true, unique: true, index: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  salt: String,
  role: { type: String, default: 'manager' },
});

const admin = model('adminShema', adminSchema);

module.exports = { admin };
