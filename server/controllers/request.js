/* eslint-disable @typescript-eslint/no-unused-vars */
const Request = require('../models/request')
const Book = require('../models/books')
module.exports = {
  buy: async (req, res) => {
    if (req.session._id) {
      try {
        const data = req.body
        const newRequest = new Request()
        newRequest.userID = data.uid
        newRequest.status = 'รอการชำระเงิน'
        newRequest.address = data.address
        newRequest.overallprice = data.overallprice
        newRequest.item = data.item
        await Array.from(data.item).forEach(async (element) => {
          const amount = parseInt(element.amount) - parseInt(element.buyamount)
          await Book.findByIdAndUpdate(
            element._id,
            {
              $set: { amount }
            },
            { new: true }
          )
        })
        await newRequest.save((err) => {
          if (err) {
            return res.status(500).json({ message: err })
          }
          return res.status(200).json({ message: 'success' })
        })
      } catch (error) {
        return res
          .status(500)
          .json({ message: 'Cannot register request to database' })
      }
    }
  },
  getAll: async (req, res) => {
    try {
      const requests = await Request.find({})
      return res.status(200).json(requests)
    } catch (error) {
      return res.status(500).json({ message: 'Cannot get data from database' })
    }
  },
  getID: async (req, res) => {
    if (req.session._id) {
      try {
        const requests = await Request.find({
          userID: req.session._id
        })
        return res.status(200).json(requests)
      } catch (error) {
        return res
          .status(500)
          .json({ message: 'Cannot get data from database' })
      }
    }
  }
}
