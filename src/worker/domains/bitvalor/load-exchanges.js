const { createHttpClient } = require('./http-client')

const normalizeData = data => {
  return Object.keys(data)
    .reduce((acc, legend) => {
      const value = { legend,...data[legend]}
      return [...acc, value] 
    }, [])
}

const loadExchanges = () => {
  const http = createHttpClient()
  return http.get('exchanges.json')
    .then(({ data }) => normalizeData(data))
}

module.exports = { loadExchanges }