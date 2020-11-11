const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: `Peco's Blog`,
        author: `Peco`,
        url: `http://www.google.com`,
        likes: 3,
        user: '5fab2df4b8f73529082739b4',
    },
    {
        title: `Male's Blog`,
        author: `Male`,
        url: `http://www.facebook.com`,
        likes: 12,
        user: '5fabf04b7ff91b2894d82c05',
    }
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