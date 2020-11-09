const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: `Peco's Blog`,
        author: `Peco`,
        url: `http://www.google.com`,
        likes: 3,
        id: `5fa596ccc40ae033681014e1`,
    },
    {
        title: `Male's Blog`,
        author: `Male`,
        url: `http://www.facebook.com`,
        likes: 12,
        id: `5fa59a0e49b9df31c00c7d17`,
    },
]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDB
}