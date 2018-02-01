const handler = (req, res) => {
  return { ok: true }
}

module.exports = {
  method: 'get',
  path: '/exchanges',
  name: 'exchanges.list',
  useWrap: true,
  version: 'v1.0.0',
  handler
}