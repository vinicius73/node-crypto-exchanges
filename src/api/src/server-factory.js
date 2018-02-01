const restify = require('restify')
const path = require('path')
const registerRoutesByPath = require('./support/register-routes-by-path')

const serverFactory = () => {
  const server = restify.createServer()
  registerRoutesByPath(server, path.join(__dirname, './routes'))
  return server
}

module.exports = { serverFactory }