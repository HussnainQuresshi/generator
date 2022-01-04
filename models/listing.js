const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listingSchema = new Schema({
  sku: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  upc: {
    type: String,
  },
  description: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  },
  imgUrl: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
})

module.exports = mongoose.model("Listing", listingSchema)
