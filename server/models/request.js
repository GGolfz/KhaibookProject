const mongoose = require('mongoose')
const Schema = mongoose.Schema
const itemSchema = new Schema(
  {
    bookID: {
      type: String,
      require: true
    },
    name: {
      type: String,
      require: true
    },
    price: {
      type: Number,
      require: true
    },
    buyamount: {
      type: Number,
      require: true
    }
  },
  { timestamps: true }
)
const requestSchema = new Schema(
  {
    userID: {
      type: String,
      require: true
    },
    address: {
      type: String,
      require: true
    },
    status: {
      type: String,
      require: true
    },
    overallprice: {
      type: Number,
      require: true
    },
    item: [itemSchema]
  },
  { timestamps: true }
)
const Request = mongoose.model('Request', requestSchema)
module.exports = Request
