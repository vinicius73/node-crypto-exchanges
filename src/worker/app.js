const nodeSchedule = require('node-schedule')
const tasks = require('./tasks')
const { mongooseCreateConnection } = require('./support/db/mongoose-create-connection')
const { modelsFactory } = require('./domains/exchanges/models-factory')

const conn = mongooseCreateConnection()
const models = modelsFactory(conn)

const wrappedHandler = ({ name, handler }) => () => {
  console.log(`running: ${name}`)
  handler(models)
    .then(() => {
      console.log(`finish with success: ${name}`)
    })
    .catch(e => {
      console.error(`finish with error: ${name}`)
      console.error(e)      
    })
}

const jobs = tasks.map(task => {
  console.log(`schedule: ${task.name} (${task.cronTime})`)
  
  if (task.init) {
    task.init(models)
  }

  return nodeSchedule.scheduleJob(task.cronTime, wrappedHandler(task))
})
