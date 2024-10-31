const lodashObject = require('lodash/fp/object')
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  sumLikes = (likes, item) => {
    likes += item.likes
    return likes
  }
  return blogs.reduce(sumLikes, 0)
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map((blog) => blog.likes))
  const bestBlogs = blogs.filter((blog) => blog.likes === maxLikes)
  return bestBlogs[0]
}

const mostBlogs = (blogs) => {
  const countEntries = blogs.reduce((acc, blog) => {
    if (acc[blog.author] === undefined) {
      acc[blog.author] = 1
    } else {
      acc[blog.author] += 1
    }
    return acc
  }, {})
  const blogEnt = Math.max(...Object.values(countEntries))
  let bestBloger = {}
  for (ent of Object.entries(countEntries)) {
    if (ent[1] === blogEnt) {
      bestBloger.author = ent[0]
      bestBloger.blogs = ent[1]
    }
  }
  return bestBloger
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}