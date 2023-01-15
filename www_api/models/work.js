const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkSchema = new Schema({
  name: { type: String, required: true, maxLength: 20 },
  pages: { type: Number, required: true },
  description: { type: String },
  genre: { type: String },
});

module.exports = mongoose.model('Work', WorkSchema);
