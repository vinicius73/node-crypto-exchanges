const { mongooseCreateConnection } = require('../../support/db/mongoose-create-connection')
const { modelsFactory } = require('../exchanges/models-factory')

const modelsMiddleware = (req, res, next) => {
  let $cache
  
  Object.defineProperty(req, '$models', {
    get: () => {
      if ($cache) {
        return $cache
      }

      const conn = mongooseCreateConnection()
      $cache = modelsFactory(conn)

      return $cache
    }
  })

  next()
} 

const install = server => {
  server.use(modelsMiddleware)
}

module.exports = { install }