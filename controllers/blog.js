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
blogRouter.post('/', async (request, response, next) => {
  let blog
  // add likes attribute if not on request
  if (!request.body.likes) {
    const newBlog = {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: 0
    }
    blog = new Blog(newBlog)
  } else {
    blog = new Blog(request.body)
  }
  // save the blog
  try {
    const result = await blog.save()
    response.status(201).json(result)
  }
  catch (exception) {
    next(exception)
  }
})

// DELETE -> api/blogs/:id
blogRouter.delete('/:id', async (request, response, next) => {
  // get id from params
  const id = request.params.id
  // delete entry on the database
  try {
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  }
  catch (exception) {
    next(exception)
  }
})

// PUT -> api/blogs/:id
blogRouter.put('/:id', async (request, response, next) => {
  // get id from params
  const id = request.params.id
  // update the likes +1 on the entry
  try {
    const entryToUpdate = await Blog.findById(id)
    entryToUpdate.likes += 1
    const entryUpdated = await Blog.findByIdAndUpdate(id, entryToUpdate, { new: true })
    response.json(entryUpdated)
  }
  catch (exception) {
    next(exception)
  }
})

module.exports = blogRouter