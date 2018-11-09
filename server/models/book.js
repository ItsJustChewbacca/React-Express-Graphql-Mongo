const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bookSchema = new Schema({
  name: string,
  genre: string,
  authorid: string
});

module.exports = mongoose.model('Book', bookSchema);