const plugins = [
  require('../domains/exchanges/server-plugin')
]

const installPlugins = server => {
  plugins.forEach(({ install }) => {
    install(server)
  })
}

module.exports = { installPlugins }