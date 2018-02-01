const { map, omit } = require('lodash')

const omitPrivateKeys = list => map(list, row => omit(row.toObject(), ['_id', '__v']))

const handler = (req, res) => {
  return req.$models.Exchange.find()
    .then(omitPrivateKeys)
}

module.exports = {
  method: 'get',
  path: '/exchanges',
  name: 'exchanges.list',
  useWrap: true,
  version: 'v1.0.0',
  handler
}