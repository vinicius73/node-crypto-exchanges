const { Schema } = require('mongoose')

const BookEntry = new Schema({
  exchange: String,
  price: Number,
  btc_volume: Number
})


module.exports = BookEntry