const User = require('../models/user')
module.exports = {
  signup: async (req, res) => {
    try {
      const data = req.body
      if (data) {
        await User.findOne({ 'local.email': data.email }, (err, user) => {
          if (err) {
            return res.status(500).json({ message: err })
          }
          if (user) {
            return res.status(500).json({ message: 'Email has already taken' })
          } else {
            const newUser = new User()
            newUser.local.email = data.email
            newUser.local.password = newUser.generateHash(data.password)
            newUser.firstname = data.firstname
            newUser.lastname = data.lastname
            newUser.isStaff = false
            newUser.save((err) => {
              if (err) {
                return res.status(500).json({ message: err })
              }
              return res.status(200).json({ message: 'register success' })
            })
          }
        })
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Cannot register user to database' })
    }
  },
  login: async (req, res) => {
    try {
      const data = req.body
      if (data) {
        await User.findOne({ 'local.email': data.email }, (err, user) => {
          if (err) return res.status(500).json({ message: err })
          if (!user) return res.status(500).json({ message: 'No user found.' })
          if (!user.validatePassword(data.password, user.local.password))
            return res.status(500).json({ message: 'Wrong password' })
          const session = req.session
          session._id = user._id
          return res.status(200).json({ message: 'login success' })
        })
      }
    } catch (error) {
      return res.status(500).json({ message: 'Cannot login' })
    }
  },
  checkstaff: async (id) => {
    const user = await User.findById(id)
    const val = user.isStaff
    return val
  }
}
