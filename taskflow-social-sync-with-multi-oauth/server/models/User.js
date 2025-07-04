
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  avatar: String,
  provider: String,
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
