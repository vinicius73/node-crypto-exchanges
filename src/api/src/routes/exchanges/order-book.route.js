const { toUpper, map } = require('lodash')

const normalizeBookEntries = list => map(list, ({ price, btc_volume }) => { // eslint-disable-line camelcase
  return {
    buyPrice: price,
    qtdBtc: btc_volume
  }
})

const handler = async (req, res) => {
  try {
    const $models = req.$models
    const legend = toUpper(req.params.legend)
    const orderFilter = { exchange: legend }

    const [bids, asks, record] = await Promise.all([
      $models.Bids.find(orderFilter),
      $models.Asks.find(orderFilter),
      $models.Exchange.findOne({ legend })
    ])

    return {
      exchange: record.name,
      vendas: normalizeBookEntries(bids),
      compra: normalizeBookEntries(asks)
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

module.exports = {
  method: 'get',
  path: '/exchanges/:legend/order-book',
  name: 'exchanges.order_book',
  useWrap: true,
  version: 'v1.0.0',
  handler
}
