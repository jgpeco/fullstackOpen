const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: `Peco's Blog`,
        author: `Peco`,
        url: `http://www.google.com`,
        likes: 3,
    },
    {
        title: `Male's Blog`,
        author: `Male`,
        url: `http://www.facebook.com`,
        likes: 12,
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb, usersInDb
}