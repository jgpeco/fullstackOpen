const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const blog = request.body

    const newBlog = new Blog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes || 0,
    })

    const savedBlog = await newBlog.save()
    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const updateInfo = request.body

    const newBlog = await Blog.findByIdAndUpdate(request.params.id, updateInfo, { new: true })
    response.json(newBlog)
})

module.exports = blogRouter