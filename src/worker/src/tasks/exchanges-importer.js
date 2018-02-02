const { loadExchanges } = require('../domains/bitvalor/load-exchanges')

const createOrUpdate = (Exchange, data) => {
  const conditions = { legend: data.legend }

  return Exchange.createOrUpdate(conditions, data)
}

module.exports = {
  cronTime: '* */60 * * * *',
  name: 'Exchanges Importer',
  init (models) {
    return this.handler(models)
  },
  handler ({ Exchange }) {
    return loadExchanges()
      .then(data => {
        const promises = data.map(row => createOrUpdate(Exchange, row))
        return Promise.all(promises)
      })
  }
}
