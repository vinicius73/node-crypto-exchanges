const mongoose = require('mongoose')

const mongooseCreateConnection = (uri = 'mongodb://mongodb:27017') => {
  return mongoose.createConnection(uri)
}

module.exports = { mongooseCreateConnection }
