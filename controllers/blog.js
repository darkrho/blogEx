const blogRouter = require('express').Router()
const Blog = require('../models/blog')

/*
  // blog schema
  title: String,
  author: String,
  url: String,
  likes: Number
*/
// routes here

// GET -> api/blogs
blogRouter.get('/', async (request, response, next) => {
  try {
    const blogEntries = await Blog.find({})
    response.json(blogEntries)
  }
  catch (exception) {
    next(exception)
  }
})

// POST -> api/blogs
blogRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => {
      next(error)
    })
})


module.exports = blogRouter