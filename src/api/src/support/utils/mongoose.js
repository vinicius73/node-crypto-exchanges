const { map, omit } = require('lodash')

const omitPrivateKeys = (obj, extraKeys = []) => omit(obj.toObject(), ['_id', '__v', ...extraKeys])
const omitPrivateKeysFromList = (list, extraKeys = []) =>
  map(list, row => omitPrivateKeys(row, extraKeys))

module.exports = { omitPrivateKeys, omitPrivateKeysFromList }