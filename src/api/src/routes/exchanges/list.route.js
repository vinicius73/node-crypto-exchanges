const { omitPrivateKeysFromList } = require('../../support/utils/mongoose')

const handler = (req, res) => {
  return req.$models.Exchange.find()
    .then(omitPrivateKeysFromList)
}

module.exports = {
  method: 'get',
  path: '/exchanges',
  name: 'exchanges.list',
  useWrap: true,
  version: 'v1.0.0',
  handler
}
