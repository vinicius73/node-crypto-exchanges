const axios = require('axios')

const baseURL = 'https://api.bitvalor.com/v1/'

const createHttpClient = (options = {}) => axios.create({
  baseURL,
  ...options
})

module.exports = { createHttpClient }
