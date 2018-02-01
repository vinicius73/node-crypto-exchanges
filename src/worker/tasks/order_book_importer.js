const { loadOrdersBook } = require('../domains/bitvalor/load-orders-book')

const updateBooksEntrys = (Model, list) =>
  Model.remove()
    .then(() => Model.create(list))

module.exports = {
  cronTime: '*/60 * * * * *',
  name: 'Order Book Importer',
  init(models) {
    return this.handler(models)
  },
  handler({ Bids, Asks }) {
    return loadOrdersBook()
      .then(orders => {
        const promises = [updateBooksEntrys(Bids, orders.bids), updateBooksEntrys(Asks, orders.asks)]
        return Promise.all(promises)
      })
  }
}