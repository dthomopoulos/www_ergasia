const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BiographySchema = new Schema({
  title: { type: String, required: true, maxLength: 20 },
  content: { type: String },
});

module.exports = mongoose.model('Biography', BiographySchema);
