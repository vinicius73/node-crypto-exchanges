const { map } = require('ramda')
const { createHttpClient } = require('./http-client')

const normalizeBookEntry = entry => {
  const [exchange, price, btc_volume] = entry // eslint-disable-line camelcase
  return { exchange, price, btc_volume }
}

const normalizeBookEntrys = map(normalizeBookEntry)

const normalizeData = ({ bids, asks }) => {
  return {
    bids: normalizeBookEntrys(bids),
    asks: normalizeBookEntrys(asks)
  }
}

const loadOrdersBook = () => {
  const http = createHttpClient()
  return http.get('order_book.json')
    .then(({ data }) => normalizeData(data))
}

module.exports = { loadOrdersBook }
