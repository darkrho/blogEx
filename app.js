const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const blogRouter = require('./controllers/blog')
const middlewares = require('./utils/middlewares')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

// set app
const app = express()
// connect to database
mongoose.set('strictQuery', false)
logger.info('connecting to database')
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to database')
  })
  .catch((error) => {
    logger.error('error connecting database: ', error.message)
  })
// setting app
app.use(cors())
//app.use(express.static('dist'))
app.use(express.json())
app.use(middlewares.requestLogger)
app.use('/api/blogs', blogRouter)
app.use(middlewares.unknownEndpoint)
app.use(middlewares.errorHandler)

module.exports = app