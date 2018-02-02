const { isError } = require('lodash')
const Boom = require('boom')

/**
 * call a middleware
 * @method tryCatch
 * @param  {Function} fn
 * @return {Promise}
 */
const tryCatch = fn => {
  try {
    return Promise.resolve(fn())
  } catch (e) {
    return Promise.reject(e)
  }
}

/**
 * @method sendError
 * @param  {ResponseRestify}  res response instance
 * @param  {Error}            e
 */
const sendError = (res, e) => {
  try {
    const error = isError(e) ? e : new Error(e)
    const output = Boom.boomify(error).output

    console.error(e.message)

    res.send(output.statusCode, output)
  } catch (error) {
    res.send(500, error)
  }
}

/**
 * @method wrapMiddleware
 * @param  {Function}       middleware route middleware
 * @return {Function}
 */
const wrapMiddleware = middleware => {
  return (req, res) => {
    const handler = () => middleware(req, res)
    tryCatch(handler)
      .then(result => {
        res.json(result)
      })
      .catch(e => sendError(res, e))
  }
}

module.exports = wrapMiddleware
