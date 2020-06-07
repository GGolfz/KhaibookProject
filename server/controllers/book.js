/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const mongoose = require('mongoose')
const Books = require('../models/books')
module.exports = {
  get: async (req, res) => {
    try {
      const books = await Books.find({})
      return res.status(200).json(books)
    } catch (error) {
      return res.status(500).json({ message: 'Cannot get data from database' })
    }
  },
  add: async (req, res) => {
    const data = req.body
    if (data) {
      try {
        const book = await Books.create(data)
        if (req.files) {
          const myImg = req.files.bookImage
          if (myImg) {
            const filename = book._id
            myImg.mv(`./static/uploads/${filename}.jpg`, (err) => {
              if (err) {
                return res.status(500).send(err)
              }
            })
          }
        }
        return res.status(201).json(book)
      } catch (error) {
        return res
          .status(500)
          .json({ message: 'Cannot store data to database' })
      }
    }
    return res.status(400).json({ message: 'Bad request' })
  },
  getID: async (req, res) => {
    const id = req.params.id
    if (id) {
      try {
        const book = await Books.findById(id)
        return res.status(200).json(book)
      } catch (error) {
        return res
          .status(500)
          .json({ message: 'Cannot delete data from database' })
      }
    }
    return res.status(400).json({ message: 'Bad request' })
  },
  edit: async (req, res) => {
    const id = req.params.id
    const data = req.body
    if (id && data) {
      try {
        const book = await Books.findByIdAndUpdate(
          id,
          {
            $set: data
          },
          { new: true }
        )
        if (req.files) {
          const myImg = req.files.bookImage
          if (myImg) {
            const filename = id
            myImg.mv(`./static/uploads/${filename}.jpg`, (err) => {
              if (err) {
                return res.status(500).send(err)
              }
            })
          }
        }
        return res.status(200).json(book)
      } catch (error) {
        return res
          .status(500)
          .json({ message: 'Cannot update data to database' })
      }
    }
    return res.status(400).json({ message: 'Bad request' })
  },
  delete: async (req, res) => {
    const id = req.params.id
    if (id) {
      try {
        const book = await Books.findByIdAndDelete(id)
        return res.status(200).json(book)
      } catch (error) {
        return res
          .status(500)
          .json({ message: 'Cannot delete data from database' })
      }
    }
    return res.status(400).json({ message: 'Bad request' })
  }
}
