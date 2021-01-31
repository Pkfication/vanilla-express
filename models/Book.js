const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: { 
    type: String,
    unique: true 
  },
  description: String,
  author: String,
  pages: Number,
  price: Number,
  category: String
});

bookSchema.statics.Exists = async function(title) {
  return await this.find({ title }, { _id: 1}).limit(1)
}

bookSchema.statics.search = async function(query) {
  return await this.find({ $text: { $search: query }})
}

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;