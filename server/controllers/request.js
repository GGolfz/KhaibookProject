/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const Request = require('../models/request')
const Book = require('../models/books')
const userController = require('./user')
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
  recieve: async (req, res) => {
    const id = req.params.id
    try {
      const request = await Request.findByIdAndUpdate(
        id,
        {
          $set: {
            status: 'ได้รับแล้ว'
          }
        },
        { new: true }
      )
      return res.status(201).json(request)
    } catch (error) {
      return res.status(500).json({ message: 'Cannot get data from database' })
    }
  },
  approve: async (req, res) => {
    if (req.session._id) {
      const uid = req.session._id
      if (await userController.checkstaff(uid)) {
        const id = req.params.id
        const data = req.body
        if (data) {
          try {
            const request = await Request.findByIdAndUpdate(
              id,
              {
                $set: {
                  status: data.status
                }
              },
              { new: true }
            )
            return res.status(201).json(request)
          } catch (error) {
            return res
              .status(500)
              .json({ message: 'Cannot get data from database' })
          }
        }
        return res.status(400).json({ message: 'Bad Request' })
      }
      return res.status(500).json({ message: 'No Permission' })
    }
    return res.status(500).json({ message: 'No Permission' })
  },
  update: async (req, res) => {
    if (req.session._id) {
      const id = req.params.id
      const data = req.body
      if (data) {
        try {
          const request = await Request.findByIdAndUpdate(
            id,
            {
              $set: {
                address: data.address,
                status: 'รอการตรวจสอบ'
              }
            },
            { new: true }
          )
          if (req.files) {
            const myImg = req.files.evidence
            if (myImg) {
              const filename = id
              myImg.mv(`./static/evidence/${filename}.jpg`, (err) => {
                if (err) {
                  return res.status(500).send(err)
                }
              })
            }
          }
          return res.status(201).json(request)
        } catch (error) {
          return res
            .status(500)
            .json({ message: 'Cannot store data to database' })
        }
      }
    }
    return res.status(400).json({ message: 'Bad Request' })
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
          userID: req.session._id,
          status: 'รอการชำระเงิน'
        })
        return res.status(200).json(requests)
      } catch (error) {
        return res
          .status(500)
          .json({ message: 'Cannot get data from database' })
      }
    }
    return res.status(500).json({ message: 'No Permission' })
  },
  getIDOrder: async (req, res) => {
    if (req.session._id) {
      try {
        const requests = await Request.find({
          userID: req.session._id,
          status: 'รอการตรวจสอบ'
        })
        return res.status(200).json(requests)
      } catch (error) {
        return res
          .status(500)
          .json({ message: 'Cannot get data from database' })
      }
    }
    return res.status(500).json({ message: 'No Permission' })
  },
  getIDSend: async (req, res) => {
    if (req.session._id) {
      try {
        const requests = await Request.find({
          userID: req.session._id,
          status: 'รอการจัดส่ง'
        })
        return res.status(200).json(requests)
      } catch (error) {
        return res
          .status(500)
          .json({ message: 'Cannot get data from database' })
      }
    }
    return res.status(500).json({ message: 'No Permission' })
  },
  getIDFin: async (req, res) => {
    if (req.session._id) {
      try {
        const requests = await Request.find({
          userID: req.session._id,
          status: 'จัดส่งแล้ว'
        })
        return res.status(200).json(requests)
      } catch (error) {
        return res
          .status(500)
          .json({ message: 'Cannot get data from database' })
      }
    }
    return res.status(500).json({ message: 'No Permission' })
  },
  getOrder: async (req, res) => {
    if (req.session._id) {
      const uid = req.session._id
      if (await userController.checkstaff(uid)) {
        try {
          const requests = await Request.find({
            status: 'รอการตรวจสอบ'
          })
          return res.status(200).json(requests)
        } catch (error) {
          return res
            .status(500)
            .json({ message: 'Cannot get data from database' })
        }
      }
      return res.status(500).json({ message: 'No Permission' })
    }
    return res.status(500).json({ message: 'No Permission' })
  },
  getSend: async (req, res) => {
    if (req.session._id) {
      const uid = req.session._id
      if (await userController.checkstaff(uid)) {
        try {
          const requests = await Request.find({
            status: 'รอการจัดส่ง'
          })
          return res.status(200).json(requests)
        } catch (error) {
          return res
            .status(500)
            .json({ message: 'Cannot get data from database' })
        }
      }
      return res.status(500).json({ message: 'No Permission' })
    }
    return res.status(500).json({ message: 'No Permission' })
  }
}
