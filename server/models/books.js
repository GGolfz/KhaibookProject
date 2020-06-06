const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bookSchema = new Schema(
  {
    name: {
      type: String,
      require: true
    },
    author: {
      type: String,
      require: true
    },
    price: {
      type: Number,
      require: true
    },
    amount: {
      type: Number,
      require: true
    }
  },
  { timestamps: true }
)
const Books = mongoose.model('Book', bookSchema)
module.exports = Books
