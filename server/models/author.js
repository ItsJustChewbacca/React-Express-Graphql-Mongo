const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const authorSchema = new Schema({
  name: string,
  age: number
});

module.exports = mongoose.model('Author', authorSchema);