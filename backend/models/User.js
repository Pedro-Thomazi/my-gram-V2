const mongoose = require('../db/conn')
const { Schema } = mongoose

const User = mongoose.model(
  'User',
  new Schema({
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    },
    description: {
      type: String
    },
    followers: {
      type: Array
    },
    following: {
      type: Array
    },
    publications: {
      type: Number
    },
    image: {
      type: String
    },
    darkMode: {
      type: Boolean
    },
    notification: {
      type: Array
    },
    password: {
      type: String,
      require: true
    },
  }, {timestamps: true})
)

module.exports = User