const mongoose = require('mongoose')
const Schema = mongoose.Schema

// blog Schema

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: Number
})

// transform schema
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // add id to the object to be given by the database
    returnedObject.id = returnedObject._id.toString()
    // delete the attributes _id __v given by the database
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog


