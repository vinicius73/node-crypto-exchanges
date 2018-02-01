const restify = require('restify')
const path = require('path')
const registerRoutesByPath = require('../support/register-routes-by-path')

const { installPlugins } = require('./plugins')

const serverFactory = () => {
  const server = restify.createServer()

  installPlugins(server)
  registerRoutesByPath(server, path.join(__dirname, '../routes'))
  
  return server
}

module.exports = { serverFactory }