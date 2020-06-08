const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const userSchema = new Schema({
  local: {
    email: String,
    password: String
  },
  firstname: {
    type: String,
    require: true
  },
  lastname: {
    type: String,
    require: true
  },
  isStaff: {
    type: Boolean,
    require: true
  }
})
userSchema.methods.generateHash = (password) => {
  const salt = bcrypt.genSaltSync(8)
  return bcrypt.hashSync(password, salt)
}
userSchema.methods.validatePassword = (password, localpassword) => {
  return bcrypt.compareSync(password, localpassword)
}

module.exports = mongoose.model('User', userSchema)
