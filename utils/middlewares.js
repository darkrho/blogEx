const logger = require('./logger')

// middleware to show request method path and body
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('-------')
  next()
}

// middleware to raise and error if someone try to reach and undeclared endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// middleware to handle errors on the routes
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  // id error on database
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformated id' })
  }
  // body data error cast by express validator
  else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: `${error.message}` })
  }

  // past other errors to front
  next(error)
}

// export middlewares to use in index.js
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}