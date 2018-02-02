const schemas = require('./schemas')

const modelsFactory = conn => {
  return Object.keys(schemas)
    .reduce((acc, name) => {
      acc[name] = conn.model(name, schemas[name])
      return acc
    }, {})
}

module.exports = { modelsFactory }
