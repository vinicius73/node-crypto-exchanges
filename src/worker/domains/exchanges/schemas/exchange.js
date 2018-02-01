const { Schema } = require('mongoose')

const Exchange = new Schema({
  legend: String,
  color: String,
  url: String,
  url_book: String,
  fees: {
    in_BRL: [Number, Number],
    in_BTC: [Number, Number],
    out_BRL: [Number, Number],
    out_BTC: [Number, Number],
    trade_book: [Number, Number],
    trade_market: [Number, Number],
  }
})

Exchange.plugin(require('mongoose-create-or-update'));

module.exports = Exchange