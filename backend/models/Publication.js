const mongoose = require('../db/conn')
const { Schema } = mongoose

const Publication = mongoose.model(
  'Publication',
  new Schema({
    localization: {
      type: String
    },
    description: {
      type: String
    },
    likes: {
      type: Array
    },
    images: {
      type: Array,
      require: true
    },
    comments: {
      type: Array
    },
    denounces: {
      type: Array
    },
    user: Object
  }, {timestamps: true})
)

module.exports = Publication