const Blog = require('../models/blog')

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

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDB
}