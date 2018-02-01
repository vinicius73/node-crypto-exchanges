const { Schema } = require('mongoose')

const BookEntry = new Schema({
  exchange: String,
  value: Number,
  btc_volume: Number
})


module.exports = BookEntry