const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const userGoogleSchema = new Schema({
  googleId: String,
});

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  links: [{ type: Types.ObjectId, ref: 'Link' }],
});

const userGoogle = model('userGoogleShema', userGoogleSchema);
const user = model('userShema', userSchema);

module.exports = { userGoogle, user };
